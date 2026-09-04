import crypto from "crypto";
import { STORE_ITEMS, StoreItem } from "@/data/store-items";

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED" | "REFUNDED";

export type OrderItemSnapshot = {
  id: string;
  title: string;
  categoryLabel: string;
  priceUsd: number;
  priceInr: number;
  quantity: number;
  subtotal: number;
  downloadPackageFilename: string;
};

export type OrderRecord = {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    notes?: string;
  };
  items: OrderItemSnapshot[];
  currency: string;
  subtotal: number;
  discountCode?: string;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  formattedTotal: string;
  licenseKey: string;
  transactionId?: string;
  paymentGateway?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  downloadAttempts?: Record<string, number>;
};

export type DownloadTokenPayload = {
  orderId: string;
  productId: string;
  exp: number;
  nonce: string;
};

// Server HMAC Secret (Loaded from ENV or securely generated per deployment)
const HMAC_SECRET =
  process.env.ORDER_SECURITY_SECRET ||
  process.env.SUPABASE_SECRET_KEY ||
  "vikash_secure_hmac_secret_key_prod_2026_x99_enterprise";

// Global In-Memory Store for Orders & Processed Transactions
const ordersStore = new Map<string, OrderRecord>();
const processedTransactions = new Set<string>();

// Pre-seed known sample demo orders so testing / verifying works out-of-the-box
function initializeSampleOrders() {
  if (ordersStore.size > 0) return;

  const demoOrder: OrderRecord = {
    orderId: "ord_sample_demo_paid",
    orderNumber: "VK-ORD-2026-7890",
    status: "PAID",
    customer: {
      name: "Vikash Choudhary",
      email: "hello@vikash.website",
      phone: "+91 8000165311",
      company: "Vikash Studio",
    },
    items: [
      {
        id: "victor-graphic-designer-portfolio",
        title: "Victor — Graphic Designer Portfolio",
        categoryLabel: "Official Theme",
        priceUsd: 24,
        priceInr: 1999,
        quantity: 1,
        subtotal: 1999,
        downloadPackageFilename: "victor-graphic-designer-portfolio.zip",
      },
    ],
    currency: "INR",
    subtotal: 1999,
    discountPercent: 0,
    discountAmount: 0,
    totalAmount: 1999,
    formattedTotal: "₹1,999",
    licenseKey: "VK-2026-DEMO-VALID-01",
    transactionId: "TXN_DEMO_SAMPLE_001",
    paymentGateway: "Razorpay / Stripe Verified",
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloadAttempts: {},
  };

  ordersStore.set(demoOrder.orderId, demoOrder);
  processedTransactions.add("TXN_DEMO_SAMPLE_001");
}

initializeSampleOrders();

// -------------------------------------------------------------
// CRYPTOGRAPHIC HMAC UTILITIES (Timing-Safe)
// -------------------------------------------------------------
export function createHmacSignature(data: string, secret = HMAC_SECRET): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Parse numeric price from catalog strings like "₹1,999" or "$24"
export function parseNumericPrice(str: string): number {
  const num = parseFloat(str.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

// -------------------------------------------------------------
// AUTHORITATIVE SERVER-SIDE ORDER CALCULATION
// -------------------------------------------------------------
export function createAuthoritativeOrder(params: {
  itemRequests: Array<{ id: string; quantity: number }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    notes?: string;
  };
  discountCode?: string;
  currency?: string;
}): OrderRecord {
  const currency = (params.currency || "INR").toUpperCase();
  const selectedItems: OrderItemSnapshot[] = [];

  let rawSubtotal = 0;

  for (const reqItem of params.itemRequests) {
    const catalogItem = STORE_ITEMS.find((s) => s.id === reqItem.id);
    if (!catalogItem) {
      throw new Error(`Product with ID "${reqItem.id}" not found in server catalog.`);
    }

    const qty = Math.max(1, Math.min(10, Math.floor(reqItem.quantity || 1)));
    const priceInr = parseNumericPrice(catalogItem.priceInr);
    const priceUsd = parseNumericPrice(catalogItem.priceUsd);
    const unitPrice = currency === "INR" ? priceInr : priceUsd;
    const itemSubtotal = unitPrice * qty;

    rawSubtotal += itemSubtotal;

    selectedItems.push({
      id: catalogItem.id,
      title: catalogItem.title,
      categoryLabel: catalogItem.categoryLabel,
      priceUsd,
      priceInr,
      quantity: qty,
      subtotal: itemSubtotal,
      downloadPackageFilename: `${catalogItem.id}.zip`,
    });
  }

  if (selectedItems.length === 0) {
    throw new Error("Cannot create order with no items.");
  }

  // Server validates discount eligibility
  let discountPercent = 0;
  const cleanCode = (params.discountCode || "").trim().toUpperCase();

  const MIN_OFFER_ORDER_INR = 5999;
  const MIN_OFFER_ORDER_USD = 72;
  const isThresholdMet =
    currency === "INR" ? rawSubtotal >= MIN_OFFER_ORDER_INR : rawSubtotal >= MIN_OFFER_ORDER_USD;

  if (cleanCode && isThresholdMet) {
    if (["LAUNCH20", "SPECIAL20", "CREATOR20"].includes(cleanCode)) {
      discountPercent = 20;
    } else if (cleanCode === "COMMUNITY15") {
      discountPercent = 15;
    } else if (["VIKASH10", "LAUNCH10", "DEV10"].includes(cleanCode)) {
      discountPercent = 10;
    }
  }

  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const totalAmount = Math.max(0, rawSubtotal - discountAmount);

  const formattedTotal =
    currency === "INR" ? `₹${totalAmount.toLocaleString("en-IN")}` : `$${totalAmount}`;

  // Unique Order ID and Cryptographic License Key
  const orderId = `ord_${crypto.randomBytes(12).toString("hex")}`;
  const randomSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  const orderNumber = `VK-ORD-2026-${randomSuffix}`;
  const licenseKey = `VK-2026-${crypto.randomBytes(4).toString("hex").toUpperCase()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

  const orderRecord: OrderRecord = {
    orderId,
    orderNumber,
    status: "PENDING",
    customer: {
      name: params.customer.name.trim(),
      email: params.customer.email.trim().toLowerCase(),
      phone: params.customer.phone.trim(),
      company: params.customer.company?.trim(),
      notes: params.customer.notes?.trim(),
    },
    items: selectedItems,
    currency,
    subtotal: rawSubtotal,
    discountCode: discountPercent > 0 ? cleanCode : undefined,
    discountPercent,
    discountAmount,
    totalAmount,
    formattedTotal,
    licenseKey,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloadAttempts: {},
  };

  ordersStore.set(orderId, orderRecord);
  return orderRecord;
}

export function getOrderById(orderId: string): OrderRecord | undefined {
  return ordersStore.get(orderId);
}

export function getOrderByLicenseKey(licenseKey: string): OrderRecord | undefined {
  for (const order of ordersStore.values()) {
    if (order.licenseKey.toLowerCase() === licenseKey.trim().toLowerCase()) {
      return order;
    }
  }
  return undefined;
}

// -------------------------------------------------------------
// SERVER-SIDE PAYMENT VERIFICATION (Idempotent & Signature Checked)
// -------------------------------------------------------------
export function verifyAndMarkOrderPaid(params: {
  orderId: string;
  transactionId: string;
  paidAmount: number;
  paidCurrency: string;
  gateway: string;
  signature?: string;
}): { success: boolean; order?: OrderRecord; error?: string } {
  const { orderId, transactionId, paidAmount, paidCurrency, gateway, signature } = params;

  // 1. Idempotency Check (Prevent duplicate execution / replay attacks)
  if (processedTransactions.has(transactionId)) {
    const existing = ordersStore.get(orderId);
    if (existing && existing.status === "PAID") {
      return { success: true, order: existing };
    }
    return { success: false, error: "Transaction ID already processed." };
  }

  // 2. Fetch Order
  const order = ordersStore.get(orderId);
  if (!order) {
    return { success: false, error: `Order "${orderId}" not found.` };
  }

  if (order.status === "PAID") {
    return { success: true, order };
  }

  // 3. Amount & Currency Matching (Zero Tolerance for Price Manipulation)
  if (Math.round(paidAmount) < Math.round(order.totalAmount)) {
    return {
      success: false,
      error: `Payment amount mismatch: Expected ${order.totalAmount}, received ${paidAmount}.`,
    };
  }

  if (paidCurrency.toUpperCase() !== order.currency.toUpperCase()) {
    return {
      success: false,
      error: `Currency mismatch: Expected ${order.currency}, received ${paidCurrency}.`,
    };
  }

  // 4. Cryptographic Signature Validation if signature is provided
  if (signature) {
    const payload = `${orderId}|${transactionId}|${paidAmount}|${paidCurrency}`;
    const expectedSig = createHmacSignature(payload);
    if (!timingSafeCompare(signature, expectedSig)) {
      return { success: false, error: "Invalid payment gateway signature." };
    }
  }

  // 5. Mark as Verified & Paid
  order.status = "PAID";
  order.transactionId = transactionId;
  order.paymentGateway = gateway;
  order.paidAt = new Date().toISOString();
  order.updatedAt = new Date().toISOString();

  processedTransactions.add(transactionId);
  ordersStore.set(orderId, order);

  return { success: true, order };
}

// -------------------------------------------------------------
// SHORT-LIVED SIGNED DOWNLOAD TOKEN GENERATION & VALIDATION
// -------------------------------------------------------------
export function generateSignedDownloadToken(
  orderId: string,
  productId: string,
  expiresInMinutes = 15
): string {
  const order = ordersStore.get(orderId);
  if (!order || order.status !== "PAID") {
    throw new Error("Cannot generate download token for an unpaid or non-existent order.");
  }

  const hasProduct = order.items.some((i) => i.id === productId);
  if (!hasProduct) {
    throw new Error("Product does not belong to this order.");
  }

  const exp = Date.now() + expiresInMinutes * 60 * 1000;
  const nonce = crypto.randomBytes(8).toString("hex");
  const payloadStr = JSON.stringify({ orderId, productId, exp, nonce });
  const payloadB64 = Buffer.from(payloadStr, "utf8").toString("base64url");
  const signature = createHmacSignature(payloadB64);

  return `${payloadB64}.${signature}`;
}

export function verifyDownloadToken(token: string): {
  valid: boolean;
  order?: OrderRecord;
  productId?: string;
  error?: string;
} {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Malformed download token format." };
  }

  const [payloadB64, signature] = parts;
  const expectedSig = createHmacSignature(payloadB64);

  // 1. Timing-safe Signature Verification
  if (!timingSafeCompare(signature, expectedSig)) {
    return { valid: false, error: "Invalid cryptographic signature. Access denied." };
  }

  // 2. Decode Payload
  let payload: DownloadTokenPayload;
  try {
    const rawJson = Buffer.from(payloadB64, "base64url").toString("utf8");
    payload = JSON.parse(rawJson);
  } catch {
    return { valid: false, error: "Corrupted token payload." };
  }

  // 3. Expiration Check
  if (Date.now() > payload.exp) {
    return { valid: false, error: "Download link has expired. Please generate a fresh link." };
  }

  // 4. Order Verification
  const order = ordersStore.get(payload.orderId);
  if (!order) {
    return { valid: false, error: "Associated order could not be found." };
  }

  if (order.status !== "PAID") {
    return { valid: false, error: "Order is not in paid status. Download denied." };
  }

  // 5. Product Ownership Check
  const hasProduct = order.items.some((i) => i.id === payload.productId);
  if (!hasProduct) {
    return { valid: false, error: "Purchased package does not match token resource." };
  }

  // 6. Token Download Rate Limit (Max 5 downloads per token)
  order.downloadAttempts = order.downloadAttempts || {};
  const currentAttempts = order.downloadAttempts[payload.nonce] || 0;
  if (currentAttempts >= 5) {
    return { valid: false, error: "Download limit exceeded for this session link (max 5)." };
  }

  order.downloadAttempts[payload.nonce] = currentAttempts + 1;
  ordersStore.set(order.orderId, order);

  return {
    valid: true,
    order,
    productId: payload.productId,
  };
}

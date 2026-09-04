"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { StoreItem, STORE_ITEMS } from "@/data/store-items";

export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "AED" | "CAD" | "AUD" | "JPY";

export type CurrencyInfo = {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
  rate: number; // relative to 1 USD
};

export const ALL_CURRENCIES: CurrencyInfo[] = [
  { code: "USD", symbol: "$", label: "USD ($)", flag: "🇺🇸", rate: 1.0 },
  { code: "INR", symbol: "₹", label: "INR (₹)", flag: "🇮🇳", rate: 83.0 },
  { code: "EUR", symbol: "€", label: "EUR (€)", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", symbol: "£", label: "GBP (£)", flag: "🇬🇧", rate: 0.78 },
  { code: "AED", symbol: "AED", label: "AED (د.إ)", flag: "🇦🇪", rate: 3.67 },
  { code: "CAD", symbol: "CA$", label: "CAD ($)", flag: "🇨🇦", rate: 1.36 },
  { code: "AUD", symbol: "AU$", label: "AUD ($)", flag: "🇦🇺", rate: 1.52 },
  { code: "JPY", symbol: "¥", label: "JPY (¥)", flag: "🇯🇵", rate: 152.0 },
];

export type LanguageCode = "en" | "hi" | "es" | "de" | "fr" | "ja" | "ar";

export type LanguageInfo = {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
};

export const ALL_LANGUAGES: LanguageInfo[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
  { code: "de", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", flag: "🇯🇵" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇦🇪" },
];

export type CountryInfo = {
  name: string;
  code: string;
  flag: string;
  currency: CurrencyCode;
  currencyLabel: string;
};

export const ALL_COUNTRIES: CountryInfo[] = [
  { name: "India", code: "IN", flag: "🇮🇳", currency: "INR", currencyLabel: "INR (₹)" },
  { name: "United States", code: "US", flag: "🇺🇸", currency: "USD", currencyLabel: "USD ($)" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", currency: "GBP", currencyLabel: "GBP (£)" },
  { name: "Germany", code: "DE", flag: "🇩🇪", currency: "EUR", currencyLabel: "EUR (€)" },
  { name: "France", code: "FR", flag: "🇫🇷", currency: "EUR", currencyLabel: "EUR (€)" },
  { name: "Spain", code: "ES", flag: "🇪🇸", currency: "EUR", currencyLabel: "EUR (€)" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", currency: "AED", currencyLabel: "AED (د.إ)" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", currency: "AED", currencyLabel: "AED (د.إ)" },
  { name: "Japan", code: "JP", flag: "🇯🇵", currency: "JPY", currencyLabel: "JPY (¥)" },
  { name: "Canada", code: "CA", flag: "🇨🇦", currency: "CAD", currencyLabel: "CAD ($)" },
  { name: "Australia", code: "AU", flag: "🇦🇺", currency: "AUD", currencyLabel: "AUD ($)" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", currency: "USD", currencyLabel: "USD ($)" },
  { name: "Italy", code: "IT", flag: "🇮🇹", currency: "EUR", currencyLabel: "EUR (€)" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", currency: "EUR", currencyLabel: "EUR (€)" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", currency: "EUR", currencyLabel: "EUR (€)" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", currency: "USD", currencyLabel: "USD ($)" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", currency: "USD", currencyLabel: "USD ($)" },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    heroPill: "Official Digital Store",
    heroTitle1: "Award-Winning",
    heroTitle2: "Portfolio Themes &",
    heroTitle3: "Digital Craft.",
    heroSubtitle: "Production-tested Next.js 16 + React 19 source code, luxury Shopify storefronts, and bespoke UI/UX systems. Every purchase includes an official commercial certificate and direct developer setup.",
    exploreCatalog: "Explore Catalog",
    quickAdd: "Quick Add Cyber Ronin",
    added: "Added to Cart!",
    liveShoppers: "shoppers live",
    ratedBy: "Rated 4.9/5 by 350+ developers",
    cart: "Cart",
    viewCart: "View Cart",
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty",
    browseStore: "Browse Digital Store",
    subtotal: "Subtotal",
    discount: "Discount",
    totalDue: "Total Due",
    proceedCheckout: "Order via WhatsApp 💬",
    instantDelivery: "Instant Delivery",
    officialCert: "Official Certificate",
    licenseeInfo: "Licensee Information",
    yourName: "Your Full Name (Printed on Certificate)",
    yourEmail: "Email Address (For Code Access)",
    whatsappNumber: "WhatsApp / Phone (Instant Link)",
    selectPayment: "Select Payment Method",
    completeOrder: "Complete Purchase & Claim Certificate",
    congrats: "Congratulations",
    certTitle: "Certificate of Commercial License",
    certSub: "Ownership & Deployment Rights",
    downloadCert: "Download Official Certificate (PNG / High-Res)",
    accessGithub: "Access GitHub Repository",
    connectWhatsapp: "Connect with Vikash on WhatsApp",
    currencyLabel: "Currency",
    languageLabel: "Language",
    addedToCartToast: "Item added to cart!",
  },
  hi: {
    heroPill: "ऑफिशियल डिजिटल स्टोर",
    heroTitle1: "अवार्ड-विनिंग",
    heroTitle2: "पोर्टफोलियो थीम्स और",
    heroTitle3: "डिजिटल क्राफ्ट।",
    heroSubtitle: "प्रोडक्शन-टेस्टेड Next.js 16 + React 19 सोर्स कोड, लक्ज़री Shopify स्टोरफ्रंट्स और प्रीमियम UI/UX डिज़ाइन्स। हर खरीद पर ऑफिशियल कमर्शियल सर्टिफिकेट और डायरेक्ट डेवलपर सपोर्ट मिलता है।",
    exploreCatalog: "कैटलॉग देखें",
    quickAdd: "तुरंत Cyber Ronin जोड़ें",
    added: "कार्ट में जुड़ गया!",
    liveShoppers: "लोग अभी देख रहे हैं",
    ratedBy: "350+ डेवलपर्स द्वारा 4.9/5 रेटेड",
    cart: "कार्ट",
    viewCart: "कार्ट देखें",
    yourCart: "आपकी कार्ट",
    cartEmpty: "आपकी कार्ट खाली है",
    browseStore: "थीम्स और डिज़ाइन्स देखें",
    subtotal: "सबटोटल",
    discount: "छूट",
    totalDue: "कुल देय राशि",
    proceedCheckout: "व्हाट्सएप पर ऑर्डर करें 💬",
    instantDelivery: "तुरंत डिलीवरी",
    officialCert: "ऑफिशियल सर्टिफिकेट",
    licenseeInfo: "लाइसेंस धारक की जानकारी",
    yourName: "आपका पूरा नाम (सर्टिफिकेट पर प्रिंट होगा)",
    yourEmail: "ईमेल आईडी (सोर्स कोड पाने के लिए)",
    whatsappNumber: "व्हाट्सएप / फोन नंबर",
    selectPayment: "भुगतान का तरीका चुनें",
    completeOrder: "खरीद पूरी करें और सर्टिफिकेट पाएं",
    congrats: "बधाई हो",
    certTitle: "कमर्शियल लाइसेंस सर्टिफिकेट",
    certSub: "पूर्ण स्वामित्व और उपयोग अधिकार",
    downloadCert: "ऑफिशियल सर्टिफिकेट डाउनलोड करें (PNG)",
    accessGithub: "गिटहब रिपॉजिटरी एक्सेस करें",
    connectWhatsapp: "व्हाट्सएप पर विकास से बात करें",
    currencyLabel: "मुद्रा",
    languageLabel: "भाषा",
    addedToCartToast: "कार्ट में जोड़ दिया गया!",
  },
  es: {
    heroPill: "Tienda Digital Oficial",
    heroTitle1: "Galardonado",
    heroTitle2: "Temas de Portafolio y",
    heroTitle3: "Artesanía Digital.",
    heroSubtitle: "Código fuente Next.js 16 + React 19 probado en producción, tiendas Shopify de lujo y sistemas UI/UX a medida con certificado comercial.",
    exploreCatalog: "Explorar Catálogo",
    quickAdd: "Añadir Cyber Ronin",
    added: "¡Añadido al Carrito!",
    liveShoppers: "compradores en vivo",
    ratedBy: "Calificado 4.9/5 por más de 350 desarrolladores",
    cart: "Carrito",
    viewCart: "Ver Carrito",
    yourCart: "Tu Carrito",
    cartEmpty: "Tu carrito está vacío",
    browseStore: "Explorar Tienda",
    subtotal: "Subtotal",
    discount: "Descuento",
    totalDue: "Total a Pagar",
    proceedCheckout: "Proceder al Pago",
    instantDelivery: "Entrega Instantánea",
    officialCert: "Certificado Oficial",
    licenseeInfo: "Información del Licenciatario",
    yourName: "Tu Nombre Completo (En el Certificado)",
    yourEmail: "Correo Electrónico",
    whatsappNumber: "WhatsApp / Teléfono",
    selectPayment: "Método de Pago",
    completeOrder: "Completar Compra y Obtener Certificado",
    congrats: "¡Felicitaciones",
    certTitle: "Certificado de Licencia Comercial",
    certSub: "Derechos de Propiedad y Despliegue",
    downloadCert: "Descargar Certificado Oficial (PNG)",
    accessGithub: "Acceder al Repositorio GitHub",
    connectWhatsapp: "Conectar por WhatsApp",
    currencyLabel: "Moneda",
    languageLabel: "Idioma",
    addedToCartToast: "¡Artículo añadido al carrito!",
  },
  de: {
    heroPill: "Offizieller Digitaler Store",
    heroTitle1: "Preisgekrönte",
    heroTitle2: "Portfolio-Themes &",
    heroTitle3: "Digitale Handwerkskunst.",
    heroSubtitle: "Produktionsgeprüfter Next.js 16 Quellcode, luxuriöse Shopify Storefronts und maßgeschneiderte UI/UX-Systeme inklusive offiziellem Zertifikat.",
    exploreCatalog: "Katalog Entdecken",
    quickAdd: "Cyber Ronin Hinzufügen",
    added: "Im Warenkorb!",
    liveShoppers: "Käufer live",
    ratedBy: "Mit 4.9/5 von 350+ Entwicklern bewertet",
    cart: "Warenkorb",
    viewCart: "Warenkorb Anzeigen",
    yourCart: "Ihr Warenkorb",
    cartEmpty: "Ihr Warenkorb ist leer",
    browseStore: "Katalog Durchsuchen",
    subtotal: "Zwischensumme",
    discount: "Rabatt",
    totalDue: "Gesamtbetrag",
    proceedCheckout: "Zur Kasse Gehen",
    instantDelivery: "Sofortige Lieferung",
    officialCert: "Offizielles Zertifikat",
    licenseeInfo: "Lizenznehmer-Informationen",
    yourName: "Vollständiger Name (für Zertifikat)",
    yourEmail: "E-Mail-Adresse",
    whatsappNumber: "WhatsApp / Telefon",
    selectPayment: "Zahlungsart Wählen",
    completeOrder: "Kauf Abschließen & Zertifikat Erhalten",
    congrats: "Herzlichen Glückwunsch",
    certTitle: "Kommerzielles Lizenzzertifikat",
    certSub: "Eigentums- und Verwendungsrechte",
    downloadCert: "Offizielles Zertifikat Herunterladen (PNG)",
    accessGithub: "GitHub Repository Öffnen",
    connectWhatsapp: "Mit Vikash auf WhatsApp Chatten",
    currencyLabel: "Währung",
    languageLabel: "Sprache",
    addedToCartToast: "Artikel zum Warenkorb hinzugefügt!",
  },
  fr: {
    heroPill: "Boutique Digitale Officielle",
    heroTitle1: "Thèmes Primés &",
    heroTitle2: "Créations Numériques de",
    heroTitle3: "Haute Précision.",
    heroSubtitle: "Code source Next.js 16 + React 19 testé en production, vitrines Shopify de luxe et designs UI/UX sur mesure avec licence commerciale.",
    exploreCatalog: "Explorer le Catalogue",
    quickAdd: "Ajouter Cyber Ronin",
    added: "Ajouté au Panier !",
    liveShoppers: "acheteurs en direct",
    ratedBy: "Noté 4.9/5 par plus de 350 développeurs",
    cart: "Panier",
    viewCart: "Voir le Panier",
    yourCart: "Votre Panier",
    cartEmpty: "Votre panier est vide",
    browseStore: "Parcourir la Boutique",
    subtotal: "Sous-total",
    discount: "Remise",
    totalDue: "Total Dû",
    proceedCheckout: "Passer à la Caisse",
    instantDelivery: "Livraison Instantanée",
    officialCert: "Certificat Officiel",
    licenseeInfo: "Informations du Titulaire",
    yourName: "Nom Complet (Inscrit sur le Certificat)",
    yourEmail: "Adresse E-mail",
    whatsappNumber: "WhatsApp / Téléphone",
    selectPayment: "Mode de Paiement",
    completeOrder: "Finaliser la Commande et Obtenir le Certificat",
    congrats: "Félicitations",
    certTitle: "Certificat de Licence Commerciale",
    certSub: "Droits de Propriété et de Déploiement",
    downloadCert: "Télécharger le Certificat Officiel (PNG)",
    accessGithub: "Accéder au Dépôt GitHub",
    connectWhatsapp: "Contacter sur WhatsApp",
    currencyLabel: "Devise",
    languageLabel: "Langue",
    addedToCartToast: "Article ajouté au panier !",
  },
  ja: {
    heroPill: "公式デジタルストア",
    heroTitle1: "受賞歴を誇る",
    heroTitle2: "ポートフォリオテーマ＆",
    heroTitle3: "デジタルクラフト。",
    heroSubtitle: "Next.js 16 + React 19ソースコード、Shopifyラグジュアリーストア、公式商用ライセンス付きUI/UXシステム。",
    exploreCatalog: "カタログを見る",
    quickAdd: "Cyber Roninを追加",
    added: "カートに追加しました！",
    liveShoppers: "人が現在閲覧中",
    ratedBy: "350人以上の開発者から4.9/5の評価",
    cart: "カート",
    viewCart: "カートを見る",
    yourCart: "ショッピングカート",
    cartEmpty: "カートは空です",
    browseStore: "ストアを見る",
    subtotal: "小計",
    discount: "割引",
    totalDue: "合計金額",
    proceedCheckout: "チェックアウトへ進む",
    instantDelivery: "即時納品",
    officialCert: "公式ライセンス証",
    licenseeInfo: "ライセンス保持者情報",
    yourName: "お名前（証明書に記載されます）",
    yourEmail: "メールアドレス",
    whatsappNumber: "電話番号 / WhatsApp",
    selectPayment: "お支払い方法の選択",
    completeOrder: "注文を確定して証明書を取得",
    congrats: "ご購入ありがとうございます",
    certTitle: "商用ライセンス認定証",
    certSub: "所有権およびデプロイメント権",
    downloadCert: "公式認定証をダウンロード (PNG)",
    accessGithub: "GitHubリポジトリへアクセス",
    connectWhatsapp: "WhatsAppで相談する",
    currencyLabel: "通貨",
    languageLabel: "言語",
    addedToCartToast: "カートに追加されました！",
  },
  ar: {
    heroPill: "المتجر الرقمي الرسمي",
    heroTitle1: "تصاميم حائزة على جوائز",
    heroTitle2: "ثيمات بورتفوليو و",
    heroTitle3: "حرفية رقمية فاخرة.",
    heroSubtitle: "كود برمجي مبني بأحدث تقنيات Next.js 16 و React 19، متاجر شوبيفاي فاخرة وتصاميم UI/UX مخصصة مع شهادة ترخيص تجاري رسمية.",
    exploreCatalog: "استكشف الكتالوج",
    quickAdd: "إضافة سريعة لـ Cyber Ronin",
    added: "تمت الإضافة للسلة!",
    liveShoppers: "يتسوقون الآن",
    ratedBy: "تقييم 4.9/5 من أكثر من 350 مطوراً",
    cart: "السلة",
    viewCart: "عرض السلة",
    yourCart: "سلة التسوق",
    cartEmpty: "السلة فارغة حالياً",
    browseStore: "تصفح المنتجات",
    subtotal: "المجموع الفرعي",
    discount: "الخصم",
    totalDue: "المبلغ الإجمالي",
    proceedCheckout: "المتابعة لإتمام الطلب",
    instantDelivery: "تسليم فوري",
    officialCert: "شهادة رسمية",
    licenseeInfo: "بيانات صاحب الترخيص",
    yourName: "الاسم الكامل (يُطبع على الشهادة)",
    yourEmail: "البريد الإلكتروني",
    whatsappNumber: "رقم الواتساب / الهاتف",
    selectPayment: "اختر طريقة الدفع",
    completeOrder: "إتمام الشراء واستلام الشهادة",
    congrats: "تهانينا",
    certTitle: "شهادة ترخيص تجاري رسمي",
    certSub: "حقوق الملكية والاستخدام الكامل",
    downloadCert: "تحميل الشهادة الرسمية (PNG)",
    accessGithub: "الدخول لمستودع GitHub",
    connectWhatsapp: "تواصل مع فيكاش عبر واتساب",
    currencyLabel: "العملة",
    languageLabel: "اللغة",
    addedToCartToast: "تمت إضافة المنتج إلى السلة!",
  },
};

export type CartItem = {
  item: StoreItem;
  quantity: number;
};

export type PurchaseReceipt = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  licenseKey: string;
  purchaseDate: string;
  items: StoreItem[];
  totalAmount: string;
  currency: CurrencyCode;
  paymentMethod: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: StoreItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  t: (key: string) => string;
  discountCode: string;
  discountPercent: number;
  applyDiscount: (code: string) => { success: boolean; error?: string };
  removeDiscount: () => void;
  latestReceipt: PurchaseReceipt | null;
  setLatestReceipt: (receipt: PurchaseReceipt | null) => void;
  totalCount: number;
  rawSubtotalUsd: number;
  finalPriceInCurrency: number;
  formattedSubtotal: string;
  formattedTotal: string;
  formatPrice: (usdPriceStr: string, itemInr?: string) => string;
  formatAmount: (amountUsd: number) => string;
  lastAddedItem: StoreItem | null;
  toast: { message: string; item: StoreItem } | null;
  dismissToast: () => void;
  selectedCountry: CountryInfo | null;
  selectCountry: (country: CountryInfo) => void;
  isCountryModalOpen: boolean;
  setIsCountryModalOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [latestReceipt, setLatestReceipt] = useState<PurchaseReceipt | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<StoreItem | null>(null);
  const [toast, setToast] = useState<{ message: string; item: StoreItem } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vikash_portfolio_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setItems(parsed);
      }
      const savedCurr = localStorage.getItem("vikash_portfolio_currency");
      if (savedCurr && ALL_CURRENCIES.some((c) => c.code === savedCurr)) {
        setCurrency(savedCurr as CurrencyCode);
      }
      // Clean any previously saved language preference so English stays default
      try {
        localStorage.removeItem("vikash_portfolio_lang");
      } catch {}

      // Check if user has selected a country or if this is first visit
      const hasSelected = localStorage.getItem("vikash_portfolio_country_selected");
      const savedCode = localStorage.getItem("vikash_portfolio_country_code");
      if (savedCode) {
        const found = ALL_COUNTRIES.find((c) => c.code === savedCode);
        if (found) setSelectedCountry(found);
      }
      if (!hasSelected) {
        const timer = setTimeout(() => {
          setIsCountryModalOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const selectCountry = (country: CountryInfo) => {
    setSelectedCountry(country);
    setCurrency(country.currency);
    setIsCountryModalOpen(false);
    try {
      localStorage.setItem("vikash_portfolio_country_code", country.code);
      localStorage.setItem("vikash_portfolio_country_selected", "true");
    } catch {}
  };

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vikash_portfolio_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("vikash_portfolio_currency", currency);
    } catch {}
  }, [currency]);

  // Clean English copy helper
  const t = (key: string): string => {
    return TRANSLATIONS.en[key] || key;
  };

  // ADD TO CART: Does NOT auto-open cart, lets user stay on page!
  const addToCart = (item: StoreItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    setLastAddedItem(item);
    setToast({
      message: `${item.title} ${t("addedToCartToast")}`,
      item,
    });

    // Auto-dismiss toast after 3.5s
    setTimeout(() => {
      setToast((curr) => (curr?.item.id === item.id ? null : curr));
    }, 3500);
  };

  const dismissToast = () => setToast(null);

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode("");
    setDiscountPercent(0);
  };

  const parseNumber = (priceStr: string) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const activeCurrencyInfo = ALL_CURRENCIES.find((c) => c.code === currency) || ALL_CURRENCIES[0];

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const rawSubtotalUsd = items.reduce(
    (acc, curr) => acc + parseNumber(curr.item.priceUsd) * curr.quantity,
    0
  );

  const rawSubtotalInr = items.reduce(
    (acc, curr) => acc + parseNumber(curr.item.priceInr || "0") * curr.quantity,
    0
  );

  const MIN_OFFER_ORDER_INR = 5999;
  const MIN_OFFER_ORDER_USD = 72;

  const applyDiscount = (code: string): { success: boolean; error?: string } => {
    const clean = code.trim().toUpperCase();
    const currentSubtotalInr = rawSubtotalInr > 0 ? rawSubtotalInr : rawSubtotalUsd * 83;
    const isEligible =
      currency === "INR"
        ? currentSubtotalInr >= MIN_OFFER_ORDER_INR
        : rawSubtotalUsd >= MIN_OFFER_ORDER_USD;

    if (!isEligible) {
      return {
        success: false,
        error:
          currency === "INR"
            ? "Offers apply only on orders above ₹5,999. Add more items to unlock!"
            : "Offers apply only on orders above $72 (₹5,999). Add more items to unlock!",
      };
    }

    if (clean === "VIKASH10" || clean === "LAUNCH10" || clean === "DEV10") {
      setDiscountCode(clean);
      setDiscountPercent(10);
      return { success: true };
    }
    if (clean === "LAUNCH20" || clean === "SPECIAL20" || clean === "CREATOR20") {
      setDiscountCode(clean);
      setDiscountPercent(20);
      return { success: true };
    }
    if (clean === "COMMUNITY15") {
      setDiscountCode(clean);
      setDiscountPercent(15);
      return { success: true };
    }
    return { success: false, error: "Invalid promo code. Try LAUNCH20 or VIKASH10." };
  };

  const removeDiscount = () => {
    setDiscountCode("");
    setDiscountPercent(0);
  };

  // Auto-remove discount if cart value drops below threshold
  useEffect(() => {
    if (discountPercent > 0) {
      const currentSubtotalInr = rawSubtotalInr > 0 ? rawSubtotalInr : rawSubtotalUsd * 83;
      const isEligible =
        currency === "INR"
          ? currentSubtotalInr >= MIN_OFFER_ORDER_INR
          : rawSubtotalUsd >= MIN_OFFER_ORDER_USD;
      if (!isEligible) {
        setDiscountCode("");
        setDiscountPercent(0);
      }
    }
  }, [items, currency, rawSubtotalInr, rawSubtotalUsd, discountPercent]);

  const formatPrice = (usdPriceStr: string, itemInr?: string): string => {
    if (currency === "INR" && itemInr) return itemInr;
    if (currency === "INR" && (usdPriceStr === "$24" || usdPriceStr === "24")) return "₹1,999";
    if (currency === "INR" && (usdPriceStr === "$9" || usdPriceStr === "9")) return "₹699";
    if (currency === "INR" && (usdPriceStr === "$99" || usdPriceStr === "99")) return "₹99";
    const usdVal = parseNumber(usdPriceStr);
    const converted = Math.round(usdVal * activeCurrencyInfo.rate);
    if (currency === "USD") return `$${converted}`;
    if (currency === "INR") return `₹${converted.toLocaleString("en-IN")}`;
    if (currency === "EUR") return `€${converted}`;
    if (currency === "GBP") return `£${converted}`;
    if (currency === "AED") return `${converted} AED`;
    if (currency === "CAD") return `CA$${converted}`;
    if (currency === "AUD") return `AU$${converted}`;
    if (currency === "JPY") return `¥${converted.toLocaleString()}`;
    return `${activeCurrencyInfo.symbol}${converted}`;
  };

  const formatAmount = (amountUsd: number): string => {
    if (currency === "INR" && Math.round(amountUsd) === 24) return "₹1,999";
    if (currency === "INR" && Math.round(amountUsd) === 9) return "₹699";
    if (currency === "INR" && Math.round(amountUsd) === 99) return "₹99";
    const converted = Math.round(amountUsd * activeCurrencyInfo.rate);
    if (currency === "USD") return `$${converted}`;
    if (currency === "INR") return `₹${converted.toLocaleString("en-IN")}`;
    if (currency === "EUR") return `€${converted}`;
    if (currency === "GBP") return `£${converted}`;
    if (currency === "AED") return `${converted} AED`;
    if (currency === "CAD") return `CA$${converted}`;
    if (currency === "AUD") return `AU$${converted}`;
    if (currency === "JPY") return `¥${converted.toLocaleString()}`;
    return `${activeCurrencyInfo.symbol}${converted}`;
  };

  const discountedUsd = rawSubtotalUsd * (1 - discountPercent / 100);
  const finalPriceInCurrency =
    currency === "INR" && rawSubtotalInr > 0
      ? Math.round(rawSubtotalInr * (1 - discountPercent / 100))
      : Math.round(discountedUsd * activeCurrencyInfo.rate);

  const formattedSubtotal =
    currency === "INR" && rawSubtotalInr > 0
      ? `₹${rawSubtotalInr.toLocaleString("en-IN")}`
      : formatAmount(rawSubtotalUsd);

  const formattedTotal =
    currency === "INR" && rawSubtotalInr > 0
      ? `₹${finalPriceInCurrency.toLocaleString("en-IN")}`
      : formatAmount(discountedUsd);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        currency,
        setCurrency,
        language,
        setLanguage,
        t,
        discountCode,
        discountPercent,
        applyDiscount,
        removeDiscount,
        latestReceipt,
        setLatestReceipt,
        totalCount,
        rawSubtotalUsd,
        finalPriceInCurrency,
        formattedSubtotal,
        formattedTotal,
        formatPrice,
        formatAmount,
        lastAddedItem,
        toast,
        dismissToast,
        selectedCountry,
        selectCountry,
        isCountryModalOpen,
        setIsCountryModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

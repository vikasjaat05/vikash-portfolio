import { NextRequest, NextResponse } from "next/server";

// Comprehensive list of Hindi/Hinglish indicators
const HINDI_INDICATORS = [
  "kya", "hai", "kaha", "kaise", "kaun", "mujhe", "bana", "banwana", "banavana",
  "kitna", "chahiye", "paisa", "kharcha", "baat", "karo", "dikhao", "padhai",
  "batao", "suno", "namaste", "hoga", "karna", "hume", "mere", "accha", "achha",
  "apna", "shuru", "khol", "kholo", "jao", "bataiye", "bhai", "yaar", "ji", "top",
  "kar", "rahe", "sakta", "sakte", "unka", "inka", "bol", "naam", "mera", "meri"
];

// Common Indian / Western male and female name samples for gender detection
const FEMALE_NAMES = [
  "priya", "pooja", "sneha", "neha", "anjali", "sunita", "rekha", "kavita", "deepa",
  "divya", "swati", "riya", "simran", "shreya", "ananya", "sarah", "emma", "olivia",
  "sophia", "mia", "isabella", "charlotte", "amelia", "harper", "evelyn", "khushi",
  "muskan", "aaradhya", "tanya", "palak", "mansi", "radha", "meera", "sakshi", "payal"
];

function isHindiQuery(text: string): boolean {
  const lower = text.toLowerCase();
  if (/[\u0900-\u097F]/.test(text)) return true;
  const words = lower.split(/\s+/);
  return words.some((w) => HINDI_INDICATORS.includes(w));
}

function detectSalutation(rawNameText: string): { name: string; salutation: string } {
  // Extract name from sentences like "Mera naam Rahul hai", "My name is Priya", "I am Rahul", "Rahul"
  const clean = rawNameText
    .replace(/^(my name is|mera naam|i am|this is|naam hai|naam|hai|hu|hoon)\s+/i, "")
    .replace(/\s+(hai|hu|hoon|ji)$/i, "")
    .trim();

  const firstName = clean.split(/\s+/)[0] || clean;
  const lowerFirst = firstName.toLowerCase();

  const isFemale = FEMALE_NAMES.includes(lowerFirst) || lowerFirst.endsWith("a") || lowerFirst.endsWith("i") || lowerFirst.endsWith("ee");
  const salutation = isFemale ? `Ms. ${firstName}` : `Mr. ${firstName}`;

  return { name: firstName, salutation };
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationState = {} } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const query = message.toLowerCase().trim();
    const isHindi = isHindiQuery(query);

    let replyText = "";
    let suggestedActions: Array<{ label: string; url: string }> = [];
    let updatedState = { ...conversationState };

    // ----------------------------------------------------
    // STEP 1: USER TELLS THEIR NAME
    // "Mera naam Rahul hai", "I am Priya", "Rahul", "Pooja", "Vikash"
    // ----------------------------------------------------
    if (
      (query.includes("naam") || query.includes("name is") || query.includes("i am") || (!updatedState.userName && query.split(/\s+/).length <= 3 && !query.includes("project") && !query.includes("store") && !query.includes("shopify"))) &&
      !query.includes("vikash") &&
      !query.includes("charge") &&
      !query.includes("kya")
    ) {
      const { name, salutation } = detectSalutation(message);
      updatedState.userName = name;
      updatedState.salutation = salutation;

      replyText = `Bahut khushi hui aapse milkar, ${salutation}! Bataiye, aaj hum aapke liye kaisa website ya Shopify store plan karein?`;
      suggestedActions = [
        { label: "🛍️ Shopify E-commerce Store", url: "/services" },
        { label: "💼 View Vikash's Projects", url: "/work" },
        { label: "✉️ Contact Vikash Directly", url: "/contact" },
      ];
    }

    // ----------------------------------------------------
    // STEP 2: PROJECTS & WORK INQUIRY
    // "Vikash ke projects dikhao", "Show work", "Flaneur Global"
    // ----------------------------------------------------
    else if (
      query.includes("project") ||
      query.includes("work") ||
      query.includes("portfolio") ||
      query.includes("flaneur") ||
      query.includes("maison") ||
      query.includes("dikhao") ||
      query.includes("kaam")
    ) {
      const nameTag = updatedState.salutation ? `${updatedState.salutation}, ` : "";
      replyText = `${nameTag}Vikash Choudhary ke top projects me 'Flâneur Global' (luxury 3D jewelry Shopify store) aur 'Maison Nagi' (high-speed fashion brand) shamil hain. Maine screen par Selected Work ka button de diya hai, aap check kar sakte hain.`;
      suggestedActions = [
        { label: "💼 View Selected Work", url: "/work" },
        { label: "✉️ Contact Vikash Choudhary", url: "/contact" },
      ];
    }

    // ----------------------------------------------------
    // STEP 3: E-COMMERCE / SHOPIFY PRICING & SCOPE
    // "Shopify store banwana hai", "Kitna kharcha aayega", "E-commerce price"
    // ----------------------------------------------------
    else if (
      query.includes("ecommers") ||
      query.includes("ecommerce") ||
      query.includes("e-commerce") ||
      query.includes("shopify") ||
      query.includes("banwana") ||
      query.includes("banavana") ||
      query.includes("store") ||
      query.includes("charge") ||
      query.includes("price") ||
      query.includes("cost") ||
      query.includes("kitna") ||
      query.includes("kharcha") ||
      query.includes("budget")
    ) {
      const nameTag = updatedState.salutation ? `${updatedState.salutation}, ` : "";
      replyText = `${nameTag}Vikash custom Shopify 2.0 stores aur high-converting web apps banate hain. Iska development budget features ke hisab se typically 25,000 se 1,50,000 rupees ($500 - $2,500) rehta hai. Aap kis category ka store plan kar rahe hain?`;
      suggestedActions = [
        { label: "✉️ Discuss Project with Vikash", url: "/contact" },
        { label: "💻 View Services & Features", url: "/services" },
      ];
    }

    // ----------------------------------------------------
    // STEP 4: CONTACT / PHONE / EMAIL / WHATSAPP
    // "Vikash se baat kaise kare", "Phone number", "Email", "Hire"
    // ----------------------------------------------------
    else if (
      query.includes("contact") ||
      query.includes("phone") ||
      query.includes("number") ||
      query.includes("email") ||
      query.includes("whatsapp") ||
      query.includes("hire") ||
      query.includes("call") ||
      query.includes("baat")
    ) {
      const nameTag = updatedState.salutation ? `${updatedState.salutation}, ` : "";
      replyText = `${nameTag}Aap Vikash se seedhe email vikkijaat800@gmail.com ya WhatsApp 8000165311 par connect kar sakte hain. Contact form ka button aapki screen par hai.`;
      suggestedActions = [
        { label: "✉️ Open Contact Form", url: "/contact" },
        { label: "💼 View Selected Work", url: "/work" },
      ];
    }

    // ----------------------------------------------------
    // STEP 5: WHO IS VIKASH / ABOUT HIM
    // "Vikash kaun hai", "Tell me about Vikash"
    // ----------------------------------------------------
    else if (
      query.includes("who is") ||
      query.includes("kaun") ||
      query.includes("about") ||
      query.includes("baare") ||
      query.includes("vikash")
    ) {
      const nameTag = updatedState.salutation ? `${updatedState.salutation}, ` : "";
      replyText = `${nameTag}Vikash Choudhary Alwar Rajasthan se Senior Web & Shopify Developer hain, jo global brands ke liye luxury e-commerce aur Next.js platforms banate hain.`;
      suggestedActions = [
        { label: "👤 Read Vikash's Story", url: "/about" },
        { label: "💼 View Selected Work", url: "/work" },
      ];
    }

    // ----------------------------------------------------
    // STEP 6: GREETING
    // "Hi", "Hello", "Hey", "Namaste"
    // ----------------------------------------------------
    else if (
      query.includes("hi") ||
      query.includes("hello") ||
      query.includes("hey") ||
      query.includes("namaste") ||
      query.includes("kaise ho")
    ) {
      replyText = "Namaste! Main Eva hoon, Vikash Choudhary ki AI consultant. Aapka shubh naam kya hai?";
      suggestedActions = [];
    }

    // ----------------------------------------------------
    // STEP 7: GENERAL TALK / CONSULTATION
    // ----------------------------------------------------
    else {
      const nameTag = updatedState.salutation ? `${updatedState.salutation}, ` : "";
      replyText = `${nameTag}Aapke is requirement ke liye Vikash ek custom aur high-speed solution design kar sakte hain. Bataiye isme aapko kya-kya features chahiye?`;
      suggestedActions = [
        { label: "✉️ Discuss with Vikash", url: "/contact" },
        { label: "💼 Explore Projects", url: "/work" },
      ];
    }

    return NextResponse.json({
      reply: replyText,
      suggestedActions,
      conversationState: updatedState,
      languageDetected: isHindi ? "HINGLISH" : "ENGLISH",
    });
  } catch (error) {
    console.error("EVA Chat API error:", error);
    return NextResponse.json(
      {
        reply: "Namaste! Main Eva hoon, Vikash Choudhary ki AI consultant. Aapka shubh naam kya hai?",
        suggestedActions: [],
        conversationState: {},
        languageDetected: "HINGLISH",
      },
      { status: 200 }
    );
  }
}

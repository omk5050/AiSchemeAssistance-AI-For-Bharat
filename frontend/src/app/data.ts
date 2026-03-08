import { Tractor, HeartPulse, GraduationCap, Briefcase, UserCheck } from "lucide-react";
import { Language } from "./i18n";

/* ================================
   API CONFIGURATION
================================ */

const API_BASE_URL = "https://w7le5stpkl.execute-api.ap-south-1.amazonaws.com";

/* ================================
   TYPES
================================ */

export type Occupation =
  | "Student"
  | "Farmer"
  | "Unemployed"
  | "Salaried"
  | "Retired";

export type Category = "General" | "OBC" | "SC" | "ST";

export interface UserProfile {
  age: number;
  income: number;
  occupation: Occupation;
  category: Category;
}

export interface Scheme {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  whoItIsFor: Record<Language, string>;
  keyBenefits: Record<Language, string[]>;
  officialUrl: string;
  icon: React.ElementType;
}

/* ================================
   SCHEME METADATA (UI ONLY)
================================ */

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: {
      EN: "PM-KISAN",
      HI: "पीएम-किसान",
      MR: "पीएम-किसान",
    },
    description: {
      EN: "Pradhan Mantri Kisan Samman Nidhi provides income support to farmers.",
      HI: "प्रधानमंत्री किसान सम्मान निधि किसानों को आय सहायता प्रदान करती है।",
      MR: "प्रधानमंत्री किसान सन्मान निधी शेतकऱ्यांना आर्थिक मदत करते.",
    },
    whoItIsFor: {
      EN: "Farmers needing financial support for agriculture.",
      HI: "कृषि इनपुट के लिए सहायता चाहने वाले किसान।",
      MR: "शेतीसाठी आर्थिक मदत हवी असलेले शेतकरी.",
    },
    keyBenefits: {
      EN: [
        "₹6,000 yearly income support",
        "Direct bank transfer",
      ],
      HI: [
        "₹6,000 वार्षिक सहायता",
        "सीधा बैंक हस्तांतरण",
      ],
      MR: [
        "₹6,000 वार्षिक मदत",
        "थेट बँक खात्यात पैसे",
      ],
    },
    officialUrl: "https://pmkisan.gov.in/",
    icon: Tractor,
  },

  {
    id: "mjpjay",
    name: {
      EN: "Mahatma Jyotirao Phule Jan Arogya Yojana",
      HI: "महात्मा ज्योतिराव फुले जन आरोग्य योजना",
      MR: "महात्मा ज्योतिराव फुले जन आरोग्य योजना",
    },
    description: {
      EN: "Health insurance scheme for economically weaker families.",
      HI: "आर्थिक रूप से कमजोर परिवारों के लिए स्वास्थ्य बीमा योजना।",
      MR: "आर्थिकदृष्ट्या दुर्बल कुटुंबांसाठी आरोग्य विमा योजना.",
    },
    whoItIsFor: {
      EN: "Low income families needing healthcare coverage.",
      HI: "कम आय वाले परिवार जिन्हें स्वास्थ्य सहायता चाहिए।",
      MR: "कमी उत्पन्न असलेले कुटुंब.",
    },
    keyBenefits: {
      EN: [
        "Coverage up to ₹5,00,000",
        "Cashless hospital treatment",
      ],
      HI: [
        "₹5,00,000 तक स्वास्थ्य कवर",
        "कैशलेस इलाज",
      ],
      MR: [
        "₹5,00,000 पर्यंत कव्हरेज",
        "कॅशलेस उपचार",
      ],
    },
    officialUrl: "https://www.jeevandayee.gov.in/",
    icon: HeartPulse,
  },

  {
    id: "mykpy",
    name: {
      EN: "Mukhyamantri Yuva Karya Prashikshan Yojana",
      HI: "मुख्यमंत्री युवा कार्य प्रशिक्षण योजना",
      MR: "मुख्यमंत्री युवा कार्य प्रशिक्षण योजना",
    },
    description: {
      EN: "Skill training program for unemployed youth.",
      HI: "बेरोजगार युवाओं के लिए कौशल प्रशिक्षण कार्यक्रम।",
      MR: "बेरोजगार तरुणांसाठी कौशल्य प्रशिक्षण योजना.",
    },
    whoItIsFor: {
      EN: "Youth seeking employment skills.",
      HI: "रोजगार कौशल चाहने वाले युवा।",
      MR: "रोजगारासाठी कौशल्य शिकू इच्छिणारे तरुण.",
    },
    keyBenefits: {
      EN: [
        "Free skill training",
        "Monthly stipend",
      ],
      HI: [
        "मुफ्त कौशल प्रशिक्षण",
        "मासिक वजीफा",
      ],
      MR: [
        "मोफत प्रशिक्षण",
        "मासिक स्टायपेंड",
      ],
    },
    officialUrl: "https://www.cmykpy.mahaswayam.gov.in/",
    icon: Briefcase,
  },

  {
    id: "shravan-bal",
    name: {
      EN: "Shravan Bal Seva Rajya Nivrutti Vetan Yojana",
      HI: "श्रवण बाल सेवा राज्य निवृत्ति वेतन योजना",
      MR: "श्रावणबाळ सेवा राज्य निवृत्ती वेतन योजना",
    },
    description: {
      EN: "State pension scheme for senior citizens of Maharashtra.",
      HI: "महाराष्ट्र के वरिष्ठ नागरिकों के लिए राज्य पेंशन योजना।",
      MR: "महाराष्ट्रातील ज्येष्ठ नागरिकांसाठी राज्य पेन्शन योजना.",
    },
    whoItIsFor: {
      EN: "Senior citizens aged 65+ needing financial assistance.",
      HI: "65+ आयु वर्ग के वरिष्ठ नागरिक जिन्हें आर्थिक सहायता चाहिए।",
      MR: "६५ वर्षांवरील आर्थिक मदत हवी असलेले ज्येष्ठ नागरिक.",
    },
    keyBenefits: {
      EN: [
        "Monthly pension support",
        "Direct bank transfer",
      ],
      HI: [
        "मासिक पेंशन सहायता",
        "सीधा बैंक हस्तांतरण",
      ],
      MR: [
        "मासिक पेन्शन",
        "थेट बँक खात्यात पैसे",
      ],
    },
    officialUrl: "https://sjsa.maharashtra.gov.in/",
    icon: UserCheck,
  },

  {
    id: "ebc-scholarship",
    name: {
      EN: "Economically Backward Class Scholarship",
      HI: "आर्थिक रूप से पिछड़ा वर्ग (ईबीसी) छात्रवृत्ति",
      MR: "आर्थिकदृष्ट्या मागास वर्ग (ईबीसी) शिष्यवृत्ती",
    },
    description: {
      EN: "Scholarship support for economically backward students.",
      HI: "आर्थिक रूप से कमजोर छात्रों के लिए छात्रवृत्ति सहायता।",
      MR: "आर्थिकदृष्ट्या दुर्बल विद्यार्थ्यांसाठी शिष्यवृत्ती.",
    },
    whoItIsFor: {
      EN: "Low-income students pursuing higher education.",
      HI: "उच्च शिक्षा प्राप्त करने वाले कम आय वर्ग के छात्र।",
      MR: "उच्च शिक्षण घेणारे कमी उत्पन्न असलेले विद्यार्थी.",
    },
    keyBenefits: {
      EN: [
        "Tuition fee coverage",
        "Educational support",
      ],
      HI: [
        "ट्यूशन फीस सहायता",
        "शैक्षणिक सहायता",
      ],
      MR: [
        "शिक्षण शुल्क मदत",
        "शैक्षणिक पाठबळ",
      ],
    },
    officialUrl: "https://mahadbt.maharashtra.gov.in/",
    icon: GraduationCap,
  },
];

/* ================================
   API CALL
================================ */

export async function checkEligibility(profile: UserProfile) {
  const response = await fetch(`${API_BASE_URL}/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      age: profile.age,
      income: profile.income,
      occupation: profile.occupation,
      category: profile.category,
      state: "maharashtra",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to check eligibility");
  }

  return await response.json();
}
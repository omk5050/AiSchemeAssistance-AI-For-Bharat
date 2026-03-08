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
    id: "scss",
    name: {
      EN: "Senior Citizen Savings Scheme",
      HI: "वरिष्ठ नागरिक बचत योजना",
      MR: "वरिष्ठ नागरिक बचत योजना",
    },
    description: {
      EN: "Government savings scheme for senior citizens.",
      HI: "वरिष्ठ नागरिकों के लिए सरकारी बचत योजना।",
      MR: "ज्येष्ठ नागरिकांसाठी बचत योजना.",
    },
    whoItIsFor: {
      EN: "Citizens aged 60+ seeking stable returns.",
      HI: "60+ आयु वर्ग के नागरिक।",
      MR: "६० वर्षांवरील नागरिक.",
    },
    keyBenefits: {
      EN: [
        "High interest rates",
        "Safe government investment",
      ],
      HI: [
        "उच्च ब्याज दरें",
        "सुरक्षित निवेश",
      ],
      MR: [
        "जास्त व्याजदर",
        "सुरक्षित गुंतवणूक",
      ],
    },
    officialUrl: "https://www.indiapost.gov.in/",
    icon: UserCheck,
  },

  {
    id: "pms",
    name: {
      EN: "Post Matric Scholarship",
      HI: "पोस्ट मैट्रिक छात्रवृत्ति",
      MR: "पोस्ट मॅट्रिक शिष्यवृत्ती",
    },
    description: {
      EN: "Scholarship support for students from reserved categories.",
      HI: "आरक्षित श्रेणी के छात्रों के लिए छात्रवृत्ति।",
      MR: "आरक्षित प्रवर्गातील विद्यार्थ्यांसाठी शिष्यवृत्ती.",
    },
    whoItIsFor: {
      EN: "SC/ST/OBC students pursuing higher education.",
      HI: "SC/ST/OBC छात्र।",
      MR: "SC/ST/OBC विद्यार्थी.",
    },
    keyBenefits: {
      EN: [
        "Tuition fee coverage",
        "Maintenance allowance",
      ],
      HI: [
        "ट्यूशन फीस सहायता",
        "भत्ता",
      ],
      MR: [
        "शुल्क मदत",
        "देखभाल भत्ता",
      ],
    },
    officialUrl: "https://scholarships.gov.in/",
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
import { Tractor, HeartPulse, GraduationCap, Briefcase, UserCheck } from "lucide-react"
import { Language } from "./i18n";

export type Occupation = "Student" | "Farmer" | "Unemployed" | "Salaried" | "Retired";
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
  checkEligibility: (profile: UserProfile) => { isEligible: boolean; reason: Record<Language, string> };
}

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: {
      EN: "PM-KISAN",
      HI: "पीएम-किसान",
      MR: "पीएम-किसान"
    },
    description: {
      EN: "Pradhan Mantri Kisan Samman Nidhi provides income support to all landholding farmers' families in the country.",
      HI: "प्रधानमंत्री किसान सम्मान निधि देश के सभी भूमिधारक किसानों के परिवारों को आय सहायता प्रदान करती है।",
      MR: "प्रधानमंत्री किसान सन्मान निधी देशातील सर्व जमीनधारक शेतकऱ्यांच्या कुटुंबांना उत्पन्न समर्थन प्रदान करते."
    },
    whoItIsFor: {
      EN: "Farmers needing financial support for agricultural inputs.",
      HI: "कृषि इनपुट के लिए वित्तीय सहायता की आवश्यकता वाले किसान।",
      MR: "कृषी निविष्ठांसाठी आर्थिक आधाराची गरज असलेले शेतकरी."
    },
    keyBenefits: {
      EN: [
        "₹6,000 per year transferred directly to bank accounts.",
        "Financial stability for farming needs."
      ],
      HI: [
        "प्रति वर्ष ₹6,000 सीधे बैंक खातों में हस्तांतरित किए जाते हैं।",
        "खेती की जरूरतों के लिए वित्तीय स्थिरता।"
      ],
      MR: [
        "प्रति वर्ष ₹6,000 थेट बँक खात्यात हस्तांतरित केले जातात.",
        "शेतीच्या गरजांसाठी आर्थिक स्थिरता."
      ]
    },
    officialUrl: "https://pmkisan.gov.in/",
    icon: Tractor,
    checkEligibility: (p) => {
      if (p.occupation === "Farmer") {
        return {
          isEligible: true,
          reason: {
            EN: "You are a farmer, which satisfies the primary occupational requirement.",
            HI: "आप एक किसान हैं, जो प्राथमिक व्यावसायिक आवश्यकता को पूरा करता है।",
            MR: "तुम्ही एक शेतकरी आहात, जे प्राथमिक व्यावसायिक आवश्यकता पूर्ण करते."
          }
        };
      }
      return {
        isEligible: false,
        reason: {
          EN: "This scheme is exclusively for individuals whose occupation is listed as Farmer.",
          HI: "यह योजना विशेष रूप से उन व्यक्तियों के लिए है जिनका पेशा किसान के रूप में सूचीबद्ध है।",
          MR: "ही योजना केवळ अशा व्यक्तींसाठी आहे ज्यांचा व्यवसाय शेतकरी म्हणून सूचीबद्ध आहे."
        }
      };
    }
  },
  {
    id: "mjpjay",
    name: {
      EN: "Mahatma Jyotirao Phule Jan Arogya Yojana",
      HI: "महात्मा ज्योतिराव फुले जन आरोग्य योजना",
      MR: "महात्मा ज्योतिराव फुले जन आरोग्य योजना"
    },
    description: {
      EN: "A flagship health insurance scheme providing end-to-end cashless services for identified diseases.",
      HI: "पहचाने गए रोगों के लिए एंड-टू-एंड कैशलेस सेवाएं प्रदान करने वाली एक प्रमुख स्वास्थ्य बीमा योजना।",
      MR: "ओळखल्या गेलेल्या आजारांसाठी एंड-टू-एंड कॅशलेस सेवा प्रदान करणारी एक प्रमुख आरोग्य विमा योजना."
    },
    whoItIsFor: {
      EN: "Economically weaker sections requiring major medical treatments.",
      HI: "आर्थिक रूप से कमजोर वर्ग जिन्हें प्रमुख चिकित्सा उपचार की आवश्यकता है।",
      MR: "आर्थिकदृष्ट्या दुर्बल घटक ज्यांना मोठ्या वैद्यकीय उपचारांची आवश्यकता आहे."
    },
    keyBenefits: {
      EN: [
        "Health coverage up to ₹5,000,000 per family per year.",
        "Access to empaneled government and private hospitals."
      ],
      HI: [
        "प्रति परिवार प्रति वर्ष ₹5,000,000 तक का स्वास्थ्य कवरेज।",
        "पंजीकृत सरकारी और निजी अस्पतालों तक पहुंच।"
      ],
      MR: [
        "प्रति कुटुंब प्रति वर्ष ₹5,000,000 पर्यंत आरोग्य कव्हरेज.",
        "नोंदणीकृत सरकारी आणि खाजगी रुग्णालयांमध्ये प्रवेश."
      ]
    },
    officialUrl: "https://www.jeevandayee.gov.in/",
    icon: HeartPulse,
    checkEligibility: (p) => {
      if (p.income <= 250000) {
        return {
          isEligible: true,
          reason: {
            EN: "Your annual income is below the ₹2.5L threshold, qualifying you for health coverage.",
            HI: "आपकी वार्षिक आय ₹2.5L की सीमा से नीचे है, जो आपको स्वास्थ्य कवरेज के लिए योग्य बनाती है।",
            MR: "तुमचे वार्षिक उत्पन्न ₹2.5L च्या मर्यादेखाली आहे, जे तुम्हाला आरोग्य कव्हरेजसाठी पात्र ठरवते."
          }
        };
      }
      return {
        isEligible: false,
        reason: {
          EN: "Your annual income exceeds the ₹2.5L limit required for this health scheme.",
          HI: "आपकी वार्षिक आय इस स्वास्थ्य योजना के लिए आवश्यक ₹2.5L की सीमा से अधिक है।",
          MR: "तुमचे वार्षिक उत्पन्न या आरोग्य योजनेसाठी आवश्यक असलेल्या ₹2.5L मर्यादेपेक्षा जास्त आहे."
        }
      };
    }
  },
  {
    id: "mykpy",
    name: {
      EN: "Mukhyamantri Yuva Karya Prashikshan Yojana",
      HI: "मुख्यमंत्री युवा कार्य प्रशिक्षण योजना",
      MR: "मुख्यमंत्री युवा कार्य प्रशिक्षण योजना"
    },
    description: {
      EN: "An initiative to provide skill training and employment opportunities to the unemployed youth.",
      HI: "बेरोजगार युवाओं को कौशल प्रशिक्षण और रोजगार के अवसर प्रदान करने की एक पहल।",
      MR: "बेरोजगार तरुणांना कौशल्य प्रशिक्षण आणि रोजगाराच्या संधी उपलब्ध करून देणारा उपक्रम."
    },
    whoItIsFor: {
      EN: "Unemployed youth seeking to develop skills for better employability.",
      HI: "बेहतर रोजगार क्षमता के लिए कौशल विकसित करने के इच्छुक बेरोजगार युवा।",
      MR: "चांगल्या रोजगारासाठी कौशल्ये विकसित करू पाहणारे बेरोजगार तरुण."
    },
    keyBenefits: {
      EN: [
        "Free skill development training.",
        "Monthly stipend during the training period."
      ],
      HI: [
        "मुफ्त कौशल विकास प्रशिक्षण।",
        "प्रशिक्षण अवधि के दौरान मासिक वजीफा।"
      ],
      MR: [
        "मोफत कौशल्य विकास प्रशिक्षण.",
        "प्रशिक्षण कालावधीत मासिक विद्यावेतन."
      ]
    },
    officialUrl: "https://www.cmykpy.mahaswayam.gov.in/",
    icon: Briefcase,
    checkEligibility: (p) => {
      if (p.occupation === "Unemployed" && p.age >= 18 && p.age <= 35) {
        return {
          isEligible: true,
          reason: {
            EN: "You are unemployed and fall within the eligible age group of 18-35.",
            HI: "आप बेरोजगार हैं और 18-35 के योग्य आयु वर्ग में आते हैं।",
            MR: "तुम्ही बेरोजगार आहात आणि १८-३५ या पात्र वयोगटात मोडता."
          }
        };
      }
      if (p.occupation !== "Unemployed") {
        return {
          isEligible: false,
          reason: {
            EN: "This scheme is specifically for unemployed individuals.",
            HI: "यह योजना विशेष रूप से बेरोजगार व्यक्तियों के लिए है।",
            MR: "ही योजना विशेषतः बेरोजगार व्यक्तींसाठी आहे."
          }
        };
      }
      return {
        isEligible: false,
        reason: {
          EN: "You do not fall within the target age range of 18-35 years.",
          HI: "आप 18-35 वर्ष की लक्षित आयु सीमा में नहीं आते हैं।",
          MR: "तुम्ही 18-35 वर्षांच्या लक्ष्यित वयोमर्यादेत मोडत नाही."
        }
      };
    }
  },
  {
    id: "scss",
    name: {
      EN: "Senior Citizen Savings Scheme",
      HI: "वरिष्ठ नागरिक बचत योजना",
      MR: "वरिष्ठ नागरिक बचत योजना"
    },
    description: {
      EN: "A government-backed savings instrument offered to Indian residents aged 60 years or above.",
      HI: "60 वर्ष या उससे अधिक आयु के भारतीय निवासियों को दिया जाने वाला एक सरकारी-समर्थित बचत साधन।",
      MR: "६० वर्षे किंवा त्याहून अधिक वयाच्या भारतीय रहिवाशांना देऊ केलेले सरकारी-समर्थित बचत साधन."
    },
    whoItIsFor: {
      EN: "Retired citizens looking for a safe investment with regular income.",
      HI: "सेवानिवृत्त नागरिक जो नियमित आय के साथ सुरक्षित निवेश की तलाश में हैं।",
      MR: "सेवानिवृत्त नागरिक जे नियमित उत्पन्नासह सुरक्षित गुंतवणुकीच्या शोधात आहेत."
    },
    keyBenefits: {
      EN: [
        "Higher interest rates compared to regular savings accounts.",
        "Tax benefits under Section 80C."
      ],
      HI: [
        "नियमित बचत खातों की तुलना में उच्च ब्याज दरें।",
        "धारा 80C के तहत कर लाभ।"
      ],
      MR: [
        "नियमित बचत खात्यांच्या तुलनेत जास्त व्याजदर.",
        "कलम 80C अंतर्गत कर लाभ."
      ]
    },
    officialUrl: "https://www.indiapost.gov.in/banking-services/savings",
    icon: UserCheck,
    checkEligibility: (p) => {
      if (p.age >= 60 || p.occupation === "Retired") {
        return {
          isEligible: true,
          reason: {
            EN: "Your age or retired status makes you eligible for senior citizen benefits.",
            HI: "आपकी उम्र या सेवानिवृत्त स्थिति आपको वरिष्ठ नागरिक लाभों के लिए योग्य बनाती है।",
            MR: "तुमचे वय किंवा सेवानिवृत्त स्थिती तुम्हाला ज्येष्ठ नागरिक लाभांसाठी पात्र ठरवते."
          }
        };
      }
      return {
        isEligible: false,
        reason: {
          EN: "You must be 60 years or older, or officially retired to qualify.",
          HI: "पात्र होने के लिए आपकी आयु 60 वर्ष या उससे अधिक होनी चाहिए, या आधिकारिक रूप से सेवानिवृत्त होना चाहिए।",
          MR: "पात्र होण्यासाठी तुमचे वय 60 वर्षे किंवा त्याहून अधिक असणे आवश्यक आहे किंवा अधिकृतपणे निवृत्त होणे आवश्यक आहे."
        }
      };
    }
  },
  {
    id: "pms",
    name: {
      EN: "Post Matric Scholarship",
      HI: "पोस्ट मैट्रिक छात्रवृत्ति",
      MR: "पोस्ट मॅट्रिक शिष्यवृत्ती"
    },
    description: {
      EN: "Financial assistance to students from underprivileged categories studying at post-matriculation or post-secondary stage.",
      HI: "पोस्ट-मैट्रिकुलेशन या पोस्ट-सेकेंडरी स्तर पर पढ़ने वाले वंचित श्रेणियों के छात्रों को वित्तीय सहायता।",
      MR: "पोस्ट-मॅट्रिक्युलेशन किंवा पोस्ट-सेकंडरी स्तरावर शिकणाऱ्या वंचित श्रेणीतील विद्यार्थ्यांना आर्थिक मदत."
    },
    whoItIsFor: {
      EN: "Students belonging to SC/ST or OBC categories pursuing higher education.",
      HI: "उच्च शिक्षा प्राप्त करने वाले SC/ST या OBC श्रेणियों के छात्र।",
      MR: "उच्च शिक्षण घेणारे SC/ST किंवा OBC प्रवर्गातील विद्यार्थी."
    },
    keyBenefits: {
      EN: [
        "Covers tuition fees and maintenance allowance.",
        "Direct bank transfer of scholarship amount."
      ],
      HI: [
        "ट्यूशन फीस और रखरखाव भत्ता शामिल है।",
        "छात्रवृत्ति राशि का सीधा बैंक हस्तांतरण।"
      ],
      MR: [
        "ट्यूशन फी आणि देखभाल भत्ता समाविष्ट आहे.",
        "शिष्यवृत्ती रकमेचे थेट बँक हस्तांतरण."
      ]
    },
    officialUrl: "https://scholarships.gov.in/",
    icon: GraduationCap,
    checkEligibility: (p) => {
      if (p.occupation === "Student" && (p.category === "SC" || p.category === "ST" || p.category === "OBC")) {
        return {
          isEligible: true,
          reason: {
            EN: "As a student from a recognized category (SC/ST/OBC), you qualify for educational support.",
            HI: "एक मान्यता प्राप्त श्रेणी (SC/ST/OBC) के छात्र के रूप में, आप शैक्षिक सहायता के लिए योग्य हैं।",
            MR: "मान्यताप्राप्त प्रवर्गातील (SC/ST/OBC) विद्यार्थी म्हणून, तुम्ही शैक्षणिक आधारासाठी पात्र आहात."
          }
        };
      }
      return {
        isEligible: false,
        reason: {
          EN: "This scholarship is reserved for active students belonging to SC, ST, or OBC categories.",
          HI: "यह छात्रवृत्ति SC, ST, या OBC श्रेणियों से संबंधित सक्रिय छात्रों के लिए आरक्षित है।",
          MR: "ही शिष्यवृत्ती SC, ST, किंवा OBC प्रवर्गातील सक्रिय विद्यार्थ्यांसाठी राखीव आहे."
        }
      };
    }
  }
];
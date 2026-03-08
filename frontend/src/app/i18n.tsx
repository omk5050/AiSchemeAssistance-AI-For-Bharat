import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "EN" | "HI" | "MR";

interface Translations {
  nav: {
    home: string;
    checker: string;
    explore: string;
    about: string;
    checkEligibility: string;
  };
  home: {
    title: string;
    subtitle: string;
    ruleEval: string;
    ruleEvalDesc: string;
    aiExpl: string;
    aiExplDesc: string;
    govDb: string;
    govDbDesc: string;
    metrics: {
      schemes: string;
      rules: string;
      ai: string;
    };
    aboutTitle: string;
    aboutDesc: string;
    workflowTitle: string;
    demoTitle: string;
    demoDesc: string;
    demoPlaceholder: string;
  };
  checker: {
    title: string;
    subtitle: string;
    applicantDetails: string;
    age: string;
    income: string;
    occupation: string;
    category: string;
    submit: string;
    awaiting: string;
    awaitingDesc: string;
    score: string;
    schemesEligible: string;
    aiSummaryTitle: string;
    aiSummaryDesc: (age: number, income: number, occ: string, cat: string, count: number) => string;
    results: string;
    tabAll: string;
    tabEligible: string;
    tabNotEligible: string;
    statusEligible: string;
    statusNotEligible: string;
    visitOfficial: string;
  };
  schemes: {
    back: string;
    title: string;
    subtitle: string;
    desc: string;
    target: string;
    benefits: string;
    missingTitle: string;
    missingDesc: string;
    missingBtn: string;
  };
  about: {
    title: string;
    subtitle: string;
    purposeTitle: string;
    purposeDesc: string;
    systemTitle: string;
    systemDesc: string;
    ruleEngine: string;
    ruleEngineDesc: string;
    aiLayer: string;
    aiLayerDesc: string;
    transparencyTitle: string;
    transparencyDesc: string;
    officialLinksTitle: string;
    officialLinksDesc: string;
  };
  footer: {
    tagline: string;
    platformTitle: string;
    legalTitle: string;
    transparency: string;
    aiDisclaimer: string;
    privacy: string;
    copyright: string;
    builtFor: string;
  };
  chatbot: {
    title: string;
    placeholder: string;
    send: string;
    minimize: string;
  };
  occupations: Record<string, string>;
  categories: Record<string, string>;
}

const en: Translations = {
  nav: {
    home: "Home",
    checker: "Eligibility Checker",
    explore: "Explore Schemes",
    about: "About",
    checkEligibility: "Check Eligibility"
  },
  home: {
    title: "YojnaSetu",
    subtitle: "Connecting Citizens to Government Welfare Schemes. Discover programs you qualify for instantly using transparent rule-based evaluation combined with AI explanations.",
    ruleEval: "Rule-Based Evaluation",
    ruleEvalDesc: "Strict adherence to official guidelines.",
    aiExpl: "AI Explanation",
    aiExplDesc: "Clear reasoning for every outcome.",
    govDb: "Government Database",
    govDbDesc: "Comprehensive coverage of schemes.",
    metrics: {
      schemes: "Government Schemes Supported",
      rules: "Transparent Eligibility Rules",
      ai: "AI + Rule Engine Explanation"
    },
    aboutTitle: "About the Platform",
    aboutDesc: "Empowering citizens to navigate complex government benefits with ease. Our system combines strict rule-based logic with readable AI-generated explanations.",
    workflowTitle: "System Workflow",
    demoTitle: "See it in action",
    demoDesc: "Watch how our transparent engine evaluates eligibility in real-time.",
    demoPlaceholder: "Live Eligibility Demo (Coming Soon)"
  },
  checker: {
    title: "Eligibility Checker",
    subtitle: "Enter your details accurately to determine which government welfare schemes you qualify for.",
    applicantDetails: "Applicant Details",
    age: "Age (Years)",
    income: "Annual Income (₹)",
    occupation: "Occupation",
    category: "Social Category",
    submit: "Check Eligibility",
    awaiting: "Awaiting Details",
    awaitingDesc: "Fill out the form and click \"Check Eligibility\" to see your personalized results here.",
    score: "Eligibility Score",
    schemesEligible: "schemes eligible",
    aiSummaryTitle: "AI Explanation Summary",
    aiSummaryDesc: (age, income, occ, cat, count) => `Based on your profile (Age: ${age}, Income: ₹${income.toLocaleString()}, ${occ}, ${cat}), you are primarily eligible for ${count > 0 ? "schemes targeting your income bracket and demographic." : "fewer standard schemes. Consider reviewing specific departmental guidelines or local state schemes."} The strict rule engine has filtered out schemes where occupational or age criteria are not met.`,
    results: "Detailed Results",
    tabAll: "All",
    tabEligible: "Eligible",
    tabNotEligible: "Not Eligible",
    statusEligible: "Eligible",
    statusNotEligible: "Not Eligible",
    visitOfficial: "Visit Official Website"
  },
  schemes: {
    back: "Back to Home",
    title: "Supported Government Schemes",
    subtitle: "Explore the complete database of welfare programs currently integrated into our AI eligibility engine.",
    desc: "Description",
    target: "Target Audience",
    benefits: "Key Benefits",
    missingTitle: "Don't see a specific scheme?",
    missingDesc: "We are continuously updating our database with new state and central government programs. Run an eligibility check to see what you qualify for right now.",
    missingBtn: "Start Eligibility Check"
  },
  about: {
    title: "About the Platform",
    subtitle: "Empowering citizens to navigate complex government benefits with ease.",
    purposeTitle: "Purpose",
    purposeDesc: "Our platform aims to simplify the process of identifying and accessing government welfare schemes by providing a user-friendly interface and transparent eligibility evaluation.",
    systemTitle: "System Overview",
    systemDesc: "The system combines a rule-based engine with AI-generated explanations to ensure clarity and transparency in the eligibility evaluation process.",
    ruleEngine: "Rule Engine",
    ruleEngineDesc: "The rule engine strictly adheres to official guidelines and filters out schemes based on predefined criteria.",
    aiLayer: "AI Layer",
    aiLayerDesc: "The AI layer provides clear and understandable explanations for each evaluation outcome, enhancing user comprehension.",
    transparencyTitle: "Transparency",
    transparencyDesc: "Our platform ensures transparency by providing detailed explanations and allowing users to review the criteria and rules applied.",
    officialLinksTitle: "Official Links",
    officialLinksDesc: "For more information, visit the official government websites and resources."
  },
  footer: {
    tagline: "Empowering Citizens with Government Benefits",
    platformTitle: "Platform",
    legalTitle: "Legal",
    transparency: "Transparency",
    aiDisclaimer: "AI-generated explanations are provided for clarity and should not be considered legal advice.",
    privacy: "Privacy Policy",
    copyright: "© 2023 Government Benefits Platform. All rights reserved.",
    builtFor: "Built for the Government Benefits Platform"
  },
  chatbot: {
    title: "Chatbot",
    placeholder: "Type your message here...",
    send: "Send",
    minimize: "Minimize"
  },
  occupations: {
    Student: "Student",
    Farmer: "Farmer",
    Unemployed: "Unemployed",
    Salaried: "Salaried",
    Retired: "Retired"
  },
  categories: {
    General: "General",
    OBC: "OBC",
    SC: "SC",
    ST: "ST"
  }
};

const hi: Translations = {
  nav: {
    home: "मुख्य पृष्ठ",
    checker: "पात्रता जांच",
    explore: "योजनाएं खोजें",
    about: "बारे में",
    checkEligibility: "पात्रता जांचें"
  },
  home: {
    title: "एआई योजना पात्रता सहायक",
    subtitle: "पारदर्शी नियम-आधारित मूल्यांकन का उपयोग करके तुरंत सरकारी कल्याण योजनाओं की खोज करें���",
    ruleEval: "नियम-आधारित मूल्यांकन",
    ruleEvalDesc: "आधिकारिक दिशानिर्देशों का सख्त पालन।",
    aiExpl: "एआई स्पष्टीकरण",
    aiExplDesc: "हर परिणाम के लिए स्पष्ट तर्क।",
    govDb: "सरकारी डेटाबेस",
    govDbDesc: "योजनाओं का व्यापक कवरेज।",
    metrics: {
      schemes: "समर्थित सरकारी योजनाएं",
      rules: "पारदर्शी पात्रता नियम",
      ai: "एआई + नियम इंजन स्पष्टीकरण"
    },
    aboutTitle: "मंच के बारे में",
    aboutDesc: "नागरिकों को जटिल सरकारी लाभों को आसानी से नेविगेट करने के लिए सशक्त बनाना। हमारा सिस्टम पठनीय एआई-जनित स्पष्टीकरण के साथ नियम-आधारित तर्क को जोड़ता है।",
    workflowTitle: "सिस्टम वर्कफ़्लो",
    demoTitle: "इसे काम करते हुए देखें",
    demoDesc: "देखें कि हमारा पारदर्शी इंजन वास्तविक समय में पात्रता का मूल्यांकन कैसे करता है।",
    demoPlaceholder: "लाइव पात्रता डेमो (जल्द आ रहा है)"
  },
  checker: {
    title: "पात्रता जांच",
    subtitle: "यह निर्धारित करने के लिए कि आप किन सरकारी कल्याण योजनाओं के योग्य हैं, अपना विवरण सटीक रूप से दर्ज करें।",
    applicantDetails: "आवेदक का विवरण",
    age: "आयु (वर्ष)",
    income: "वार्षिक आय (₹)",
    occupation: "पेशा",
    category: "सामाजिक वर्ग",
    submit: "पात्रता जांचें",
    awaiting: "विवरण की प्रतीक्षा",
    awaitingDesc: "फॉर्म भरें और अपने व्यक्तिगत परिणाम देखने के लिए \"पात्रता जांचें\" पर क्लिक करें।",
    score: "पात्रता स्कोर",
    schemesEligible: "योजनाओं के लिए योग्य",
    aiSummaryTitle: "एआई स्पष्टीकरण सारांश",
    aiSummaryDesc: (age, income, occ, cat, count) => `आपकी प्रोफ़ाइल (आयु: ${age}, आय: ₹${income.toLocaleString()}, ${occ}, ${cat}) के आधार पर, आप मुख्य रूप से ${count > 0 ? "आपकी आय वर्ग और जनसांख्यिकी को लक्षित करने वाली योजनाओं के लिए योग्य हैं।" : "कम मानक योजनाओं के लिए योग्य हैं।" }`,
    results: "विस्तृत परिणाम",
    tabAll: "सभी",
    tabEligible: "योग्य",
    tabNotEligible: "अयोग्य",
    statusEligible: "योग्य",
    statusNotEligible: "अयोग्य",
    visitOfficial: "आधिकारिक वेबसाइट पर जाएं"
  },
  schemes: {
    back: "मुख्य पृष्ठ पर वापस",
    title: "समर्थित सरकारी योजनाएं",
    subtitle: "हमारे एआई पात्रता इंजन में वर्तमान में एकीकृत कल्याण कार्यक्रमों के संपूर्ण डेटाबेस का अन्वेषण करें।",
    desc: "विवरण",
    target: "लक्षित दर्शक",
    benefits: "मुख्य लाभ",
    missingTitle: "कोई विशिष्ट योजना नहीं दिख रही?",
    missingDesc: "हम लगातार अपने डेटाबेस को नए राज्य और केंद्र सरकार के कार्यक्रमों के साथ अपडेट कर रहे हैं।",
    missingBtn: "पात्रता जांच शुरू करें"
  },
  about: {
    title: "मंच के बारे में",
    subtitle: "नागरिकों को जटिल सरकारी लाभों को आसानी से नेविगेट करने के लिए सशक्त बनाना।",
    purposeTitle: "उद्देश्य",
    purposeDesc: "हमारा मंच सरकारी कल्याण योजनाओं को पहचानने और उन्हें लाभान्वित होने के लिए सरलीकरण करने का उद्देश्य रखता है। हम उपयोगकर्ता-सुविधाजनक इंटरफेस और पारदर्शी पात्रता मूल्यांकन प्रदान करके इसे संभव बनाता है।",
    systemTitle: "सिस्टम अवलोकन",
    systemDesc: "सिस्टम नियम-आधारित इंजन और एआई-जनित स्पष्टीकरण को जोड़ता है जिससे अनुमान विकल्प की स्पष्टता और पारदर्शितता सुनिश्चित होती है।",
    ruleEngine: "नियम इंजन",
    ruleEngineDesc: "नियम इंजन आधिकारिक दिशानिर्देशों का सख्त पालन करता है और पूर्वनिर्धारित मानदंडों के आधार पर योजनाओं को फ़िल्टर करता है।",
    aiLayer: "एआई लेयर",
    aiLayerDesc: "एआई लेयर प्रत्येक मूल्यांकन परिणाम के लिए स्पष्ट और समझने में सहायक स्पष्टीकरण प्रदान करता है, जो उपयोगकर्ता की समझावना बढ़ावता है।",
    transparencyTitle: "पारदर्शितता",
    transparencyDesc: "हमारा मंच पारदर्शितता सुनिश्चित करता है जिसमें विस्तृत स्पष्टीकरण प्रदान किए जाते हैं और उपयोगकर्ताओं को लागू किए गए मानदंडों और नियमों की समीक्षा करने की अनुमति दी जाती है।",
    officialLinksTitle: "आधिकारिक लिंक्स",
    officialLinksDesc: "अधिक जानकारी के लिए आधिकारिक सरकारी वेबसाइटों और संसाधनों पर जाएं।"
  },
  footer: {
    tagline: "नागरिकों को सरकारी लाभों से शक्तिशाली बनाएं",
    platformTitle: "प्लॅटफॉर्म",
    legalTitle: "कानूनी",
    transparency: "पारदर्शितता",
    aiDisclaimer: "एआई-जनित स्पष्टीकरण स्पष्टता के लिए प्रदान किए जाते हैं और यह कानूनी सलाह नहीं माने जाएं।",
    privacy: "गोपनीयता नीति",
    copyright: "© 2023 सरकारी लाभ प��लॅटफॉर्म। सर्वाधिकार संरक्षित।",
    builtFor: "सरकारी लाभ प्लॅटफॉर्म के लिए बनाया गया"
  },
  chatbot: {
    title: "चैटबॉट",
    placeholder: "यहाँ अपना संदेश टाइप करें...",
    send: "भेजें",
    minimize: "कम करें"
  },
  occupations: {
    Student: "छात्र",
    Farmer: "किसान",
    Unemployed: "बेरोजगार",
    Salaried: "वेतनभोगी",
    Retired: "सेवानिवृत्त"
  },
  categories: {
    General: "सामान्य",
    OBC: "ओबीसी",
    SC: "एससी",
    ST: "एसटी"
  }
};

const mr: Translations = {
  nav: {
    home: "मुख्य पृष्ठ",
    checker: "पात्रता तपासणी",
    explore: "योजना शोधा",
    about: "बारे मध्ये",
    checkEligibility: "पात्रता तपासा"
  },
  home: {
    title: "एआय योजना पात्रता सहाय्यक",
    subtitle: "पारदर्शक नियम-आधारित मूल्यांकनाचा वापर करून तुम्ही पात्र असलेल्या सरकारी कल्याणकारी योज���ा त्वरित शोधा.",
    ruleEval: "नियम-आधारित मूल्यांकन",
    ruleEvalDesc: "अधिकृत मार्गदर्शक तत्त्वांचे काटेकोर पालन.",
    aiExpl: "एआय स्पष्टीकरण",
    aiExplDesc: "प्रत्येक परिणामासाठी स्पष्ट कारणे.",
    govDb: "सरकारी डेटाबेस",
    govDbDesc: "योजनांचे सर्वसमावेशक कव्हरेज.",
    metrics: {
      schemes: "समर्थित सरकारी योजना",
      rules: "पारदर्शक पात्रता नियम",
      ai: "एआय + नियम इंजिन स्पष्टीकरण"
    },
    aboutTitle: "प्लॅटफॉर्मबद्दल",
    aboutDesc: "नागरिकांना गुंतागुंतीचे सरकारी लाभ सहजपणे नेव्हिगेट करण्यासाठी सक्षम करणे. आमची प्रणाली वाचनीय एआय-व्युत्पन्न स्पष्टीकरणांसह कठोर नियम-आधारित तर्काची जोड देते.",
    workflowTitle: "सिस्टम वर्कफ्लो",
    demoTitle: "ते कृतीत पहा",
    demoDesc: "आमचे पारदर्शक इंजिन रिअल-टाइममध्ये पात्रतेचे मूल्यांकन कसे करते ते पहा.",
    demoPlaceholder: "थेट पात्रता डेमो (लवकरच येत आहे)"
  },
  checker: {
    title: "पात्रता तपासणी",
    subtitle: "तुम्ही कोणत्या सरकारी कल्याणकारी योजनांसाठी पात्र आहात हे निर्धारित करण्यासाठी तुमचे तपशील अचूकपणे प्रविष्ट करा.",
    applicantDetails: "अर्जदाराचे तपशील",
    age: "वय (वर्षे)",
    income: "वार्षिक उत्पन्न (₹)",
    occupation: "व्यवसाय",
    category: "सामाजिक प्रवर्ग",
    submit: "पात्रता तपासा",
    awaiting: "तपशीलाची प्रतीक्षा",
    awaitingDesc: "फॉर्म भरा आणि तुमचे वैयक्तिकृत परिणाम पाहण्यासाठी \"पात्रता तपासा\" वर क्लिक करा.",
    score: "पात्रता स्कोअर",
    schemesEligible: "योजनांसाठी पात्र",
    aiSummaryTitle: "एआय स्पष्टीकरण सारांश",
    aiSummaryDesc: (age, income, occ, cat, count) => `तुमच्या प्रोफाईल (वय: ${age}, उत्पन्न: ₹${income.toLocaleString()}, ${occ}, ${cat}) च्या आधारे, तुम्ही प्रामुख्याने ${count > 0 ? "तुमच्या उत्पन्न गटाला आणि लोकसंख्येला लक्ष्य करणाऱ्या योजनांसाठी पात्र आहात." : "कमी मानक योजनांसाठी पात्र आहात." }`,
    results: "सविस्तर निकाल",
    tabAll: "सर्व",
    tabEligible: "पात्र",
    tabNotEligible: "अपात्र",
    statusEligible: "पात्र",
    statusNotEligible: "अपात्र",
    visitOfficial: "आधिकारिक वेबसाइट पर जावा"
  },
  schemes: {
    back: "मुख्य पृष्ठावर परत",
    title: "समर्थित सरकारी योजना",
    subtitle: "आमच्या एआय पात्रता इंजिनमध्ये सध्या एकत्रित असलेल्या कल्याणकारी कार्यक्रमांचा संपूर्ण डेटाबेस एक्सप्लोर करा.",
    desc: "वर्णन",
    target: "लक्षित प्रेक्षक",
    benefits: "मुख्य फायदे",
    missingTitle: "विशिष्ट योजना दिसत नाही?",
    missingDesc: "आम्ही राज्य आणि केंद्र सरकारच्या नवीन कार्यक्रमांसह आमचा डेटाबेस सतत अपडेट करत आहोत.",
    missingBtn: "पात्रता तपासणी सुरू करा"
  },
  about: {
    title: "प्लॅटफॉर्मबद्दल",
    subtitle: "नागरिकांना गुंतागुंतीचे सरकारी लाभ सहजपणे नेव्हिगेट करण्यासाठी सक्षम करणे.",
    purposeTitle: "उद्देश्य",
    purposeDesc: "हमारा प्लॅटफॉर्म सरकारी कल्याणकारी योजनांची पहचान आणि त्यांना लाभान्वित होण्यासाठी सरलीकरण करण्याचा उद्देश्य रखतो. हम उपयोगकर्ता-सुविधाजनक इंटरफेस आणि पारदर्शक पात्रता मूल्यांकन प्रदान करून त्याची संभावना बनवतो.",
    systemTitle: "प्रणाली अवलोकन",
    systemDesc: "प्रणाली नियम-आधारित इंजिन आणि एआय-व्युत्पन्न स्पष्टीकरणांसह जोडून अनुमान विकल्पाची स्पष्टता आणि पारदर्शितता सुनिश्चित करतो.",
    ruleEngine: "नियम इंजिन",
    ruleEngineDesc: "नियम इंजिन अधिकृत मार्गदर्शक तत्त्वांचे काटेकोर पालन करतो आणि पूर्वनिर्धारित मानदंडांकडून योजनांची फ़िल्टर करतो.",
    aiLayer: "एआय लेयर",
    aiLayerDesc: "एआय लेयर प्रत्येक मूल्यांकन परिणामासाठी स्पष्ट आणि समझने मध्ये सहायक ��्पष्टीकरण प्रदान करतो, जो उपयोगकर्तांची समझावना बढवतो.",
    transparencyTitle: "पारदर्शितता",
    transparencyDesc: "हमारा प्लॅटफॉर्म पारदर्शितता सुनिश्चित करतो जिथे विस्तृत स्पष्टीकरण प्रदान किए जातात आणि उपयोगकर्तांना लागू किए गए मानदंडांची आणि नियमांची समीक्षा करण्याची अनुमती दी जाते.",
    officialLinksTitle: "आधिकारिक लिंक्स",
    officialLinksDesc: "अधिक जानकारीसाठी आधिकारिक सरकारी वेबसाइट्स आणि संसाधनांपर जावा."
  },
  footer: {
    tagline: "नागरिकांना सरकारी लाभांसाठी शक्तिशाली बनवणे",
    platformTitle: "प्लॅटफॉर्म",
    legalTitle: "कानूनी",
    transparency: "पारदर्शितता",
    aiDisclaimer: "एआय-व्युत्पन्न स्पष्टीकरण स्पष्टता करण्यासाठी प्रदान किए जातात आणि त्यांना कानूनी सलाह मानल्यात नाही.",
    privacy: "गोपनीयता नीति",
    copyright: "© 2023 सरकारी लाभ प्लॅटफॉर्म. सर्वाधिकार संरक्षित.",
    builtFor: "सरकारी लाभ प्लॅटफॉर्मसाठी बनवले"
  },
  chatbot: {
    title: "चॅटबॉट",
    placeholder: "यहां तुमचा संदेश टाइप करा...",
    send: "भेजा",
    minimize: "कम करा"
  },
  occupations: {
    Student: "विद्यार्थी",
    Farmer: "शेतकरी",
    Unemployed: "बेरोजगार",
    Salaried: "पगारदार",
    Retired: "निवृत्त"
  },
  categories: {
    General: "सामान्य",
    OBC: "ओबीसी",
    SC: "एससी",
    ST: "एसटी"
  }
};

const dictionaries: Record<Language, Translations> = {
  EN: en,
  HI: hi,
  MR: mr,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
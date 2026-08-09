export type YesNo = "Yes" | "No" | "Not sure";

export type SchemeRules = {
  occupation?: string[];
  income?: string[];
  category?: string[];
  land_status?: string[];
  bank_account?: string[];
  ration_card?: string[];
  states?: string[];
  age_min?: number;
  age_max?: number;
};

export type Scheme = {
  scheme_id: string;
  name: { en: string; hi: string; mr: string };
  description: string;
  benefits: string;
  documents: string[];
  explanation_template: string;
  rules: SchemeRules;
  availability: string;
  official_url: string;
  source_url: string;
  last_verified: string;
  active: boolean;
};

export const METADATA = {
  states: [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  occupations: [
    "Farmer",
    "Agricultural labourer",
    "Daily wage worker",
    "Street vendor",
    "Small business owner",
    "Homemaker",
    "Student",
    "Unemployed",
    "Salaried worker",
    "Retired / senior citizen",
  ],
  categories: ["General", "SC", "ST", "OBC", "Minority", "Not sure"],
  incomes: ["Below ₹1 lakh", "₹1–3 lakh", "₹3–5 lakh", "Above ₹5 lakh", "Not sure"],
  land_statuses: ["Own land", "Lease land", "No land", "Not sure"],
  yes_no: ["Yes", "No", "Not sure"] as YesNo[],
};

const LOW = ["Below ₹1 lakh", "₹1–3 lakh"];
const MID = ["Below ₹1 lakh", "₹1–3 lakh", "₹3–5 lakh"];

export const SCHEMES: Scheme[] = [
  {
    scheme_id: "pm-kisan",
    name: { en: "PM-KISAN", hi: "", mr: "" },
    description:
      "Income support of ₹6,000 a year, paid in three instalments, for eligible landholding farmer families.",
    benefits: "₹6,000 per year transferred directly to the bank account, in three instalments of ₹2,000.",
    documents: ["Aadhaar card", "Land record / khatauni", "Bank passbook", "Mobile number"],
    explanation_template:
      "You selected farming and land ownership, which are key PM-KISAN conditions.",
    rules: {
      occupation: ["Farmer"],
      land_status: ["Own land"],
      bank_account: ["Yes"],
      age_min: 18,
    },
    availability: "National",
    official_url: "https://pmkisan.gov.in/",
    source_url: "https://pmkisan.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "pmay-gramin",
    name: { en: "Pradhan Mantri Awaas Yojana – Gramin", hi: "", mr: "" },
    description:
      "Assistance for building a pucca house for rural households living in kaccha or unsafe housing.",
    benefits: "Grant assistance for house construction, with support for a toilet and wage days under NREGA.",
    documents: ["Aadhaar card", "Bank passbook", "Job card (if any)", "SECC / Awaas Plus reference"],
    explanation_template:
      "Low household income and rural work were reported, which are the main PMAY-G screening conditions.",
    rules: { income: LOW, occupation: ["Farmer", "Agricultural labourer", "Daily wage worker"], age_min: 18 },
    availability: "National",
    official_url: "https://pmayg.nic.in/",
    source_url: "https://pmayg.nic.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "pmay-urban",
    name: { en: "Pradhan Mantri Awaas Yojana – Urban", hi: "", mr: "" },
    description: "Housing support for urban households, including interest subsidy on home loans.",
    benefits: "Credit-linked interest subsidy or construction assistance for an eligible urban home.",
    documents: ["Aadhaar card", "Income proof", "Bank passbook", "Proof of urban residence"],
    explanation_template:
      "The reported income band falls within the range usually screened for PMAY-Urban support.",
    rules: {
      income: MID,
      occupation: ["Daily wage worker", "Street vendor", "Small business owner", "Salaried worker"],
      age_min: 18,
    },
    availability: "National",
    official_url: "https://pmay-urban.gov.in/",
    source_url: "https://pmay-urban.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "ujjwala",
    name: { en: "Pradhan Mantri Ujjwala Yojana", hi: "", mr: "" },
    description: "Free LPG connection for women from low-income households.",
    benefits: "Deposit-free LPG connection with support towards the first refill and stove.",
    documents: ["Aadhaar card", "Ration card", "Bank passbook", "Address proof"],
    explanation_template:
      "A low-income household with a ration card is the usual basis for an Ujjwala connection.",
    rules: { income: LOW, ration_card: ["Yes"], age_min: 18 },
    availability: "National",
    official_url: "https://www.pmuy.gov.in/",
    source_url: "https://www.pmuy.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "jan-dhan",
    name: { en: "Pradhan Mantri Jan-Dhan Yojana", hi: "", mr: "" },
    description: "Zero-balance bank account with accident cover and overdraft facility.",
    benefits: "No minimum balance account, RuPay debit card with accident insurance cover.",
    documents: ["Aadhaar card", "Any one address proof"],
    explanation_template:
      "No bank account was reported, and Jan-Dhan is the standard route to open a zero-balance account.",
    rules: { bank_account: ["No", "Not sure"], age_min: 10 },
    availability: "National",
    official_url: "https://pmjdy.gov.in/",
    source_url: "https://pmjdy.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "sukanya-samriddhi",
    name: { en: "Sukanya Samriddhi Yojana", hi: "", mr: "" },
    description: "Small savings account for a girl child under 10 years, with tax-free interest.",
    benefits: "Higher fixed interest with tax benefits, maturing for education or marriage expenses.",
    documents: ["Girl child birth certificate", "Guardian Aadhaar and PAN", "Address proof"],
    explanation_template:
      "The age reported is within the window for opening a Sukanya Samriddhi account for a girl child.",
    rules: { age_max: 10 },
    availability: "National",
    official_url: "https://www.nsiindia.gov.in/(S(0dxaeb45ohj25l45r0tzos55))/InternalPage.aspx?Id_Pk=89",
    source_url: "https://www.nsiindia.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "atal-pension",
    name: { en: "Atal Pension Yojana", hi: "", mr: "" },
    description: "Guaranteed monthly pension after 60 for workers in the unorganised sector.",
    benefits: "Pension of ₹1,000 to ₹5,000 per month from age 60, based on contribution.",
    documents: ["Aadhaar card", "Bank account details", "Nominee details"],
    explanation_template:
      "The reported age and bank account make an Atal Pension enrolment possible at a nearby bank.",
    rules: {
      age_min: 18,
      age_max: 40,
      bank_account: ["Yes"],
      occupation: ["Daily wage worker", "Street vendor", "Small business owner", "Homemaker", "Farmer"],
    },
    availability: "National",
    official_url: "https://www.npscra.nsdl.co.in/scheme-details.php",
    source_url: "https://www.india.gov.in/spotlight/atal-pension-yojana",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "pm-svanidhi",
    name: { en: "PM SVANidhi", hi: "", mr: "" },
    description: "Collateral-free working capital loan for street vendors.",
    benefits: "Working capital loans starting at ₹10,000, with interest subsidy on timely repayment.",
    documents: ["Vending certificate or ULB survey reference", "Aadhaar card", "Bank passbook"],
    explanation_template: "Street vending was reported, which is the core condition for PM SVANidhi.",
    rules: { occupation: ["Street vendor"], age_min: 18 },
    availability: "National",
    official_url: "https://pmsvanidhi.mohua.gov.in/",
    source_url: "https://pmsvanidhi.mohua.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "pm-kusum",
    name: { en: "PM-KUSUM", hi: "", mr: "" },
    description: "Subsidy for solar pumps and grid-connected solar plants on farm land.",
    benefits: "Central and state subsidy towards standalone solar pumps or solarisation of existing pumps.",
    documents: ["Land record", "Aadhaar card", "Bank passbook", "Electricity connection details"],
    explanation_template:
      "Farming with land access was reported, which PM-KUSUM applications are built around.",
    rules: { occupation: ["Farmer"], land_status: ["Own land", "Lease land"], age_min: 18 },
    availability: "National (implemented through state agencies)",
    official_url: "https://pmkusum.mnre.gov.in/",
    source_url: "https://mnre.gov.in/pm-kusum/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "stand-up-india",
    name: { en: "Stand-Up India", hi: "", mr: "" },
    description: "Bank loans from ₹10 lakh to ₹1 crore for SC, ST and women entrepreneurs.",
    benefits: "Composite term loan and working capital for a new enterprise, with handholding support.",
    documents: ["Aadhaar and PAN", "Caste certificate (if applicable)", "Business plan", "Bank details"],
    explanation_template:
      "The reported category and business activity match the Stand-Up India applicant profile.",
    rules: { category: ["SC", "ST"], occupation: ["Small business owner", "Unemployed"], age_min: 18 },
    availability: "National",
    official_url: "https://www.standupmitra.in/",
    source_url: "https://www.standupmitra.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "post-matric-scholarship",
    name: { en: "Post-Matric Scholarship", hi: "", mr: "" },
    description: "Scholarship for SC, ST, OBC and minority students studying after class 10.",
    benefits: "Maintenance allowance and reimbursement of non-refundable fees.",
    documents: ["Caste certificate", "Income certificate", "Marksheet", "Bank passbook", "Aadhaar card"],
    explanation_template:
      "Studying after class 10 with a reserved-category background is the basis for this scholarship.",
    rules: {
      occupation: ["Student"],
      category: ["SC", "ST", "OBC", "Minority"],
      income: MID,
      age_min: 15,
      age_max: 35,
    },
    availability: "National (applied through state portals / NSP)",
    official_url: "https://scholarships.gov.in/",
    source_url: "https://socialjustice.gov.in/schemes/25",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "nfbs",
    name: { en: "National Family Benefit Scheme", hi: "", mr: "" },
    description:
      "One-time assistance to a BPL household after the death of the primary earning member.",
    benefits: "Lump-sum assistance of ₹20,000 to the surviving head of the household.",
    documents: ["Death certificate", "BPL / ration card", "Bank passbook", "Aadhaar card"],
    explanation_template:
      "Low household income was reported, which is the screening condition for family benefit support.",
    rules: { income: LOW, ration_card: ["Yes"], age_min: 18 },
    availability: "National (National Social Assistance Programme)",
    official_url: "https://nsap.nic.in/",
    source_url: "https://nsap.nic.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "ignoaps",
    name: { en: "Indira Gandhi National Old Age Pension", hi: "", mr: "" },
    description: "Monthly pension for people aged 60 and above from BPL households.",
    benefits: "Monthly central pension, often topped up by the state government.",
    documents: ["Age proof", "BPL / ration card", "Bank passbook", "Aadhaar card"],
    explanation_template:
      "The reported age is at or above 60 with a low-income household, the core IGNOAPS conditions.",
    rules: { age_min: 60, income: LOW },
    availability: "National (National Social Assistance Programme)",
    official_url: "https://nsap.nic.in/",
    source_url: "https://nsap.nic.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "pmsby",
    name: { en: "Pradhan Mantri Suraksha Bima Yojana", hi: "", mr: "" },
    description: "Accident insurance cover of ₹2 lakh for a small yearly premium.",
    benefits: "₹2 lakh accidental death or full disability cover for ₹20 per year.",
    documents: ["Aadhaar card", "Bank account details", "Nominee details"],
    explanation_template:
      "An active bank account within the eligible age band is all this cover normally needs.",
    rules: { age_min: 18, age_max: 70, bank_account: ["Yes"] },
    availability: "National",
    official_url: "https://jansuraksha.gov.in/",
    source_url: "https://jansuraksha.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "pmjjby",
    name: { en: "Pradhan Mantri Jeevan Jyoti Bima Yojana", hi: "", mr: "" },
    description: "Life insurance cover of ₹2 lakh renewable every year.",
    benefits: "₹2 lakh life cover for ₹436 per year, debited from the bank account.",
    documents: ["Aadhaar card", "Bank account details", "Nominee details"],
    explanation_template:
      "The reported age and bank account fall inside the enrolment window for this life cover.",
    rules: { age_min: 18, age_max: 50, bank_account: ["Yes"] },
    availability: "National",
    official_url: "https://jansuraksha.gov.in/",
    source_url: "https://jansuraksha.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "mgnrega",
    name: { en: "Mahatma Gandhi NREGA", hi: "", mr: "" },
    description: "Guaranteed 100 days of wage employment a year for rural households.",
    benefits: "Wage work close to home, paid directly into the worker's bank account.",
    documents: ["Job card (or application for one)", "Aadhaar card", "Bank passbook", "Address proof"],
    explanation_template:
      "Rural manual work and a low-income household are the usual basis for a NREGA job card.",
    rules: {
      occupation: ["Daily wage worker", "Agricultural labourer", "Farmer", "Unemployed"],
      income: LOW,
      age_min: 18,
    },
    availability: "National (rural areas)",
    official_url: "https://nrega.nic.in/",
    source_url: "https://nrega.nic.in/",
    last_verified: "2026-06-01",
    active: true,
  },
  {
    scheme_id: "ayushman-bharat",
    name: { en: "Ayushman Bharat PM-JAY", hi: "", mr: "" },
    description: "Health cover of ₹5 lakh per family per year for secondary and tertiary care.",
    benefits: "Cashless hospital treatment up to ₹5 lakh a year at empanelled hospitals.",
    documents: ["Aadhaar card", "Ration card", "Mobile number"],
    explanation_template:
      "A low-income household with a ration card is the usual basis for a PM-JAY (Ayushman) card.",
    rules: { income: LOW, ration_card: ["Yes"] },
    availability: "National",
    official_url: "https://pmjay.gov.in/",
    source_url: "https://pmjay.gov.in/",
    last_verified: "2026-06-01",
    active: true,
  },
];

export const getScheme = (id: string) => SCHEMES.find((s) => s.scheme_id === id);

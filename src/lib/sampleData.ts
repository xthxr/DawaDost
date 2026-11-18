export interface SampleMedicineItem {
  id: string;
  name: string;
  subtitle: string;
  illnessSuggestion: string;
  imageDataUri: string;
}

export interface SampleIllnessItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  imageDataUri: string;
}

// Crisp, lightweight medical diagram SVGs encoded as data URIs
function createMedicineSvgDataUri(brand: string, salt: string, color: string, badge: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
      <linearGradient id="foil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="50%" stop-color="#f1f5f9"/>
        <stop offset="100%" stop-color="#cbd5e1"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#bg)"/>
    <!-- Blister Strip / Packaging outline -->
    <rect x="70" y="50" width="460" height="300" rx="20" fill="url(#foil)" stroke="#94a3b8" stroke-width="3" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.08))"/>
    <!-- Brand header bar -->
    <path d="M 70 70 Q 70 50 90 50 L 510 50 Q 530 50 530 70 L 530 110 L 70 110 Z" fill="${color}"/>
    <text x="90" y="90" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">${brand}</text>
    <rect x="430" y="65" width="85" height="30" rx="15" fill="#ffffff" fill-opacity="0.25"/>
    <text x="472" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${badge}</text>
    
    <!-- Salt and details -->
    <text x="90" y="145" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">${salt}</text>
    <text x="90" y="170" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Rx Only • Certified Pharmaceutical Packaging</text>

    <!-- Simulated tablet blister cavities -->
    <g fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2">
      <ellipse cx="150" cy="235" rx="45" ry="32"/>
      <ellipse cx="250" cy="235" rx="45" ry="32"/>
      <ellipse cx="350" cy="235" rx="45" ry="32"/>
      <ellipse cx="450" cy="235" rx="45" ry="32"/>
    </g>

    <line x1="85" y1="300" x2="515" y2="300" stroke="#cbd5e1" stroke-dasharray="8 6" stroke-width="2"/>
    <text x="90" y="325" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Batch: MED-2026-X9 • Mfg Date: 01/2026 • Exp Date: 12/2028</text>
    <text x="440" y="325" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0284c7">Verified Strip</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function createIllnessSvgDataUri(title: string, color: string, visualHint: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff1eb"/>
        <stop offset="100%" stop-color="#fde2d5"/>
      </linearGradient>
      <radialGradient id="rash" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="60%" stop-color="${color}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="400" fill="url(#skin)"/>
    <!-- Simulated skin region -->
    <circle cx="300" cy="200" r="110" fill="url(#rash)"/>
    <g fill="${color}" opacity="0.65">
      <circle cx="280" cy="180" r="14"/>
      <circle cx="320" cy="190" r="18"/>
      <circle cx="295" cy="225" r="16"/>
      <circle cx="340" cy="165" r="10"/>
      <circle cx="260" cy="210" r="12"/>
      <circle cx="310" cy="150" r="9"/>
    </g>
    <!-- Label overlay for educational preview -->
    <rect x="30" y="30" width="320" height="46" rx="8" fill="#ffffff" fill-opacity="0.9" stroke="#e2e8f0"/>
    <text x="45" y="58" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">${title}</text>
    <rect x="30" y="330" width="540" height="45" rx="8" fill="#0f172a" fill-opacity="0.85"/>
    <text x="45" y="358" font-family="Arial, sans-serif" font-size="13" fill="#ffffff">${visualHint}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export const SAMPLE_MEDICINES: SampleMedicineItem[] = [
  {
    id: "dolo-650",
    name: "Dolo 650 Strip",
    subtitle: "Paracetamol 650 mg",
    illnessSuggestion: "High fever and severe body ache",
    imageDataUri: createMedicineSvgDataUri("DOLO-650", "Paracetamol Tablets IP 650mg", "#0284c7", "Analgesic")
  },
  {
    id: "augmentin-625",
    name: "Augmentin 625 Duo",
    subtitle: "Amoxicillin & Potassium Clavulanate",
    illnessSuggestion: "Bacterial throat infection and bronchitis",
    imageDataUri: createMedicineSvgDataUri("AUGMENTIN 625", "Amoxicillin 500mg + Clavulanate 125mg", "#0d9488", "Antibiotic")
  },
  {
    id: "cetzine-10",
    name: "Cetzine 10mg",
    subtitle: "Cetirizine Hydrochloride Tablets",
    illnessSuggestion: "Allergic runny nose, sneezing and itchy skin hives",
    imageDataUri: createMedicineSvgDataUri("CETZINE 10", "Cetirizine Hydrochloride 10mg", "#0284c7", "Antihistamine")
  },
  {
    id: "omez-20",
    name: "Omez 20mg",
    subtitle: "Omeprazole Gastro-resistant Capsules",
    illnessSuggestion: "Severe acid reflux, heartburn and stomach acidity",
    imageDataUri: createMedicineSvgDataUri("OMEZ 20", "Omeprazole Capsules IP 20mg", "#0d9488", "Antacid / PPI")
  }
];

export const SAMPLE_ILLNESSES: SampleIllnessItem[] = [
  {
    id: "rash-allergic",
    title: "Allergic Skin Rash / Contact Dermatitis",
    duration: "2 days",
    description: "Red bumpy rash that started after using a new laundry soap. Mildly itchy with warm sensation.",
    imageDataUri: createIllnessSvgDataUri("Cutaneous Erythema (Rash)", "#ef4444", "Visual Observation: Scattered red macules with mild surface inflammation")
  },
  {
    id: "insect-bite",
    title: "Insect / Bug Bite Swelling",
    duration: "24 hours",
    description: "Noticed a raised red bite on arm after an outdoor evening walk. Itchy and slightly swollen.",
    imageDataUri: createIllnessSvgDataUri("Arthropod Bite Reaction", "#f97316", "Visual Observation: Localized central papule surrounded by erythematous halo")
  },
  {
    id: "minor-scrape",
    title: "Superficial Cut / Abrasion",
    duration: "1 day",
    description: "Minor scrape on forearm from gardening branch. Washed with clean water, slightly tender.",
    imageDataUri: createIllnessSvgDataUri("Superficial Epidermal Abrasion", "#dc2626", "Visual Observation: Shallow surface abrasion without deep tissue involvement")
  },
  {
    id: "eye-pinkness",
    title: "Mild Eye Redness & Irritation",
    duration: "3 days",
    description: "Slight pinkness in right eye with watery tearing and gritty sensation after dusty travel.",
    imageDataUri: createIllnessSvgDataUri("Conjunctival Hyperaemia", "#f43f5e", "Visual Observation: Diffuse superficial capillary redness on sclera")
  }
];

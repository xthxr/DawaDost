import { MedicineAnalysisResult } from "./types";

export interface VerifiedMedicineRecord {
  id: string;
  keywords: string[];
  brandName: string;
  genericName: string;
  activeIngredients: Array<{ name: string; strength: string }>;
  manufacturer?: string;
  therapeuticClass: string;
  primaryIndications: string[];
  description: string;
  commonSideEffects: string[];
  seriousSideEffects: string[];
  immediateMedicalAttentionRequired: string[];
  packagingInstructionsPattern?: string;
  precautionsAndWarnings: string[];
  whenToConsultDoctor: string[];
}

export const VERIFIED_MEDICINE_DATABASE: VerifiedMedicineRecord[] = [
  {
    id: "paracetamol",
    keywords: ["paracetamol", "acetaminophen", "crocin", "calpol", "dolo", "dolo 650", "dolo-650", "tylenol", "panadol", "pacimol", "pyigesic"],
    brandName: "Dolo 650 / Crocin / Calpol / Tylenol",
    genericName: "Paracetamol (Acetaminophen)",
    activeIngredients: [{ name: "Paracetamol", strength: "650 mg / 500 mg" }],
    manufacturer: "Micro Labs / GSK / Kenvue / Cipla",
    therapeuticClass: "Analgesic (Pain Reliever) and Antipyretic (Fever Reducer)",
    primaryIndications: [
      "Mild to moderate pain relief (headaches, toothaches, body aches)",
      "Reduction of elevated body temperature (fever)",
      "Sore throat and viral influenza malaise",
      "Osteoarthritis pain management"
    ],
    description: "Paracetamol acts primarily in the central nervous system to inhibit prostaglandin synthesis, elevating the pain threshold and regulating the hypothalamic heat-regulating center.",
    commonSideEffects: [
      "Mild nausea or stomach discomfort",
      "Mild headache",
      "Drowsiness (rare)"
    ],
    seriousSideEffects: [
      "Hepatotoxicity (severe liver damage) with overdose or alcohol use",
      "Severe skin reactions (Stevens-Johnson syndrome, toxic epidermal necrolysis)",
      "Anaphylaxis or severe angioedema"
    ],
    immediateMedicalAttentionRequired: [
      "Yellowing of skin or eyes (jaundice)",
      "Severe upper right abdominal tenderness",
      "Unexplained extreme fatigue, dark urine, or pale stools",
      "Swelling of the face, mouth, or throat"
    ],
    packagingInstructionsPattern: "Do not exceed 4,000 mg in 24 hours. Maintain at least 4-6 hours between doses. Avoid alcohol.",
    precautionsAndWarnings: [
      "Do not combine with other medications containing paracetamol/acetaminophen to prevent liver toxicity.",
      "Individuals with chronic liver disease, chronic alcoholism, or severe malnutrition must consult a doctor before use.",
      "Do not exceed the maximum prescribed daily limit."
    ],
    whenToConsultDoctor: [
      "Fever persists for more than 3 consecutive days.",
      "Pain worsens or lasts longer than 5 to 7 days.",
      "New symptoms such as severe abdominal tenderness or rash appear."
    ]
  },
  {
    id: "ibuprofen",
    keywords: ["ibuprofen", "advil", "motrin", "brufen", "nurofen", "ibugesic"],
    brandName: "Advil / Motrin / Brufen / Ibugesic",
    genericName: "Ibuprofen",
    activeIngredients: [{ name: "Ibuprofen", strength: "400 mg / 200 mg" }],
    manufacturer: "Abbott / Haleon / Johnson & Johnson / Cipla",
    therapeuticClass: "Non-Steroidal Anti-Inflammatory Drug (NSAID)",
    primaryIndications: [
      "Inflammatory pain relief (arthritis, joint sprains, sports injuries)",
      "Dental pain and post-extraction soreness",
      "Primary dysmenorrhea (menstrual cramps)",
      "Headaches, migraines, and inflammatory fever"
    ],
    description: "Ibuprofen works by non-selectively inhibiting cyclooxygenase enzymes (COX-1 and COX-2), reducing the synthesis of inflammatory prostaglandins.",
    commonSideEffects: [
      "Dyspepsia, heartburn, and mild stomach upset",
      "Nausea or mild abdominal cramps",
      "Dizziness or mild lightheadedness"
    ],
    seriousSideEffects: [
      "Gastrointestinal ulceration, bleeding, or perforation",
      "Increased risk of serious cardiovascular thrombotic events (myocardial infarction, stroke)",
      "Acute kidney injury (renal impairment), especially in dehydrated patients",
      "Fluid retention and hypertension exacerbation"
    ],
    immediateMedicalAttentionRequired: [
      "Black, tarry stools or vomiting blood / coffee-ground emesis",
      "Sudden shortness of breath, chest pain, or slurred speech",
      "Marked decrease in urination volume or swelling in legs/ankles"
    ],
    packagingInstructionsPattern: "Take with food or milk to reduce gastric irritation. Do not take with other NSAIDs.",
    precautionsAndWarnings: [
      "Avoid in patients with active peptic ulcer disease or severe cardiac/renal failure.",
      "Always take with meals or milk to protect stomach lining.",
      "Do not combine with other NSAIDs (such as naproxen or diclofenac)."
    ],
    whenToConsultDoctor: [
      "Stomach pain, black stool, or persistent heartburn occurs.",
      "Pain persists for more than 10 days or fever for more than 3 days.",
      "You have preexisting hypertension, heart failure, or kidney disease."
    ]
  },
  {
    id: "combiflam",
    keywords: ["combiflam", "ibuprofen paracetamol", "flexon"],
    brandName: "Combiflam / Flexon",
    genericName: "Ibuprofen + Paracetamol Combination",
    activeIngredients: [
      { name: "Ibuprofen", strength: "400 mg" },
      { name: "Paracetamol", strength: "325 mg" }
    ],
    manufacturer: "Sanofi India / Aristo",
    therapeuticClass: "Analgesic & Anti-Inflammatory Combination",
    primaryIndications: [
      "Moderate acute musculoskeletal and inflammatory pain",
      "Severe toothache and dental procedures",
      "Arthritis flares, joint pain, and sprains",
      "Pain associated with high fever"
    ],
    description: "Dual-action analgesic combining central antipyretic/analgesic effects of paracetamol with peripheral anti-inflammatory action of ibuprofen for synergistic pain control.",
    commonSideEffects: [
      "Stomach ache, heartburn, or nausea",
      "Dizziness or drowsiness",
      "Mild indigestion"
    ],
    seriousSideEffects: [
      "Stomach bleeding and peptic ulcers",
      "Liver toxicity (due to paracetamol component if taken in excess)",
      "Kidney dysfunction"
    ],
    immediateMedicalAttentionRequired: [
      "Vomiting blood or passing black tarry stools",
      "Severe upper abdominal pain or jaundice (yellow skin/eyes)",
      "Difficulty breathing or facial swelling"
    ],
    packagingInstructionsPattern: "Take after meals with water. Do not consume on an empty stomach. Do not take additional paracetamol.",
    precautionsAndWarnings: [
      "Do not take with other paracetamol or NSAID preparations.",
      "Contraindicated in active stomach ulcers, severe liver or kidney disease.",
      "Avoid alcohol during treatment."
    ],
    whenToConsultDoctor: [
      "Pain does not subside after 3 to 5 days.",
      "Signs of gastric bleeding or severe heartburn appear."
    ]
  },
  {
    id: "amoxicillin",
    keywords: ["amoxicillin", "mox", "augmentin", "amoxil", "novamox", "clavam", "moxikind"],
    brandName: "Augmentin / Clavam / Novamox / Amoxil",
    genericName: "Amoxicillin (with or without Clavulanate)",
    activeIngredients: [
      { name: "Amoxicillin", strength: "500 mg" },
      { name: "Clavulanic Acid", strength: "125 mg (if Duo)" }
    ],
    manufacturer: "GSK / Alkem / Sun Pharma / Cipla",
    therapeuticClass: "Beta-Lactam Antibiotic (Penicillin class)",
    primaryIndications: [
      "Bacterial infections of the respiratory tract (sinusitis, bronchitis, pneumonia)",
      "Bacterial ear, nose, and throat infections (otitis media, tonsillitis)",
      "Urinary tract bacterial infections (UTI)",
      "Skin and soft tissue bacterial infections"
    ],
    description: "Inhibits the synthesis of bacterial cell walls, leading to bacterial lysis. Clavulanate inhibits beta-lactamase enzymes, restoring activity against resistant strains. Does NOT treat viral infections (colds, flu).",
    commonSideEffects: [
      "Diarrhea or loose stools",
      "Nausea, vomiting, or stomach discomfort",
      "Mild skin rash or itching"
    ],
    seriousSideEffects: [
      "Clostridioides difficile-associated diarrhea (severe watery/bloody stools)",
      "Severe anaphylactic allergic reactions (angioedema, wheezing)",
      "Hepatotoxicity or cholestatic jaundice (more frequent with clavulanate)"
    ],
    immediateMedicalAttentionRequired: [
      "Sudden shortness of breath, wheezing, or facial/throat swelling",
      "Severe watery diarrhea with fever and abdominal cramps",
      "Severe peeling rash or blisters"
    ],
    packagingInstructionsPattern: "Prescription only. Complete full course as prescribed by the doctor. Take with or without food.",
    precautionsAndWarnings: [
      "Strictly contraindicated in individuals with known penicillin or cephalosporin allergies.",
      "Always finish the entire prescribed course even if feeling better to prevent antibiotic resistance.",
      "Ineffective against viral illnesses like cold or flu."
    ],
    whenToConsultDoctor: [
      "Signs of allergic reaction (hives, difficulty breathing) occur.",
      "Diarrhea is watery, frequent, or contains blood.",
      "Fever and infection symptoms do not improve after 48-72 hours."
    ]
  },
  {
    id: "cetirizine",
    keywords: ["cetirizine", "zyrtec", "cetzine", "alerid", "okacet", "incid-l"],
    brandName: "Zyrtec / Cetzine / Alerid / Okacet",
    genericName: "Cetirizine Hydrochloride",
    activeIngredients: [{ name: "Cetirizine HCl", strength: "10 mg / 5 mg" }],
    manufacturer: "Dr. Reddy's / Cipla / UCB / Sun Pharma",
    therapeuticClass: "Second-Generation Antihistamine",
    primaryIndications: [
      "Allergic rhinitis (hay fever: sneezing, runny nose, itchy watery eyes)",
      "Chronic idiopathic urticaria (hives and itchy skin wheals)",
      "Allergic contact dermatitis and insect bite itching",
      "Perennial dust mite and pet dander allergies"
    ],
    description: "Selective peripheral H1-receptor antagonist that blocks histamine release, reducing sneezing, watery eyes, itching, and allergy rashes.",
    commonSideEffects: [
      "Mild drowsiness or daytime fatigue",
      "Dry mouth",
      "Mild headache or dizziness"
    ],
    seriousSideEffects: [
      "Severe sedation or mental confusion (especially in elderly)",
      "Urinary retention",
      "Angioedema or severe hypersensitivity (rare)"
    ],
    immediateMedicalAttentionRequired: [
      "Swelling of the lips, tongue, or throat",
      "Inability to pass urine",
      "Irregular or rapid heart rhythm"
    ],
    packagingInstructionsPattern: "Usually taken once daily in the evening. May cause mild drowsiness.",
    precautionsAndWarnings: [
      "Avoid alcohol or sedative medications while taking cetirizine.",
      "Caution when driving or operating heavy machinery until you know how it affects you.",
      "Use caution in elderly patients and those with kidney impairment."
    ],
    whenToConsultDoctor: [
      "Allergy symptoms worsen or fail to respond after 5 days.",
      "Severe hives are accompanied by wheezing or throat tightness (call emergency)."
    ]
  },
  {
    id: "levocetirizine",
    keywords: ["levocetirizine", "xyzal", "levocet", "teczine", "1-al", "lecope", "montair-lc", "monticope"],
    brandName: "Xyzal / Levocet / Teczine / Montair-LC",
    genericName: "Levocetirizine (with or without Montelukast)",
    activeIngredients: [
      { name: "Levocetirizine HCl", strength: "5 mg" },
      { name: "Montelukast (if combination)", strength: "10 mg" }
    ],
    manufacturer: "Dr. Reddy's / Cipla / Glenmark / Sun Pharma",
    therapeuticClass: "Active Enantiomer Antihistamine",
    primaryIndications: [
      "Seasonal and perennial allergic rhinitis",
      "Allergic skin reactions, eczema flares, and urticaria",
      "Nighttime allergy symptoms and nasal congestion (if with Montelukast)"
    ],
    description: "The active R-enantiomer of cetirizine with higher affinity for human H1 receptors and lower sedative liability.",
    commonSideEffects: [
      "Mild drowsiness, dry mouth, or fatigue",
      "Mild headache"
    ],
    seriousSideEffects: [
      "Neuropsychiatric events (sleep disturbance, vivid dreams, rare depression if combined with Montelukast)",
      "Urinary retention"
    ],
    immediateMedicalAttentionRequired: [
      "Severe mood changes or suicidal thoughts (if containing Montelukast)",
      "Throat swelling or breathing distress"
    ],
    packagingInstructionsPattern: "Take once daily in the evening with or without water.",
    precautionsAndWarnings: [
      "Monitor for mood or behavioral changes if taking the combination with Montelukast.",
      "Avoid co-administration with central nervous system depressants or alcohol."
    ],
    whenToConsultDoctor: [
      "Unusual mood disturbances, insomnia, or severe nightmares occur.",
      "Symptoms fail to improve after 1 week."
    ]
  },
  {
    id: "pantoprazole",
    keywords: ["pantoprazole", "pantocid", "pan 40", "pan-40", "pantodac", "protonix", "pan-d", "pantosec"],
    brandName: "Pan 40 / Pantocid / Protonix / Pan-D",
    genericName: "Pantoprazole (with or without Domperidone)",
    activeIngredients: [
      { name: "Pantoprazole Sodium", strength: "40 mg" },
      { name: "Domperidone (if Pan-D)", strength: "30 mg SR" }
    ],
    manufacturer: "Alkem / Sun Pharma / Zydus / Torrent",
    therapeuticClass: "Proton Pump Inhibitor (PPI)",
    primaryIndications: [
      "Gastroesophageal Reflux Disease (GERD) and severe acid reflux",
      "Healing of erosive esophagitis and peptic ulcers",
      "Prevention of NSAID-induced gastric ulcers",
      "Dyspepsia and acid regurgitation (nausea relief if with Domperidone)"
    ],
    description: "Substituted benzimidazole that specifically blocks gastric H+/K+-ATPase pumps, providing prolonged suppression of basal and stimulated gastric acid secretion.",
    commonSideEffects: [
      "Mild headache",
      "Diarrhea, constipation, or gas (flatulence)",
      "Mild abdominal discomfort"
    ],
    seriousSideEffects: [
      "C. difficile-associated severe diarrhea",
      "Bone fractures (hip, spine, wrist) with long-term high-dose use",
      "Hypomagnesemia and Vitamin B12 malabsorption with chronic therapy",
      "Cardiac QT prolongation (risk increased if containing Domperidone)"
    ],
    immediateMedicalAttentionRequired: [
      "Severe watery diarrhea with fever and cramping",
      "Irregular heart rhythm, palpitations, or fainting spells",
      "Severe muscle spasms or seizures (low magnesium signs)"
    ],
    packagingInstructionsPattern: "Take 30 to 60 minutes before breakfast on an empty stomach. Swallow tablet whole; do not crush or chew.",
    precautionsAndWarnings: [
      "Swallow whole; do not crush enteric-coated tablets.",
      "Not intended for immediate heartburn relief (onset takes 1-3 days).",
      "Long-term use (>1 year) requires periodic physician review for bone density and B12."
    ],
    whenToConsultDoctor: [
      "Heartburn persists after 14 days of consecutive treatment.",
      "Difficulty swallowing, blood in vomit or stools, or unexplained weight loss occurs.",
      "Chest pain radiating to neck or left arm (seek emergency care to rule out heart attack)."
    ]
  },
  {
    id: "omeprazole",
    keywords: ["omeprazole", "prilosec", "omez", "ocid", "losec", "omizac"],
    brandName: "Omez / Prilosec / Ocid",
    genericName: "Omeprazole",
    activeIngredients: [{ name: "Omeprazole", strength: "20 mg / 40 mg" }],
    manufacturer: "Dr. Reddy's / AstraZeneca / Zydus",
    therapeuticClass: "Proton Pump Inhibitor (PPI)",
    primaryIndications: [
      "Active duodenal and benign gastric ulcers",
      "Gastroesophageal Reflux Disease (GERD) and acid indigestion",
      "Maintenance of healing of erosive esophagitis",
      "Zollinger-Ellison syndrome"
    ],
    description: "Suppresses gastric acid secretion by specific inhibition of the H+/K+-ATPase enzyme system at the secretory surface of the gastric parietal cell.",
    commonSideEffects: [
      "Headache",
      "Abdominal pain, nausea, or diarrhea",
      "Flatulence or constipation"
    ],
    seriousSideEffects: [
      "Severe watery diarrhea (C. diff infection)",
      "Hypomagnesemia with long-term therapy",
      "Increased risk of osteoporosis-related fractures with prolonged use"
    ],
    immediateMedicalAttentionRequired: [
      "Persistent watery diarrhea with fever and abdominal cramps",
      "Irregular pulse, tremor, or severe dizziness",
      "Lupus-like rash on face and arms worsening in sunlight"
    ],
    packagingInstructionsPattern: "Take 30-60 minutes before breakfast. Swallow capsule whole.",
    precautionsAndWarnings: [
      "Do not crush or chew delayed-release capsules.",
      "Interacts with clopidogrel (decreases antiplatelet activity); consult cardiologist.",
      "Check with your doctor if symptoms do not improve after 2 weeks."
    ],
    whenToConsultDoctor: [
      "Symptoms persist after 14 days.",
      "Vomiting blood or coffee-ground material, or passing black stools."
    ]
  },
  {
    id: "azithromycin",
    keywords: ["azithromycin", "zithromax", "azee", "zady", "azithral", "azimax"],
    brandName: "Zithromax / Azithral / Azee / Zady",
    genericName: "Azithromycin",
    activeIngredients: [{ name: "Azithromycin Dihydrate", strength: "500 mg / 250 mg" }],
    manufacturer: "Pfizer / Alembic / Cipla / Sun Pharma",
    therapeuticClass: "Macrolide Antibiotic",
    primaryIndications: [
      "Community-acquired bacterial respiratory infections (pneumonia, bronchitis)",
      "Bacterial pharyngitis and tonsillitis in penicillin-allergic patients",
      "Uncomplicated skin and soft tissue bacterial infections",
      "Certain genital bacterial infections (Chlamydia)"
    ],
    description: "Binds to the 50S ribosomal subunit of susceptible microorganisms, inhibiting protein synthesis. Long half-life permits once-daily dosing over 3 to 5 days. Does NOT cure viral colds.",
    commonSideEffects: [
      "Nausea, vomiting, or stomach cramps",
      "Diarrhea or loose stools",
      "Altered taste or mild headache"
    ],
    seriousSideEffects: [
      "Prolongation of the QT interval and ventricular arrhythmias (torsades de pointes)",
      "Hepatotoxicity, abnormal liver enzymes, and cholestatic jaundice",
      "Severe cutaneous hypersensitivity (DRESS syndrome)"
    ],
    immediateMedicalAttentionRequired: [
      "Palpitations, sudden racing heartbeat, dizziness, or fainting",
      "Jaundice (yellowing of skin or eyes), dark urine, pale stools",
      "Severe watery diarrhea with fever"
    ],
    packagingInstructionsPattern: "Prescription only. Take once daily. Can be taken with or without food. Complete entire course.",
    precautionsAndWarnings: [
      "Use with extreme caution in patients with cardiac arrhythmia risk or prolonged QT interval.",
      "Do not take simultaneously with aluminum or magnesium antacids (space by 2 hours).",
      "Always finish the prescribed course."
    ],
    whenToConsultDoctor: [
      "Heart fluttering, chest discomfort, or dizziness occurs.",
      "Infection symptoms do not begin improving within 48 to 72 hours."
    ]
  },
  {
    id: "metformin",
    keywords: ["metformin", "glycomet", "glucophage", "obimet", "cetapin"],
    brandName: "Glucophage / Glycomet / Obimet",
    genericName: "Metformin Hydrochloride",
    activeIngredients: [{ name: "Metformin HCl", strength: "500 mg / 850 mg / 1000 mg" }],
    manufacturer: "Merck / USV / Sun Pharma / Torrent",
    therapeuticClass: "Biguanide Antidiabetic Agent",
    primaryIndications: [
      "Glycemic control in Type 2 Diabetes Mellitus",
      "Prevention of Type 2 Diabetes in pre-diabetic individuals",
      "Polycystic Ovary Syndrome (PCOS) insulin resistance management"
    ],
    description: "Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake.",
    commonSideEffects: [
      "Gastrointestinal upset (diarrhea, nausea, vomiting, flatulence)",
      "Metallic taste in mouth",
      "Abdominal cramps and loss of appetite"
    ],
    seriousSideEffects: [
      "Lactic acidosis (rare but critical medical emergency)",
      "Vitamin B12 deficiency with long-term continuous use",
      "Hypoglycemia (mainly when combined with insulin or sulfonylureas)"
    ],
    immediateMedicalAttentionRequired: [
      "Symptoms of lactic acidosis: severe fatigue, muscle aches, trouble breathing, cold extremities, slow heart rate",
      "Severe shakiness, sweating, confusion (hypoglycemia signs)"
    ],
    packagingInstructionsPattern: "Take with or immediately after meals with water to minimize stomach discomfort.",
    precautionsAndWarnings: [
      "Contraindicated in severe renal failure (eGFR < 30 mL/min) and acute metabolic acidosis.",
      "Must be temporarily discontinued prior to iodinated radiocontrast procedures.",
      "Avoid heavy alcohol intake due to elevated lactic acidosis risk."
    ],
    whenToConsultDoctor: [
      "Severe gastrointestinal intolerance, persistent vomiting, or dehydration.",
      "Unusual severe fatigue, weakness, or trouble breathing."
    ]
  },
  {
    id: "atorvastatin",
    keywords: ["atorvastatin", "lipitor", "atorva", "atocor", "storvas", "tonact"],
    brandName: "Lipitor / Atorva / Storvas / Tonact",
    genericName: "Atorvastatin Calcium",
    activeIngredients: [{ name: "Atorvastatin", strength: "10 mg / 20 mg / 40 mg" }],
    manufacturer: "Viatris / Zydus / Sun Pharma / Lupin",
    therapeuticClass: "HMG-CoA Reductase Inhibitor (Statin)",
    primaryIndications: [
      "Hypercholesterolemia (reduction of elevated LDL-C and triglycerides)",
      "Cardiovascular risk reduction (prevention of heart attack and stroke)",
      "Coronary artery disease plaque stabilization"
    ],
    description: "Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol biosynthesis, increasing liver LDL receptors to clear circulating LDL.",
    commonSideEffects: [
      "Mild headache",
      "Mild joint or muscle ache",
      "Mild digestive upset or constipation"
    ],
    seriousSideEffects: [
      "Myopathy and rhabdomyolysis (severe skeletal muscle breakdown causing kidney failure)",
      "Hepatotoxicity and elevated transaminases",
      "Slight increase in blood glucose and HbA1c"
    ],
    immediateMedicalAttentionRequired: [
      "Unexplained, severe muscle pain, tenderness, or weakness with dark tea-colored urine",
      "Yellowing of skin or eyes, extreme fatigue, severe abdominal pain"
    ],
    packagingInstructionsPattern: "Take once daily with or without food at any time of day (consistent time preferred).",
    precautionsAndWarnings: [
      "Strictly contraindicated in pregnancy, planning pregnancy, and breastfeeding.",
      "Avoid consuming large volumes of grapefruit juice (>1 liter/day).",
      "Routine liver function tests may be ordered by your doctor."
    ],
    whenToConsultDoctor: [
      "Unexplained muscle aches, tenderness, or weakness develops.",
      "Signs of liver dysfunction appear."
    ]
  },
  {
    id: "aspirin",
    keywords: ["aspirin", "ecosprin", "disprin", "acetylsalicylic acid", "aspro"],
    brandName: "Disprin / Ecosprin / Bayer Aspirin",
    genericName: "Acetylsalicylic Acid (Aspirin)",
    activeIngredients: [{ name: "Aspirin", strength: "75 mg / 150 mg / 300 mg" }],
    manufacturer: "USV / Reckitt / Bayer / Sanofi",
    therapeuticClass: "Antiplatelet Agent / Salicylate Analgesic",
    primaryIndications: [
      "Prevention of blood clots in heart disease, angina, and ischemic stroke (low dose 75-150mg)",
      "Pain, fever, and inflammation relief (high dose 300-600mg)",
      "Emergency administration during suspected acute myocardial infarction"
    ],
    description: "Irreversibly inhibits cyclooxygenase-1 (COX-1) in platelets, preventing the synthesis of thromboxane A2 and suppressing platelet aggregation for the lifespan of the platelet (7-10 days).",
    commonSideEffects: [
      "Heartburn, indigestion, or stomach irritation",
      "Increased bleeding tendency from minor cuts"
    ],
    seriousSideEffects: [
      "Gastrointestinal hemorrhage and bleeding ulcers",
      "Hemorrhagic stroke risk",
      "Reye's syndrome in children/teens recovering from viral infections (Strict Contraindication)",
      "Aspirin-exacerbated respiratory disease (severe asthma attack in sensitive individuals)"
    ],
    immediateMedicalAttentionRequired: [
      "Vomiting bright red blood or black tarry stools",
      "Sudden severe headache, dizziness, or confusion",
      "Severe wheezing or asthma attack after ingestion"
    ],
    packagingInstructionsPattern: "Low-dose enteric coated tablets should be swallowed whole with water after meals. Soluble tablets dissolved in water.",
    precautionsAndWarnings: [
      "NEVER give aspirin to children or teenagers recovering from chickenpox or flu symptoms due to fatal Reye's syndrome risk.",
      "Discontinue prior to elective surgical procedures as instructed by surgeon.",
      "Contraindicated in active bleeding disorders or severe peptic ulceration."
    ],
    whenToConsultDoctor: [
      "Unusual bruising, bleeding from gums that won't stop, or dark stools occur.",
      "Severe indigestion or burning stomach pain persists."
    ]
  },
  {
    id: "ciprofloxacin",
    keywords: ["ciprofloxacin", "cipro", "ciplox", "cifran", "zoxan"],
    brandName: "Ciplox / Cifran / Cipro",
    genericName: "Ciprofloxacin Hydrochloride",
    activeIngredients: [{ name: "Ciprofloxacin HCl", strength: "500 mg / 250 mg" }],
    manufacturer: "Cipla / Sun Pharma / Bayer",
    therapeuticClass: "Fluoroquinolone Antibiotic",
    primaryIndications: [
      "Complicated urinary tract infections (UTI) and pyelonephritis",
      "Severe infectious bacterial diarrhea (gastroenteritis, enteric fever)",
      "Bone and joint bacterial infections",
      "Respiratory and intra-abdominal infections"
    ],
    description: "Inhibits bacterial DNA gyrase (topoisomerase II) and topoisomerase IV, preventing bacterial DNA replication and transcription.",
    commonSideEffects: [
      "Nausea, vomiting, diarrhea, or abdominal discomfort",
      "Mild headache or dizziness"
    ],
    seriousSideEffects: [
      "Tendinitis and tendon rupture (especially Achilles tendon)",
      "Peripheral neuropathy (nerve damage: burning, tingling, pain)",
      "Central nervous system toxicity (anxiety, hallucinations, seizures)",
      "QT prolongation and aortic aneurysm rupture risk"
    ],
    immediateMedicalAttentionRequired: [
      "Sudden snap, pain, swelling, or tenderness in back of ankle/tendon (Stop immediately and do not walk)",
      "Numbness, burning, or pins-and-needles sensation in hands or feet",
      "Sudden severe tearing pain in chest, back, or abdomen"
    ],
    packagingInstructionsPattern: "Prescription only. Drink plenty of water throughout the day to avoid crystalluria. Do not take with milk/calcium antacids.",
    precautionsAndWarnings: [
      "FDA Black Box Warning for disabling and potentially irreversible tendon, muscle, joint, and nerve adverse effects.",
      "Discontinue immediately at first sign of tendon pain or numbness.",
      "Avoid concurrent ingestion of milk, yogurt, or calcium/iron supplements (space by 4 hours)."
    ],
    whenToConsultDoctor: [
      "Any joint, tendon, or nerve pain occurs.",
      "Severe diarrhea with fever develops."
    ]
  }
];

export function findVerifiedMedicine(queryText: string): VerifiedMedicineRecord | null {
  if (!queryText) return null;
  const normalized = queryText.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  
  // 1. Direct keyword match
  for (const record of VERIFIED_MEDICINE_DATABASE) {
    for (const kw of record.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        return record;
      }
    }
  }

  // 2. Tokenized word boundary match
  const words = normalized.split(/\s+/).filter(w => w.length >= 3);
  for (const word of words) {
    for (const record of VERIFIED_MEDICINE_DATABASE) {
      for (const kw of record.keywords) {
        if (kw.toLowerCase().split(/\s+/).includes(word)) {
          return record;
        }
      }
    }
  }

  return null;
}

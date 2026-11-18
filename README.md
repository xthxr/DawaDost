# DawaDost (दवादोस्त) 💊
> Simple, Safe & Verified AI-Powered Healthcare Web Application

DawaDost is a modern healthcare web application designed to help users accurately identify medicines from packaging photos, inspect verified uses and side effects, and receive simple, non-diagnostic educational explanations for visible health concerns.

---

## ✨ Core Features

### 1. Scan Medicine Packaging
- **AI Vision & On-Device OCR:** Upload a photo of a blister strip, bottle, tablet packaging, or prescription label.
- **Accurate Identification:** Detects brand name, generic formulation, active ingredients with strength, and manufacturer.
- **Verified Clinical Pharmacology:**
  - Approved clinical indications and therapeutic class.
  - Correlation analysis if you enter your symptoms or illness.
  - Clear breakdown of **Common & Mild** vs **Serious** and **Emergency** side effects.
- **Strict Non-Invented Dosage Policy:** Only displays verified packaging or prescription instructions; never invents, guesses, or recalculates dosages.
- **Doctor Consultation Alerts:** Clear contraindications, food/alcohol warnings, and when to seek urgent care.

### 2. Upload Health Concern / Symptom Photo
- **Non-Diagnostic Educational Overview:** Upload a photo of a visible skin rash, insect bite, minor cut/scrape, or eye irritation.
- **Visual Observations:** Highlights observable features (erythema, texture, borders) with explicit statements of photographic uncertainty.
- **Topics for Doctor Discussion:** Presents potential categories to discuss with a physician — **strictly without algorithmic diagnosis or drug prescription**.
- **Supportive Comfort Measures:** Gentle, non-medicinal comfort practices and critical "Things to Avoid" (e.g. no bursting blisters or scratching).
- **Red Flag Symptoms:** Immediate warnings for signs requiring emergency medical attention (anaphylaxis, cellulitis, severe fever).
- **Doctor Discussion Prompts:** Prepared questions to ask your physician during your consultation.

---

## 🛡️ Medical Safety & Ethics Safeguards

1. **No Invented Dosage:** Dosage instructions are strictly extracted from legible packaging or official monographs. We never approximate or invent dosages.
2. **Zero Algorithmic Prescribing:** The system never prescribes prescription drugs based on uploaded photos.
3. **Transparent Uncertainty:** Communicates optical limitations (glare, blur, low light) and advises professional clinical examination.
4. **Emergency Guidance:** Prominently displays emergency helpline numbers (112 / 911 / 108) across all workflows.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Vision & Text Recognition:**
  - Google Gemini 3.8 / 2.5 Flash Vision API (with dynamic model discovery)
  - On-device optical character recognition via [Tesseract.js](https://tesseract.projectnaptha.com/)
  - Comprehensive pre-indexed verified pharmaceutical monograph database

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/xthxr/DawaDost.git
cd DawaDost
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Gemini API key if you wish to enable live cloud vision (otherwise DawaDost runs smoothly using its built-in verified clinical database and on-device OCR):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can also set or clear the API key anytime right inside the web interface)*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## ⚠️ Medical Disclaimer

DawaDost is strictly for patient information and educational verification. It does not provide medical diagnosis, clinical treatment advice, or drug prescriptions. Always consult a certified physician or licensed healthcare provider for medical concerns. In an acute emergency, contact your local emergency services immediately.

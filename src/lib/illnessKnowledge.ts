import { IllnessAnalysisResult } from "./types";

export interface VerifiedIllnessCategory {
  id: string;
  keywords: string[];
  concernIdentified: string;
  visualObservations: string[];
  generalEducationalExplanation: string;
  potentialCategoriesToDiscussWithDoctor: Array<{
    name: string;
    overview: string;
    whyConsidered: string;
  }>;
  nonPrescriptionGeneralCare: string[];
  thingsToAvoid: string[];
  redFlagSymptoms: string[];
  questionsToAskDoctor: string[];
}

export const VERIFIED_ILLNESS_TOPICS: VerifiedIllnessCategory[] = [
  {
    id: "skin-rash-dermatitis",
    keywords: ["rash", "redness", "itchy", "dermatitis", "eczema", "allergy", "hive", "skin irritation", "bumps"],
    concernIdentified: "Localized Skin Redness and Irritation (Erythematous Presentation)",
    visualObservations: [
      "Erythema (localized skin reddening) across the affected surface area",
      "Slight epidermal swelling or raised maculopapular texture",
      "Absence of evident open ulceration or deep tissue necrotic signs in visible photo",
      "Visual features common to inflammatory cutaneous reactions"
    ],
    generalEducationalExplanation: "Skin redness, raised bumps, and itching are very common presentations that can result from direct contact with irritants (soaps, plants, fabrics), environmental allergens, dry skin flares, or localized histamine release. Because many skin conditions share almost identical visual appearances, a physical in-person examination by a healthcare provider is essential for an accurate evaluation.",
    potentialCategoriesToDiscussWithDoctor: [
      {
        name: "Contact Dermatitis (Irritant or Allergic)",
        overview: "A localized skin reaction caused by direct contact with a specific irritant (detergent, nickel, chemical) or allergen.",
        whyConsidered: "Matches localized erythema and superficial texture following exposure to new substances."
      },
      {
        name: "Atopic Dermatitis / Eczema Flare",
        overview: "A chronic, recurring inflammatory condition involving dry skin barrier disruption and intense pruritus (itching).",
        whyConsidered: "Frequent cause of patchy redness, dryness, and itchiness, often triggered by temperature changes or stress."
      },
      {
        name: "Acute Urticaria (Hives)",
        overview: "Transient, raised, erythematous wheals often triggered by foods, viral infections, medications, or insect bites.",
        whyConsidered: "Common cause of raised, itchy plaques that may fluctuate in size or shift location within hours."
      }
    ],
    nonPrescriptionGeneralCare: [
      "Gently rinse the area with cool or lukewarm plain water and pat dry with a soft, clean towel (do not rub).",
      "Apply a clean, cool, damp cloth for 10-15 minutes to soothe itching and burning sensations.",
      "Wear loose, breathable cotton clothing over the area to prevent friction.",
      "Keep the skin barrier hydrated with a gentle, fragrance-free, hypoallergenic moisturizing lotion or cream."
    ],
    thingsToAvoid: [
      "DO NOT aggressively scratch, rub, or pick at the skin, as this can introduce bacterial infections (impetigo/cellulitis).",
      "DO NOT apply harsh astringents, alcohol, hot water, scented perfumes, or unverified home concoctions.",
      "DO NOT apply leftover prescription steroid creams without direct instructions from a physician."
    ],
    redFlagSymptoms: [
      "Rapidly spreading redness, especially with heat and severe swelling (possible cellulitis)",
      "Redness accompanied by high fever, chills, or systemic malaise",
      "Facial swelling, swelling of lips/tongue, or any difficulty breathing or swallowing (CALL EMERGENCY SERVICES IMMEDIATELY)",
      "Formation of painful blisters filled with yellow pus or red streaks extending outward from the area"
    ],
    questionsToAskDoctor: [
      "Could this be an allergic reaction or irritant contact dermatitis from something I touched?",
      "Do I need a prescription topical treatment or an oral antihistamine?",
      "Should any patch testing or allergy screening be considered if this recurs?",
      "What signs should prompt me to return for urgent follow-up?"
    ]
  },
  {
    id: "insect-bite",
    keywords: ["bite", "insect", "bug", "mosquito", "sting", "bee", "tick", "spider"],
    concernIdentified: "Localized Insect Bite or Arthropod Reaction",
    visualObservations: [
      "Circumscribed, focal papule or punctum (central bite mark) surrounded by erythematous halo",
      "Localized mild edema (swelling) confined to the immediate bite zone",
      "Intact skin barrier without active bleeding or purulent drainage"
    ],
    generalEducationalExplanation: "Insect and arthropod bites trigger localized release of histamine and inflammatory cytokines in response to salivary proteins or venom. Most uncomplicated bites cause temporary swelling, redness, and itching that peak within 24 to 48 hours and gradually subside.",
    potentialCategoriesToDiscussWithDoctor: [
      {
        name: "Uncomplicated Insect Bite Reaction",
        overview: "Localized immune hypersensitivity to saliva from mosquitoes, fleas, bedbugs, or midges.",
        whyConsidered: "Clear localized focus with mild surrounding redness and pruritus."
      },
      {
        name: "Secondary Bacterial Infection (Cellulitis/Folliculitis)",
        overview: "Infection introduced when scratching breaks the epidermal barrier, allowing skin flora to enter.",
        whyConsidered: "A consideration if the area becomes progressively warmer, significantly more painful, or begins weeping pus."
      },
      {
        name: "Tick-Borne Erythema Migrans (Lyme Disease Consideration)",
        overview: "An expanding, circular or 'bull's-eye' rash that can develop 3 to 30 days after a blacklegged tick bite.",
        whyConsidered: "Relevant to monitor if you have visited wooded/grassy areas and notice an expanding ring."
      }
    ],
    nonPrescriptionGeneralCare: [
      "Wash the bite area gently with mild soap and clean water to reduce surface contaminants.",
      "Apply an ice pack wrapped in a clean cloth for 10 minutes at a time to reduce swelling.",
      "Keep fingernails trimmed short and clean to minimize skin damage from involuntary scratching.",
      "Keep the affected limb elevated if the bite is on a hand or foot and swelling is present."
    ],
    thingsToAvoid: [
      "DO NOT scratch or squeeze the bite; breaking the skin is the primary cause of secondary bacterial infection.",
      "DO NOT apply unverified caustic substances or hot objects to the bite."
    ],
    redFlagSymptoms: [
      "Shortness of breath, wheezing, dizziness, throat tightness, or generalized hives (ANAPHYLAXIS EMERGENCY - CALL 911 / 112)",
      "Redness that expands noticeably hour-by-hour with increasing heat and throbbing pain",
      "High fever, body chills, or nausea following the bite",
      "An expanding circular ring resembling a target or bull's-eye"
    ],
    questionsToAskDoctor: [
      "Does this bite appear infected or merely inflamed?",
      "Are there local tick-borne or vector-borne illnesses I should be aware of?",
      "Is a tetanus booster or medical treatment needed for this kind of bite?"
    ]
  },
  {
    id: "minor-superficial-wound",
    keywords: ["cut", "scrape", "wound", "abrasion", "scratch", "injury", "bruise", "burn", "minor burn"],
    concernIdentified: "Superficial Skin Abrasion / Minor Cut / Mild Burn",
    visualObservations: [
      "Superficial epidermal disruption with localized erythema around the margins",
      "Clean margins without visible deep tendon, muscle, or pulsating bleeding",
      "Normal surrounding skin tone without extensive expanding bruising"
    ],
    generalEducationalExplanation: "Minor cuts, scrapes, and first-degree burns affect the outer layer of the skin (epidermis). The body initiates a complex wound healing cascade involving hemostasis, inflammation, tissue proliferation, and remodeling. Proper hygiene is crucial to prevent contamination.",
    potentialCategoriesToDiscussWithDoctor: [
      {
        name: "Superficial Abrasion or Minor Laceration",
        overview: "Loss of the top skin layer due to friction or sharp contact.",
        whyConsidered: "Visual appearance indicates shallow depth suitable for standard outpatient evaluation."
      },
      {
        name: "First-Degree Thermal Injury (Mild Burn)",
        overview: "Superficial thermal injury without deep blistering or charred dermis.",
        whyConsidered: "Uniform redness and surface tenderness typical of mild thermal or sunburn injury."
      }
    ],
    nonPrescriptionGeneralCare: [
      "Rinse gently under cool or lukewarm running tap water for several minutes to cleanse.",
      "Pat dry gently with sterile gauze and apply a sterile, non-stick dressing.",
      "Change the dressing daily or whenever it becomes wet or dirty.",
      "Keep the wound protected from sunlight during healing to reduce discoloration."
    ],
    thingsToAvoid: [
      "DO NOT apply harsh antiseptics like undiluted hydrogen peroxide or rubbing alcohol into open wounds (delays cellular healing).",
      "DO NOT pop or peel blistered skin, as the blister roof acts as a sterile natural biological barrier.",
      "DO NOT use butter, toothpaste, or greasy unsterile ointments on burns."
    ],
    redFlagSymptoms: [
      "Bleeding that will not stop after 10 minutes of direct, firm pressure",
      "Deep gaping edges, exposed fat, muscle, or bone (requires urgent stitches)",
      "Increasing redness spreading outward, foul odor, or thick yellowish-green discharge",
      "Wound caused by an animal bite or dirty/rusty metal puncture (requires urgent tetanus evaluation)",
      "Numbness, loss of sensation, or inability to move digits past the wound"
    ],
    questionsToAskDoctor: [
      "Does this wound require formal closure (stitches, staples, or tissue adhesive)?",
      "Is my tetanus immunization status up to date for this type of injury?",
      "What are the best dressing protocols to minimize scarring?"
    ]
  },
  {
    id: "eye-irritation",
    keywords: ["eye", "pink eye", "conjunctivitis", "red eye", "sclera", "eyelid", "stye"],
    concernIdentified: "Ocular Redness / Conjunctival Irritation",
    visualObservations: [
      "Conjunctival hyperaemia (dilation of superficial blood vessels in the white of the eye)",
      "Mild periorbital puffiness without gross structural distortion",
      "Clear or watery tear film in visible area"
    ],
    generalEducationalExplanation: "Redness of the eye (often termed 'red eye' or conjunctivitis) can stem from allergic irritation, viral or bacterial conjunctivitis, dry eye syndrome, or foreign body exposure. Because eye structures are sensitive and vital to vision, any persistent eye symptom must be examined by a certified healthcare professional.",
    potentialCategoriesToDiscussWithDoctor: [
      {
        name: "Allergic or Irritant Conjunctivitis",
        overview: "Inflammation triggered by airborne allergens, chlorine, dust, or smoke, typically affecting both eyes with itching.",
        whyConsidered: "Consistent with diffuse superficial redness accompanied by tearing and itchiness."
      },
      {
        name: "Infectious Conjunctivitis (Viral or Bacterial)",
        overview: "Microbial infection of the conjunctiva, often highly contagious, with watery or mucopurulent discharge.",
        whyConsidered: "Common cause of sudden pinkness, often starting in one eye and spreading."
      },
      {
        name: "Subconjunctival Hemorrhage or Dry Eye Flare",
        overview: "Broken microcapillary under the conjunctiva or chronic tear film deficiency.",
        whyConsidered: "Frequent causes of localized bright red patches or grittiness."
      }
    ],
    nonPrescriptionGeneralCare: [
      "Wash hands thoroughly with soap and water before and after touching anywhere near the face.",
      "Remove contact lenses immediately and wear glasses until fully cleared by an eye doctor.",
      "Use sterile, preservative-free lubricating artificial tears to ease dryness and gritty sensation.",
      "Apply a cool, clean damp compress over closed eyelids for comfort."
    ],
    thingsToAvoid: [
      "DO NOT rub your eyes; rubbing can cause corneal abrasions and spread infection between eyes.",
      "DO NOT share eye drops, towels, pillows, or eye makeup with anyone.",
      "DO NOT use leftover medicated prescription eye drops (especially steroids) without a doctor's explicit examination."
    ],
    redFlagSymptoms: [
      "Severe eye pain, deep throbbing ache, or extreme sensitivity to light (photophobia)",
      "Any noticeable decrease, clouding, or blurriness in vision",
      "Unequal pupil sizes or a hazy cornea",
      "Eye redness following trauma, high-speed projectile impact, or chemical splash (EMERGENCY)"
    ],
    questionsToAskDoctor: [
      "Is this contagious conjunctivitis or an allergic/dry-eye reaction?",
      "Are prescription antibiotic drops indicated, or will it resolve with supportive care?",
      "When is it safe for me to resume wearing contact lenses?"
    ]
  }
];

export function findVerifiedIllnessTopic(queryText: string): VerifiedIllnessCategory {
  const normalized = queryText.toLowerCase();
  for (const topic of VERIFIED_ILLNESS_TOPICS) {
    for (const kw of topic.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        return topic;
      }
    }
  }
  // Return the default skin rash / inflammatory category if not specifically matched
  return VERIFIED_ILLNESS_TOPICS[0];
}

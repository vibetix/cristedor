// ─────────────────────────────────────────────────────────────
// Project sections — shared, section-driven data model
// ─────────────────────────────────────────────────────────────
// Each public product (UniStay, Synkturt TTS, Vibetix) can define
// an ordered list of rich "sections" for its detail page. The
// generic ProjectDetailPage renders whichever sections a project
// provides and omits the rest.
//
// Truthfulness: only UniStay has full content today. The other
// products intentionally define no sections yet rather than show
// fabricated or UniStay-specific content. When real content is
// ready, add an entry here and the layout appears automatically.
//
// Copy for UniStay lives in unistayData.ts (single source of truth)
// and is referenced below so it is never duplicated.
import {
  unistayProblem, unistayBuilding, unistayProcess,
  unistayAgentProgram, unistayDevelopment, unistayResearch,
  unistayVision, unistayAI,
  unistayGallerySlots, unistayAssets, UNISTAY_ACCENT,
} from './unistayData';

// ── Section shapes ────────────────────────────────────────────
export interface ProjectSectionProblem {
  type: 'problem';
  eyebrow: string;
  heading: string;
  description: string;
  resolution: string;
}

export interface ProjectFeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectSectionBuilding {
  type: 'building';
  eyebrow: string;
  heading: string;
  description: string;
  features: ProjectFeatureCard[];
}

export interface ProjectJourneyStep {
  number: string;
  title: string;
  description: string;
}

export interface ProjectSectionJourney {
  type: 'journey';
  eyebrow: string;
  heading: string;
  note?: string;
  steps: ProjectJourneyStep[];
}

export interface ProjectProgramStep {
  label: string;
  description: string;
}

export interface ProjectSectionProgram {
  type: 'program';
  eyebrow: string;
  heading: string;
  description: string;
  steps: ProjectProgramStep[];
  cautions?: string[];
}

export interface ProjectScreenshotSlot {
  key: string;
  title: string;
  description: string;
  assetPath: string;
}

export interface ProjectSectionDevelopment {
  type: 'development';
  eyebrow: string;
  heading: string;
  description: string;
  accent?: string;
  gallery: ProjectScreenshotSlot[];
}

export interface ProjectResearchDirection {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectSectionResearch {
  type: 'research';
  eyebrow: string;
  heading: string;
  description: string;
  note?: string;
  directions: ProjectResearchDirection[];
}

export interface ProjectSectionVision {
  type: 'vision';
  eyebrow: string;
  heading: string;
  quote: string;
}

export interface ProjectAICapability {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectSectionAI {
  type: 'ai';
  eyebrow: string;
  symbol?: string;
  heading: string;
  description: string;
  note?: string;
  capabilities: ProjectAICapability[];
}

export type ProjectSection =
  | ProjectSectionProblem
  | ProjectSectionBuilding
  | ProjectSectionJourney
  | ProjectSectionProgram
  | ProjectSectionDevelopment
  | ProjectSectionResearch
  | ProjectSectionVision
  | ProjectSectionAI;

// ── Per-project sections ──────────────────────────────────────
export const projectSections: Record<string, ProjectSection[]> = {
  unistay: [
    {
      type: 'problem',
      eyebrow: 'The Problem',
      heading: unistayProblem.heading,
      description: unistayProblem.description,
      resolution: unistayProblem.resolution,
    },
    {
      type: 'building',
      eyebrow: unistayBuilding.eyebrow,
      heading: unistayBuilding.heading,
      description: unistayBuilding.description,
      features: unistayBuilding.features,
    },
    {
      type: 'journey',
      eyebrow: unistayProcess.eyebrow,
      heading: unistayProcess.heading,
      note: unistayProcess.note,
      steps: unistayProcess.steps,
    },
    {
      type: 'program',
      eyebrow: unistayAgentProgram.eyebrow,
      heading: unistayAgentProgram.heading,
      description: unistayAgentProgram.description,
      steps: unistayAgentProgram.steps,
      cautions: unistayAgentProgram.cautions,
    },
    {
      type: 'development',
      eyebrow: unistayDevelopment.eyebrow,
      heading: unistayDevelopment.heading,
      description: unistayDevelopment.description,
      accent: UNISTAY_ACCENT,
      gallery: unistayGallerySlots.map(slot => ({
        key: slot.key,
        title: slot.title,
        description: slot.description,
        assetPath: unistayAssets[slot.key],
      })),
    },
    {
      type: 'ai',
      eyebrow: unistayAI.eyebrow,
      symbol: unistayAI.symbol,
      heading: unistayAI.heading,
      description: unistayAI.description,
      note: unistayAI.note,
      capabilities: unistayAI.capabilities,
    },
    {
      type: 'research',
      eyebrow: unistayResearch.eyebrow,
      heading: unistayResearch.heading,
      description: unistayResearch.description,
      note: unistayResearch.note,
      directions: unistayResearch.directions,
    },
    {
      type: 'vision',
      eyebrow: unistayVision.eyebrow,
      heading: unistayVision.heading,
      quote: unistayVision.quote,
    },
  ],
};

import rawData from "@/data/niche-analysis.json";
import rawVoice from "@/data/samourai-voice-profile.json";

export type NicheKpis = {
  channelsAnalyzed: number;
  videosScanned: number;
  outliersIdentified: number;
  totalViewsAnalyzed: number;
  niche: string;
  gapIdentified: string;
  primaryVoiceModel: string;
};

export type IceTip = {
  rank: number;
  ice: number;
  action: string;
  reasoning: string;
  impact: number;
  confidence: number;
  ease: number;
};

export type TopicPerf = {
  topic: string;
  count: number;
  outliers: number;
  rate: number;
  avgViews: number;
};

export type TitlePattern = {
  pattern: string;
  count: number;
  outliers: number;
  rate: number;
  avgViews: number;
};

export type Outlier = {
  rank: number;
  title: string;
  channel: string;
  views: number;
  ratio: number;
  url: string;
  thumbnail: string;
  id: string;
};

export type ThumbnailPatterns = {
  winning_patterns: string[];
  losing_patterns: string[];
};

export type HookStructure = {
  name: string;
  description: string;
  example: string;
};

export type HookAnalysis = {
  winning_structures: HookStructure[];
  avoid: string[];
};

export type ChannelSummary = {
  name: string;
  subscribers: number;
  totalVideos: number;
  totalViews: number;
  avgViews: number;
  medianViews: number;
  tier: string;
  description: string;
  whatWorks: string[];
  whatDoesntWork: string[];
};

export type GapAnalysis = {
  whatCompetitorsDo: string[];
  whatNobodyDoes: string[];
  caioEdge: string[];
};

export type Strategy = {
  thisWeek: string[];
  thisMonth: string[];
  thisQuarter: string[];
};

export type DataIntegrity = {
  channelsAtFullCatalog: string[];
  channelsAt50Cap: string[];
  transcriptCoverage: string;
  note: string;
};

export type NicheAnalysis = {
  updatedAt: string;
  kpis: NicheKpis;
  iceTips: IceTip[];
  topicPerformance: TopicPerf[];
  titlePatterns: TitlePattern[];
  top30Outliers: Outlier[];
  thumbnailPatterns: ThumbnailPatterns;
  hookAnalysis: HookAnalysis;
  channelSummaries: Record<string, ChannelSummary>;
  gapAnalysis: GapAnalysis;
  strategy: Strategy;
  dataIntegrity: DataIntegrity;
};

export type SamouraiVoiceProfile = {
  channel: string;
  url: string;
  subscribers: number;
  total_videos: number;
  total_views: number;
  avg_views: number;
  median_views: number;
  content_tier: string;
  positioning_statement: string;
  pacing_signature: Record<string, unknown>;
  top_outliers: Array<{ title: string; views: number; ratio?: number }>;
  flop_videos: Array<{ title: string; views: number; ratio?: number }>;
  rhetorical_patterns: Record<string, { description: string; examples: string[] }>;
  tonal_signature: Record<string, unknown>;
  structural_template: Record<
    string,
    string | { pattern: string; length_seconds: number; must_include: string[] }
  >;
  recurring_themes_named: Array<{
    name: string;
    description: string;
    videos?: string[];
  }>;
  hook_formulas: string[];
  cta_style: string;
};

export const nicheAnalysis = rawData as unknown as NicheAnalysis;
export const samouraiVoice = rawVoice as unknown as SamouraiVoiceProfile;

export function getChannelOrder(): string[] {
  const entries = Object.entries(nicheAnalysis.channelSummaries);
  entries.sort(([a, av], [b, bv]) => {
    if (a === "SamouraiDansant") return -1;
    if (b === "SamouraiDansant") return 1;
    return bv.totalViews - av.totalViews;
  });
  return entries.map(([k]) => k);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return String(n);
}

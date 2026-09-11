export type CloudRegion = 'us-east' | 'us-west' | 'eu-central' | 'ap-southeast';

export interface RegionInfo {
  name: string;
  multiplier: number;
}

export const REGION_MULTIPLIERS: Record<CloudRegion, RegionInfo> = {
  'us-east': { name: 'US East (N. Virginia)', multiplier: 1.0 },
  'us-west': { name: 'US West (Oregon)', multiplier: 1.05 },
  'eu-central': { name: 'EU (Frankfurt)', multiplier: 1.15 },
  'ap-southeast': { name: 'Asia Pacific (Singapore)', multiplier: 1.2 },
};

export interface CloudService {
  id: string;
  name: string;
  category: string;
  provider: 'aws' | 'gcp' | 'azure';
  costPerUnit: number;
  unitLabel: string;
  defaultUnits?: number;
  description?: string;
  icon?: string;
}

export interface ArchitectureNodeData {
  label: string;
  service: CloudService;
  units: number;
  monthlyCost: number;
  onUnitsChange: (nodeId: string, newUnits: number) => void;
  [key: string]: unknown;
}
import { syncConfig } from '../syncConfig';

export interface NetworkStatus {
  effectiveType: '2g' | '3g' | '4g';
  saveData: boolean;
}

export const getNetworkStatus = (): NetworkStatus => {
  // Safe fallback to prevent Node/Jest environment crashes
  if (typeof window === 'undefined' || !navigator) {
    return { effectiveType: '4g', saveData: false };
  }

  const conn = (navigator as any).connection || 
               (navigator as any).mozConnection || 
               (navigator as any).webkitConnection;

  return {
    effectiveType: conn?.effectiveType || '4g',
    saveData: !!conn?.saveData
  };
};

export const executeDynamicSync = async (): Promise<string[]> => {
  const status = getNetworkStatus();
  
  // If user is on a slow network environment (2g or 3g) or data saver mode is on
  if (status.saveData || status.effectiveType === '2g' || status.effectiveType === '3g') {
    console.log("Low bandwidth detected. Restricting download to Tier 1 core assets.");
    return syncConfig.find(t => t.tier === 1)?.assets || [];
  }
  
  // High-speed fallback: Return all assets across all tiers
  return syncConfig.flatMap(t => t.assets);
};

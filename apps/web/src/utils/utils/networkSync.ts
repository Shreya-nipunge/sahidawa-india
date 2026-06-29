import { syncConfig } from './syncConfig';

export interface NetworkStatus {
  effectiveType: '2g' | '3g' | '4g';
  saveData: boolean;
}

export const getNetworkStatus = (): NetworkStatus => {
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
  
  if (status.saveData || status.effectiveType === '2g' || status.effectiveType === '3g') {
    return syncConfig.find(t => t.tier === 1)?.assets || [];
  }
  
  return syncConfig.flatMap(t => t.assets);
};

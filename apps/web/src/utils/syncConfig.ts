export const SYNC_TIERS = {
  TIER_1: {
    name: "Core Matrix",
    description: "Critical drug signatures and minimal text translations",
    priority: 1,
    maxSizeMB: 2
  },
  TIER_2: {
    name: "Regional Bundle",
    description: "Local pharmacy directories and primary regional languages",
    priority: 2,
    maxSizeMB: 5
  },
  TIER_3: {
    name: "Extended Media",
    description: "High-resolution medicine images and audio guidance tracks",
    priority: 3,
    maxSizeMB: 20
  }
};

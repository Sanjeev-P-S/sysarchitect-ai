export const ARCHITECTURE_NODES = [
  "Client",
  "Load Balancer",
  "Application Server",
  "Cache",
  "Database",
  "Queue",
  "CDN",
  "Object Storage",
] as const;

export type ArchitectureNode =
  (typeof ARCHITECTURE_NODES)[number];
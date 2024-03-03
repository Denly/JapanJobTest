export interface Device {
  id: string;
  name: string;
};

export interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
};

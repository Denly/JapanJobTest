export interface Event {
  id: string;
  begin: string;
  end: string;
};

export interface SiteEvent extends Event {
  name: string;
}
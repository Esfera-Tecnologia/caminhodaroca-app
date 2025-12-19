export type EventType = {
  eventId: number;
  name: string;
  images: string[];
  description: string;
  externalLink: string | null;
}

export interface PartnerType {
  id: number;
  name: string;
  logo: string;
  cities: Record<number, string>;
  uf: string;
  description: string;
  email: string;
  routes: string;
  circuits: string;
  attractions: string;
  instagram: string;
  website: string;
  events: EventType[]
}

export type PartnerItemType = {
  id: number;
  name: string;
  cities: Record<number, string>;
  state: string;
  logo: string;
  editable: boolean;
  pendingApproval: boolean;
};

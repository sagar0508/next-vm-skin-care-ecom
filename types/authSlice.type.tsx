export interface CommonParams {
  page?: number;
  limit?: number;
}

export interface UserDetailsProps {
  name: string;
  userName: string;
  lastLogin: string;
  email: string;
  role: string;
  socialToken: string | boolean; // It's "false" as a string in your example but could also be a boolean
  isEmailVerified: boolean;
  isPremium: boolean;
  isDeleted: boolean;
  id: string;
}

export interface AuthState {
  isLoggedIn?: boolean;
  isLoading?: boolean;
  authenticate?: boolean;
  access_token?: string;
  refreshToken?: string;
  userDetails?: Partial<UserDetailsProps>;
  common_params?: CommonParams;
}

// Contact info used by clients and venues
export interface Contact {
  phone_number: string;
  email: string;
}

// ---------------- Clients ----------------
export interface Client {
  id: string;
  name: string;
  address: string;
  contact: Contact;
  isDeleted: boolean;
}

// ---------------- Vendors ----------------
export interface Vendor {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  servicesProvided: string[];
  rating: number;
  isActive: boolean;
  isDeleted: boolean;
}

// ---------------- Venues ----------------
export interface SubLocation {
  id: string;
  name: string;
  description: string;
  features: string[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface Venue {
  _id: string; // Mongo-style id
  name: string;
  address: string;
  city: string;
  state: string;
  contact: Contact;
  subLocationIds: string[];
  subLocations: SubLocation[];
  // isDeleted: boolean;
  // createdAt: string;
  // updatedAt: string;
  __v: number;
}

interface Prop {
  id: string;
  name: string;
  description: string;
  propsImageURL: string;
  quantity: number;
  ownershipType: "owned_stored" | string; // अगर fixed values हैं तो union बना सकते हैं
  category: "decorative" | "furniture" | string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface DecorSegment {
  _id: string;
  name: string;
  imageURL: string;
  description: string;
  propsIds: string[];
  isActive: boolean;
  // isDeleted: boolean;
  // createdAt: string; // ISO date string
  // updatedAt: string; // ISO date string
  __v: number;
  props: Prop[];
}

// ---------------- Occasions ----------------
export interface OccasionFunction {
  name: string;
  decorSegmentIds: string[];
  decorSegments: DecorSegment[];
  _id: string;
}

export interface Occasion {
  _id: string;
  occasionName: string;
  occasionCategory: string; // e.g. "Personal" | "Corporate" etc.
  description: string;
  functions: OccasionFunction[];
  honoreesInfo: string[];
  isActive: boolean;
  isDeleted: boolean;
}
export interface SubVenue {
  id: string;
  name: string;
  description: string;
  features: string[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface Themes {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  primaryColor: string;
  accentColors: string[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface ServicesProps {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
}
// ---------------- Meta Data Root Schema ----------------
export interface EventBookingMetaData {
  clients: Client[];
  vendors: Vendor[];
  venues: Venue[];
  occasions: Occasion[];
  subLocations: SubVenue[];
  themes: Themes[];
  services: ServicesProps[];
  propsList: Prop[];
}

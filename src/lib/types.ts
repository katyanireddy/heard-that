export type UserRole = "member" | "admin";

export type VibeTag =
  | "Board Game Goblin"
  | "Movie Yapper"
  | "Cafe Hopper"
  | "Psychology Overthinker"
  | "Playlist Curator"
  | "Sitcom Rewatch Addict"
  | "2AM Philosopher";

export type EventItem = {
  id: string;
  title: string;
  slug: string;

  is_closed?: boolean;

  description: string;
  location: string;
  dateTime: string;
  seatsTotal: number;
  seatsLeft: number;
  priceInr: number;
  theme: string;
  mood: string;
  tags: string[];
  emoji: string;
  coverImage: string;
};

export type GalleryMemory = {
  id: string;
  title: string;
  event: string;
  quote: string;
  caption: string;
  image: string;
  tapeColor: string;
};

export type CommunityNote = {
  id: string;
  author: string;
  message: string;
  image?: string;
  anonymous: boolean;
  createdAt: string;
};

export type Booking = {
  id: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  vibes: VibeTag[];
  userId?: string;
  note?: string;
  createdAt: string;
  ticketCode: string;
  amount?: number;
  paymentId?: string;
  paymentStatus?: string;
};

export type CollaborationInquiry = {
  id: string;
  name: string;
  email: string;
  org?: string;
  collaborationType: string;
  message: string;
  createdAt: string;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  vibes: VibeTag[];
  interests: string[];
  joinedEventIds: string[];
  savedMemories: string[];
  createdAt: string;
};

export type AppSession = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  vibes: VibeTag[];
  interests: string[];
};

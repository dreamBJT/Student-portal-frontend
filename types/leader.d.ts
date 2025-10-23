export interface Leader {
  id: string;
  name: string;
  position: string;
  party: string;
  bio: string;
  imageUrl?: string;
  achievements?: string[];
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  createdAt: string;
  updatedAt: string;
}

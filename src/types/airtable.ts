export interface Category {
  id: string;
  name: string;
  nominees: Nominee[];
}

export interface Nominee {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

export interface Vote {
  id?: string;
  nomineeId: string;
  timestamp?: string;
}
export interface Nominee {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  category_id: string;
}

export interface Category {
  id: string;
  name: string;
  nominees: Nominee[];
}
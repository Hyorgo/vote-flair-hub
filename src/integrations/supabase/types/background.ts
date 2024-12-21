export interface PageBackground {
  id: string;
  page_name: string;
  background_type: 'color' | 'image' | 'video';
  background_value: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
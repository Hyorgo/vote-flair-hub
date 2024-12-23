export interface EventInfo {
  id: string;
  event_date: string;
  location: string;
  address: string;
  total_tickets: number;
  remaining_tickets: number;
  created_at?: string;
  updated_at?: string;
}

export interface EventFormData {
  event_date: string;
  location: string;
  address: string;
  total_tickets: string;
  remaining_tickets: string;
}
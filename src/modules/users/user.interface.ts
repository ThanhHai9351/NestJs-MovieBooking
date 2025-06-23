export interface User {
  id: number;
  name: string;
  english_name?: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
  is_active: boolean;
  active_code?: string;
  expired_code?: Date;
  latest_login?: Date;
  login_type?: string;
  avatar_url?: string;
  role: string;
  point: number;
  created_at: Date;
  updated_at: Date;
}

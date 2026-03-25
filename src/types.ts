export type Product = {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  active: boolean;
  sort_order: number;
};

export type Order = {
  id?: string;
  customer_name: string;
  customer_phone: string;
  delivery_type: 'pickup' | 'delivery';
  delivery_address?: string;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  total_price: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
};

export type EventRequest = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  event_type: string;
  guest_count?: number;
  brownie_count?: number;
  event_date: string;
  comments?: string;
  status: 'pendiente' | 'cotizado' | 'confirmado' | 'completado';
  createdAt: string;
};

export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type Partner = {
  id?: string;
  name: string;
  contact_name?: string;
  phone?: string;
  address?: string;
  active: boolean;
};

export type PartnerDelivery = {
  id?: string;
  partner_id: string;
  partner_name: string;
  items: {
    product_name: string;
    product_id: string;
    quantity: number;
  }[];
  delivery_date: string;
  delivery_time: string;
  sold: boolean;
  sold_date?: string;
  sold_time?: string;
};

export type IndividualSale = {
  id?: string;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  total_price: number;
  sale_date: string;
  sale_time: string;
};

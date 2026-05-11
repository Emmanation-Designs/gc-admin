export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_urls: string[];
  discount: number;
  colors: string[];
  created_at: string;
};

export type OrderItem = {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  image: string;
};

export type Order = {
  id: string;
  user_id?: string;
  phone: string;
  address: string;
  subtotal: number;
  total: number;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
};

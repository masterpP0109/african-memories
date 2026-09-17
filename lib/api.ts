const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet<T>(path: string): Promise<T> {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');

  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface ActivityPrice {
  id: string;
  amount: string;
  currency: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  createdAt: string;
}

export interface ActivityAvailability {
  id: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  remaining: number;
  createdAt: string;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string | null;
  image?: string | null;
  status: string;
  prices: ActivityPrice[];
  availabilities: ActivityAvailability[];
  createdAt: string;
  updatedAt: string;
}

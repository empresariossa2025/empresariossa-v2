export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf?: string;
  cnpj?: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  members: OrganizationMember[];
  _count: {
    members: number;
    branches: number;
    contracts: number;
  };
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  joinedAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  capacity?: number;
  createdAt: string;
  attendees: EventAttendee[];
  _count: {
    attendees: number;
  };
}

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  status: 'REGISTERED' | 'CONFIRMED' | 'ATTENDED' | 'CANCELLED';
  createdAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ApiResponse<T> {
  data?: T;
  total?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface LeadWithId {
  _id: string;

  name: string;

  email: string;

  phone?: string;

  company?: string;

  status:
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Lost';

  source:
    | 'Website'
    | 'Instagram'
    | 'Referral';

  createdAt?: string;

  assignedUser?: any;
}
export interface LeadWithOutId {
  _id?: string;

  name: string;

  email: string;

  phone?: string;

  company?: string;

  status:
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Lost';

  source:
    | 'Website'
    | 'Instagram'
    | 'Referral';

  createdAt?: string;
}
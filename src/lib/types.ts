export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
}

export type OpportunityType = 'Internship' | 'Course' | 'Placement';
export type OpportunityCategory = 'Technology' | 'Marketing' | 'Finance' | 'Design';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  category: OpportunityCategory;
  location: string;
  verified: boolean;
  image: string;
  dataAiHint?: string;
  description: string;
  reviews: Review[];
}

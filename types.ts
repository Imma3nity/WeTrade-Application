
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  condition: string;
  image: string;
  category: 'phone' | 'laptop' | 'tablet' | 'accessory';
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  badge: string;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LoanEstimate {
  principal: number;
  interestRate: number;
  duration: number; // months
  monthlyRepayment: number;
  totalRepayment: number;
  collateralImages?: string[];
  collateralDescription?: string;
}

export interface ValuationResult {
  estimatedMarketValue: number;
  maxLoanOffer: number;
  confidenceScore: number;
  analysis: string;
}

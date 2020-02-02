export type Currency = 'EUR' | 'USD';
export type Department = 'EUR Dep 1' | 'EUR Dep 2' | 'USD Dep 1' | 'USD Dep 2';

export interface Order {
  amount: number;
  date: string;
  department: Department;
}

export interface ViewModel {
  customerName: string;
  date: string;
  amount: number;
  amountHistory: number[];
  currency: Currency;
  department: Department;
  currentOrder: Order;
  orders: Order[];
}

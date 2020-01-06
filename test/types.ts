export type Currency = "EUR" | "USD";
export type Department = "EUR Dep 1" | "EUR Dep 2" | "USD Dep 1" | "USD Dep 2";

export interface Order {
  date: string;
  amount: number;
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

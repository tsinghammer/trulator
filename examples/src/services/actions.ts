import { Currency, Department } from '../test/types';

export type Action =
  | {
      type: 'setAmount';
      payload: number;
    }
  | {
      type: 'setAmountIndex';
      payload: number;
      index: number;
    }
  | {
      type: 'setCurrency';
      payload: Currency;
    }
  | {
      type: 'setDepartment';
      payload: Department;
    };

export const setAmountAction = (amount: number): Action => {
  return { type: 'setAmount', payload: amount };
};

export const setAmountHistoryAction = (amountHistory: number, index: number): Action => {
  return { type: 'setAmountIndex', payload: amountHistory, index };
};

export const setCurrencyAction = (currency: Currency): Action => {
  return { type: 'setCurrency', payload: currency };
};

export const setDepartmentAction = (department: Department): Action => {
  return { type: 'setDepartment', payload: department };
};

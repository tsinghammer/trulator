import { isUndefined } from 'util';

import { Department, ViewModel } from './types';
import { ViewConfiguration } from 'trulator';

export const testData: ViewModel = {
  amount: 100_000,
  amountHistory: [1_111, 2_222.22, 3_333.3],
  currency: 'EUR',
  currentOrder: {
    amount: 1_000,
    date: new Date().toISOString(),
    department: 'EUR Dep 1',
  },
  customerName: 'My name',
  date: new Date().toISOString(),
  department: 'EUR Dep 1',
  orders: [
    {
      amount: 1_000,
      date: new Date().toISOString(),
      department: 'EUR Dep 1',
    },
    {
      amount: 2_000,
      date: new Date().toISOString(),
      department: 'EUR Dep 1',
    },
    {
      amount: 3_000,
      date: new Date().toISOString(),
      department: 'EUR Dep 1',
    },
  ],
};

export const viewConfiguration: ViewConfiguration<ViewModel, ViewModel> = {
  amount: {
    default: 123456789,
    disabled: true,
    hidden: (model): boolean => model.amount <= 4_000,
    validations: [
      {
        message: { text: 'Amount too low', severity: 'Error' },
        rule: (model): boolean => model.amount <= 5_000,
      },
      {
        message: { text: 'Amount not equal 1234', severity: 'Warning' },
        rule: (model): boolean => model.amount !== 1_234,
      },
    ],
  },
  amountHistory: {
    overrideValue: (model) => {
      if (model.amountHistory[0] > 1_000) {
        const amounts = [...model.amountHistory];
        amounts[3] = amounts[0];

        return amounts[3];
      }
    },
    validations: [
      {
        message: {
          severity: 'Error',
          text: 'Amount 1 does not match amount 2',
        },
        rule: (model) => !model.amountHistory || model.amountHistory[0] !== model.amountHistory[1],
      },
    ],
  },
  currency: { validations: [] },
  currentOrder: {
    amount: { validations: [], hidden: true },
    date: { validations: [] },
    department: { validations: [], disabled: true },
  },
  customerName: { default: 'My default name', validations: [] },
  date: {
    disabled: (model): boolean => !!model && model.amount === 1_111,
    validations: [],
  },
  department: {
    availableOptions: (model): Department[] =>
      model.currency === 'EUR' ? ['EUR Dep 1', 'EUR Dep 2'] : ['USD Dep 1', 'USD Dep 2'],
    default: 'USD Dep 1',
    validations: [],
  },
  orders: {
    amount: {
      default: 100,
      disabled: true,
      validations: [
        {
          rule: (s, i): boolean => !isUndefined(i) && s.orders[i].amount >= 1_000,
          message: { text: 'hello', severity: 'Warning' },
        },
      ],
    },
    date: {},
    department: {},
  },
};

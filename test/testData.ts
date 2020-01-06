import { RuleResult, ViewConfiguration } from '../src/types';
import { ViewModel } from './types';

export const testData: ViewModel = {
  customerName: 'My name',
  amount: 100000,
  amountHistory: [1111, 2222.22, 3333.3],
  currentOrder: {
    amount: 1000,
    date: new Date().toISOString(),
    department: 'EUR Dep 1',
  },
  date: new Date().toISOString(),
  department: 'EUR Dep 1',
  orders: [
    {
      amount: 1000,
      date: new Date().toISOString(),
      department: 'EUR Dep 1',
    },
    {
      amount: 2000,
      date: new Date().toISOString(),
      department: 'EUR Dep 1',
    },
    {
      amount: 3000,
      date: new Date().toISOString(),
      department: 'EUR Dep 1',
    },
  ],
  currency: 'EUR',
};

export const viewConfiguration: ViewConfiguration<ViewModel, ViewModel> = {
  customerName: { default: 'My default name', validations: [] },
  amount: {
    default: 123456789,
    disabled: true,
    validations: [
      {
        message: { text: 'Amount too low', severity: 'Error' },
        rule: model => model.amount <= 5000,
      },
      {
        message: { text: 'Amount not equal 1234', severity: 'Warning' },
        rule: model => model.amount !== 1234,
      },
    ],
  },
  date: {
    disabled: model => !!model && model.amount === 1111,
    validations: [],
  },
  amountHistory: [
    { validations: [] },
    { validations: [] },
    { validations: [] },
    {
      validations: [
        {
          message: {
            text: 'Amount 1 does not match amount 2',
            severity: 'Error',
          },
          rule: model =>
            !model.amountHistory ||
            model.amountHistory[0] !== model.amountHistory[1],
        },
      ],
      overrideValue: model => {
        if (model.amountHistory[0] > 1000) {
          const amounts = [...model.amountHistory];
          amounts[3] = amounts[0];

          return amounts[3];
        }
      },
    },
  ],
  currency: { validations: [] },
  department: {
    validations: [],
    default: 'USD Dep 1',
    availableOptions: model =>
      model.currency === 'EUR'
        ? ['EUR Dep 1', 'EUR  Dep 1']
        : ['USD Dep 1', 'USD Dep 1'],
  },
  currentOrder: {
    amount: { validations: [], hidden: true },
    department: { validations: [], disabled: true },
    date: { validations: [] },
  },
  orders: [],
};

const result: RuleResult<ViewModel> = {} as RuleResult<ViewModel>;

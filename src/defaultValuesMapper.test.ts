import { ViewModel } from '../test/types';
import { mapDefaults } from './defaultValuesMapper';
import { ViewConfiguration } from './types';

it('should have mapDefaults', () => {
  expect(mapDefaults).toBeDefined();
});

it('should map default values from product to trade', () => {
  const viewModel: ViewModel = {
    amount: 0,
    amountHistory: [1, 2, 343243, 655555],
    currency: 'EUR',
    currentOrder: {
      amount: 123.45,
      date: new Date().toLocaleDateString(),
      department: 'EUR Dep 1',
    },
    customerName: '',
    date: new Date().toLocaleDateString(),
    department: 'EUR Dep 1',
    orders: [
      {
        amount: 678.9,
        date: new Date().toLocaleDateString(),
        department: 'EUR Dep 1',
      },
      {
        amount: 1111.11,
        date: new Date().toLocaleDateString(),
        department: 'EUR Dep 1',
      },
    ],
  };

  const viewConfiguration: ViewConfiguration<ViewModel, ViewModel> = {
    amount: {
      default: 12345,
      validations: [],
    },
    currency: { validations: [] },
    customerName: {
      default: 'my trade name',
      validations: [],
    },
    date: { validations: [] },
    department: { validations: [] },
    amountHistory: { validations: [], default: 2 },
    currentOrder: {
      amount: {
        default: 1,
        validations: [],
      },
      date: {
        default: '',
        validations: [],
      },
      department: {
        default: 'USD Dep 1',
        validations: [],
      },
    },
    orders: {
      amount: {
        default: 1000,
        validations: [],
      },
      date: {
        default: 'some day',
        validations: [],
      },
      department: {
        default: 'USD Dep 2',
        validations: [],
      },
    },
  };

  mapDefaults(viewConfiguration, viewModel);

  expect(viewModel.customerName).toEqual(viewConfiguration.customerName.default);
  expect(viewModel.amount).toEqual(viewConfiguration.amount.default);
  expect(viewModel.currentOrder.amount).toEqual(viewConfiguration.currentOrder.amount.default);
  expect(viewModel.currentOrder.department).toEqual(viewConfiguration.currentOrder.department.default);
  expect(viewModel.orders[0].amount).toEqual(viewConfiguration.orders.amount.default);
});

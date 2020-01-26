import { testData, viewConfiguration } from '../test/testData';
import { ViewModel } from '../test/types';
import { evaluateRules } from './ruleEvaluator';

it('should have evaluateRules', () => {
  expect(evaluateRules).toBeDefined();
});

it('should evaluate all rules', () => {
  const data = {
    ...testData,
    amountHistory: [1234, ...testData.amountHistory],
  };
  // tslint:disable-next-line
  console.time('evaluate all');
  const result = evaluateRules(data, viewConfiguration);
  // tslint:disable-next-line
  console.timeEnd('evaluate all');
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  // tslint:disable-next-line
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  expect(result.amount!.disabled).toBeTruthy();
  expect(result.amount!.messages).toHaveLength(1);
  expect(result.amountHistory).toHaveLength(4);
  expect(result.amountHistory![3]!.overrideValue).toBeDefined();
  expect(result.currentOrder!.amount!.hidden).toBeTruthy();
  expect(result.currentOrder!.department!.disabled).toBeTruthy();
});

it('should set the correct dependent dropdown', () => {
  const data: ViewModel = { ...testData, currency: 'EUR' };
  const result = evaluateRules(data, viewConfiguration);

  const data2: ViewModel = { ...testData, currency: 'USD' };
  const result2 = evaluateRules(data2, viewConfiguration);

  expect(result.department!.availableOptions).toEqual(['EUR Dep 1', 'EUR Dep 2']);
  expect(result2.department!.availableOptions).toEqual(['USD Dep 1', 'USD Dep 2']);
});

it('should accpet either configuration or a rule type for non-primitives', () => {
  const testConfigConfiguration = { ...viewConfiguration };
  testConfigConfiguration.currentOrder = {
    amount: { disabled: true },
    date: { hidden: true },
    department: { hidden: true },
  };
  const resultConfig = evaluateRules(testData, testConfigConfiguration);

  const testConfigRule = { ...viewConfiguration };
  testConfigRule.currentOrder = {
    isRule: true,
    disabled: true,
    date: {},
    amount: {},
    department: {},
  };
  const resultRule = evaluateRules(testData, testConfigRule);

  expect(resultConfig.currentOrder?.amount?.disabled).toBeTruthy();
  expect(resultConfig.currentOrder?.date?.hidden).toBeTruthy();
  expect(resultConfig.currentOrder?.department?.hidden).toBeTruthy();

  expect(resultRule.currentOrder?.disabled).toBeTruthy();
});

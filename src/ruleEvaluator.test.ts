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
  console.time('evaluate all');
  const result = evaluateRules(data, viewConfiguration);
  console.timeEnd('evaluate all');
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`,
  );
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

  expect(result.department!.availableOptions).toEqual([
    'EUR Dep 1',
    'EUR Dep 2',
  ]);
  expect(result2.department!.availableOptions).toEqual([
    'USD Dep 1',
    'USD Dep 1',
  ]);
});

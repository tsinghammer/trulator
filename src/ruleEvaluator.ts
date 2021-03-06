import { RuleResult, ViewConfiguration, isPrimitive, isRule } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface RecursionSet {
  completeData: any;
  nextData: any;
  rule: any;
  result: any;
  index?: number;
}

const mapResult = (rule: any, completeData: any, index?: number): any => {
  return {
    hidden: typeof rule.hidden === 'function' ? rule.hidden(completeData) : rule.hidden,
    disabled: typeof rule.disabled === 'function' ? rule.disabled(completeData) : rule.disabled,
    messages: rule.validations?.filter((x: any) => !!x.rule && x.rule(completeData, index)).map((x: any) => x.message),
    overrideValue: rule.overrideValue && rule.overrideValue(completeData),
    availableOptions:
      typeof rule.availableOptions === 'function' ? rule.availableOptions(completeData) : rule.availableOptions,
  };
};

function evaluateRuleRecursively(set: RecursionSet): any {
  const { completeData, nextData, rule, result, index } = set;
  if (!nextData) {
    return;
  }

  for (const key in nextData) {
    if (!rule[key]) {
      continue;
    }

    const r = rule[key];
    const n = nextData[key];

    if (isPrimitive(n) || isRule(r)) {
      result[key] = mapResult(r, completeData, index);
    } else if (n.constructor === Array) {
      for (let i = 0; i < n.length; i++) {
        if (!r) {
          continue;
        }

        result[key] = result[key] || [];
        result[key][i] = evaluateRuleRecursively({
          completeData,
          nextData: n[i],
          rule: r,
          result: result[key][i] || {},
          index: i,
        });
      }
    } else {
      result[key] = evaluateRuleRecursively({
        completeData,
        nextData: n,
        rule: r,
        result: result[key] || {},
      });
    }
  }

  return result;
}

export function evaluateRules<T>(viewModel: T, viewConfiguration: ViewConfiguration<T, T>): RuleResult<T> {
  const result = evaluateRuleRecursively({
    completeData: viewModel,
    nextData: viewModel,
    rule: viewConfiguration,
    result: {},
  });

  return result as RuleResult<T>;
}

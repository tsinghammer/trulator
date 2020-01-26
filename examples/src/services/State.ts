import { ViewModel } from 'trulator/lib/test/types';

import { RuleResult, ViewConfiguration } from '../../../src/types';

export interface State {
  mutationCount: number;
  data: ViewModel;
  viewConfiguration: ViewConfiguration<ViewModel, ViewModel>;
  result: RuleResult<ViewModel>;
}

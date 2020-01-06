import { Result, ViewConfiguration } from '../../../src/types';
import { ViewModel } from '../../../test/types';

export interface State {
  mutationCount: number;
  data: ViewModel;
  viewConfiguration: ViewConfiguration<ViewModel, ViewModel>;
  result: Result<ViewModel>;
}

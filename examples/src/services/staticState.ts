import { testData, viewConfiguration } from 'trulatortest';
import { ViewModel } from 'trulatortest';
import { Result } from 'trulatortest';

import { State } from './State';

const result: Result<ViewModel> = {} as Result<ViewModel>;

export const initialState: State = {
  mutationCount: 0,
  data: testData,
  viewConfiguration,
  result,
};

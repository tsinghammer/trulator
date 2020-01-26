import { Result } from 'trulator/lib/src/types';
import { testData, viewConfiguration } from 'trulator/lib/test/testData';
import { ViewModel } from 'trulator/lib/test/types';

import { State } from './State';

const result: Result<ViewModel> = {} as Result<ViewModel>;

export const initialState: State = {
  mutationCount: 0,
  data: testData,
  viewConfiguration,
  result,
};

import { testData, viewConfiguration } from 'trulator';
import { ViewModel } from 'trulator';
import { Result } from 'trulator';

import { State } from './State';

const result: Result<ViewModel> = {} as Result<ViewModel>;

export const initialState: State = {
  mutationCount: 0,
  data: testData,
  viewConfiguration,
  result,
};

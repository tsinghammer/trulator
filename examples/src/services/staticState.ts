import { Result } from 'trulator';

import { State } from './State';
import { ViewModel } from '../test/types';
import { testData, viewConfiguration } from '../test/testData';

const result: Result<ViewModel> = {} as Result<ViewModel>;

export const initialState: State = {
  mutationCount: 0,
  data: testData,
  viewConfiguration,
  result,
};

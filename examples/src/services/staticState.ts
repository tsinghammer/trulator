import { Result } from '../../../src/types';
import { testData, viewConfiguration } from '../../../test/testData';
import { ViewModel } from '../../../test/types';
import { State } from './State';

const result: Result<ViewModel> = {} as Result<ViewModel>;

export const initialState: State = {
  mutationCount: 0,
  result,
  testData,
  viewConfiguration,
};

import produce from 'immer';
import { evaluateRules } from 'trulatortest';

import { State } from './State';
import { Action } from './actions';

const reducer = produce(
  (draft: State, action: Action): State => {
    draft.mutationCount++;

    switch (action.type) {
      case 'setAmount': {
        draft.data.amount = action.payload;

        break;
      }
      case 'setAmountIndex': {
        draft.data.amountHistory[action.index] = action.payload;

        break;
      }
      case 'setCurrency': {
        draft.data.currency = action.payload;

        break;
      }
      case 'setDepartment': {
        draft.data.department = action.payload;

        break;
      }
      default:
        throw new Error();
    }

    draft.result = evaluateRules(draft.data, draft.viewConfiguration);

    return draft;
  },
);

export default reducer;

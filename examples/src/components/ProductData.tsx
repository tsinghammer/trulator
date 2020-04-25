import React, { useReducer } from 'react';

import { setAmountAction, setAmountHistoryAction, setCurrencyAction, setDepartmentAction } from '../services/actions';
import reducer from '../services/reducer';
import { initialState } from '../services/staticState';
import { Currency, Department } from '../test/types';

const ProductData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    data: { customerName, date, amount, currency, department, amountHistory },
    result,
  } = state;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAmountAction(Number(event.target.value)));
  };

  const handleAmountHistoryChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(setAmountHistoryAction(Number(event.target.value), index));
  };

  const handleSerializeClick = () => {
    alert(JSON.stringify(state));
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrencyAction(event.target.value as Currency));
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDepartmentAction(event.target.value as Department));
  };

  return (
    <div>
      Client Name: {customerName} <span style={{ color: 'red' }}></span> <br />
      Date: <input type="text" value={date} disabled={result.date && result.date.disabled} /> <br />
      Amount: <input type="text" name="clientName" value={amount} onChange={handleAmountChange}></input>{' '}
      <span style={{ color: 'red' }}>
        disabled: {result.amount && result.amount.disabled ? 'yes' : 'no'}, hidden:{' '}
        {result.amount && result.amount.hidden ? 'yes' : 'no'},{' '}
        {result.amount && result.amount.messages.map((m) => <span>{m.text}</span>)}
      </span>{' '}
      <br />
      {amountHistory &&
        amountHistory.map((x, index) => (
          <span key={`amountHistory_${index}`}>
            Amount history:{' '}
            <input
              type="text"
              name="clientName"
              value={
                (result.amountHistory && result.amountHistory[index] && result.amountHistory[index]!.overrideValue) || x
              }
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAmountHistoryChange(event, index)}
            ></input>{' '}
            {result.amountHistory &&
              result.amountHistory[index] &&
              result.amountHistory[index]!.messages.map((m) => <span>{m.text}</span>)}
            <br />
          </span>
        ))}
      <br />
      <input type="button" onClick={handleSerializeClick} value="Serialize product configuration" />
      <select onChange={handleCurrencyChange}>
        <option selected={currency === 'EUR'}>EUR</option>
        <option selected={currency === 'USD'}>USD</option>
      </select>
      <select onChange={handleDepartmentChange}>
        {result.department &&
          result.department.availableOptions &&
          result.department.availableOptions.map((b) => <option selected={department === b}>{b}</option>)}
      </select>
    </div>
  );
};

export default ProductData;

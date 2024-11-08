
'use client'; 
import React, { useContext } from 'react';
import CounterContext from '../../../context/CounterContext';
const CounterPage = () => {
  const { count, increment } = useContext(CounterContext);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default CounterPage;

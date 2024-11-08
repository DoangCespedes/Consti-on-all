'use client'

import RegisterForm from '@/components/RegisterForm'
import React, { useContext } from 'react';
import CounterContext from '../../../context/CounterContext';

const registro = () => {
  const { count, increment } = useContext(CounterContext);
  return (
    <>
      <RegisterForm/>

      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  )
}

export default registro
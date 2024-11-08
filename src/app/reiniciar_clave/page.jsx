
'use client'

import RegisterForm from '@/components/RegisterForm'
import React, { useContext } from 'react';
import CounterContext from '../../../context/CounterContext';
import RestarPassword from '@/components/RestarPassword';

const reiniciar_clave = () => {
  const { count, increment } = useContext(CounterContext);
  return (
    <>
      <RestarPassword/>

      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  )
}

export default reiniciar_clave
import Link from 'next/link'
import React from 'react'

const test = () => {
  return (
    <>
    <div style={{background:'black', color:'white'}}>
        <h1>test</h1>
        <button><Link href='/'>regresar</Link></button>
    </div>
    </>
  )
}

export default test
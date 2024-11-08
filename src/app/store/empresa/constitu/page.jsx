import Link from 'next/link'
import React from 'react'

const constitu = () => {
  return (
    <>
    <div style={{background:'black', color:'white'}}>
        <h1>constitu</h1>
        <button><Link href='/'>regresar</Link></button>
    </div>
    </>
  )
}

export default constitu
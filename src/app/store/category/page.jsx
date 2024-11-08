import Link from 'next/link'
import React from 'react'

const category = () => {
  return (
    <>
    <div style={{background:'black', color:'white'}}>
        <h1>category</h1>
        <button><Link href='/'>regresar</Link></button>
    </div>
    </>
  )
}

export default category
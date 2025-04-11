import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

function pokemon() {
  const { name } = useParams();
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

export default pokemon
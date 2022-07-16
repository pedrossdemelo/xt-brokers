import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function Trade({}: Props) {
  const { ticker } = useParams();

  return (
    <div>Trade {ticker}</div>
  )
}
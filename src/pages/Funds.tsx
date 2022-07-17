import useUserData from 'hooks/useUserData';
import React from 'react'

type Props = {}

export default function Funds({}: Props) {
  const { funds } = useUserData();

  return (
    <div>Funds: {funds}</div>
  )
}
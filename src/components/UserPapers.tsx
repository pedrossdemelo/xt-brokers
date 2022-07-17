import useUserData from 'hooks/useUserData';
import React from 'react'

type Props = {}

export default function UserPapers({}: Props) {
  const { userPapers } = useUserData();

  return (
    <div>UserPapers {JSON.stringify(userPapers)}</div>
  )
}
import usePapers from 'hooks/usePapers'
import useUserData from 'hooks/useUserData'
import React from 'react'

type Props = {}

export default function AllPapers({}: Props) {
  const h = usePapers()

  return (
    <div>AllPapers {JSON.stringify(h.allPapers)}</div>
  )
}
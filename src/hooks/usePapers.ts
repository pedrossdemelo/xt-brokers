import PaperContext from 'context/PaperContext'
import React from 'react'

export default function usePapers() {
  return React.useContext(PaperContext)
}

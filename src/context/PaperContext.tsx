import useLocalStorage from 'hooks/useLocalStorage';
import React from 'react'
import { papers } from 'utils/mockData';

type Props = {
  children: React.ReactNode;
}

type PaperContextValue = {
  allPapers: typeof papers;
  setAllPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
}

const PaperContext = React.createContext<PaperContextValue>({
  allPapers: [],
  setAllPapers: () => {},
});

export function PaperProvider({ children }: Props) {
  const [allPapers, setAllPapers] = useLocalStorage('allPapers', papers);

  const value = {
    allPapers,
    setAllPapers
  }

  return (
    <PaperContext.Provider value={value}>
      {children}
    </PaperContext.Provider>
  )
}

export default PaperContext;
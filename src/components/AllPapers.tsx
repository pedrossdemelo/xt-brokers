import { AnimatePresence } from "framer-motion";
import { useUserData } from "hooks";
import Paper from "./Paper";

export default function AllPapers() {
  const { allPapers } = useUserData();

  return (
    <div>
      <h2 className="mx-4 md:mx-6 text-xl font-medium mb-2">Stocks</h2>

      <div className="px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
        <AnimatePresence>
          {allPapers.map((paper) => (
            <Paper key={paper.codAtivo} data={paper} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

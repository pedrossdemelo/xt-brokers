import { useUserData } from "hooks";
import Paper from "./Paper";

export default function AllPapers() {
  const { allPapers } = useUserData();

  return (
    <div className="grow">
      <h2 className="ml-4 text-xl font-medium mb-2">Stocks</h2>

      <div className="px-4 gap-4 flex flex-col">
        {allPapers.map((paper) => (
          <Paper key={paper.CodAtivo} data={paper} />
        ))}
      </div>
    </div>
  );
}

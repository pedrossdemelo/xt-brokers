import { useUserData } from "hooks";
import Paper from "./Paper";

export default function AllPapers() {
  const { allPapers } = useUserData();

  return (
    <div className="max-h-80 overflow-y-scroll">
      <div>AllPapers</div>

      <div>
        {allPapers.map((paper) => (
          <Paper key={paper.CodAtivo} data={paper} />
        ))}
      </div>
    </div>
  );
}

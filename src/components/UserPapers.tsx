import { useUserData } from "hooks";
import Paper from "./Paper";

export default function UserPapers() {
  const { userPapers } = useUserData();

  return (
    <>
      <div>UserPapers</div>

      <div>
        {userPapers.map((paper) => (
          <Paper key={paper.CodAtivo} data={paper} personal />
        ))}
      </div>
    </>
  );
}

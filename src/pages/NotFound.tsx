import { ViewGridIcon } from "@heroicons/react/solid";
import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function useNotFound() {
  const navigate = useNavigate();

  const goBack = React.useCallback(() => {
    navigate("/");
  }, []);

  return {
    goBack,
  };
}

export default function NotFound() {
  const { goBack } = useNotFound();

  return (
    <div>
      This page does not exist.
      <Button color="gray" onClick={goBack}>
        <ViewGridIcon className="h-6 mr-3" />
        Return to Dashboard
      </Button>
    </div>
  );
}

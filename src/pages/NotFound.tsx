import { QuestionMarkCircleIcon, ViewGridIcon } from "@heroicons/react/solid";
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
    <div className="grow flex flex-col gap-4 items-center relative justify-center">
      <QuestionMarkCircleIcon className="h-64 z-0 absolute opacity-5 top-1/2 -translate-y-1/2" />

      <h1 className="text-xl text-medium">This page does not exist.</h1>

      <Button style={{ zIndex: 10 }} color="gray" onClick={goBack}>
        <ViewGridIcon className="h-6 mr-3" />
        Return to Dashboard
      </Button>
    </div>
  );
}

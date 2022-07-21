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
    <div className="grow flex flex-col items-center relative justify-center">
      <QuestionMarkCircleIcon className="h-64 absolute opacity-5 pointer-events-none top-0 translate-y-[135%]" />

      <h1 className="text-xl text-medium mb-4">This page does not exist.</h1>

      <Button color="gray" onClick={goBack}>
        <ViewGridIcon className="h-6 mr-3" />
        Return to Dashboard
      </Button>
    </div>
  );
}

import { Button, TextInput, Timeline } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";

function useFunds() {
  const { funds, setFunds, portfolio } = useUserData();

  const [amount, setAmount] = React.useState(0);

  function addFunds() {
    setFunds(funds + amount);
  }

  function removeFunds() {
    setFunds(funds - amount);
  }

  return {
    funds,
    addFunds,
    removeFunds,
    portfolio,
    amount,
    setAmount: (e: React.ChangeEvent<HTMLInputElement>) =>
      setAmount(Math.max(0, +e.target.value)),
  };
}

export default function Funds() {
  const { funds, amount, setAmount, addFunds, removeFunds } = useFunds();

  return (
    <div className="grow">
      <div>Funds: {funds.toFixed(2)}</div>

      <TextInput type="number" value={amount} onChange={setAmount} />

      <Button onClick={addFunds}>Add Funds</Button>

      <Button onClick={removeFunds} disabled={funds < amount}>
        Remove Funds
      </Button>

      <div className="p-4">
        <Timeline>
          <Timeline.Item>
            <Timeline.Point />

            <Timeline.Content>
              <Timeline.Time>18 July 2022</Timeline.Time>

              <Timeline.Title>Deposits are now free!</Timeline.Title>

              <Timeline.Body>
                <p className="text-sm">
                  The manager has gone crazy! We are now accepting deposits
                  without fees, and... without any payments! That&apos;s right,
                  we are giving free fake virtual money!
                </p>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point />

            <Timeline.Content>
              <Timeline.Time>9 July 2022</Timeline.Time>

              <Timeline.Title>XP Inc. is hiring!</Timeline.Title>

              <Timeline.Body>
                <p className="text-sm">
                  Brazil&apos;s leading financial services company is opening up
                  100 positions tailored towards early-career software
                  engineers. Let&apos;s hope they notice me!
                </p>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
}

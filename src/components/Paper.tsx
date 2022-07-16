import React from "react";

type Props = {
  amount: number;
  ticker: string;
  price: number;
};

export default function Paper({ amount, ticker, price }: Props) {
  return (
    <>
      <div>{amount}</div>
      <div>{ticker}</div>
      <div>{price}</div>
    </>
  );
}

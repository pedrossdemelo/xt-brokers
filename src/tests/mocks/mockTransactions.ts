export const transactions = [
  {
    codAtivo: "ABCB4",
    qtdeAtivo: 10,
    valor: 157.2,
    data: "2022-07-22 15:59:30.429978+00",
    venda: false,
    id: 3,
  },
  {
    codAtivo: "ABCB4",
    qtdeAtivo: 10,
    valor: 157.2,
    data: "2022-07-22 15:59:30.429978+00",
    venda: true,
    id: 4,
  },
  {
    codAtivo: "ALUP11",
    qtdeAtivo: 10,
    valor: 270.8,
    data: "2022-07-22 15:59:30.429978+00",
    venda: false,
    id: 5,
  },
  {
    codAtivo: "ALUP11",
    qtdeAtivo: 10,
    valor: 270.8,
    data: "2022-07-22 15:59:30.429978+00",
    venda: true,
    id: 6,
  },
];

export type Transaction = typeof transactions[0];

import { FC, useContext } from "react";

import { Container } from "./styles";

import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { useTransaction } from "../../hooks/useTransaction";

export const TransactionsTable: FC = () => {
  const { transactions } = useTransaction();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="title">{transaction.title}</td>
              <td className={transaction.type}>{transaction.type === 'withdraw' 
                ? `-${formatAmount(transaction.amount)}`
                : formatAmount(transaction.amount)
              }</td>
              <td>{transaction.category}</td>
              <td>{formatDate(transaction.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
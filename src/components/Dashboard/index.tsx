import { FC } from "react";

import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

import { Container } from "./styles";

export const Dashboard: FC = () => {
  return (
    <Container> 
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
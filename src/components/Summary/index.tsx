import { FC } from "react";
import { useTransaction } from "../../hooks/useTransaction";
import { formatAmount } from "../../utils/formatAmount";

import { Container, SummaryCard } from "./styles";

import incomeIMG from '../../assets/income.svg';
import outcomeIMG from '../../assets/outcome.svg';
import totalIMG from '../../assets/total.svg';

export const Summary: FC = () => {
  const { income, outcome, total } = useTransaction();

  return (
    <Container>
      <SummaryCard>
        <header>
          <p>Entradas</p>
          <img src={incomeIMG} alt="Entradas" />
        </header>
        <strong>{formatAmount(income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <p>Saídas</p>
          <img src={outcomeIMG} alt="Saídas" />
        </header>
        <strong>- {formatAmount(outcome)}</strong>
      </SummaryCard>
      <SummaryCard activeColor={total < 0 ? 'red' : 'green'} className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIMG} alt="Total" />
        </header>
        <strong>{formatAmount(total)}</strong>
      </SummaryCard>
    </Container>
  );
}
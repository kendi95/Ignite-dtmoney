import { FC } from "react"

import logo from '../../assets/logo.svg';

import { Container, Content } from "./styles";

interface HeaderProps {
  onButtonClick: () => void
}

export const Header: FC<HeaderProps> = ({ onButtonClick }) => {
  

  return (
    <Container>
      <Content>
        <img src={logo} alt="dt money" />
        <button
          onClick={onButtonClick} 
          type="button"
        >
          Nova transação
        </button>
      </Content>
    </Container>
  );
}

import { FC, FormEvent, useContext, useEffect, useState } from "react";
import Modal from 'react-modal';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import close from '../../assets/close.svg';

import { useTransaction } from "../../hooks/useTransaction";

import { Container, TransactionTypeContainer ,TransactionTypeButton } from "./styles";

interface NewTransactionModalProps {
  isOpenTransaction: boolean;
  onCloseModal: () => void;
}

export const NewTransactionModal: FC<NewTransactionModalProps> = ({ isOpenTransaction, onCloseModal }) => {
  const { createTransaction } = useTransaction();
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmout] = useState(0);
  const [category, setCategory] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!title && amount === 0 && !category) {
        return;
      }

      await createTransaction({ 
        title,
        amount,
        category,
        type
      });

      onClearFields();
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  }

  const onClearFields = () => {
    setType('deposit');
    setTitle('');
    setAmout(0);
    setCategory('');
  }

  useEffect(() => {
    return onClearFields();
  }, []);

  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onCloseModal} 
      isOpen={isOpenTransaction}
    >
      <button type="button" onClick={onCloseModal} className="react-modal-close" >
        <img src={close} alt="Fechar" />
      </button>

      <Container onSubmit={handleSubmit}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder="Título"
          value={title}
          onChange={({ currentTarget }) => setTitle(currentTarget.value)} 
        />
        <input
          type="number" 
          placeholder="Valor"
          value={amount}
          min={0}
          onChange={({ currentTarget }) => setAmout(Number(currentTarget.value))} 
        />

        <TransactionTypeContainer>
          <TransactionTypeButton
            isActive={type === 'deposit'} 
            activeColor="green"
            type="button" 
            onClick={() => setType('deposit')}
          >
            <img src={income} alt="Entrada"/>
            <span>Entrada</span>
          </TransactionTypeButton>

          <TransactionTypeButton
            isActive={type === 'withdraw'} 
            activeColor="red"
            type="button" 
            onClick={() => setType('withdraw')}
          >
            <img src={outcome} alt="Saída"/>
            <span>Saída</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria" 
          value={category}
          onChange={({ currentTarget }) => setCategory(currentTarget.value)} 
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}
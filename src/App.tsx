import { useState } from "react";
import Modal from 'react-modal';

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyled } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

import { TransactionProvider } from './hooks/useTransaction';

Modal.setAppElement('#root');   

function App() {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  return (
    <TransactionProvider>
      <Header onButtonClick={() => setOpenTransactionModal(true)} />
      <Dashboard />

      <NewTransactionModal
        isOpenTransaction={openTransactionModal}
        onCloseModal={() => setOpenTransactionModal(false)}
      />

      <GlobalStyled />
    </TransactionProvider>
  );
}

export default App;

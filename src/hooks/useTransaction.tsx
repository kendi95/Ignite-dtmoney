import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';

import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  created_at: string;
}

type TransactionData = Omit<Transaction, 'id' | 'created_at'>

interface TransactionContextProps {
  transactions: Transaction[];
  createTransaction: (data: TransactionData) => Promise<void>;
  income: number;
  outcome: number;
  total: number;
}

const TransactionContext = createContext<TransactionContextProps>({} as TransactionContextProps);

export const TransactionProvider: FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const income = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
  }, [transactions]);

  const outcome = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'withdraw') {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
  }, [transactions]);

  const total = useMemo(() => {
    return income - outcome;
  }, [income, outcome]);

  const createTransaction = async (data: TransactionData) => {
    const response = await api.post('/transactions', {
      ...data,
      created_at: new Date()
    });
    setTransactions(oldTransactions => [...oldTransactions, response.data.transaction]);
  }

  useEffect(() => {
    async function getTransactions() {
      const response = await api.get('/transactions');
      const data = response.data.transactions;
      setTransactions(data);
    }
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction, income, outcome, total }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransaction = () => {
  return useContext(TransactionContext);
}
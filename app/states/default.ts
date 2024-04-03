import {atom} from 'jotai';
import {Transaction, TransactionType} from "~/types/Transaction";

const baseTransactions: Transaction[] = [
  {
    id: 1,
    type: "EXPENSE",
    description: "Test description",
    category: "FOOD",
    amount: 200,
    date: new Date()
  },
  {
    id: 2,
    type: "INCOME",
    description: "Test description",
    category: "ALLOWANCE",
    amount: 700,
    date: new Date()
  }
]

export const transactionTypeAtom = atom<TransactionType>("EXPENSE")

export const transactionsAtom = atom<Transaction[]>([...baseTransactions])
export const netTotalAtom = atom<number>((get) => {
  const transactions = get(transactionsAtom);
  return transactions.reduce((total, transaction) => {
    return transaction.type === "INCOME" ? total + transaction.amount : total - transaction.amount;
  }, 0);
});


import type {MetaFunction} from "@remix-run/node";
import {Input} from "~/components/ui/input"
import {Button} from "~/components/ui/button";
import TransactionCard from "~/components/TransactionCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import {useAtom} from "jotai";
import {Transaction, TransactionType} from "~/types/Transaction";
import {netTotalAtom, transactionsAtom, transactionTypeAtom} from "~/states/default";
import {IoArrowDownCircle, IoArrowUpCircle} from "react-icons/io5";
import {useEffect, useState} from "react";

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export default function Index() {
  const [transactionType, setTransactionType] = useAtom<TransactionType>(transactionTypeAtom)
  const [netTotal] = useAtom(netTotalAtom)
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    date: new Date(),
    type: transactionType,
    description: "",
    category: "ENTERTAINMENT",
    amount: 0
  })

  useEffect(() => {
    setNewTransaction(prevState => ({ ...prevState, type: transactionType }));
  }, [transactionType]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'amount') {
      setNewTransaction(prevState => ({ ...prevState, [name]: parseFloat(value) }));
    } else {
      setNewTransaction(prevState => ({ ...prevState, [name]: value }));
    }
  }

  function handleSubmit() {
    setNewTransaction(prevState => ({
      ...prevState,
      id: transactions.length + 1,
      date: new Date()
    }))
    setTransactions([...transactions, newTransaction])
    setNewTransaction({
      id: 0,
      date: new Date(),
      type: transactionType,
      description: "",
      category: "ENTERTAINMENT",
      amount: 20
    })
  }

  useEffect(() => {
    console.log('netTotal value:', netTotal);
    console.log('netTotal type:', typeof netTotal);
  }, [netTotal]);

  return (
    <div className="p-8">
      <section className="pb-4">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <h2 className="text-6xl font-bold">PHP {netTotal.toFixed(2)}</h2>
      </section>

      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form className="flex gap-2 pb-8" onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit();
        }
      }}>
        <Select defaultValue={transactionType}
                onValueChange={(value) => {
                  setTransactionType(value as TransactionType);
                }}
                name="type">
          <SelectTrigger className="w-1/4">
            {transactionType === "EXPENSE" ? (
              <div className="flex text-red-500 font-bold items-center">
                <IoArrowUpCircle className="icon"/>
                EXPENSE
              </div>
            ) : (
              <div className="flex text-green-500 font-bold items-center">
                <IoArrowDownCircle className="icon"/>
                INCOME
              </div>
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="EXPENSE">
                <div className="flex text-red-500 items-center font-bold">
                  <IoArrowUpCircle className="icon"/>
                  EXPENSE
                </div>
              </SelectItem>
              <SelectItem value="INCOME">
                <div className="flex text-green-500 items-center font-bold">
                  <IoArrowDownCircle className="icon"/>
                  INCOME
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input type="number" placeholder="Amount" name="amount" onChange={handleChange} step="any"/>
        <Input type="text" placeholder="Description" name="description" onChange={handleChange}/>
        <Button type="button" onClick={handleSubmit}>Add Transaction</Button>
      </form>
      <section className="flex flex-wrap gap-4 justify-center">
        {transactions.map(transaction => (
          <TransactionCard id={transaction.id}
                           key={transaction.id}
                           amount={transaction.amount}
                           type={transaction.type}
                           description={transaction.description}
                           category={transaction.category}
                           date={transaction.date}/>
        ))}
      </section>
    </div>
  );
}

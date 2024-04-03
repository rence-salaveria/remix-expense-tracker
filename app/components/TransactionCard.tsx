import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {AiFillEdit, AiOutlineDelete, AiOutlineDollar} from "react-icons/ai";
import {Transaction} from "~/types/Transaction";
import {cn} from "~/lib/utils";
import {useAtom} from "jotai";
import {transactionsAtom} from "~/states/default";

function TransactionCard(props: Transaction) {
  const [transactions, setTransactions] = useAtom(transactionsAtom)

  function handleDelete() {
    setTransactions((prev) => transactions.filter(transaction => transaction.id !== props.id))
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className={cn("font-bold flex items-center", {
          "text-red-500": props.type === "EXPENSE",
          "text-green-500": props.type === "INCOME"
        })}>
          <AiOutlineDollar className="mr-2 h-6 w-6"/>
          {props.amount}
        </CardTitle>
        <CardDescription>{props.date.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.description ? props.description : "No description provided"}
      </CardContent>
      <CardFooter>
        {/*<Button className="">*/}
        {/*  <AiFillEdit className="icon"/>*/}
        {/*  Edit*/}
        {/*</Button>*/}
        <Button className="bg-red-500" onClick={handleDelete}>
          <AiOutlineDelete className="icon" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TransactionCard;
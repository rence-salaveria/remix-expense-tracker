export type TransactionType = 'EXPENSE' | 'INCOME'

export type TransactionCategory = 'ENTERTAINMENT' | 'FOOD' | 'TRANSPO' | 'SALARY' | 'ALLOWANCE' | 'BONUS'

export type Transaction = {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  category: TransactionCategory;
  date: Date;
}

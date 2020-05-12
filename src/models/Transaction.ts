import { uuid } from 'uuidv4';

class Transaction {
  /* Attributes */
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  /* Passing a class instance as
     the arguments type and using a Utility Type to omit a property
  */
  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;

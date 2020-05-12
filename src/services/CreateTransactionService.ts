import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

/* Data Transfer Object responsable
   to transfer all the data related to a Transaction */
interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  // Attribute
  private transactionsRepository: TransactionsRepository;

  /* Dependency Inversion
     The service isn't responsable of how the repository is initialized/treated
  */
  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // Execute the service logic
  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw new Error(
        'Your credits are not enough to create a income with that value',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;

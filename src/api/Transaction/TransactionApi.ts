import { AxiosInstance } from 'axios';

import { transactionsUrl } from '~/config';

import { axios } from '../axiosInstance';

import { ITransaction } from './TransactionSchema';

class Transaction {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createUserTransactions = async (param: ITransaction): Promise<any> =>
    this.requestInstance.post(transactionsUrl.CREATE_USER_TRANSACTIONS, param);

  getTransaction = async (transactionId: string): Promise<any> =>
    this.requestInstance.get(transactionsUrl.GET_TRANSACTION(transactionId));

  getUserTransactions = async (userId: string): Promise<any> =>
    this.requestInstance.get(transactionsUrl.GET_USER_TRANSACTIONS(userId));
}

export const TransactionApi = new Transaction(axios);

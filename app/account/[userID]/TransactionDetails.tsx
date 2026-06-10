'use client';
import React, { useState } from 'react';
import styles from './TransactionDetails.module.scss';

export default function TransactionDetails({ transactions, accountName }) {
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactionDisplayFilter, setTransactionDisplayFilter] = useState();
  const [openTransactionId, setOpenTransactionId] = useState(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <button onClick={() => setShowTransactions((prev) => !prev)}>
          Transactions
        </button>
      </h1>
      <div style={{ display: showTransactions ? 'block' : 'none' }}>
        {' '}
        <div className={styles.tableHeader}>
          <span>Date</span>
          <span>Transaction Partner</span>
          <span>
            <button
              onClick={() =>
                setTransactionDisplayFilter((prev) =>
                  prev === 'incoming' ? undefined : 'incoming',
                )
              }
              style={{
                color:
                  transactionDisplayFilter === 'incoming' ? 'green' : 'black',
              }}
            >
              Incoming
            </button>
          </span>
          <span>
            {' '}
            <button
              onClick={() =>
                setTransactionDisplayFilter((prev) =>
                  prev === 'outgoing' ? undefined : 'outgoing',
                )
              }
              style={{
                color:
                  transactionDisplayFilter === 'outgoing' ? 'red' : 'black',
              }}
            >
              Outgoing
            </button>
          </span>
        </div>
        {transactions
          .filter((transaction) => {
            const isIncoming =
              transaction.receiver.receiverName === accountName;

            if (transactionDisplayFilter === 'incoming') {
              return isIncoming;
            }

            if (transactionDisplayFilter === 'outgoing') {
              return !isIncoming;
            }

            return true; // undefined/no filter
          })
          .map((transaction) => {
            const isIncoming =
              transaction.receiver.receiverName === accountName;

            return (
              <div
                key={transaction.id}
                className={styles.transactionRow}
                onClick={() =>
                  setOpenTransactionId((prev) =>
                    prev === transaction.id ? null : transaction.id,
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                <span className={styles.date}>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </span>

                <span className={styles.date}>
                  {isIncoming
                    ? `Sender: ${transaction.sendername}`
                    : `Receiver: ${transaction.receivername}`}
                </span>

                <span className={styles.incoming}>
                  {isIncoming
                    ? `€${Number(transaction.amount).toLocaleString()}`
                    : '-'}
                </span>

                <span className={styles.outgoing}>
                  {!isIncoming
                    ? `€${Number(transaction.amount).toLocaleString()}`
                    : '-'}
                </span>

                {openTransactionId === transaction.id && (
                  <span className={styles.date}>vici</span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

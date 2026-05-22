import { sql } from './connect';

export const getTransactionsByAccountId = async (accountId) => {
  const transactions = await sql`
  SELECT
    t.*,

    CONCAT(sender_user.first_name, ' ', sender_user.last_name) AS senderName,
    CONCAT(receiver_user.first_name, ' ', receiver_user.last_name) AS receiverName

  FROM transaction t

  JOIN accounts sender_account
    ON t.sender_id = sender_account.id
  JOIN users sender_user
    ON sender_account.user_id = sender_user.id

  JOIN accounts receiver_account
    ON t.receiver_id = receiver_account.id
  JOIN users receiver_user
    ON receiver_account.user_id = receiver_user.id

  WHERE
    t.sender_id = ${accountId}
    OR t.receiver_id = ${accountId}
`;
  return transactions;
};

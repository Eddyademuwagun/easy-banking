import { sql } from './connect';

export const getTransactionsByAccountId = async (accountId) => {
  const transactions = await sql`
    SELECT
      t.*,

      json_build_object(
        'id', sa.id,
        'user_id', sa.user_id,
        'account_type', sa.account_type,
        'current_balance', sa.current_balance,
        'available_balance', sa.available_balance,
        'iban', sa.iban,
        'bic', sa.bic,
        'first_name', su.first_name,
        'last_name', su.last_name,
        'senderName', CONCAT(su.first_name, ' ', su.last_name)
      ) AS sender,

      json_build_object(
        'id', ra.id,
        'user_id', ra.user_id,
        'account_type', ra.account_type,
        'current_balance', ra.current_balance,
        'available_balance', ra.available_balance,
        'iban', ra.iban,
        'bic', ra.bic,
        'first_name', ru.first_name,
        'last_name', ru.last_name,
        'receiverName', CONCAT(ru.first_name, ' ', ru.last_name)
      ) AS receiver

    FROM transaction t

    JOIN accounts sa ON t.sender_id = sa.id
    JOIN users su ON sa.user_id = su.id

    JOIN accounts ra ON t.receiver_id = ra.id
    JOIN users ru ON ra.user_id = ru.id

    WHERE
      t.sender_id = ${accountId}
      OR t.receiver_id = ${accountId}
  `;

  return transactions;
};

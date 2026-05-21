import { sql } from './connect';

export const getAccountsById = async (id) => {
  const [accounts] = await sql`
     SELECT
        *
      FROM
        accounts
      WHERE
        id = ${id}
    `;
  return accounts;
};

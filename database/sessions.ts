import { sql } from './connect';

// Secure database query functions below, with
// verification of session token

export const getValidSession = async (sessionToken) => {
  const [session] = await sql`
    SELECT
      sessions.*
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
  `;

  return session;
};

export const deleteSession = async (sessionToken) => {
  const [session] = await sql`
    DELETE FROM sessions
    WHERE
      token = ${sessionToken}
    RETURNING
      sessions.*
  `;

  return session;
};

// Insecure database query functions below, without
// verification of session token

export const createSessionInsecure = async (token, userId) => {
  const [session] = await sql`
    INSERT INTO
      sessions (token, user_id, expiry_timestamp)
    VALUES
      (
        ${token},
        ${userId},
         now() + interval '5 minutes'
      )
    RETURNING
      sessions.*
  `;

  // Clean up table: Delete sessions that are expired
  await sql`
    DELETE FROM sessions
    WHERE
      sessions.expiry_timestamp < now()
  `;

  return session;
};

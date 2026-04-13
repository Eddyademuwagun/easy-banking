import { sql } from './connect';

export const createUserInsecure = async (
  userName,
  lastName,
  email,
  passwordHash,
) => {
  console.log('user.ts file saving user');
  const [user] = await sql`
      INSERT INTO
        users (first_name, last_name,email, password_hash,  birth_date)
      VALUES
        (
          ${userName.toLowerCase()},
          ${lastName.toLowerCase()},
           ${email},
          ${passwordHash},

          ${'1995-03-21'}        )
      RETURNING
        id,
        first_name
    `;
  return user;
};

export const getUser = async (sessionToken) => {
  const [user] = await sql`
    SELECT
      users.id,
      users.first_name
    FROM
      users
      INNER JOIN sessions ON (
        -- Session token matches
        sessions.token = ${sessionToken}
        -- Session expiry timestamp in future (not yet expired)
        AND sessions.expiry_timestamp > now()
        -- Connect session with user
        AND users.id = sessions.user_id
      )
  `;

  return user;
};

export const getUserWithPasswordHashInsecure = async (email) => {
  console.log('user.ts file saving user');
  const [user] = await sql`
     SELECT
        id,
        first_name,
        password_hash
      FROM
        users
      WHERE
        email = ${email.toLowerCase()}
    `;
  return user;
};

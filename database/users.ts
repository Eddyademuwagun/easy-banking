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

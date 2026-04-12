import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../database/sessions';
import { getUserWithPasswordHashInsecure } from '../../../database/users';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await getUserWithPasswordHashInsecure(email);
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { message: 'Username or password invalid' },
        { status: 404 },
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    console.log(isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 },
      );
    }

    // 5. Generate session token
    const sessionToken = crypto.randomBytes(100).toString('base64');

    // 6. Insert session into `sessions` table
    const session = await createSessionInsecure(sessionToken, user.id);

    if (!session) {
      return NextResponse.json(
        {
          error: 'Session creation failed',
        },
        {
          status: 500,
        },
      );
    }

    // 7. Create secure cookie via response header
    (await cookies()).set({
      name: 'sessionToken',
      value: session.token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'email or password invalid' },
      { status: 500 },
    );
  }
}

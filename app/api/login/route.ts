import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
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

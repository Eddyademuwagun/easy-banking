import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { createUserInsecure } from '../../../database/users';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Missing user data' },
        { status: 400 },
      );
    }

    const { username, lastname, email, password } = user;

    if (!username || !lastname || !email || !password) {
      return NextResponse.json(
        { ok: false, error: 'All fields are required' },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await createUserInsecure(
      username,
      lastname,
      email,
      passwordHash,
    );

    return NextResponse.json({
      ok: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 },
    );
  }
}

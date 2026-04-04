import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { createUserInsecure } from '../../../database/users';

export async function POST(req: NextRequest) {
  console.log('API route hit');

  const body = await req.json();
  console.log('Body received:', body);
  const passwordHash = await bcrypt.hash(body.user.password, 12);
  console.log(passwordHash);

  const user = await createUserInsecure(
    body.user.username,
    body.user.lastname,
    body.user.email,
    passwordHash,
  );

  // Here you would normally save to your DB
  return NextResponse.json({
    ok: true,
    message: 'User registered successfully',
  });
}

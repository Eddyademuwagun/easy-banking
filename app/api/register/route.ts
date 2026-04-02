import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('API route hit');

  const body = await req.json();
  console.log('Body received:', body);

  // Here you would normally save to your DB
  return NextResponse.json({
    ok: true,
    message: 'User registered successfully',
  });
}

import { hashPassword, res } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res(
      {
        success: false,
        message: "An account with that e-mail already exists.",
      },
      400
    );
  }

  const hashed = hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return res({
    success: true,
    message: "Registration successful.",
  });
}

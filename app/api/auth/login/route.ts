import prisma from "@/lib/prisma";
import { verifyPassword, signToken, res, signRefreshToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.password)) {
    return res({ success: false, message: "Invalid credentials" }, 401);
  }

  const token = signToken({
    userId: user.id,
    name: user.name,
    email: user.email,
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
    name: user.name,
    email: user.email,
  });

  return res({
    success: true,
    tokens: {
      access: token,
      refresh: refreshToken,
    },
    message: "Login successful.",
  });
}

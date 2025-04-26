import prisma from "@/lib/prisma";
import { res, getUserFromRequest } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = getUserFromRequest(req);

  if (!session) {
    return res({ success: true, message: "Unauthorized" }, 401);
  }

  const topScores = await prisma.score.findMany({
    orderBy: { value: "desc" },
    take: 10,
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return res({ success: true, data: topScores });
}

export async function POST(req: NextRequest) {
  const session = getUserFromRequest(req);
  const { score, timeTaken } = await req.json();

  if (!session) {
    return res({ success: true, message: "Unauthorized" }, 401);
  }

  const existing = await prisma.score.findUnique({
    where: { userId: session.userId },
  });

  if (existing) {
    const updated = await prisma.score.update({
      where: { userId: session.userId },
      data: {
        value: score,
        timeTaken,
      },
    });

    return res({ success: true, data: updated });
  }

  const created = await prisma.score.create({
    data: {
      userId: session.userId,
      value: score,
      timeTaken,
    },
  });

  return res({
    success: true,
    data: created,
  });
}

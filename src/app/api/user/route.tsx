import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const result = await prisma.user.upsert({
    where: {
      email: data.email,
    },
    create: {
      email: data.email,
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      profile: data.profile,
      password: data?.password,
    },
    update: {
      email: data.email,
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      profile: data.profile,
      password: data?.password,
    },
  });

  return NextResponse.json(result);
}

export async function GET(request: NextRequest) {
  const email: any = request.nextUrl.searchParams.get("email");

  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return NextResponse.json({
    name: result?.name,
    email: result?.email,
    password: result?.password,
  });
}

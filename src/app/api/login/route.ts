import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY, USER } from "@/lib/const";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ sub: username }, SECRET_KEY, { expiresIn: "1h" });

    const response = new NextResponse(null, {
      status: 302,
      headers: { Location: "/" },
    });

    response.cookies.set({
      name: "token",
      value: token,
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
}

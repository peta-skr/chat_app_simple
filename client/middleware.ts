import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const cokkieStore = cookies();
  const user = cokkieStore.get("user")?.value;
  const url = request.nextUrl;

  // 後で、クッキーに正しい情報が格納されているのかを検証する

  // ログインしていないときに、ログインが必要なページを訪れた際
  if (!user && url.pathname != "/login") {
    return Response.redirect(new URL("/login", "http://localhost:3000"));
  }

  // ログインしているときに、ログインページを訪れた際
  if (user && url.pathname == "/login") {
    return Response.redirect(new URL("/", "http://localhost:3000"));
  }
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

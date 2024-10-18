import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const middleware = () => {
  const cokkieStore = cookies();
  const user = cokkieStore.get("user")?.value;
  if (user) {
    return Response.redirect(new URL("/", "http://localhost:3000"));
  }

  return false;
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

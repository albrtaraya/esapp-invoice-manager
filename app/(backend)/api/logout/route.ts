import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful" });

    response.cookies.set({
      name: "token",
      value: "",
      maxAge: 0,
      path: "/", 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "ERROR_500", msg: error }, { status: 500 });
  }
}

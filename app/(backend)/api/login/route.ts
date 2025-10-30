import { NextResponse } from "next/server";
import { MockCustomers } from "../../mocks/MockCustomers";
import { signToken } from "../../lib/jwt";

export async function POST(req: Request) {
    try {
      const { customerId } = await req.json();
  
      if (!customerId) {
        return NextResponse.json({ error: "CUSTOMER_REQUIRED" }, { status: 400 });
      }
  
      const user = MockCustomers.find((u) => u.customerId === customerId);
  
      if (!user) {
        return NextResponse.json({ error: "CUSTOMER_NOT_FOUND" }, { status: 401 });
      }
  
      const token = signToken({ sub: user.customerId, name: user.name });
  
      return NextResponse.json({
        access_token: token,
        user,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "ERROR_500", msg: error }, { status: 500 });
    }
  }
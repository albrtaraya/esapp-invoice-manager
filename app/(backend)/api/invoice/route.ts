import { NextResponse } from "next/server";
import { mockInvoices } from "../../mocks/MockInvoices";

export async function GET() {
  try {
    return NextResponse.json({ dataset: mockInvoices });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "ERROR_500", msg: error }, { status: 500 });
  }
}

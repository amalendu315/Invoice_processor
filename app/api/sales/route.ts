import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const formattedStartDate = startDate?.replace(/-/g, "/");
    const formattedEndDate = endDate?.replace(/-/g, "/");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://airiqvendorapi.azurewebsites.net/InvoiceList",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic b20gbmFtYWggc2hpdmF5OnByaW5jZQ==",
        Cookie:
          "ARRAffinity=dc44538bde588bbf33f0abdbc1a6ea1f8ff08b8b22a3727832fedbffd6bf1839; ARRAffinitySameSite=dc44538bde588bbf33f0abdbc1a6ea1f8ff08b8b22a3727832fedbffd6bf1839",
      },
      data: {
        from_date: formattedStartDate,
        to_date: formattedEndDate,
      },
    };

    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales entries" },
      { status: 500 }
    );
  }
}

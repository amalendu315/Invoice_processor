import axios from "axios";
import { NextResponse } from "next/server";

interface ResponseType {
  data: [
    {
      statusmessage:string;
      statuscode:string;
      voucherno:string;
    }
  ];
}

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    // Submit the data to the cloud server using Axios
    const response:ResponseType = await axios.post(
      "https://saleszing.info/saleszingexchange/uat/aq/vouchers.php",
      { data: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authtoken: "6719dabc927fd",
        },
      }
    );
    return NextResponse.json(response?.data);
  } catch (error) {
    console.error("Error submitting data:", error);
    return NextResponse.json(
      { error: "Failed to submit vouchers" },
      { status: 500 }
    );
  }
}

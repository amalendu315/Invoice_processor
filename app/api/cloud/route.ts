// app/api/cloud.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { vouchers } = req.body;

  try {
    // Replace with your actual cloud service integration
    const response = await fetch(
      "https://your-cloud-service.com/api/vouchers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vouchers }),
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ error: "Failed to submit vouchers" });
  }
}

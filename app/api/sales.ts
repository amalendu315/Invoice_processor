// app/api/sales.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { start, end } = req.query;

  try {
    // Replace with your actual AIRIQ API call
    const response = await fetch(
      `https://airiq-api.com/sales?start=${start}&end=${end}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch sales entries" });
  }
}

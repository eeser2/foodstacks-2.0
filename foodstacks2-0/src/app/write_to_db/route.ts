import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const filePath = path.join(process.cwd(), "/db.json");

      // Extract the updated values from the request body
      const { typeOfFood, location, distance } = req.body;

      // Read the existing data from the file
      const existingData = JSON.parse(await fs.readFile(filePath, "utf8"));

      // Update the data
      const updatedData = {
        ...existingData,
        typeOfFood,
        location,
        distance,
      };

      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

      res.status(200).json({ message: "Database updated successfully!" });
    } catch (error) {
      console.error("Error updating database:", error);
      res.status(500).json({ error: "Failed to update database." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}

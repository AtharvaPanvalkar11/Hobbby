import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const painter = formData.get("painter");
    const description = formData.get("description");
    const imageFile = formData.get("image") as File | null;

    if (
      !title ||
      !painter ||
      !description ||
      !imageFile ||
      typeof title !== "string" ||
      typeof painter !== "string" ||
      typeof description !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid form fields" },
        { status: 400 }
      );
    }

    // Read the uploaded image file data
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Create a unique filename
    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadsDir, fileName);

    // Write file to disk
    await fs.writeFile(filePath, buffer);

    // Save painting data to database
    const painting = await prisma.painting.create({
      data: {
        title,
        painter,
        description,
        imagePath: `/uploads/${fileName}`, // path relative to public folder
      },
    });

    return NextResponse.json(painting);
  } catch (error) {
    console.error("POST /api/paintings error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const paintings = await prisma.painting.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(paintings);
  } catch (error) {
    console.error("GET /api/paintings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch paintings" },
      { status: 500 }
    );
  }
}

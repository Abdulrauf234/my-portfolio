import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { initializeDatabase } from "@/lib/dbInit";

export async function GET() {
  try {
    await initializeDatabase();
    const promotions = await db.promotion.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json({ error: "Failed to fetch promotions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const { title, description, discount, code, imageUrl, active, link } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const newPromotion = await db.promotion.create({
      data: {
        title,
        description,
        discount,
        code,
        imageUrl,
        active: active !== undefined ? !!active : true,
        link,
      },
    });

    return NextResponse.json(newPromotion, { status: 201 });
  } catch (error) {
    console.error("Error creating promotion:", error);
    return NextResponse.json({ error: "Failed to create promotion" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { initializeDatabase } from "@/lib/dbInit";

export async function GET() {
  try {
    await initializeDatabase();
    const projects = await db.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const { title, description, category, imageUrl, link, featured, order } = body;

    if (!title || !description || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProject = await db.project.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        link,
        featured: !!featured,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

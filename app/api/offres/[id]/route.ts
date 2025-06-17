import { NextResponse } from "next/server"
import prisma from "@/lib/prisma" // Assurez-vous que ce chemin est correct

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const j = await prisma.job.findUnique({ where: { id } })

    if (!j) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    const job = {
      id: j.id,
      title: j.title,
      company: j.company,
      location: `${j.city}, ${j.country}`,
      country: j.country,
      city: j.city,
      commune: j.commune,
      type: j.type,
      salary: j.salary,
      posted: j.posted.toISOString().split("T")[0],
      description: j.description,
      requirements: j.requirements,
      category: j.category,
      featured: j.featured,
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error("Error fetching job by ID:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface Job {
  id: string
  title: string
  company: string
  city: string
  country: string
  commune: string
  type: string
  salary: string
  posted: Date
  description: string
  requirements: string[]
  category: string
  featured: boolean
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get("searchTerm") || ""
    const selectedCategory = searchParams.get("selectedCategory") || ""
    const contractType = searchParams.get("contractType") || ""
    const country = searchParams.get("country") || ""
    const city = searchParams.get("city") || ""
    const commune = searchParams.get("commune") || ""

    const where: any = {}

    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { company: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ]
    }
    if (selectedCategory && selectedCategory !== "all") {
      where.category = selectedCategory
    }
    if (contractType && contractType !== "all") {
      where.type = contractType
    }
    if (country) {
      where.country = country
    }
    if (city) {
      where.city = city
    }
    if (commune) {
      where.commune = commune
    }

    const prismaJobs = await prisma.job.findMany({
      where: where,
    })

    const jobs = prismaJobs.map((j: Job) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      location: `${j.city}, ${j.country}`,
      country: j.country,
      city: j.city,
      commune: j.commune,
      type: j.type,
      salary: j.salary,
      posted: j.posted.toISOString().split("T")[0], // Convert Date to string
      description: j.description,
      requirements: j.requirements,
      category: j.category,
      featured: j.featured,
    }))

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

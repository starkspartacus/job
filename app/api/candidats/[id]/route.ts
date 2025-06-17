import { NextResponse } from "next/server"
import prisma from "@/lib/prisma" // Assurez-vous que ce chemin est correct

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const c = await prisma.candidateProfile.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!c) {
      return NextResponse.json({ message: "Candidate not found" }, { status: 404 })
    }

    const candidate = {
      id: c.id,
      name: `${c.firstName} ${c.lastName}`,
      title: c.experienceLevel || "",
      location: c.city && c.country ? `${c.city}, ${c.country}` : "",
      country: c.country || "",
      city: c.city || "",
      commune: c.commune || "",
      experience: c.experienceLevel || "",
      rating: c.rating,
      reviews: c.reviews,
      avatar: c.avatar || `/placeholder.svg?height=80&width=80&text=${c.firstName?.charAt(0)}${c.lastName?.charAt(0)}`,
      skills: c.skills,
      availability: c.availability || "",
      languages: c.languages,
      lastActive: c.lastActive || "Unknown",
      verified: c.verified,
      responseTime: c.responseTime || undefined,
      responseRate: c.responseRate || undefined,
    }

    return NextResponse.json(candidate)
  } catch (error) {
    console.error("Error fetching candidate by ID:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

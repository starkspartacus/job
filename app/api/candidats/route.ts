import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma" // Assurez-vous que ce chemin est correct

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get("searchTerm") || ""
    const experience = searchParams.get("experience") || ""
    const specialty = searchParams.get("specialty") || ""
    const country = searchParams.get("country") || ""
    const city = searchParams.get("city") || ""
    const commune = searchParams.get("commune") || ""

    const where: any = {}

    if (searchTerm) {
      where.OR = [
        { firstName: { contains: searchTerm, mode: "insensitive" } },
        { lastName: { contains: searchTerm, mode: "insensitive" } },
        { experienceLevel: { contains: searchTerm, mode: "insensitive" } },
        { skills: { has: searchTerm } }, // Search in skills array
      ]
    }
    if (experience && experience !== "any") {
      where.experienceLevel = experience
    }
    if (specialty && specialty !== "all") {
      where.skills = { has: specialty }
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

    const prismaCandidates = await prisma.candidateProfile.findMany({
      where: where,
      include: { user: true }, // Inclure les données utilisateur si nécessaire
    })

    // Mapper les données Prisma vers le format attendu par le frontend
    const candidates = prismaCandidates.map((c: { 
      id: string;
      firstName: string;
      lastName: string;
      experienceLevel: string | null;
      city: string | null;
      country: string | null;
      commune: string | null;
      rating: number;
      reviews: number;
      avatar: string | null;
      skills: string[];
      availability: string | null;
      languages: string[];
      lastActive: string | null;
      verified: boolean;
      responseTime: string | null;
      responseRate: number | null;
    }) => ({
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
    }))

    return NextResponse.json(candidates)
  } catch (error) {
    console.error("Error fetching candidates:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

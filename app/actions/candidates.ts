'use server'

import { prisma } from "@/lib/prisma"
import type { Candidate } from "@/lib/api"

export async function getAllCandidates(): Promise<Candidate[]> {
  const candidates = await prisma.candidateProfile.findMany({
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        }
      }
    }
  })

  return candidates.map((candidate) => ({
    ...candidate,
    id: candidate.id.toString(),
    userId: candidate.userId.toString(),
    email: candidate.user.email,
    phone: candidate.user.phone || '',
  }))
}

export async function getCandidateById(id: string): Promise<Candidate | null> {
  const candidate = await prisma.candidateProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        }
      }
    }
  })

  if (!candidate) return null

  return {
    ...candidate,
    id: candidate.id.toString(),
    userId: candidate.userId.toString(),
    email: candidate.user.email,
    phone: candidate.user.phone || '',
  }
} 
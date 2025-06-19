'use server'

import prisma from "@/lib/prisma"

// Types pour les modèles
export type Experience = {
  id: string
  title: string
  company: string
  periodStart: string
  periodEnd: string
  description: string
  candidateId: string
}

export type Skill = {
  id: string
  name: string
  level: number
  candidateId: string
}

export type CandidateProfile = {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  dateOfBirth?: string
  gender?: string
  experienceLevel?: string
  educationLevel?: string
  languages: string[]
  availability?: string
  salaryExpectation?: string
  workAuthorization?: boolean
  rating: number
  reviews: number
  lastActive?: string
  verified: boolean
  responseTime?: string
  responseRate?: number
  country?: string
  city?: string
  commune?: string
  experiences: Experience[]
  skills: Skill[]
}

type ExperienceInput = Omit<Experience, 'id' | 'candidateId'>
type SkillInput = Omit<Skill, 'id' | 'candidateId'>

export async function getAllCandidates(): Promise<CandidateProfile[]> {
  const candidates = await prisma.candidateProfile.findMany({
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        }
      },
      experiences: true,
      skills: true,
    }
  })

  return candidates.map((candidate) => ({
    id: candidate.id.toString(),
    userId: candidate.userId.toString(),
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    email: candidate.user.email,
    phone: candidate.user.phone || '',
    avatar: candidate.avatar || undefined,
    dateOfBirth: candidate.dateOfBirth || undefined,
    gender: candidate.gender || undefined,
    experienceLevel: candidate.experienceLevel || undefined,
    educationLevel: candidate.educationLevel || undefined,
    languages: candidate.languages,
    availability: candidate.availability || undefined,
    salaryExpectation: candidate.salaryExpectation || undefined,
    workAuthorization: candidate.workAuthorization || undefined,
    rating: candidate.rating,
    reviews: candidate.reviews,
    lastActive: candidate.lastActive || undefined,
    verified: candidate.verified,
    responseTime: candidate.responseTime || undefined,
    responseRate: candidate.responseRate || undefined,
    country: candidate.country || undefined,
    city: candidate.city || undefined,
    commune: candidate.commune || undefined,
    experiences: candidate.experiences.map(exp => ({
      id: exp.id.toString(),
      candidateId: exp.candidateId.toString(),
      title: exp.title,
      company: exp.company,
      periodStart: exp.periodStart,
      periodEnd: exp.periodEnd,
      description: exp.description,
    })),
    skills: candidate.skills.map(skill => ({
      id: skill.id.toString(),
      candidateId: skill.candidateId.toString(),
      name: skill.name,
      level: skill.level,
    })),
  }))
}

export async function getCandidateById(id: string): Promise<CandidateProfile | null> {
  const candidate = await prisma.candidateProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true,
          phone: true,
        }
      },
      experiences: true,
      skills: true,
    }
  })

  if (!candidate) return null

  return {
    id: candidate.id.toString(),
    userId: candidate.userId.toString(),
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    email: candidate.user.email,
    phone: candidate.user.phone || '',
    avatar: candidate.avatar || undefined,
    dateOfBirth: candidate.dateOfBirth || undefined,
    gender: candidate.gender || undefined,
    experienceLevel: candidate.experienceLevel || undefined,
    educationLevel: candidate.educationLevel || undefined,
    languages: candidate.languages,
    availability: candidate.availability || undefined,
    salaryExpectation: candidate.salaryExpectation || undefined,
    workAuthorization: candidate.workAuthorization || undefined,
    rating: candidate.rating,
    reviews: candidate.reviews,
    lastActive: candidate.lastActive || undefined,
    verified: candidate.verified,
    responseTime: candidate.responseTime || undefined,
    responseRate: candidate.responseRate || undefined,
    country: candidate.country || undefined,
    city: candidate.city || undefined,
    commune: candidate.commune || undefined,
    experiences: candidate.experiences.map(exp => ({
      id: exp.id.toString(),
      candidateId: exp.candidateId.toString(),
      title: exp.title,
      company: exp.company,
      periodStart: exp.periodStart,
      periodEnd: exp.periodEnd,
      description: exp.description,
    })),
    skills: candidate.skills.map(skill => ({
      id: skill.id.toString(),
      candidateId: skill.candidateId.toString(),
      name: skill.name,
      level: skill.level,
    })),
  }
}

export async function updateCandidateProfile(id: string, data: Partial<Omit<CandidateProfile, 'id' | 'userId' | 'email' | 'phone' | 'experiences' | 'skills'>>) {
  return prisma.candidateProfile.update({
    where: { id },
    data,
  })
}

// Expériences
export async function addExperience(candidateId: string, exp: ExperienceInput) {
  return prisma.experience.create({
    data: { ...exp, candidateId },
  })
}

export async function updateExperience(id: string, data: Partial<ExperienceInput>) {
  return prisma.experience.update({
    where: { id },
    data,
  })
}

export async function deleteExperience(id: string) {
  return prisma.experience.delete({
    where: { id },
  })
}

// Compétences
export async function addSkill(candidateId: string, skill: SkillInput) {
  return prisma.skill.create({
    data: { ...skill, candidateId },
  })
}

export async function updateSkill(id: string, data: Partial<SkillInput>) {
  return prisma.skill.update({
    where: { id },
    data,
  })
}

export async function deleteSkill(id: string) {
  return prisma.skill.delete({
    where: { id },
  })
} 
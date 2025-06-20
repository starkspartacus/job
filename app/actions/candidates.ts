"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"
import type { AppSkill, AppExperience, AppCandidateProfile, AppEducation, AppCertification } from "@/lib/types"

// --- Skills Actions ---

export async function saveCandidateSkill(
  skillData: Omit<AppSkill, "id">,
  candidateProfileId: string,
  skillId?: string,
): Promise<AppSkill> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé : Utilisateur non connecté")
  }

  if (skillId) {
    const updatedSkill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        name: skillData.name,
        level: skillData.level,
        category: skillData.category,
      },
    })
    revalidatePath("/espace-candidat")
    return updatedSkill as AppSkill
  } else {
    const newSkill = await prisma.skill.create({
      data: {
        name: skillData.name,
        level: skillData.level,
        category: skillData.category,
        candidateProfileId: candidateProfileId,
      },
    })
    revalidatePath("/espace-candidat")
    return newSkill as AppSkill
  }
}

export async function deleteCandidateSkill(skillId: string): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }
  await prisma.skill.delete({
    where: { id: skillId },
  })
  revalidatePath("/espace-candidat")
}

// --- Experiences Actions ---

export async function saveCandidateExperience(
  experienceData: Omit<AppExperience, "id">,
  candidateProfileId: string,
  experienceId?: string,
): Promise<AppExperience> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }

  const dataToSave = {
    title: experienceData.title,
    company: experienceData.company,
    location: experienceData.location,
    periodStart: new Date(experienceData.periodStart),
    periodEnd: experienceData.periodEnd ? new Date(experienceData.periodEnd) : null,
    isCurrent: experienceData.isCurrent || false,
    description: experienceData.description,
    achievements: experienceData.achievements || [],
    candidateProfileId: candidateProfileId,
  }

  if (experienceId) {
    const updatedExperience = await prisma.experience.update({
      where: { id: experienceId },
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    // Conversion explicite des dates pour correspondre à AppExperience
    return {
      ...updatedExperience,
      periodStart: updatedExperience.periodStart.toISOString().split("T")[0],
      periodEnd: updatedExperience.periodEnd ? updatedExperience.periodEnd.toISOString().split("T")[0] : null,
    } as AppExperience
  } else {
    const newExperience = await prisma.experience.create({
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    // Conversion explicite des dates pour correspondre à AppExperience
    return {
      ...newExperience,
      periodStart: newExperience.periodStart.toISOString().split("T")[0],
      periodEnd: newExperience.periodEnd ? newExperience.periodEnd.toISOString().split("T")[0] : null,
    } as AppExperience
  }
}

export async function deleteCandidateExperience(experienceId: string): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }
  await prisma.experience.delete({
    where: { id: experienceId },
  })
  revalidatePath("/espace-candidat")
}

// --- Education Actions ---
export async function saveCandidateEducation(
  educationData: Omit<AppEducation, "id">,
  candidateProfileId: string,
  educationId?: string,
): Promise<AppEducation> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }

  const dataToSave = {
    degree: educationData.degree,
    school: educationData.school,
    location: educationData.location,
    year: educationData.year,
    mention: educationData.mention,
    candidateProfileId: candidateProfileId,
  }

  if (educationId) {
    const updatedEducation = await prisma.education.update({
      where: { id: educationId },
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    return updatedEducation as AppEducation
  } else {
    const newEducation = await prisma.education.create({
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    return newEducation as AppEducation
  }
}

export async function deleteCandidateEducation(educationId: string): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }
  await prisma.education.delete({
    where: { id: educationId },
  })
  revalidatePath("/espace-candidat")
}

// --- Certification Actions ---
export async function saveCandidateCertification(
  certificationData: Omit<AppCertification, "id">,
  candidateProfileId: string,
  certificationId?: string,
): Promise<AppCertification> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }

  const dataToSave = {
    name: certificationData.name,
    issuer: certificationData.issuer,
    date: new Date(certificationData.date),
    verified: certificationData.verified || false,
    candidateProfileId: candidateProfileId,
  }

  if (certificationId) {
    const updatedCertification = await prisma.certification.update({
      where: { id: certificationId },
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    // Conversion explicite de la date pour correspondre à AppCertification
    return {
      ...updatedCertification,
      date: updatedCertification.date.toISOString().split("T")[0],
    } as AppCertification
  } else {
    const newCertification = await prisma.certification.create({
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    // Conversion explicite de la date pour correspondre à AppCertification
    return {
      ...newCertification,
      date: newCertification.date.toISOString().split("T")[0],
    } as AppCertification
  }
}

export async function deleteCandidateCertification(certificationId: string): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé")
  }
  await prisma.certification.delete({
    where: { id: certificationId },
  })
  revalidatePath("/espace-candidat")
}

// --- Get Candidate Profile with Details ---
export async function getCandidateProfileWithDetails(): Promise<AppCandidateProfile | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    console.error("No session found for getCandidateProfileWithDetails")
    return null
  }

  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      skills: true,
      experiences: {
        orderBy: {
          periodStart: "desc",
        },
      },
      education: {
        orderBy: {
          year: "desc",
        },
      },
      certifications: {
        orderBy: {
          date: "desc",
        },
      },
    },
  })

  if (!candidateProfile) {
    console.error(`No candidate profile found for user ID: ${session.user.id}`)
    return null
  }

  const mappedExperiences = candidateProfile.experiences.map((exp) => ({
    ...exp,
    periodStart: exp.periodStart.toISOString().split("T")[0],
    periodEnd: exp.periodEnd ? exp.periodEnd.toISOString().split("T")[0] : null,
  }))

  const mappedCertifications = candidateProfile.certifications.map((cert) => ({
    ...cert,
    date: cert.date.toISOString().split("T")[0],
  }))

  return {
    ...candidateProfile,
    reviewsCount: candidateProfile.reviewsCount,
    skills: candidateProfile.skills as AppSkill[],
    experiences: mappedExperiences as AppExperience[],
    education: candidateProfile.education as AppEducation[],
    certifications: mappedCertifications as AppCertification[],
  } as AppCandidateProfile
}

export async function refreshCandidateDataAction() {
  revalidatePath("/espace-candidat")
}

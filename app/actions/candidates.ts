"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route" // Ajustez le chemin si nécessaire
import { revalidatePath } from "next/cache"
import type { AppSkill, AppExperience, AppCandidateProfile } from "@/lib/types"

// --- Skills Actions ---

export async function saveCandidateSkill(
  skillData: Omit<AppSkill, "id">, // name, level, category?
  candidateProfileId: string,
  skillId?: string, // Pour la mise à jour
): Promise<AppSkill> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Non autorisé : Utilisateur non connecté")
  }

  // Optionnel : Vérifier si le candidateProfileId appartient bien à l'utilisateur connecté
  // const profile = await prisma.candidateProfile.findUnique({ where: { id: candidateProfileId } });
  // if (!profile || profile.userId !== session.user.id) {
  //   throw new Error("Non autorisé : Profil candidat non valide");
  // }

  if (skillId) {
    // Mise à jour
    const updatedSkill = await prisma.skill.update({
      where: { id: skillId /*, candidateProfileId: candidateProfileId */ }, // Sécurité supplémentaire
      data: {
        name: skillData.name,
        level: skillData.level,
        category: skillData.category,
        // candidateProfileId n'est pas mis à jour ici
      },
    })
    revalidatePath("/espace-candidat") // ou le chemin spécifique du profil
    return updatedSkill as AppSkill // Cast si nécessaire, Prisma retourne le type Prisma
  } else {
    // Création
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

  // Optionnel : Vérifier que la compétence appartient bien au profil du candidat connecté
  // avant de supprimer.
  await prisma.skill.delete({
    where: { id: skillId /*, candidateProfile: { userId: session.user.id } */ },
  })
  revalidatePath("/espace-candidat")
}

// --- Experiences Actions ---

export async function saveCandidateExperience(
  experienceData: Omit<AppExperience, "id">, // title, company, periodStart, periodEnd?, isCurrent?, description?, achievements?
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
    periodStart: new Date(experienceData.periodStart), // Convertir string en Date
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
    // @ts-ignore TODO: Fix type mapping for dates if necessary client-side
    return updatedExperience as AppExperience
  } else {
    const newExperience = await prisma.experience.create({
      data: dataToSave,
    })
    revalidatePath("/espace-candidat")
    // @ts-ignore
    return newExperience as AppExperience
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

// Action pour récupérer le profil complet du candidat (incluant skills et experiences)
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
          periodStart: "desc", // Ordonner les expériences
        },
      },
      // user: true, // Si vous avez besoin des infos de base de l'utilisateur
    },
  })

  if (!candidateProfile) {
    console.error(`No candidate profile found for user ID: ${session.user.id}`)
    return null
  }

  // Mapper les dates d'expérience en string pour le client si AppExperience les attend en string
  const mappedExperiences = candidateProfile.experiences.map((exp) => ({
    ...exp,
    periodStart: exp.periodStart.toISOString().split("T")[0], // YYYY-MM-DD
    periodEnd: exp.periodEnd ? exp.periodEnd.toISOString().split("T")[0] : null,
  }))

  return {
    ...candidateProfile,
    reviewsCount: candidateProfile.reviewsCount, // S'assurer que le nom correspond
    skills: candidateProfile.skills as AppSkill[], // Cast si les types Prisma et App sont compatibles
    experiences: mappedExperiences as AppExperience[],
  } as AppCandidateProfile // Cast final pour s'assurer que le type de retour est correct
}

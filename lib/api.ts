// Assurez-vous que les types exportés ici (Candidate, Job, User)
// correspondent aux données que vous souhaitez manipuler côté client
// et sont dérivés ou compatibles avec les modèles Prisma.

import type {
  User as PrismaUserWithDetails, // Alias pour éviter conflit
  CandidateProfile as PrismaCandidateProfile,
  EmployerProfile as PrismaEmployerProfile,
  Job as PrismaJob,
} from "@prisma/client"

// Type pour l'utilisateur de l'API, potentiellement avec des profils
export type ApiUser = Omit<PrismaUserWithDetails, "hashedPassword" | "accounts" | "sessions"> & {
  candidateProfile?: PrismaCandidateProfile | null
  employerProfile?: PrismaEmployerProfile | null
  // Le rôle est déjà inclus dans PrismaUserWithDetails
}

// Type pour un candidat exposé par l'API
export type ApiCandidate = PrismaCandidateProfile & {
  user: Pick<PrismaUserWithDetails, "id" | "email" | "phone" | "image" | "role"> // Inclure les infos utilisateur pertinentes
}

// Type pour une offre d'emploi exposée par l'API
export type ApiJob = PrismaJob & {
  employer: Pick<PrismaEmployerProfile, "id" | "companyName" | "companyLogo"> // Inclure les infos employeur pertinentes
}

export interface ContactFormData {
  // Renommé pour éviter conflit avec ContactForm de Prisma
  name: string
  email: string
  message: string
  subject?: string
}

// --- Client API centralisé (pour le frontend) ---
// Ces fonctions feront des appels HTTP à vos Routes API côté serveur
export const api = {
  candidates: {
    getAll: async (filters?: any): Promise<ApiCandidate[]> => {
      const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch(`/api/candidats?${queryParams}`)
      if (!response.ok) throw new Error("Failed to fetch candidates")
      return response.json()
    },
    getById: async (id: string): Promise<ApiCandidate | null> => {
      const response = await fetch(`/api/candidats/${id}`)
      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`Failed to fetch candidate with ID ${id}`)
      }
      return response.json()
    },
  },
  jobs: {
    getAll: async (filters?: any): Promise<ApiJob[]> => {
      const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch(`/api/offres?${queryParams}`)
      if (!response.ok) throw new Error("Failed to fetch jobs")
      return response.json()
    },
    getById: async (id: string): Promise<ApiJob | null> => {
      const response = await fetch(`/api/offres/${id}`)
      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`Failed to fetch job with ID ${id}`)
      }
      return response.json()
    },
  },
  auth: {
    register: async (userData: any /* UserFormData de features/inscription/types.ts */) => {
      // Utiliser un type plus précis
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      return response.json() // Retourner la réponse JSON (qui peut contenir success/message/error)
    },
  },
  contact: {
    submit: async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
      console.log("Contact form submitted (simulated):", formData)
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 500))
      // Dans une vraie application, vous feriez un fetch vers une route API
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error("Failed to submit contact form");
      // return response.json();
      return { success: true, message: "Message envoyé avec succès !" }
    },
  },
}

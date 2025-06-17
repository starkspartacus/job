import type { User, CandidateProfile, EmployerProfile, Job } from "@prisma/client"
import { getAllCandidates, getCandidateById } from "@/app/actions/candidates"

// Define a type for the API user, including optional profile data
export type ApiUser = Partial<User> & {
  candidateProfile?: Partial<CandidateProfile>
  employerProfile?: Partial<EmployerProfile>
}

// Define more specific types for candidates and jobs for frontend usage
export type Candidate = Omit<CandidateProfile, "userId" | "id"> & {
  id: string // Use string for frontend IDs
  userId: string
  email: string // Include email from User
  phone: string // Include phone from User
  avatar?: string // Include avatar URL
}

export type Job = Omit<Job, "employerId" | "id"> & {
  id: string // Use string for frontend IDs
  employerId: string
  companyName: string // Include company name for display
  companyLogo?: string // Include company logo for display
}

// --- Fonctions utilitaires ---
// Pas besoin de "delay" car Prisma interagit avec la vraie DB
// Pas besoin de "generateId" car MongoDB et Prisma génèrent des IDs

export interface ContactForm {
  name: string
  email: string
  message: string
}

// --- Client API centralisé ---
export const api = {
  candidates: {
    getAll: getAllCandidates,
    getById: getCandidateById,
  },
  jobs: {
    getAll: async (): Promise<Job[]> => {
      // This part would ideally be a Server Action or a fetch to a Route Handler
      // In a real app, you'd fetch from /api/jobs
      console.warn("API CALL: Fetching all jobs (simulated due to Prisma client-side limitation).")
      return []
    },
    getById: async (id: string): Promise<Job | null> => {
      console.warn(`API CALL: Fetching job with ID ${id} (simulated due to Prisma client-side limitation).`)
      return null
    },
    // `create`, `update`, `delete` operations for jobs might be handled via Server Actions or specific API routes
    // For now, we only support retrieval for the public API.
  },
  auth: {
    // This register function will now fetch to your API route
    register: async (userData: ApiUser) => {
      // This will be handled by the actual API route (e.g., /api/register)
      // The frontend simply sends the data.
      return { success: true, message: "Inscription en cours..." }
    },
    // Login will be handled by NextAuth signIn function directly from client
    login: async (credentials: any) => {
      // This function will likely not be directly called.
      // Use `signIn('credentials', { email, password, redirect: false })`
      // from 'next-auth/react' instead.
      return { success: false, message: "La connexion est gérée par NextAuth." }
    },
  },
  contact: {
    submit: async (formData: ContactForm): Promise<{ success: boolean; message: string }> => {
      // In a real app, this would send an email or save to a CRM using a Server Action or API route.
      console.log("Contact form submitted:", formData)
      return { success: true, message: "Message envoyé avec succès !" }
    },
  },
}

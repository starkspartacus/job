import type {
  User as PrismaUser,
  CandidateProfile as PrismaCandidateProfile,
  EmployerProfile as PrismaEmployerProfile,
  Job as PrismaJob,
} from "@prisma/client"

// Define a type for the API user, including optional profile data
export type User = Partial<PrismaUser> & {
  candidateProfile?: Partial<PrismaCandidateProfile>
  employerProfile?: Partial<PrismaEmployerProfile>
}

// Define more specific types for candidates and jobs for frontend usage
export type Candidate = Omit<PrismaCandidateProfile, "userId" | "id"> & {
  id: string // Use string for frontend IDs
  userId: string
  email: string // Include email from User
  phone: string // Include phone from User
  avatar?: string // Include avatar URL
}

export type Job = Omit<PrismaJob, "employerId" | "id"> & {
  id: string // Use string for frontend IDs
  employerId: string
  companyName: string // Include company name for display
  companyLogo?: string // Include company logo for display
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

// --- Client API centralisé (pour le frontend) ---
export const api = {
  candidates: {
    getAll: async (filters?: any): Promise<Candidate[]> => {
      // Cette fonction fera un appel HTTP à votre Route API côté serveur
      const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch(`/api/candidats?${queryParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch candidates")
      }
      return response.json()
    },
    getById: async (id: string): Promise<Candidate | null> => {
      // Cette fonction fera un appel HTTP à votre Route API côté serveur
      const response = await fetch(`/api/candidats/${id}`)
      if (!response.ok) {
        // Gérer le cas où le candidat n'est pas trouvé
        if (response.status === 404) return null
        throw new Error(`Failed to fetch candidate with ID ${id}`)
      }
      return response.json()
    },
    // `create`, `update`, `delete` operations for candidates would also be API calls
  },
  jobs: {
    getAll: async (filters?: any): Promise<Job[]> => {
      // Cette fonction fera un appel HTTP à votre Route API côté serveur
      const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch(`/api/offres?${queryParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }
      return response.json()
    },
    getById: async (id: string): Promise<Job | null> => {
      // Cette fonction fera un appel HTTP à votre Route API côté serveur
      const response = await fetch(`/api/offres/${id}`)
      if (!response.ok) {
        // Gérer le cas où l'offre n'est pas trouvée
        if (response.status === 404) return null
        throw new Error(`Failed to fetch job with ID ${id}`)
      }
      return response.json()
    },
    // `create`, `update`, `delete` operations for jobs would also be API calls
  },
  auth: {
    register: async (userData: User) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const data = await response.json()
      return data
    },
    // Login is handled by NextAuth signIn function directly.
  },
  contact: {
    submit: async (formData: ContactForm): Promise<{ success: boolean; message: string }> => {
      // This would typically be an API call to a server-side endpoint
      console.log("Contact form submitted (simulated):", formData)
      return { success: true, message: "Message envoyé avec succès !" }
    },
  },
}

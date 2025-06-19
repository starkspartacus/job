import "next-auth"
import { CandidateProfile, EmployerProfile } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: string
      candidateProfile: CandidateProfile | null
      employerProfile: EmployerProfile | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    role: string
    candidateProfile: CandidateProfile | null
    employerProfile: EmployerProfile | null
  }
} 
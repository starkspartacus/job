import type {
    User as PrismaUser,
    CandidateProfile as PrismaCandidateProfile,
    EmployerProfile as PrismaEmployerProfile,
    Job as PrismaJob,
    Skill as PrismaSkill,
    Experience as PrismaExperience,
    Role as PrismaRole,
  } from "@prisma/client"
  
  // --- Enums ---
  export type Role = PrismaRole // Exporter l'enum Role
  
  // --- User & Auth Types ---
  export type AppUser = Omit<PrismaUser, "hashedPassword" | "accounts" | "sessions" | "emailVerified"> & {
    candidateProfile?: AppCandidateProfile | null // Utiliser les types App
    employerProfile?: AppEmployerProfile | null // Utiliser les types App
    emailVerified?: string | null // Convertir DateTime en string pour le client si nécessaire
  }
  
  // --- Candidate Types ---
  export type AppSkill = Omit<PrismaSkill, "candidateProfileId"> & {
    // id est déjà string
  }
  
  export type AppExperience = Omit<PrismaExperience, "candidateProfileId"> & {
    // id est déjà string
    // Convertir les dates en string pour les formulaires si nécessaire, ou gérer la conversion dans les composants
    periodStart: string // ex: "2022-01-15"
    periodEnd?: string | null // ex: "2023-05-30" ou null
  }
  
  export type AppCandidateProfile = Omit<
    PrismaCandidateProfile,
    "userId" | "user" | "skills" | "experiences" | "reviews" // 'reviews' renommé en 'reviewsCount'
  > & {
    // id est déjà string
    skills: AppSkill[]
    experiences: AppExperience[]
    reviewsCount: number // S'assurer que cela correspond au schéma
  }
  
  export type CandidateForCard = Pick<
    AppCandidateProfile,
    | "id"
    | "firstName"
    | "lastName"
    | "avatar"
    | "country"
    | "city"
    | "commune"
    | "experienceLevel" // ou un champ titre/spécialité principal
    | "rating"
    | "reviewsCount"
    | "verified"
  > & {
    mainTitle?: string // Pour afficher "Serveuse expérimentée" etc.
    skillsSummary?: string[] // Top 3 compétences
  }
  
  // --- Employer & Job Types ---
  export type AppEmployerProfile = Omit<PrismaEmployerProfile, "userId" | "user" | "jobs"> & {
    // id est déjà string
    jobs: AppJob[]
  }
  
  export type AppJob = Omit<PrismaJob, "employerProfileId" | "employer"> & {
    // id est déjà string
    employer: Pick<AppEmployerProfile, "id" | "companyName" | "companyLogo">
  }
  
  // --- Form Data Types ---
  export interface ContactFormData {
    name: string
    email: string
    message: string
    subject?: string
  }
  
  // Type pour les données du formulaire d'inscription (peut être divisé davantage)
  export type RegistrationFormData = Partial<
    Pick<
      PrismaUser,
      "email" | "phone" | "role"
      // hashedPassword sera géré côté serveur
    > &
      Pick<
        PrismaCandidateProfile,
        | "firstName"
        | "lastName"
        | "dateOfBirth"
        | "gender"
        | "experienceLevel"
        | "educationLevel"
        | "availability"
        | "salaryExpectation"
        | "workAuthorization"
        | "avatar"
        | "country"
        | "city"
        | "commune"
        | "bio"
        // skills et languages seront des string[]
      > & { skills?: string[]; languages?: string[] } & Pick<
        // Pour le formulaire
        PrismaEmployerProfile,
        | "companyName"
        | "companyType"
        | "companySize"
        | "foundingYear" // Sera string dans le form, converti en Int
        | "companyDescription"
        | "contactPerson"
        | "website"
        // socialMediaLinks sera un objet ou string JSON
        | "companyAddress"
        | "companyLogo"
        // country, city, commune sont déjà dans Candidate
      > & { socialMediaLinks?: string } // Pour le formulaire
  > & { password?: string } // Ajouter le mot de passe pour le formulaire
  
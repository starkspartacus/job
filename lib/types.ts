import type {
  User as PrismaUser,
  CandidateProfile as PrismaCandidateProfile,
  EmployerProfile as PrismaEmployerProfile,
  Job as PrismaJob,
  Skill as PrismaSkill,
  Experience as PrismaExperience,
  Education as PrismaEducation,
  Certification as PrismaCertification,
  Role as PrismaRole,
  GenderEnum as PrismaGenderEnum,
  ExperienceLevelEnum as PrismaExperienceLevelEnum,
  EducationLevelEnum as PrismaEducationLevelEnum,
  AvailabilityEnum as PrismaAvailabilityEnum,
  SkillCategoryEnum as PrismaSkillCategoryEnum,
  JobTypeEnum as PrismaJobTypeEnum,
  JobStatusEnum as PrismaJobStatusEnum,
} from "@prisma/client"

// --- Enums ---
export type Role = PrismaRole
export type Gender = PrismaGenderEnum
export type ExperienceLevel = PrismaExperienceLevelEnum
export type EducationLevel = PrismaEducationLevelEnum
export type Availability = PrismaAvailabilityEnum
export type SkillCategory = PrismaSkillCategoryEnum
export type JobType = PrismaJobTypeEnum
export type JobStatus = PrismaJobStatusEnum

// Mappage pour les labels des catégories de compétences (pour l'affichage UI)
export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  TECHNICAL: "Technique",
  SOFT_SKILL: "Compétence Douce",
  LANGUAGE: "Langue",
  MANAGEMENT: "Management",
  DESIGN: "Design",
  MARKETING: "Marketing",
  SALES: "Vente",
  OTHER: "Autre",
}

// --- User & Auth Types ---
export type AppUser = Omit<PrismaUser, "hashedPassword" | "accounts" | "sessions" | "emailVerified"> & {
  candidateProfile?: AppCandidateProfile | null
  employerProfile?: AppEmployerProfile | null
  emailVerified?: string | null
}

// --- Candidate Types ---
export type AppSkill = Omit<PrismaSkill, "candidateProfileId"> & {
  category?: SkillCategory // Utilise la nouvelle énumération
}

export type AppExperience = Omit<PrismaExperience, "candidateProfileId"> & {
  periodStart: string
  periodEnd?: string | null
}

export type AppEducation = Omit<PrismaEducation, "candidateProfileId"> & {
  // year est déjà un nombre
}

export type AppCertification = Omit<PrismaCertification, "candidateProfileId"> & {
  date: string // Convertir DateTime en string pour le client
}

export type AppCandidateProfile = Omit<
  PrismaCandidateProfile,
  | "userId"
  | "user"
  | "skills"
  | "experiences"
  | "education"
  | "certifications"
  | "reviews"
  | "gender"
  | "experienceLevel"
  | "educationLevel"
  | "availability"
> & {
  skills: AppSkill[]
  experiences: AppExperience[]
  education: AppEducation[]
  certifications: AppCertification[]
  reviewsCount: number
  gender?: Gender
  experienceLevel?: ExperienceLevel
  educationLevel?: EducationLevel
  availability?: Availability
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
  | "experienceLevel"
  | "rating"
  | "reviewsCount"
  | "verified"
> & {
  mainTitle?: string
  skillsSummary?: string[]
}

// --- Employer & Job Types ---
export type AppEmployerProfile = Omit<PrismaEmployerProfile, "userId" | "user" | "jobs"> & {
  jobs: AppJob[]
}

export type AppJob = Omit<PrismaJob, "employerProfileId" | "employer" | "jobType" | "status"> & {
  employer: Pick<AppEmployerProfile, "id" | "companyName" | "companyLogo">
  jobType: JobType
  status: JobStatus
}

// --- Form Data Types ---
export interface ContactFormData {
  name: string
  email: string
  message: string
  subject?: string
}

export type RegistrationFormData = Partial<
  Pick<PrismaUser, "email" | "phone"> & { password?: string; role?: "candidate" | "employer" } & Pick<
      PrismaCandidateProfile,
      "firstName" | "lastName" | "dateOfBirth" | "avatar" | "country" | "city" | "commune" | "bio" | "languages"
    > & {
      gender?: string
      experienceLevel?: string
      educationLevel?: string
      availability?: string
      skills?: string[]
    } & Pick<
      PrismaEmployerProfile,
      | "companyName"
      | "companyType"
      | "companySize"
      | "foundingYear"
      | "companyDescription"
      | "contactPerson"
      | "website"
      | "companyAddress"
      | "companyLogo"
    > & { socialMediaLinks?: string }
>

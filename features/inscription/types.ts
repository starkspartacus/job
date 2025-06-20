import type { Role } from "@prisma/client"

export interface UserFormData {
  // Champs communs
  email?: string
  password?: string
  phone?: string
  role?: Role // Utiliser l'enum Role

  // Champs spécifiques au candidat
  firstName?: string
  lastName?: string
  dateOfBirth?: string // Format YYYY-MM-DD
  gender?: string
  experienceLevel?: string
  educationLevel?: string
  skills?: string[] // Sera un tableau de chaînes
  languages?: string[] // Sera un tableau de chaînes
  availability?: string
  salaryExpectation?: string
  workAuthorization?: boolean
  avatar?: string // URL de l'image

  // Champs spécifiques à l'employeur
  companyName?: string
  companyType?: string
  companySize?: string
  foundingYear?: string // Sera une chaîne, convertie en nombre côté serveur
  companyDescription?: string
  contactPerson?: string
  website?: string
  socialMediaLinks?: string // Pourrait être un JSON stringifié ou géré différemment
  companyAddress?: string
  country?: string
  city?: string
  commune?: string
  companyLogo?: string // URL de l'image
}

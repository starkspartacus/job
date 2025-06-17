export interface UserFormData {
    email?: string
    password?: string
    phone?: string
    role?: "candidate" | "employer"
    // Candidate specific fields
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    gender?: string
    experienceLevel?: string
    educationLevel?: string
    skills?: string[]
    languages?: string[]
    availability?: string
    salaryExpectation?: string
    workAuthorization?: boolean
    avatar?: string // For candidate profile image URL
    // Employer specific fields
    companyName?: string
    companyType?: string
    companySize?: string
    foundingYear?: string
    companyDescription?: string
    contactPerson?: string
    website?: string
    socialMedia?: string
    companyAddress?: string
    country?: string
    city?: string
    commune?: string
    companyLogo?: string // For employer company logo URL
  }
  
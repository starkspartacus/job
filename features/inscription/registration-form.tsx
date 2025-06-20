"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"

import { AccountStep } from "@/components/inscription/account-step"
import { CandidateProfileStep } from "@/components/inscription/candidate-profile-step"
import { EmployerProfileStep } from "@/components/inscription/employer-profile-step"
import { ConfirmationStep } from "@/components/inscription/confirmation-step"
import { ProgressHeader } from "@/components/inscription/progress-header"
import type { UserFormData } from "./types" // Import the shared type

export function RegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<"CANDIDATE" | "EMPLOYER">("CANDIDATE")
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    phone: "",
    role: "CANDIDATE",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    experienceLevel: "",
    educationLevel: "",
    skills: [],
    languages: [],
    availability: "",
    salaryExpectation: "",
    workAuthorization: false,
    avatar: "",
    companyName: "",
    companyType: "",
    companySize: "",
    foundingYear: "",
    companyDescription: "",
    contactPerson: "",
    website: "",
    companyAddress: "",
    country: "",
    city: "",
    commune: "",
    companyLogo: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field as keyof UserFormData]: value }))
    setErrors((prev) => ({ ...prev, [field as keyof UserFormData]: "" }))
  }

  const handleLocationChange = (locationData: { country: string; city: string; commune: string }) => {
    setFormData((prev) => ({
      ...prev,
      country: locationData.country,
      city: locationData.city,
      commune: locationData.commune,
    }))
    setErrors((prev) => ({ ...prev, country: "", city: "", commune: "" }))
  }

  const handleSkillsChange = (skill: string, isChecked: boolean) => {
    setFormData((prev) => {
      const currentSkills = prev.skills || []
      if (isChecked) {
        return { ...prev, skills: [...currentSkills, skill] }
      } else {
        return { ...prev, skills: currentSkills.filter((s) => s !== skill) }
      }
    })
  }

  const handleLanguagesChange = (lang: string, isChecked: boolean) => {
    setFormData((prev) => {
      const currentLanguages = prev.languages || []
      if (isChecked) {
        return { ...prev, languages: [...currentLanguages, lang] }
      } else {
        return { ...prev, languages: currentLanguages.filter((l) => l !== lang) }
      }
    })
  }

  const handleUserTypeChange = (type: "candidate" | "employer") => {
    const upperType = type.toUpperCase() as "CANDIDATE" | "EMPLOYER"
    setUserType(upperType)
    setFormData((prev) => ({ ...prev, role: upperType }))
  }

  const validateStep = () => {
    const currentErrors: Record<string, string> = {}
    if (step === 1) {
      if (!formData.email) currentErrors.email = "L'email est requis."
      if (!formData.password) currentErrors.password = "Le mot de passe est requis."
      if (!formData.phone) currentErrors.phone = "Le numéro de téléphone est requis."
      if (!formData.role) currentErrors.role = "Le type d'utilisateur est requis."
    } else if (step === 2) {
      if (userType === "CANDIDATE") {
        if (!formData.firstName) currentErrors.firstName = "Le prénom est requis."
        if (!formData.lastName) currentErrors.lastName = "Le nom est requis."
        if (!formData.dateOfBirth) currentErrors.dateOfBirth = "La date de naissance est requise."
        if (!formData.gender) currentErrors.gender = "Le genre est requis."
        if (!formData.experienceLevel) currentErrors.experienceLevel = "Le niveau d'expérience est requis."
        if (!formData.educationLevel) currentErrors.educationLevel = "Le niveau d'études est requis."
        if (!formData.skills || formData.skills.length === 0)
          currentErrors.skills = "Au moins une compétence est requise."
        if (!formData.languages || formData.languages.length === 0)
          currentErrors.languages = "Au moins une langue est requise."
        if (!formData.availability) currentErrors.availability = "La disponibilité est requise."
        if (!formData.salaryExpectation) currentErrors.salaryExpectation = "Les prétentions salariales sont requises."
        if (formData.workAuthorization === undefined)
          currentErrors.workAuthorization = "L'autorisation de travailler est requise."
      } else {
        // Employer
        if (!formData.companyName) currentErrors.companyName = "Le nom de l'entreprise est requis."
        if (!formData.companyType) currentErrors.companyType = "Le type d'entreprise est requis."
        if (!formData.companySize) currentErrors.companySize = "La taille de l'entreprise est requise."
        if (!formData.foundingYear) currentErrors.foundingYear = "L'année de création est requise."
        if (!formData.companyDescription) currentErrors.companyDescription = "La description est requise."
        if (!formData.contactPerson) currentErrors.contactPerson = "La personne de contact est requise."
        if (!formData.country) currentErrors.country = "Le pays est requis."
        if (!formData.city) currentErrors.city = "La ville est requise."
        if (!formData.commune) currentErrors.commune = "La commune est requise."
      }
    }
    setErrors(currentErrors)
    return Object.keys(currentErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) {
      toast({
        title: "Erreur d'inscription",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: userType.toUpperCase(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Inscription réussie !",
          description: data.message,
          variant: "default",
        })
        router.push("/connexion")
      } else {
        toast({
          title: "Erreur d'inscription",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Erreur inattendue",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const progressValue = (step / 3) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl overflow-hidden">
        <ProgressHeader step={step} progressValue={progressValue} />
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <AccountStep
                formData={{
                  ...formData,
                  role: formData.role?.toLowerCase() as "candidate" | "employer",
                }}
                errors={errors}
                handleInputChange={handleInputChange}
                setUserType={handleUserTypeChange}
                userType={userType.toLowerCase() as "candidate" | "employer"}
              />
            )}

            {step === 2 && (
              <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as "CANDIDATE" | "EMPLOYER")}>
                <TabsList>
                  <Button variant="outline" size="sm" onClick={() => setUserType("CANDIDATE")}>
                    Candidate
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setUserType("EMPLOYER")}>
                    Employer
                  </Button>
                </TabsList>
                <TabsContent value="CANDIDATE" className={userType === "CANDIDATE" ? "block" : "hidden"}>
                  <CandidateProfileStep
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleSkillsChange={handleSkillsChange}
                    handleLanguagesChange={handleLanguagesChange}
                  />
                </TabsContent>
                <TabsContent value="EMPLOYER" className={userType === "EMPLOYER" ? "block" : "hidden"}>
                  <EmployerProfileStep
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleLocationChange={handleLocationChange}
                  />
                </TabsContent>
              </Tabs>
            )}

            {step === 3 && (
              <ConfirmationStep
                formData={{
                  ...formData,
                  role: formData.role?.toLowerCase() as "candidate" | "employer",
                }}
                userType={userType.toLowerCase() as "candidate" | "employer"}
              />
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} disabled={loading}>
                  Précédent
                </Button>
              )}
              {step < 3 && (
                <Button type="button" onClick={nextStep} className="ml-auto" disabled={loading}>
                  Suivant
                </Button>
              )}
              {step === 3 && (
                <Button type="submit" className="ml-auto" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    "Finaliser l'inscription"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

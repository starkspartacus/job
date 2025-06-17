"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadDropzone } from "@uploadthing/react"
import { toast } from "@/hooks/use-toast"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

interface CandidateProfileStepProps {
  formData: {
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
    avatar?: string
  }
  errors: Record<string, string>
  handleInputChange: (field: string, value: any) => void
  handleSkillsChange: (skill: string, isChecked: boolean) => void
  handleLanguagesChange: (lang: string, isChecked: boolean) => void
}

export function CandidateProfileStep({
  formData,
  errors,
  handleInputChange,
  handleSkillsChange,
  handleLanguagesChange,
}: CandidateProfileStepProps) {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Votre profil candidat</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            value={formData.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            value={formData.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date de naissance *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            required
            className={errors.dateOfBirth ? "border-red-500" : ""}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Genre *</Label>
          <Select value={formData.gender || ""} onValueChange={(value) => handleInputChange("gender", value)}>
            <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Homme</SelectItem>
              <SelectItem value="female">Femme</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Niveau d'expérience *</Label>
          <Select
            value={formData.experienceLevel || ""}
            onValueChange={(value) => handleInputChange("experienceLevel", value)}
          >
            <SelectTrigger className={errors.experienceLevel ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (0-2 ans)</SelectItem>
              <SelectItem value="mid">Intermédiaire (2-5 ans)</SelectItem>
              <SelectItem value="senior">Senior (5+ ans)</SelectItem>
            </SelectContent>
          </Select>
          {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="educationLevel">Niveau d'études *</Label>
          <Select
            value={formData.educationLevel || ""}
            onValueChange={(value) => handleInputChange("educationLevel", value)}
          >
            <SelectTrigger className={errors.educationLevel ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun</SelectItem>
              <SelectItem value="primary">Primaire</SelectItem>
              <SelectItem value="secondary">Secondaire</SelectItem>
              <SelectItem value="vocational">Professionnel</SelectItem>
              <SelectItem value="bachelor">Licence</SelectItem>
              <SelectItem value="master">Master</SelectItem>
            </SelectContent>
          </Select>
          {errors.educationLevel && <p className="text-red-500 text-sm">{errors.educationLevel}</p>}
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Label>Compétences clés *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            "Service client",
            "Cuisine",
            "Mixologie",
            "Gestion de stock",
            "Encaissement",
            "Sécurité",
            "Animation",
            "Leadership",
          ].map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${skill}`}
                checked={formData.skills?.includes(skill)}
                onCheckedChange={(checked) => handleSkillsChange(skill, !!checked)}
              />
              <Label htmlFor={`skill-${skill}`}>{skill}</Label>
            </div>
          ))}
        </div>
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
      </div>

      <div className="space-y-2 mt-4">
        <Label>Langues parlées *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {["Français", "Anglais", "Arabe", "Wolof", "Bambara", "Ewe", "Fon", "Mooré"].map((lang) => (
            <div key={lang} className="flex items-center space-x-2">
              <Checkbox
                id={`lang-${lang}`}
                checked={formData.languages?.includes(lang)}
                onCheckedChange={(checked) => handleLanguagesChange(lang, !!checked)}
              />
              <Label htmlFor={`lang-${lang}`}>{lang}</Label>
            </div>
          ))}
        </div>
        {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="availability">Disponibilité *</Label>
          <Select
            value={formData.availability || ""}
            onValueChange={(value) => handleInputChange("availability", value)}
          >
            <SelectTrigger className={errors.availability ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immédiatement</SelectItem>
              <SelectItem value="1-week">Sous 1 semaine</SelectItem>
              <SelectItem value="2-weeks">Sous 2 semaines</SelectItem>
              <SelectItem value="1-month">Sous 1 mois</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
          {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryExpectation">Prétentions salariales (FCFA/mois) *</Label>
          <Input
            id="salaryExpectation"
            type="text"
            placeholder="Ex: 150000 - 200000"
            value={formData.salaryExpectation || ""}
            onChange={(e) => handleInputChange("salaryExpectation", e.target.value)}
            required
            className={errors.salaryExpectation ? "border-red-500" : ""}
          />
          {errors.salaryExpectation && <p className="text-red-500 text-sm">{errors.salaryExpectation}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="workAuthorization"
          checked={formData.workAuthorization}
          onCheckedChange={(checked) => handleInputChange("workAuthorization", !!checked)}
        />
        <Label htmlFor="workAuthorization">J'ai l'autorisation de travailler dans le pays *</Label>
        {errors.workAuthorization && <p className="text-red-500 text-sm">{errors.workAuthorization}</p>}
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="avatar">Photo de profil</Label>
        <UploadDropzone<OurFileRouter, "profileImage">
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              handleInputChange("avatar", res[0].url)
              toast({
                title: "Photo téléchargée !",
                description: "Votre photo de profil a été téléchargée avec succès.",
              })
            }
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "Erreur de téléchargement",
              description: `Erreur: ${error.message}`,
              variant: "destructive",
            })
          }}
        />
        {formData.avatar && (
          <div className="mt-2">
            <img
              src={formData.avatar || "/placeholder.svg"}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}

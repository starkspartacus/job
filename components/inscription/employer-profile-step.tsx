"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationSelector } from "@/components/ui/location-selector"
import { UploadDropzone } from "@uploadthing/react"
import { toast } from "@/hooks/use-toast"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

interface EmployerProfileStepProps {
  formData: {
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
    companyLogo?: string
  }
  errors: Record<string, string>
  handleInputChange: (field: string, value: any) => void
  handleLocationChange: (locationData: { country: string; city: string; commune: string }) => void
}

export function EmployerProfileStep({
  formData,
  errors,
  handleInputChange,
  handleLocationChange,
}: EmployerProfileStepProps) {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Informations de votre entreprise</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nom de l'entreprise *</Label>
          <Input
            id="companyName"
            value={formData.companyName || ""}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            required
            className={errors.companyName ? "border-red-500" : ""}
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyType">Type d'entreprise *</Label>
          <Select value={formData.companyType || ""} onValueChange={(value) => handleInputChange("companyType", value)}>
            <SelectTrigger className={errors.companyType ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="hotel">Hôtel</SelectItem>
              <SelectItem value="bar">Bar/Lounge</SelectItem>
              <SelectItem value="nightclub">Boîte de nuit</SelectItem>
              <SelectItem value="catering">Traiteur</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          {errors.companyType && <p className="text-red-500 text-sm">{errors.companyType}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="companySize">Taille de l'entreprise *</Label>
          <Select value={formData.companySize || ""} onValueChange={(value) => handleInputChange("companySize", value)}>
            <SelectTrigger className={errors.companySize ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employés</SelectItem>
              <SelectItem value="11-50">11-50 employés</SelectItem>
              <SelectItem value="51-200">51-200 employés</SelectItem>
              <SelectItem value="200+">200+ employés</SelectItem>
            </SelectContent>
          </Select>
          {errors.companySize && <p className="text-red-500 text-sm">{errors.companySize}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="foundingYear">Année de création *</Label>
          <Input
            id="foundingYear"
            type="number"
            placeholder="Ex: 2005"
            value={formData.foundingYear || ""}
            onChange={(e) => handleInputChange("foundingYear", e.target.value)}
            required
            className={errors.foundingYear ? "border-red-500" : ""}
          />
          {errors.foundingYear && <p className="text-red-500 text-sm">{errors.foundingYear}</p>}
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Label htmlFor="companyDescription">Description de l'entreprise *</Label>
        <Input
          id="companyDescription"
          placeholder="Décrivez votre établissement et sa culture..."
          value={formData.companyDescription || ""}
          onChange={(e) => handleInputChange("companyDescription", e.target.value)}
          required
          className={errors.companyDescription ? "border-red-500" : ""}
        />
        {errors.companyDescription && <p className="text-red-500 text-sm">{errors.companyDescription}</p>}
      </div>
      <div className="space-y-2 mt-4">
        <Label htmlFor="contactPerson">Personne de contact (RH/Manager) *</Label>
        <Input
          id="contactPerson"
          placeholder="Nom du responsable du recrutement"
          value={formData.contactPerson || ""}
          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
          required
          className={errors.contactPerson ? "border-red-500" : ""}
        />
        {errors.contactPerson && <p className="text-red-500 text-sm">{errors.contactPerson}</p>}
      </div>
      <div className="space-y-2 mt-4">
        <Label htmlFor="companyAddress">Adresse de l'entreprise</Label>
        <Input
          id="companyAddress"
          placeholder="Adresse complète"
          value={formData.companyAddress || ""}
          onChange={(e) => handleInputChange("companyAddress", e.target.value)}
        />
      </div>
      <div className="space-y-2 mt-4">
        <Label>Localisation de l'entreprise *</Label>
        <LocationSelector
          onLocationChange={handleLocationChange}
          defaultValues={{
            country: formData.country,
            city: formData.city,
            commune: formData.commune,
          }}
          className={errors.country || errors.city || errors.commune ? "border-red-500 rounded-md p-2" : ""}
        />
        {(errors.country || errors.city || errors.commune) && (
          <p className="text-red-500 text-sm">Veuillez sélectionner une localisation complète.</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="website">Site web</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://votreentreprise.com"
            value={formData.website || ""}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="socialMedia">Lien réseaux sociaux</Label>
          <Input
            id="socialMedia"
            type="url"
            placeholder="https://facebook.com/votreentreprise"
            value={formData.socialMedia || ""}
            onChange={(e) => handleInputChange("socialMedia", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Label htmlFor="companyLogo">Logo de l'entreprise</Label>
        <UploadDropzone<OurFileRouter, "profileImage">
          endpoint="profileImage" // Using the same endpoint for simplicity, can be a different one
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              handleInputChange("companyLogo", res[0].url)
              toast({
                title: "Logo téléchargé !",
                description: "Le logo de votre entreprise a été téléchargé avec succès.",
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
        {formData.companyLogo && (
          <div className="mt-2">
            <img
              src={formData.companyLogo || "/placeholder.svg"}
              alt="Company Logo Preview"
              className="w-24 h-24 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  )
}

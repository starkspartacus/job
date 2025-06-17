"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInput } from "@/components/ui/phone-input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AccountStepProps {
  formData: {
    email?: string
    password?: string
    phone?: string
    role?: "candidate" | "employer"
  }
  errors: Record<string, string>
  handleInputChange: (field: string, value: any) => void
  setUserType: (type: "candidate" | "employer") => void
  userType: "candidate" | "employer"
}

export function AccountStep({ formData, errors, handleInputChange, setUserType, userType }: AccountStepProps) {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Informations de compte</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe *</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Label htmlFor="phone">Numéro de téléphone *</Label>
        <PhoneInput
          value={formData.phone || ""}
          onChange={(value) => handleInputChange("phone", value)}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div className="space-y-2 mt-4">
        <Label>Vous êtes *</Label>
        <Tabs
          defaultValue={userType}
          onValueChange={(value: string) => {
            const typedValue = value as "candidate" | "employer"
            setUserType(typedValue)
            handleInputChange("role", typedValue)
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="candidate">Candidat</TabsTrigger>
            <TabsTrigger value="employer">Employeur</TabsTrigger>
          </TabsList>
        </Tabs>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>
    </div>
  )
}

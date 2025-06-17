"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AFRICAN_COUNTRIES, validatePhoneNumber } from "@/lib/countries-data"
import { AlertCircle, CheckCircle } from "lucide-react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  selectedCountry?: string
  onCountryChange?: (countryCode: string, dialCode: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
}

export function PhoneInput({
  value,
  onChange,
  selectedCountry,
  onCountryChange,
  label = "Téléphone",
  placeholder = "Numéro de téléphone",
  required = false,
  className = "",
}: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState<string>(selectedCountry || "SN")
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const selectedCountryData = AFRICAN_COUNTRIES.find((c) => c.code === countryCode)

  useEffect(() => {
    if (selectedCountry && selectedCountry !== countryCode) {
      setCountryCode(selectedCountry)
    }
  }, [selectedCountry])

  useEffect(() => {
    if (value && countryCode) {
      const valid = validatePhoneNumber(value, countryCode)
      setIsValid(valid)
    } else {
      setIsValid(null)
    }
  }, [value, countryCode])

  const handleCountryChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode)
    const country = AFRICAN_COUNTRIES.find((c) => c.code === newCountryCode)
    if (country && onCountryChange) {
      onCountryChange(newCountryCode, country.dialCode)
    }
    // Clear phone number when country changes
    onChange("")
  }

  const handlePhoneChange = (phoneValue: string) => {
    // Remove any non-digit characters except + and spaces
    const cleanedValue = phoneValue.replace(/[^\d\s+]/g, "")
    onChange(cleanedValue)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="phone">
        {label} {required && "*"}
      </Label>
      <div className="flex space-x-2">
        {/* Country Code Selector */}
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AFRICAN_COUNTRIES.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm">{country.dialCode}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Phone Number Input */}
        <div className="flex-1 relative">
          <Input
            id="phone"
            type="tel"
            value={value}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={`${selectedCountryData?.dialCode || "+221"} ${placeholder}`}
            className={`pr-10 ${
              isValid === true
                ? "border-green-500 focus:border-green-500"
                : isValid === false
                  ? "border-red-500 focus:border-red-500"
                  : ""
            }`}
          />
          {isValid !== null && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isValid ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>

      {isValid === false && value && (
        <p className="text-sm text-red-500">Format de numéro invalide pour {selectedCountryData?.name}</p>
      )}

      {selectedCountryData && (
        <p className="text-xs text-gray-500">
          Format attendu pour {selectedCountryData.name}: {selectedCountryData.dialCode} suivi de 8-10 chiffres
        </p>
      )}
    </div>
  )
}

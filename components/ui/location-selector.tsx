"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AFRICAN_COUNTRIES, getCitiesByCountry, getCommunesByCity } from "@/lib/countries-data"

interface LocationSelectorProps {
  onLocationChange: (location: {
    country: string
    city: string
    commune: string
    dialCode: string
  }) => void
  defaultValues?: {
    country?: string
    city?: string
    commune?: string
  }
  className?: string
}

export function LocationSelector({ onLocationChange, defaultValues, className = "" }: LocationSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultValues?.country || "")
  const [selectedCity, setSelectedCity] = useState<string>(defaultValues?.city || "")
  const [selectedCommune, setSelectedCommune] = useState<string>(defaultValues?.commune || "")

  const [availableCities, setAvailableCities] = useState<Array<{ name: string; communes: string[] }>>([])
  const [availableCommunes, setAvailableCommunes] = useState<string[]>([])

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCitiesByCountry(selectedCountry)
      setAvailableCities(cities)
      setSelectedCity("")
      setSelectedCommune("")
      setAvailableCommunes([])
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedCountry && selectedCity) {
      const communes = getCommunesByCity(selectedCountry, selectedCity)
      setAvailableCommunes(communes)
      setSelectedCommune("")
    }
  }, [selectedCountry, selectedCity])

  useEffect(() => {
    const country = AFRICAN_COUNTRIES.find((c) => c.code === selectedCountry)
    if (country) {
      onLocationChange({
        country: selectedCountry,
        city: selectedCity,
        commune: selectedCommune,
        dialCode: country.dialCode,
      })
    }
  }, [selectedCountry, selectedCity, selectedCommune, onLocationChange])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Country Selection */}
      <div className="space-y-2">
        <Label htmlFor="country">Pays *</Label>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez votre pays" />
          </SelectTrigger>
          <SelectContent>
            {AFRICAN_COUNTRIES.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-gray-500 text-sm">({country.dialCode})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Selection */}
      <div className="space-y-2">
        <Label htmlFor="city">Ville *</Label>
        <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedCountry}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={selectedCountry ? "Sélectionnez votre ville" : "Sélectionnez d'abord un pays"} />
          </SelectTrigger>
          <SelectContent>
            {availableCities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Commune Selection */}
      <div className="space-y-2">
        <Label htmlFor="commune">Commune/Quartier *</Label>
        <Select value={selectedCommune} onValueChange={setSelectedCommune} disabled={!selectedCity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={selectedCity ? "Sélectionnez votre commune" : "Sélectionnez d'abord une ville"} />
          </SelectTrigger>
          <SelectContent>
            {availableCommunes.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {commune}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

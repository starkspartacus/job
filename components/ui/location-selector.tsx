"use client"

import { useState, useEffect, useCallback } from "react"
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
  // États
  const [internalValues, setInternalValues] = useState({
    country: defaultValues?.country || "",
    city: defaultValues?.city || "",
    commune: defaultValues?.commune || ""
  })

  const [availableCities, setAvailableCities] = useState<Array<{ name: string; communes: string[] }>>([])
  const [availableCommunes, setAvailableCommunes] = useState<string[]>([])

  // Chargement initial
  useEffect(() => {
    if (internalValues.country) {
      const cities = getCitiesByCountry(internalValues.country)
      setAvailableCities(cities)
      
      if (internalValues.city) {
        const communes = getCommunesByCity(internalValues.country, internalValues.city)
        setAvailableCommunes(communes)
      }
    }
  }, []) // Seulement au montage

  // Mise à jour des villes
  useEffect(() => {
    if (internalValues.country) {
      const cities = getCitiesByCountry(internalValues.country)
      setAvailableCities(cities)
      setAvailableCommunes([])
      setInternalValues(prev => ({ ...prev, city: "", commune: "" }))
    }
  }, [internalValues.country])

  // Mise à jour des communes
  useEffect(() => {
    if (internalValues.country && internalValues.city) {
      const communes = getCommunesByCity(internalValues.country, internalValues.city)
      setAvailableCommunes(communes)
      setInternalValues(prev => ({ ...prev, commune: "" }))
    }
  }, [internalValues.country, internalValues.city])

  // Gestion des changements
  const handleChange = useCallback((type: 'country' | 'city' | 'commune', value: string) => {
    setInternalValues(prev => {
      const newValues = { ...prev, [type]: value }
      
      // Notifier le parent seulement quand tous les champs sont remplis
      if (newValues.country && newValues.city && newValues.commune) {
        const country = AFRICAN_COUNTRIES.find(c => c.code === newValues.country)
        if (country) {
          onLocationChange({
            country: newValues.country,
            city: newValues.city,
            commune: newValues.commune,
            dialCode: country.dialCode
          })
        }
      }
      
      return newValues
    })
  }, [onLocationChange])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Pays */}
      <div className="space-y-2">
        <Label htmlFor="country">Pays *</Label>
        <Select 
          value={internalValues.country} 
          onValueChange={(value) => handleChange('country', value)}
        >
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

      {/* Ville */}
      <div className="space-y-2">
        <Label htmlFor="city">Ville *</Label>
        <Select 
          value={internalValues.city} 
          onValueChange={(value) => handleChange('city', value)} 
          disabled={!internalValues.country}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={internalValues.country ? "Sélectionnez votre ville" : "Sélectionnez d'abord un pays"} />
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

      {/* Commune */}
      <div className="space-y-2">
        <Label htmlFor="commune">Commune/Quartier *</Label>
        <Select 
          value={internalValues.commune} 
          onValueChange={(value) => handleChange('commune', value)} 
          disabled={!internalValues.city || availableCommunes.length === 0}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={
              !internalValues.city ? "Sélectionnez d'abord une ville" :
              availableCommunes.length === 0 ? "Aucune commune disponible" :
              "Sélectionnez votre commune"
            } />
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
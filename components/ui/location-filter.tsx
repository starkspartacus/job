"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, X } from "lucide-react"
import { AFRICAN_COUNTRIES, getCitiesByCountry, getCommunesByCity } from "@/lib/countries-data"

interface LocationFilterProps {
  onLocationChange: (filters: {
    country: string
    city: string
    commune: string
    countryName: string
    cityName: string
    communeName: string
  }) => void
  className?: string
  showLabels?: boolean
  compact?: boolean
}

export function LocationFilter({
  onLocationChange,
  className = "",
  showLabels = true,
  compact = false,
}: LocationFilterProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedCommune, setSelectedCommune] = useState<string>("")

  const [availableCities, setAvailableCities] = useState<Array<{ name: string; communes: string[] }>>([])
  const [availableCommunes, setAvailableCommunes] = useState<string[]>([])

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCitiesByCountry(selectedCountry)
      setAvailableCities(cities)
      setSelectedCity("")
      setSelectedCommune("")
      setAvailableCommunes([])
    } else {
      setAvailableCities([])
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
    } else {
      setAvailableCommunes([])
      setSelectedCommune("")
    }
  }, [selectedCountry, selectedCity])

  useEffect(() => {
    const country = AFRICAN_COUNTRIES.find((c) => c.code === selectedCountry)
    const city = availableCities.find((c) => c.name === selectedCity)

    onLocationChange({
      country: selectedCountry,
      city: selectedCity,
      commune: selectedCommune,
      countryName: country?.name || "",
      cityName: selectedCity,
      communeName: selectedCommune,
    })
  }, [selectedCountry, selectedCity, selectedCommune, availableCities, onLocationChange])

  const clearFilters = () => {
    setSelectedCountry("")
    setSelectedCity("")
    setSelectedCommune("")
  }

  const hasActiveFilters = selectedCountry || selectedCity || selectedCommune

  if (compact) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-auto min-w-[140px] h-9">
              <SelectValue placeholder="Pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les pays</SelectItem>
              {AFRICAN_COUNTRIES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedCountry}>
            <SelectTrigger className="w-auto min-w-[120px] h-9">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              {availableCities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCommune} onValueChange={setSelectedCommune} disabled={!selectedCity}>
            <SelectTrigger className="w-auto min-w-[140px] h-9">
              <SelectValue placeholder="Commune" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les communes</SelectItem>
              {availableCommunes.map((commune) => (
                <SelectItem key={commune} value={commune}>
                  {commune}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <X className="w-3 h-3 mr-1" />
              Effacer
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1">
            {selectedCountry && (
              <Badge variant="secondary" className="text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                {AFRICAN_COUNTRIES.find((c) => c.code === selectedCountry)?.name}
                <button onClick={() => setSelectedCountry("")} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                  <X className="w-2 h-2" />
                </button>
              </Badge>
            )}
            {selectedCity && (
              <Badge variant="secondary" className="text-xs">
                {selectedCity}
                <button onClick={() => setSelectedCity("")} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                  <X className="w-2 h-2" />
                </button>
              </Badge>
            )}
            {selectedCommune && (
              <Badge variant="secondary" className="text-xs">
                {selectedCommune}
                <button onClick={() => setSelectedCommune("")} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                  <X className="w-2 h-2" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Country Selection */}
      <div className="space-y-2">
        {showLabels && <Label htmlFor="filter-country">Pays</Label>}
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pays</SelectItem>
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
        {showLabels && <Label htmlFor="filter-city">Ville</Label>}
        <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedCountry}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={selectedCountry ? "Sélectionnez une ville" : "Sélectionnez d'abord un pays"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {availableCities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                <div className="flex items-center justify-between w-full">
                  <span>{city.name}</span>
                  <Badge variant="outline" className="text-xs ml-2">
                    {city.communes.length} communes
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Commune Selection */}
      <div className="space-y-2">
        {showLabels && <Label htmlFor="filter-commune">Commune/Quartier</Label>}
        <Select value={selectedCommune} onValueChange={setSelectedCommune} disabled={!selectedCity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={selectedCity ? "Sélectionnez une commune" : "Sélectionnez d'abord une ville"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les communes</SelectItem>
            {availableCommunes.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {commune}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Effacer tous les filtres de localisation</span>
        </button>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare, Send, Star, MapPin, CheckCircle, X, Mail, Calendar } from "lucide-react"
import { api, type Candidate } from "@/lib/api" // Importez l'API et le type Candidate

interface ContactModalProps {
  candidate: Candidate // Utilisez le type Candidate importé
  trigger?: React.ReactNode
}

export function ContactModal({ candidate, trigger }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    phone: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Basic validation
    const currentErrors: Record<string, string> = {}
    if (!formData.email) currentErrors.email = "Votre email est requis."
    if (!formData.subject) currentErrors.subject = "Le sujet est requis."
    if (!formData.message) currentErrors.message = "Le message est requis."

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors)
      return
    }

    setIsSending(true)

    try {
      const response = await api.contact.submit({
        ...formData,
        candidateId: candidate.id, // Inclure l'ID du candidat
      })

      if (response.success) {
        setIsSent(true)
        setTimeout(() => {
          setIsOpen(false)
          setIsSent(false)
          setFormData({ subject: "", message: "", phone: "", email: "" })
        }, 2000)
      } else {
        // Gérer les erreurs de l'API si elles sont renvoyées
        setErrors({ api: response.message })
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      setErrors({ api: "Une erreur est survenue lors de l'envoi du message." })
    } finally {
      setIsSending(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" })) // Clear error on change
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all flex items-center justify-center group"
          >
            <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Contacter
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Contacter {candidate.name}</span>
          </DialogTitle>
          <DialogDescription>Envoyez un message direct à ce candidat pour discuter d'une opportunité</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Candidate Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 ring-2 ring-white shadow-lg">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {candidate.verified && (
                    <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-green-500 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{candidate.name}</h3>
                  <p className="text-blue-600 font-medium">{candidate.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                      {candidate.rating} ({candidate.reviews} avis)
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{candidate.responseRate}%</div>
                  <div className="text-xs text-gray-600">Taux de réponse</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{candidate.responseTime}</div>
                  <div className="text-xs text-gray-600">Temps de réponse</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Votre email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className={`border-gray-300 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Votre téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`border-gray-300 focus:border-blue-500 ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Ex: Opportunité de poste de serveuse"
                  required
                  className={`border-gray-300 focus:border-blue-500 ${errors.subject ? "border-red-500" : ""}`}
                />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Décrivez l'opportunité, les conditions, et pourquoi vous souhaitez contacter ce candidat..."
                  required
                  className={`border-gray-300 focus:border-blue-500 resize-none ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                  disabled={isSending}
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-600">Message envoyé !</h3>
              <p className="text-gray-600">
                Votre message a été envoyé à {candidate.name}.
                <br />
                Vous devriez recevoir une réponse sous {candidate.responseTime}.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Notification par email
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Suivi automatique
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

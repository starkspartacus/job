"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Building,
  Users,
  Briefcase,
  Star,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    console.log("Contact form:", formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "contact@africajobs.com",
      description: "Écrivez-nous, nous répondons sous 24h",
      color: "bg-blue-500",
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: "+221 33 123 45 67",
      description: "Du lundi au vendredi, 8h-18h",
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: "Dakar, Sénégal",
      description: "Siège social - Plateau",
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "Lun-Ven: 8h-18h",
      description: "Support client disponible",
      color: "bg-orange-500",
    },
  ]

  const faqItems = [
    {
      question: "Comment publier une offre d'emploi ?",
      answer:
        "Inscrivez-vous en tant qu'employeur, complétez votre profil et cliquez sur 'Publier une offre'. C'est simple et rapide !",
    },
    {
      question: "Les services sont-ils gratuits ?",
      answer:
        "L'inscription et la recherche d'emploi sont gratuites pour les candidats. Les employeurs bénéficient d'offres flexibles selon leurs besoins.",
    },
    {
      question: "Comment améliorer la visibilité de mon profil ?",
      answer:
        "Complétez votre profil à 100%, ajoutez une photo professionnelle, détaillez vos expériences et obtenez des recommandations.",
    },
    {
      question: "Dans quels pays êtes-vous présents ?",
      answer:
        "Nous couvrons 15 pays d'Afrique de l'Ouest et du Centre, avec une expansion continue vers de nouveaux marchés.",
    },
  ]

  const testimonials = [
    {
      name: "Aminata Diallo",
      role: "Serveuse",
      company: "Restaurant Le Palmier",
      message: "Grâce à AfricaJobs, j'ai trouvé l'emploi de mes rêves en moins d'une semaine !",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Moussa Traoré",
      role: "Directeur RH",
      company: "Hôtel Ivoire",
      message: "Une plateforme exceptionnelle qui nous a permis de recruter les meilleurs talents.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AfricaJobs</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/offres" className="text-gray-600 hover:text-green-600 transition-colors">
                Offres d'emploi
              </Link>
              <Link href="/candidats" className="text-gray-600 hover:text-green-600 transition-colors">
                Profils candidats
              </Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-green-600 transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-green-600 font-medium">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/connexion">
                <Button variant="outline" className="hover:scale-105 transition-transform">
                  Connexion
                </Button>
              </Link>
              <Link href="/inscription">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Contactez
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 ml-4">
                Nous
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Notre équipe est là pour vous accompagner. Posez-nous vos questions, nous vous répondrons rapidement !
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="w-6 h-6 mr-2 text-green-600" />
                  Envoyez-nous un message
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-600">Nous vous répondrons sous 24 heures.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="border-0 bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="border-0 bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="border-0 bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="border-0 bg-gray-50 focus:bg-white transition-all">
                            <SelectValue placeholder="Choisissez une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Question générale</SelectItem>
                            <SelectItem value="support">Support technique</SelectItem>
                            <SelectItem value="billing">Facturation</SelectItem>
                            <SelectItem value="partnership">Partenariat</SelectItem>
                            <SelectItem value="feedback">Suggestion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="border-0 bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        className="border-0 bg-gray-50 focus:bg-white transition-all resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${info.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{info.title}</h4>
                      <p className="text-gray-900 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Liens rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/aide"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <HelpCircle className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600" />
                  <span className="group-hover:text-blue-600 transition-colors">Centre d'aide</span>
                </Link>
                <Link
                  href="/offres"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Briefcase className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-600" />
                  <span className="group-hover:text-green-600 transition-colors">Parcourir les offres</span>
                </Link>
                <Link
                  href="/candidats"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Users className="w-4 h-4 mr-3 text-gray-400 group-hover:text-purple-600" />
                  <span className="group-hover:text-purple-600 transition-colors">Voir les candidats</span>
                </Link>
                <Link
                  href="/inscription"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Building className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange-600" />
                  <span className="group-hover:text-orange-600 transition-colors">Créer un compte</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-start">
                    <HelpCircle className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                    {item.question}
                  </h3>
                  <p className="text-gray-600 ml-7">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-gray-600">Des témoignages authentiques de notre communauté</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md border-white/20"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role} - {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.message}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

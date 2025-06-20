"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Plus, Briefcase, CalendarDays } from "lucide-react"
// Assurez-vous que cette action existe et est correctement typée
import { deleteCandidateExperience, saveCandidateExperience } from "@/app/actions/candidates"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { ExperienceForm } from "./ExperienceForm" // Assurez-vous que ce composant existe
import type { AppExperience } from "@/lib/types" // Utiliser le type centralisé
import { format } from "date-fns" // Pour formater les dates
import { fr } from "date-fns/locale" // Pour le format français

// Le type Experience est maintenant AppExperience importé
type Props = {
  experiences: AppExperience[]
  candidateProfileId: string // Nécessaire pour sauvegarder/lier l'expérience
  refreshExperiences: () => void // Renommé pour clarté
}

export function ExperienceList({ experiences, candidateProfileId, refreshExperiences }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<AppExperience | undefined>()

  const handleDelete = (id: string) => {
    setDeletingId(id)
    startTransition(async () => {
      try {
        await deleteCandidateExperience(id) // L'action doit gérer la suppression en base
        toast.success("Expérience supprimée")
        refreshExperiences()
      } catch (error) {
        console.error(error)
        toast.error("Erreur lors de la suppression de l'expérience")
      } finally {
        setDeletingId(null)
      }
    })
  }

  const handleEdit = (exp: AppExperience) => {
    setEditingExperience(exp)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingExperience(undefined)
    setIsFormOpen(true)
  }

  const handleSubmit = async (data: Omit<AppExperience, "id">) => {
    // data ici devrait être conforme à Omit<AppExperience, "id">
    startTransition(async () => {
      try {
        await saveCandidateExperience(data, candidateProfileId, editingExperience?.id)
        setIsFormOpen(false)
        toast.success(editingExperience ? "Expérience modifiée" : "Expérience ajoutée")
        refreshExperiences()
        setEditingExperience(undefined)
      } catch (error) {
        console.error(error)
        toast.error(
          editingExperience
            ? "Erreur lors de la modification de l'expérience"
            : "Erreur lors de l'ajout de l'expérience",
        )
      }
    })
  }

  const formatDisplayDate = (dateString: string | Date): string => {
    try {
      return format(new Date(dateString), "MMM yyyy", { locale: fr })
    } catch {
      return String(dateString) // Fallback si la date n'est pas valide
    }
  }

  const formatPeriod = (start: string | Date, end?: string | Date | null, isCurrent?: boolean) => {
    const startDate = formatDisplayDate(start)
    if (isCurrent) return `Depuis ${startDate} (En cours)`
    if (end) return `${startDate} - ${formatDisplayDate(end)}`
    return startDate
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Expériences Professionnelles</h3>
        <Button size="sm" variant="outline" onClick={handleAdd} className="bg-white">
          <Plus className="w-4 h-4 mr-2" /> Ajouter une expérience
        </Button>
      </div>

      <AnimatePresence>
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <motion.div
              key={exp.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Card className="p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                  <div className="flex-grow">
                    <h4 className="text-md font-semibold text-gray-900">{exp.title}</h4>
                    <div className="flex items-center text-sm text-orange-600 mb-1">
                      <Briefcase className="w-3 h-3 mr-1.5" />
                      {exp.company} {exp.location && ` - ${exp.location}`}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <CalendarDays className="w-3 h-3 mr-1.5" />
                      {formatPeriod(exp.periodStart, exp.periodEnd, exp.isCurrent)}
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">{exp.description}</p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-600 mb-1">Réalisations :</h5>
                        <ul className="list-disc list-inside space-y-0.5 pl-1">
                          {exp.achievements.map((ach, index) => (
                            <li key={index} className="text-xs text-gray-600">
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(exp)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(exp.id)}
                      disabled={isPending && deletingId === exp.id}
                      className="text-gray-600 hover:text-red-600"
                    >
                      {isPending && deletingId === exp.id ? (
                        <span className="animate-spin text-xs">...</span>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">Aucune expérience professionnelle ajoutée pour le moment.</p>
        )}
      </AnimatePresence>

      {isFormOpen && (
        <ExperienceForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          experienceToEdit={editingExperience} // Renommé pour clarté
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Plus } from "lucide-react"
// Assurez-vous que cette action existe et est correctement typée
import { deleteCandidateSkill, saveCandidateSkill } from "@/app/actions/candidates"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { SkillForm } from "./SkillForm" // Assurez-vous que ce composant existe
import { Progress } from "@/components/ui/progress"
import type { AppSkill } from "@/lib/types" // Utiliser le type centralisé

// Le type Skill est maintenant AppSkill importé
type Props = {
  skills: AppSkill[]
  candidateProfileId: string // Nécessaire pour sauvegarder/lier la compétence
  refreshSkills: () => void // Renommé pour clarté
}

export function SkillList({ skills, candidateProfileId, refreshSkills }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<AppSkill | undefined>()

  const groupedSkills = skills.reduce<Record<string, AppSkill[]>>((acc, skill) => {
    const category = skill.category || "Autres Compétences"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  const handleDelete = (id: string) => {
    setDeletingId(id)
    startTransition(async () => {
      try {
        await deleteCandidateSkill(id) // L'action doit gérer la suppression en base
        toast.success("Compétence supprimée")
        refreshSkills()
      } catch (error) {
        console.error(error)
        toast.error("Erreur lors de la suppression de la compétence")
      } finally {
        setDeletingId(null)
      }
    })
  }

  const handleEdit = (skill: AppSkill) => {
    setEditingSkill(skill)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingSkill(undefined)
    setIsFormOpen(true)
  }

  const handleSubmit = async (data: Omit<AppSkill, "id">) => {
    // data ici devrait être { name: string, level: number, category?: string }
    startTransition(async () => {
      try {
        await saveCandidateSkill(data, candidateProfileId, editingSkill?.id)
        setIsFormOpen(false)
        toast.success(editingSkill ? "Compétence modifiée" : "Compétence ajoutée")
        refreshSkills()
        setEditingSkill(undefined)
      } catch (error) {
        console.error(error)
        toast.error(
          editingSkill ? "Erreur lors de la modification de la compétence" : "Erreur lors de l'ajout de la compétence",
        )
      }
    })
  }

  const getLevelLabel = (level: number) => {
    if (level < 30) return "Débutant"
    if (level < 60) return "Intermédiaire"
    if (level < 85) return "Avancé"
    return "Expert"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Compétences</h3>
        <Button size="sm" variant="outline" onClick={handleAdd} className="bg-white">
          <Plus className="w-4 h-4 mr-2" /> Ajouter une compétence
        </Button>
      </div>

      <AnimatePresence>
        {Object.entries(groupedSkills).length > 0 ? (
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h4 className="text-md font-medium text-gray-600 mb-3 border-b pb-1">{category}</h4>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout // Pour une animation fluide lors de la suppression/réorganisation
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-gray-900">{skill.name}</h5>
                          <p className="text-xs text-gray-500">{getLevelLabel(skill.level)}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(skill)}
                            className="text-gray-600 hover:text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(skill.id)}
                            disabled={isPending && deletingId === skill.id}
                            className="text-gray-600 hover:text-red-600"
                          >
                            {isPending && deletingId === skill.id ? (
                              <span className="animate-spin text-xs">...</span>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">Aucune compétence ajoutée pour le moment.</p>
        )}
      </AnimatePresence>

      {isFormOpen /* Condition pour s'assurer que SkillForm est monté seulement si nécessaire */ && (
        <SkillForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          skillToEdit={editingSkill} // Renommé pour clarté
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

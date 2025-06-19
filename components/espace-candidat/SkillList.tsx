"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Plus } from "lucide-react"
import { deleteSkill } from "@/app/actions/candidates"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { SkillForm } from "./SkillForm"
import { Progress } from "@/components/ui/progress"

export type Skill = {
  id: string
  name: string
  level: number
  category?: string
}

type Props = {
  skills: Skill[]
  onSave: (data: Omit<Skill, "id">, id?: string) => Promise<void>
  refresh: () => void
}

export function SkillList({ skills, onSave, refresh }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>()

  // Grouper les compétences par catégorie
  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category || "Autres"
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
        await deleteSkill(id)
        toast.success("Compétence supprimée")
        refresh()
      } catch {
        toast.error("Erreur lors de la suppression")
      } finally {
        setDeletingId(null)
      }
    })
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingSkill(undefined)
    setIsFormOpen(true)
  }

  const handleSubmit = async (data: Omit<Skill, "id">) => {
    try {
      await onSave(data, editingSkill?.id)
      setIsFormOpen(false)
      toast.success(editingSkill ? "Compétence modifiée" : "Compétence ajoutée")
      refresh()
    } catch (error) {
      toast.error(editingSkill ? "Erreur lors de la modification" : "Erreur lors de l'ajout")
    }
  }

  const getLevelLabel = (level: number) => {
    if (level < 30) return "Débutant"
    if (level < 60) return "Intermédiaire"
    if (level < 85) return "Avancé"
    return "Expert"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Compétences</h2>
        <Button size="sm" variant="outline" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" /> Ajouter
        </Button>
      </div>

      <AnimatePresence>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {categorySkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{skill.name}</h4>
                        <p className="text-sm text-gray-500">{getLevelLabel(skill.level)}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(skill)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(skill.id)}
                          disabled={isPending && deletingId === skill.id}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <SkillForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        skill={editingSkill}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 
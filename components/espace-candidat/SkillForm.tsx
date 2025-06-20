"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { predefinedSkills } from "@/lib/predefined-skills" // Importez les compétences prédéfinies
import { SkillCategoryEnum } from "@prisma/client" // Importez l'énumération de catégorie

const skillFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom de la compétence doit faire au moins 2 caractères.",
  }),
  level: z.number().min(0).max(100),
  category: z.nativeEnum(SkillCategoryEnum).optional(), // Utilisation de l'énumération Prisma
})

type SkillFormValues = z.infer<typeof skillFormSchema>

interface SkillFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skillToEdit?: SkillFormValues & { id?: string } // Inclure l'ID pour l'édition
  onSubmit: (data: Omit<SkillFormValues, "id">, id?: string) => void
}

export function SkillForm({ open, onOpenChange, skillToEdit, onSubmit }: SkillFormProps) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: skillToEdit || {
      name: "",
      level: 50,
      category: undefined, // Initialiser à undefined pour l'énumération
    },
  })

  // Mettre à jour les valeurs par défaut si skillToEdit change
  React.useEffect(() => {
    if (skillToEdit) {
      form.reset(skillToEdit)
    } else {
      form.reset({ name: "", level: 50, category: undefined })
    }
  }, [skillToEdit, form])

  const handleSkillSelect = (currentValue: string) => {
    const selectedSkill = predefinedSkills.find((skill) => skill.name.toLowerCase() === currentValue.toLowerCase())
    form.setValue("name", selectedSkill ? selectedSkill.name : currentValue)
    form.setValue("category", selectedSkill ? selectedSkill.category : undefined)
    form.trigger("name") // Valider le champ nom après la sélection
  }

  const getLevelLabel = (level: number) => {
    if (level < 30) return "Débutant"
    if (level < 60) return "Intermédiaire"
    if (level < 85) return "Avancé"
    return "Expert"
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{skillToEdit ? "Modifier la compétence" : "Ajouter une compétence"}</SheetTitle>
          <SheetDescription>
            Remplissez les informations ci-dessous pour {skillToEdit ? "modifier" : "ajouter"} une compétence.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data, skillToEdit?.id))} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nom de la compétence</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value
                            ? predefinedSkills.find((skill) => skill.name === field.value)?.name
                            : "Sélectionner une compétence..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher une compétence..." />
                        <CommandList>
                          <CommandEmpty>Aucune compétence trouvée.</CommandEmpty>
                          <CommandGroup>
                            {predefinedSkills.map((skill) => (
                              <CommandItem
                                value={skill.name}
                                key={skill.name}
                                onSelect={() => handleSkillSelect(skill.name)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    skill.name === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {skill.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Sélectionnez une compétence ou tapez-en une nouvelle.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Catégorie (auto-remplie)"
                      {...field}
                      value={field.value || ""} // Assurez-vous que la valeur est une chaîne
                      readOnly // Rendre le champ en lecture seule
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormDescription>
                    La catégorie est automatiquement sélectionnée en fonction de la compétence.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Niveau de maîtrise: {getLevelLabel(field.value)} ({field.value}%)
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-4">
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Débutant</span>
                        <span>Intermédiaire</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Évaluez votre niveau de maîtrise de cette compétence.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-white text-gray-700 border-gray-200"
              >
                Annuler
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                {skillToEdit ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

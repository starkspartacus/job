import { SkillCategoryEnum } from "@prisma/client"

export interface PredefinedSkill {
  name: string
  category: SkillCategoryEnum
}

export const predefinedSkills: PredefinedSkill[] = [
  // Compétences techniques
  { name: "JavaScript", category: SkillCategoryEnum.TECHNICAL },
  { name: "TypeScript", category: SkillCategoryEnum.TECHNICAL },
  { name: "React", category: SkillCategoryEnum.TECHNICAL },
  { name: "Next.js", category: SkillCategoryEnum.TECHNICAL },
  { name: "Node.js", category: SkillCategoryEnum.TECHNICAL },
  { name: "Python", category: SkillCategoryEnum.TECHNICAL },
  { name: "Java", category: SkillCategoryEnum.TECHNICAL },
  { name: "C#", category: SkillCategoryEnum.TECHNICAL },
  { name: "SQL", category: SkillCategoryEnum.TECHNICAL },
  { name: "MongoDB", category: SkillCategoryEnum.TECHNICAL },
  { name: "Docker", category: SkillCategoryEnum.TECHNICAL },
  { name: "Kubernetes", category: SkillCategoryEnum.TECHNICAL },
  { name: "AWS", category: SkillCategoryEnum.TECHNICAL },
  { name: "Azure", category: SkillCategoryEnum.TECHNICAL },
  { name: "Google Cloud", category: SkillCategoryEnum.TECHNICAL },
  { name: "Git", category: SkillCategoryEnum.TECHNICAL },
  { name: "DevOps", category: SkillCategoryEnum.TECHNICAL },
  { name: "Machine Learning", category: SkillCategoryEnum.TECHNICAL },
  { name: "Data Analysis", category: SkillCategoryEnum.TECHNICAL },
  { name: "Cybersecurity", category: SkillCategoryEnum.TECHNICAL },
  { name: "UI/UX Design", category: SkillCategoryEnum.DESIGN },
  { name: "Figma", category: SkillCategoryEnum.DESIGN },
  { name: "Photoshop", category: SkillCategoryEnum.DESIGN },
  { name: "Illustrator", category: SkillCategoryEnum.DESIGN },

  // Soft Skills
  { name: "Communication", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Travail d'équipe", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Résolution de problèmes", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Adaptabilité", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Pensée critique", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Gestion du temps", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Leadership", category: SkillCategoryEnum.MANAGEMENT },
  { name: "Négociation", category: SkillCategoryEnum.SALES },
  { name: "Service client", category: SkillCategoryEnum.SALES },
  { name: "Empathie", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Créativité", category: SkillCategoryEnum.SOFT_SKILL },
  { name: "Autonomie", category: SkillCategoryEnum.SOFT_SKILL },

  // Langues
    { name: "Français", category: SkillCategoryEnum.LANGUAGE },
  { name: "Anglais", category: SkillCategoryEnum.LANGUAGE },
  { name: "Arabe", category: SkillCategoryEnum.LANGUAGE },
  { name: "Allemand", category: SkillCategoryEnum.LANGUAGE },
  { name: "Mandarin", category: SkillCategoryEnum.LANGUAGE },
  { name: "Wolof", category: SkillCategoryEnum.LANGUAGE },
  { name: "Bambara", category: SkillCategoryEnum.LANGUAGE },
  { name: "Pulaar", category: SkillCategoryEnum.LANGUAGE },

  // Marketing
  { name: "SEO", category: SkillCategoryEnum.MARKETING },
  { name: "Marketing Digital", category: SkillCategoryEnum.MARKETING },
  { name: "Content Marketing", category: SkillCategoryEnum.MARKETING },
  { name: "Social Media Marketing", category: SkillCategoryEnum.MARKETING },
  { name: "Email Marketing", category: SkillCategoryEnum.MARKETING },

  // Autres
  { name: "Gestion de projet", category: SkillCategoryEnum.MANAGEMENT },
  { name: "Comptabilité", category: SkillCategoryEnum.OTHER },
  { name: "Finance", category: SkillCategoryEnum.OTHER },
  { name: "Droit", category: SkillCategoryEnum.OTHER },
  { name: "Ressources Humaines", category: SkillCategoryEnum.OTHER },
]

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client" // Importez l'enum Role de Prisma

export async function POST(request: Request) {
  try {
    const {
      email,
      phone,
      password,
      role: rawRole, // Renommez la variable pour éviter la confusion
      // Candidate specific fields
      firstName,
      lastName,
      dateOfBirth,
      gender,
      experienceLevel,
      educationLevel,
      skills,
      languages,
      availability,
      salaryExpectation,
      workAuthorization,
      avatar,
      // Employer specific fields
      companyName,
      companyType,
      companySize,
      foundingYear,
      companyDescription,
      contactPerson,
      website,
      socialMedia,
      companyAddress,
      country,
      city,
      commune,
      companyLogo,
    } = await request.json()

    if (!email || !password || !rawRole) {
      return NextResponse.json({ success: false, message: "Email, mot de passe et rôle sont requis." }, { status: 400 })
    }

    // Convertir le rôle en majuscules pour correspondre à l'énumération Prisma
    const role = rawRole.toUpperCase() as Role // Cast pour s'assurer que TypeScript le reconnaît comme un type Role valide

    // Vérifier si le rôle est valide selon l'énumération Prisma
    if (!Object.values(Role).includes(role)) {
      return NextResponse.json({ success: false, message: "Rôle utilisateur invalide." }, { status: 400 })
    }

    // Check if user already exists by email or phone
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Cet email ou numéro de téléphone est déjà enregistré." },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        hashedPassword,
        role, // Utiliser la valeur convertie en majuscules
      },
    })

    // Create associated profile based on role
    if (role === Role.CANDIDATE) {
      // Utiliser Role.CANDIDATE de l'enum
      await prisma.candidateProfile.create({
        data: {
          userId: newUser.id,
          firstName: firstName || "",
          lastName: lastName || "",
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
          gender: gender || "",
          experienceLevel: experienceLevel || "",
          educationLevel: educationLevel || "",
          skills: {
            create: [
              ...(skills || []).map((name: string) => ({
                name,
                category: "Compétence",
                level: 0,
              })),
              ...(languages || []).map((name: string) => ({
                name,
                category: "Langue parlée",
                level: 0,
              })),
            ],
          },
          availability: availability || "",
          salaryExpectation: salaryExpectation || "",
          workAuthorization: workAuthorization ?? false,
          avatar: avatar || "",
        },
      })
    } else if (role === Role.EMPLOYER) {
      // Utiliser Role.EMPLOYER de l'enum
      await prisma.employerProfile.create({
        data: {
          userId: newUser.id,
          companyName: companyName || "",
          companyType: companyType || "",
          companySize: companySize || "",
          foundingYear: foundingYear ? Number.parseInt(foundingYear) : null,
          companyDescription: companyDescription || "",
          contactPerson: contactPerson || "",
          website: website || "",
          socialMediaLinks: socialMedia || {}, // Assurez-vous que socialMedia est un objet JSON valide
          companyAddress: companyAddress || "",
          country: country || "",
          city: city || "",
          commune: commune || "",
          companyLogo: companyLogo || "",
        },
      })
    }

    return NextResponse.json({ success: true, message: "Inscription réussie !" }, { status: 201 })
  } catch (error) {
    console.error("Registration failed:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: `Erreur serveur lors de l'inscription: ${error.message}` },
        { status: 500 },
      )
    }
    return NextResponse.json(
      { success: false, message: "Une erreur inattendue est survenue lors de l'inscription." },
      { status: 500 },
    )
  }
}

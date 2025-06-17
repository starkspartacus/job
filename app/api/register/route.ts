import { NextResponse } from "next/server"
import prisma from "@/lib/prisma" // Assurez-vous que ce chemin est correct
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const {
      email,
      phone,
      password,
      role,
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
      companyLogo, // This field is correctly extracted here
    } = await request.json()

    if (!email || !password || !role) {
      return NextResponse.json({ success: false, message: "Email, mot de passe et rôle sont requis." }, { status: 400 })
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
        role,
      },
    })

    // Create associated profile based on role
    if (role === "candidate") {
      await prisma.candidateProfile.create({
        data: {
          userId: newUser.id,
          firstName: firstName || "",
          lastName: lastName || "",
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender: gender || "",
          experienceLevel: experienceLevel || "",
          educationLevel: educationLevel || "",
          skills: skills || [],
          languages: languages || [],
          availability: availability || "",
          salaryExpectation: salaryExpectation || "",
          workAuthorization: workAuthorization ?? false,
          avatar: avatar || "",
        },
      })
    } else if (role === "employer") {
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
          socialMedia: socialMedia || "",
          companyAddress: companyAddress || "",
          country: country || "",
          city: city || "",
          commune: commune || "",
          companyLogo: companyLogo || "", // This will now be recognized
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

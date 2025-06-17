interface ConfirmationStepProps {
    formData: {
      email?: string
      phone?: string
      role?: "candidate" | "employer"
      firstName?: string
      lastName?: string
      experienceLevel?: string
      skills?: string[]
      avatar?: string
      companyName?: string
      companyType?: string
      country?: string
      city?: string
      commune?: string
      companyLogo?: string
    }
    userType: "candidate" | "employer"
  }
  
  export function ConfirmationStep({ formData, userType }: ConfirmationStepProps) {
    return (
      <div className="animate-fade-in text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Confirmation</h3>
        <p className="text-gray-600 mb-6">Veuillez vérifier vos informations avant de finaliser votre inscription.</p>
        <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
          <p>
            <span className="font-medium">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-medium">Téléphone:</span> {formData.phone}
          </p>
          <p>
            <span className="font-medium">Type d'utilisateur:</span> {userType === "candidate" ? "Candidat" : "Employeur"}
          </p>
          {userType === "candidate" && (
            <>
              <p>
                <span className="font-medium">Nom complet:</span> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <span className="font-medium">Expérience:</span> {formData.experienceLevel}
              </p>
              <p>
                <span className="font-medium">Compétences:</span> {formData.skills?.join(", ")}
              </p>
              {formData.avatar && (
                <p>
                  <span className="font-medium">Photo de profil:</span>{" "}
                  <a href={formData.avatar} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Voir
                  </a>
                </p>
              )}
            </>
          )}
          {userType === "employer" && (
            <>
              <p>
                <span className="font-medium">Entreprise:</span> {formData.companyName}
              </p>
              <p>
                <span className="font-medium">Type:</span> {formData.companyType}
              </p>
              <p>
                <span className="font-medium">Localisation:</span> {formData.country}, {formData.city}, {formData.commune}
              </p>
              {formData.companyLogo && (
                <p>
                  <span className="font-medium">Logo de l'entreprise:</span>{" "}
                  <a
                    href={formData.companyLogo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Voir
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
  
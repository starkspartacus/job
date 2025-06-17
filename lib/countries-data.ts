export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
  cities: City[]
}

export interface City {
  name: string
  communes: string[]
}

export const AFRICAN_COUNTRIES: Country[] = [
  {
    code: "SN",
    name: "Sénégal",
    dialCode: "+221",
    flag: "🇸🇳",
    cities: [
      {
        name: "Dakar",
        communes: [
          "Plateau",
          "Médina",
          "Fann-Point E-Amitié",
          "Gueule Tapée-Fass-Colobane",
          "Gorée",
          "HLM",
          "Hann Bel-Air",
          "Grand Dakar",
          "Parcelles Assainies",
          "Patte d'Oie",
          "Ngor",
          "Ouakam",
          "Yoff",
          "Almadies",
        ],
      },
      {
        name: "Thiès",
        communes: ["Thiès Nord", "Thiès Sud", "Thiès Est", "Thiès Ouest"],
      },
      {
        name: "Saint-Louis",
        communes: ["Saint-Louis Nord", "Saint-Louis Sud", "Sor"],
      },
      {
        name: "Kaolack",
        communes: ["Kaolack Nord", "Kaolack Sud"],
      },
      {
        name: "Ziguinchor",
        communes: ["Ziguinchor Nord", "Ziguinchor Sud"],
      },
      {
        name: "Diourbel",
        communes: ["Diourbel Nord", "Diourbel Sud"],
      },
    ],
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    dialCode: "+225",
    flag: "🇨🇮",
    cities: [
      {
        name: "Abidjan",
        communes: [
          "Plateau",
          "Cocody",
          "Yopougon",
          "Adjamé",
          "Treichville",
          "Marcory",
          "Koumassi",
          "Port-Bouët",
          "Abobo",
          "Attécoubé",
        ],
      },
      {
        name: "Yamoussoukro",
        communes: ["Yamoussoukro Centre", "Yamoussoukro Nord", "Yamoussoukro Sud"],
      },
      {
        name: "Bouaké",
        communes: ["Bouaké Centre", "Bouaké Nord", "Bouaké Sud"],
      },
      {
        name: "San-Pédro",
        communes: ["San-Pédro Centre", "San-Pédro Port"],
      },
    ],
  },
  {
    code: "TG",
    name: "Togo",
    dialCode: "+228",
    flag: "🇹🇬",
    cities: [
      {
        name: "Lomé",
        communes: ["Lomé 1er", "Lomé 2ème", "Lomé 3ème", "Lomé 4ème", "Lomé 5ème", "Bè", "Nyékonakpoè"],
      },
      {
        name: "Sokodé",
        communes: ["Sokodé 1", "Sokodé 2"],
      },
      {
        name: "Kara",
        communes: ["Kara Centre", "Kara Périphérie"],
      },
    ],
  },
  {
    code: "BJ",
    name: "Bénin",
    dialCode: "+229",
    flag: "🇧🇯",
    cities: [
      {
        name: "Cotonou",
        communes: [
          "Cotonou 1er",
          "Cotonou 2ème",
          "Cotonou 3ème",
          "Cotonou 4ème",
          "Cotonou 5ème",
          "Cotonou 6ème",
          "Cotonou 7ème",
          "Cotonou 8ème",
          "Cotonou 9ème",
          "Cotonou 10ème",
          "Cotonou 11ème",
          "Cotonou 12ème",
          "Cotonou 13ème",
        ],
      },
      {
        name: "Porto-Novo",
        communes: ["Porto-Novo 1er", "Porto-Novo 2ème", "Porto-Novo 3ème"],
      },
      {
        name: "Parakou",
        communes: ["Parakou 1er", "Parakou 2ème", "Parakou 3ème"],
      },
    ],
  },
  {
    code: "BF",
    name: "Burkina Faso",
    dialCode: "+226",
    flag: "🇧🇫",
    cities: [
      {
        name: "Ouagadougou",
        communes: ["Baskuy", "Bogodogo", "Boulmiougou", "Nongr-Massom", "Sig-Noghin"],
      },
      {
        name: "Bobo-Dioulasso",
        communes: ["Bobo-Dioulasso Centre", "Bobo-Dioulasso Nord", "Bobo-Dioulasso Sud"],
      },
      {
        name: "Koudougou",
        communes: ["Koudougou Centre", "Koudougou Périphérie"],
      },
    ],
  },
  {
    code: "ML",
    name: "Mali",
    dialCode: "+223",
    flag: "🇲🇱",
    cities: [
      {
        name: "Bamako",
        communes: ["Commune I", "Commune II", "Commune III", "Commune IV", "Commune V", "Commune VI"],
      },
      {
        name: "Sikasso",
        communes: ["Sikasso Centre", "Sikasso Périphérie"],
      },
      {
        name: "Mopti",
        communes: ["Mopti Centre", "Mopti Périphérie"],
      },
    ],
  },
  {
    code: "GH",
    name: "Ghana",
    dialCode: "+233",
    flag: "🇬🇭",
    cities: [
      {
        name: "Accra",
        communes: ["Accra Metropolitan", "Tema", "Ga East", "Ga West", "Ga South", "Ga Central"],
      },
      {
        name: "Kumasi",
        communes: ["Kumasi Metropolitan", "Ejisu-Juaben", "Kwabre East"],
      },
      {
        name: "Tamale",
        communes: ["Tamale Metropolitan", "Tamale North", "Tamale South"],
      },
    ],
  },
  {
    code: "NG",
    name: "Nigeria",
    dialCode: "+234",
    flag: "🇳🇬",
    cities: [
      {
        name: "Lagos",
        communes: ["Lagos Island", "Lagos Mainland", "Surulere", "Ikeja", "Victoria Island", "Ikoyi", "Yaba", "Apapa"],
      },
      {
        name: "Abuja",
        communes: ["Garki", "Wuse", "Maitama", "Asokoro", "Gwarinpa"],
      },
      {
        name: "Kano",
        communes: ["Kano Municipal", "Fagge", "Dala", "Gwale"],
      },
    ],
  },
]

export const getCountryByCode = (code: string): Country | undefined => {
  return AFRICAN_COUNTRIES.find((country) => country.code === code)
}

export const getCitiesByCountry = (countryCode: string): City[] => {
  const country = getCountryByCode(countryCode)
  return country ? country.cities : []
}

export const getCommunesByCity = (countryCode: string, cityName: string): string[] => {
  const cities = getCitiesByCountry(countryCode)
  const city = cities.find((c) => c.name === cityName)
  return city ? city.communes : []
}

export const validatePhoneNumber = (phone: string, countryCode: string): boolean => {
  const country = getCountryByCode(countryCode)
  if (!country) return false

  // Validation basique selon le pays
  const phoneRegex: { [key: string]: RegExp } = {
    SN: /^(\+221|221)?[0-9]{9}$/,
    CI: /^(\+225|225)?[0-9]{8,10}$/,
    TG: /^(\+228|228)?[0-9]{8}$/,
    BJ: /^(\+229|229)?[0-9]{8}$/,
    BF: /^(\+226|226)?[0-9]{8}$/,
    ML: /^(\+223|223)?[0-9]{8}$/,
    GH: /^(\+233|233)?[0-9]{9}$/,
    NG: /^(\+234|234)?[0-9]{10}$/,
  }

  const regex = phoneRegex[countryCode]
  return regex ? regex.test(phone.replace(/\s/g, "")) : false
}

export const translations = {
  es: {
    title: "Iniciar sesión",
    searchButton: "Ingresar",
    searchPlaceholder: "Introduzca un customerId...",
    errors: {
      CUSTOMER_REQUIRED: "CustomerID es obligatorio",
      CUSTOMER_NOT_FOUND: "Este usuario no está registrado",
    },
  },
  en: {
    title: "Login",
    searchButton: "Login",
    searchPlaceholder: "Enter a customerId...",
    errors: {
      CUSTOMER_REQUIRED: "CustomerID is required",
      CUSTOMER_NOT_FOUND: "This user is not registered",
    },
  },
  fr: {
    title: "Connexion",
    searchButton: "Se connecter",
    searchPlaceholder: "Entrez un customerId...",
    errors: {
      CUSTOMER_REQUIRED: "CustomerID est requis",
      CUSTOMER_NOT_FOUND: "Cet utilisateur n'est pas enregistré",
    },
  },
  de: {
    title: "Anmelden",
    searchButton: "Einloggen",
    searchPlaceholder: "Geben Sie eine CustomerID ein...",
    errors: {
      CUSTOMER_REQUIRED: "CustomerID ist erforderlich",
      CUSTOMER_NOT_FOUND: "Dieser Benutzer ist nicht registriert",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["es"];

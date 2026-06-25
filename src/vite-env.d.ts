/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full POST endpoint for the contact form (Formspree or Web3Forms). */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Web3Forms access key — only needed if using Web3Forms. */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

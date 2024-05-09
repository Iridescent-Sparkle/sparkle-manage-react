/// <reference types="vite/client" />

interface importMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: importMetaEnv
}

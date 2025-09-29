/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_API_BEARER: string;
  readonly VITE_TMDB_BEARER: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

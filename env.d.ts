interface ImportMetaEnv {
    BASE_URL: string | undefined;
    readonly VITE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
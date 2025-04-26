interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string;
    // 其他配置
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

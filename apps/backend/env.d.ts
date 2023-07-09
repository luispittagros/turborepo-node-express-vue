declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production'
        readonly PORT: number
    }
}
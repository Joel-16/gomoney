declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    REDISCLOUD_URL: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    DATABASE_URL: string;
    STRIPE_SECRETKEY: string;
    STRIPE_SIGNING: string;
  }
}

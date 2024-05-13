declare module "express-session" {
  interface SessionData {
    user_id: number;
    is_verified: boolean;
  }
}
export {};

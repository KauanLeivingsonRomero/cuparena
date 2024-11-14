import type { User } from "./user"

export type response = {
  data: {
    message: string,
    token: string,
    user: User
  }
}
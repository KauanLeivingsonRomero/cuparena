import type { Dispatch, SetStateAction } from "react";

export type User = {
  user_id: string,
  user_name: string,
  user_email: string,
  user_profilePicture: string,
  user_role: string,
  team_id: number | null,
  token: string,
  created_at: number
}

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>
  loadUser: () => void;
}
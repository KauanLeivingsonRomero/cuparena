
export type User = {
  id: string,
  name: string,
  email: string,
  profilePicture: string,
  token: string,
  created_at: number
}

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}
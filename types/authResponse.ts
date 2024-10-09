export type response = {
  data: {
    message: string,
    token: string,
    user: {
      id: number,
      email: string,
      name: string
    }
  }
}
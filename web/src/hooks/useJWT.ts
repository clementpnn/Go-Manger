import { create } from "zustand"

interface JWTStore {
  jwt: string
  setJWT: (_newJWTl: string) => void
}

const useJWT = create<JWTStore>(set => ({
  jwt: "",
  setJWT: (newJWT: string) => set({ jwt: newJWT }),
}))

export default useJWT
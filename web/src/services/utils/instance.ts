import ky from "ky"

export const kyInstancePublic = ky.create({
  prefixUrl: "http://127.0.0.1:3000/api",
})
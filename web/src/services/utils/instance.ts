// import useJWT from "@/hooks/useJWT"
import ky from "ky"

// eslint-disable-next-line react-hooks/rules-of-hooks
// const { jwt } = useJWT()

export const kyInstancePublic = ky.create({
  prefixUrl: "http://127.0.0.1:3000/api",
})

// export const kyInstancePrivate = ky.create({
//   prefixUrl: "http://127.0.0.1:3000/api",
//   Headers: {
//     Authorization: `Bearer ${jwt}`
//   }
// })

import ky from "ky";

const token = localStorage.getItem("jwtToken");

export const KyInstancePublic = ky.create({
  prefixUrl: "http://127.0.0.1:3000/api",
});

export const KyInstancePrivate = ky.create({
  prefixUrl: "http://127.0.0.1:3000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
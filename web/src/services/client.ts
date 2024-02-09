import { KyInstancePrivate } from "./utils/instance"
import { KyInstancePublic } from "./utils/instance";

export function GetClientProfileService(): Promise<ClientProfile> {
  return KyInstancePrivate.get("client").json()
}

export function UpdateClientProfileService({ email, name, password }: { email: string, name: string, password: string }): Promise<UpdateRequest> {
  return KyInstancePrivate.put("client/update", { json: { email, name, password } }).json()
}

export function RegisterClientService({ email, name, password }: { email: string, name: string, password: string }): Promise<SignInRequest> {
  return KyInstancePublic.post("auth/register/client", { json: { email, name, password } }).json()
}

export function DeleteClientService(): Promise<ApiRequest> {
  return KyInstancePrivate.delete("client/delete").json()
}
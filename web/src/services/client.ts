import { KyInstancePrivate } from "./utils/instance"

export function GetClientProfileService(): Promise<ClientProfile> {
  return KyInstancePrivate.get("client").json()
}

export function UpdateClientProfileService({ email, name, password }: { email: string, name: string, password: string }): Promise<UpdateRequest> {
  return KyInstancePrivate.put("client/update", { json: { email, name, password } }).json()
}
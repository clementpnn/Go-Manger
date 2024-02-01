import { KyInstancePrivate } from "./utils/instance"

export function GetClientProfileService(): Promise<ClientProfile> {
  return KyInstancePrivate.get("client").json()
}
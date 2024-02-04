import { KyInstancePrivate } from "./utils/instance"
import { KyInstancePublic } from "./utils/instance";

export function GetClientProfileService(): Promise<ClientProfile> {
  return KyInstancePrivate.get("client").json()
}

export function UpdateClientProfileService({ email, name, password }: { email: string, name: string, password: string }): Promise<UpdateRequest> {
  return KyInstancePrivate.put("client/update", { json: { email, name, password } }).json()
}

export function RegisterClientService({ email, name, password }: { email: string, name: string, password: string }): Promise<SignInRequest> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("password", password);

  return KyInstancePublic.post("auth/register/client", { body: formData }).json();
}
import UpdateClientProfileForm from "@/components/form/UpdateClientProfile";
import NavbarClient from "@/components/navbar/navbarCient";

export default function AdminUpdateProfile() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarClient />
      <div className="flex flex-col justify-center items-center">
        <UpdateClientProfileForm />
      </div>
    </div>
  )
}

import NavbarAdmin from "@/components/navbar/navbarAdmin";
import UpdateAdminClientProfileForm from "@/components/form/UpdateAdminClient";

export default function AdminClientUpdate() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-col justify-center items-center">
        <UpdateAdminClientProfileForm />
      </div>
    </div>
  )
}

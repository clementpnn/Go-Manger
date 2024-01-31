import NavbarAdmin from "@/components/navbar/navbarAdmin";
import UpdateAdminProfileForm from "@/components/form/UpdateAdminProfile";

export default function AdminUpdateProfile() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-col justify-center items-center">
        <UpdateAdminProfileForm />
      </div>
    </div>
  )
}

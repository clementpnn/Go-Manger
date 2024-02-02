import UpdateClientProfileForm from "@/components/form/UpdateClientProfile";

export default function AdminUpdateProfile() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      {/* add client navbar */}
      <div className="flex flex-col justify-center items-center">
        <UpdateClientProfileForm />
      </div>
    </div>
  )
}

import UpdateRestaurantProfileForm from "@/components/form/UpdateRestaurantProfile";
import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";

export default function AdminUpdateProfile() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <div className="flex flex-col justify-center items-center">
        <UpdateRestaurantProfileForm />
      </div>
    </div>
  )
}
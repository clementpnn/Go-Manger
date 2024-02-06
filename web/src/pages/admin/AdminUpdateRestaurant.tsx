import UpdateRestaurantForm from "@/components/form/UpdateRestaurant";
import NavbarAdmin from "@/components/navbar/navbarAdmin";

export default function AdminUpdateRestaurant() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-col justify-center items-center">
        <UpdateRestaurantForm />
      </div>
    </div>
  )
}

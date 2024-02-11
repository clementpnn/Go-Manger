import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { useQuery } from "@tanstack/react-query";
import { GetAdminProfileService } from "@/services/admin"
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import LogoutButton from "@/components/button/LogoutButton";

export default function AdminProfile() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => GetAdminProfileService()
  })
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <p className="header-2 text-neutral-3 px-20">profil</p>
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-y-10 justify-center">
          <p className="body text-neutral-2">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.email}</p>
        </div>
        <div className="flex gap-x-10">
          <Link to="/admin/profile/update">
            <Button>Modifier</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

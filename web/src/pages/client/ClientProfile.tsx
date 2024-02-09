import { useQuery } from "@tanstack/react-query";
import { GetClientProfileService } from "@/services/client"
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import LogoutButton from "@/components/button/LogoutButton";
import DeleteClientButton from "@/components/button/DeleteClientButton";

export default function ClientProfile() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["ClientProfile"],
    queryFn: () => GetClientProfileService()
  })
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      {/* add client navbar */}
      <p className="header-2 text-neutral-3 px-20">profile</p>
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-y-10 justify-center">
          <p className="body text-neutral-2">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.email}</p>
        </div>
        <div className="flex flex-row gap-x-10">
          <Link to="/client/profile/update">
            <Button>Modifier</Button>
          </Link>
          <LogoutButton />
          <DeleteClientButton />
        </div>
      </div>
    </div>
  )
}

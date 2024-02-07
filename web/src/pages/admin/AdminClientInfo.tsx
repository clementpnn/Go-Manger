// import DeleteButton from "@/components/button/DeleteButton";
import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { Button } from "@/components/ui/button";
import { AdminClientInfoService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

export default function AdminClientInfo() {
  const { id } = useParams({ from: "/admin/user/$id" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["adminClientInfo"],
    queryFn: () => AdminClientInfoService(Number(id)),
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-y-10 justify-center">
          <p className="text-neutral-3 header-2">{data.data.name}'s profile</p>
          <p className="body text-neutral-2">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.email}</p>
        </div>
        <div className="flex flex-row gap-x-10">
          <Link to="/admin/user/update/$id" params={{ id: data.data.id.toString() }}>
            <Button>Modifier</Button>
          </Link>
          {/* <DeleteButton /> */}
        </div>
      </div>
    </div>
  );
}

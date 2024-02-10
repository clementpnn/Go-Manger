import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { AdminClientService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function AdminAllClients() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ["adminCliens"], queryFn: AdminClientService });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <p className="text-neutral-3 header-2 px-20">Clients</p>
      <div className="flex flex-col px-20 gap-y-10">
        {data.data.map((item: Client) => (
          <Link key={item.id} to="/admin/user/$id" params={{ id: item.id.toString() }} className="pointer">
            <div className="bg-neutral-0 rounded-md px-4 py-4 flex flex-row items-center justify-between">
              <div className="flex flex-row gap-x-4">
                <p className="body text-neutral-2">{item.name}</p>
                <p className="body text-neutral-2">{item.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

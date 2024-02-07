import { AdminClientService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function AdminClient() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ["adminClient"], queryFn: () => AdminClientService() });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <div>user list</div>
      <div>
        {data.data.map((client) => (
          <Link key={client.id} to="/admin/user/$id" params={{ id: client.id.toString() }} className="pointer">
            <div>{client.name}</div>
            <div>{client.email}</div>
          </Link>
        ))}
      </div>
    </>
  );
}

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
    <>
      <div>AdminClientInfo</div>
      <div>{data.data.name}</div>
      <div>{data.data.email}</div>
      <Link to="/admin/user/update/$id" params={{ id: data.data.id.toString() }}>
        update
      </Link>
      <Button>delete</Button>
    </>
  );
}

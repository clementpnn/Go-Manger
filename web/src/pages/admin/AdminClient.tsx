import { AdminClientService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

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
          <div key={client.id}>
            <div>{client.name}</div>
            <div>{client.email}</div>
          </div>
        ))}
      </div>
    </>
  );
}

import { HomeService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ["home"], queryFn: HomeService });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.data.map((item: any) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

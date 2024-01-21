import { Button } from "@/components/ui/button";
import { HomeService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

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
      <Link to="/signin">
        <Button>Login</Button>
      </Link>
      {data.data.map((item: Restaurant) => (
        <Link key={item.id} to="/restaurant/$id" params={{ id: item.id.toString() }} className="pointer">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </Link>
      ))}
    </div>
  );
}

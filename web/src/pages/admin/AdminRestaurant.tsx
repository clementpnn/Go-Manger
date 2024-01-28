import { Button } from "@/components/ui/button";
import { AdminRestaurantService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function AdminRestaurant() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ["adminRestaurant"], queryFn: AdminRestaurantService });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Link to="/admin/restaurant/add">
        <Button>Add Restaurant</Button>
      </Link>
      <div className="flex flex-col gap-4">
        {data.data.map((item: Restaurant) => (
          // changer la route pour afficher le restaurant pour les admins
          <Link key={item.id} to="/restaurant/$id" params={{ id: item.id.toString() }} className="pointer">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

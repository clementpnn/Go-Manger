import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import { Button } from "@/components/ui/button";
import { DeleteRestaurantMenuService, GetRestaurantMenu } from "@/services/restaurant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export default function RestaurantMenuItem() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/restaurant/menu/add" })
  const { isPending, isError, data, error } = useQuery({ queryKey: ["restaurantInfo"], queryFn: GetRestaurantMenu });

  const { mutate } = useMutation({
    mutationFn: DeleteRestaurantMenuService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurantInfo"] });
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteClick = (id: number) => {
    mutate(id)
  }

  const handleUpdateClick = (id: number) => {
    navigate({ to: `/restaurant/update/${id}` as any });
  }

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-3 text-neutral-3">Menu</p>
        <div className="flex flex-wrap justify-between gap-20">
          {data.data.map((item: MenuItem) => (
            <div key={item.id}>
              <ul>
                <li className="list-disc body text-neutral-2">
                  {item.name}
                </li>
                <li className="list-disc body text-neutral-2">
                  {item.description}
                </li>
                <li className="list-disc body text-neutral-2">
                  {item.price}
                </li>
                <li className="list-disc body text-neutral-2">
                  {item.available === true ? "available" : "not available"}
                </li>
                <li className="list-disc body text-neutral-2">
                  {item.type}
                </li>
              </ul>
              <div className="flex gap-x-4">
                <Button onClick={()=>handleUpdateClick(item.id)}>Modifier</Button>
                <Button onClick={()=>handleDeleteClick(item.id)}>Delete</Button>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

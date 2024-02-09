import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import { Button } from "@/components/ui/button";
import { DeleteRestaurantMenuService, GetRestaurantMenu } from "@/services/restaurant";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
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
              <ul className="list-none p-5 aspect-square border border-neutral-3 rounded-md w-[280px]">
                <li className="flex justify-between items-end">
                  <p className={`body-xs ${item.available === true ? "text-green-500" : "text-red-500"}`}>
                    {item.available === true ? "Available" : "Not available"}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger><Button variant="ghost" size="icon">...</Button></DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-neutral-100 p-1 rounded-md flex flex-col gap-2">
                      <DropdownMenuItem><Button variant="secondary" className="w-full bg-white" onClick={()=>handleUpdateClick(item.id)}>Modifier</Button></DropdownMenuItem>
                      <DropdownMenuItem><Button variant="secondary" className="w-full bg-white" onClick={()=>handleDeleteClick(item.id)}>Delete</Button></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li className="header-4 text-neutral-2 mt-3">
                  {item.name}
                </li>
                <p className="body-xs text-neutral-400">
                  {item.type}
                </p>
                <li className="body-xs text-neutral-3">
                  {item.description}
                </li>

                <li className="body text-neutral-2 mt-4">
                  {item.price} €
                </li>


              </ul>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

import NavbarClient from "@/components/navbar/navbarCient";
import NavbarHome from "@/components/navbar/navbarHome";
import { Button } from "@/components/ui/button";
import { AddOrderClientService } from "@/services/client";
import { RestaurantInfoPublicService } from "@/services/public";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export default function Restaurant() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({});
  const jwt = localStorage.getItem("jwtToken");
  const navigate = useNavigate()

  useEffect(() => {
    if (jwt) {
      setIsAuthorized(true);
    }
  }, [jwt]);
  const { mutate } = useMutation({ mutationFn: AddOrderClientService });
  const { id } = useParams({ from: "/restaurant/$id" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["restaurantPublic"],
    queryFn: () => RestaurantInfoPublicService(Number(id)),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const incrementCount = (itemId: number) => {
    setItemCounts((currentCounts) => ({
      ...currentCounts,
      [itemId]: (currentCounts[itemId] || 0) + 1,
    }));
  };

  const decrementCount = (itemId: number) => {
    setItemCounts((currentCounts) => ({
      ...currentCounts,
      [itemId]: Math.max((currentCounts[itemId] || 1) - 1, 0),
    }));
  };

  const sortedMenuItems: Record<MenuItem["type"], MenuItem[]> = {
    starter: [],
    dish: [],
    dessert: [],
    drink: [],
  };

  data.data.menuItems.forEach((item: MenuItem) => {
    sortedMenuItems[item.type]?.push(item);
  });

  const handleOrderClick = () => {
    const itemsToOrder = Object.entries(itemCounts)
      .filter(([_, count]) => count > 0)
      .map(([menuItemId, quantity]) => ({
        menuItemId: parseInt(menuItemId),
        quantity,
      }));

    if (itemsToOrder.length > 0) {
      mutate({ id, orderItems: itemsToOrder });
      navigate({ to: "/client/order" })
    } else {
      toast("Aucun item sélectionné");
    }
  };

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      {isAuthorized ? <NavbarClient /> : <NavbarHome />}
      <div className="flex flex-col gap-y-5 lg:flex-row lg:justify-between lg:items-center px-5 lg:px-20">
        <div className="flex flex-col gap-y-3">
          <p className="header-2 text-neutral-3">{data.data.name}</p>
          <p className="body-sm lg:body text-neutral-2">{data.data.description}</p>
        </div>
        <img
          src={`http://localhost:3000/uploads/${data.data.image}`}
          alt={`image of ${data.data.image}`}
          className="w-[25.75rem] h-[13.25rem] rounded-md"
        />
      </div>
      <div className="flex flex-col gap-y-10 px-5 lg:px-20">
        <p className="header-3 text-neutral-3">Menu</p>
        <div className="flex flex-wrap justify-between gap-10">
          {Object.entries(sortedMenuItems).map(
            ([type, items]) =>
              items.length > 0 && (
                <div key={type} className="w-full">
                  <h2 className="header-4 font-bold capitalize mb-4">{type}</h2>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item: any) => (
                      <div key={item.id} className="p-6 flex flex-col gap-2 border border-neutral-3 rounded-md bg-white">
                        <h3 className="header-4 font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.description}</p>
                        <p className="text-gray-700 font-bold">{item.price} €</p>
                        {isAuthorized &&
                          (item.available ? (
                            <div className="flex items-center">
                              <Button
                                variant="secondary"
                                onClick={() => decrementCount(item.id)}
                              >
                                -
                              </Button>
                              <span className="px-4">{itemCounts[item.id] || 0}</span>
                              <Button
                                variant="secondary"
                                onClick={() => incrementCount(item.id)}
                              >
                                +
                              </Button>
                            </div>
                          ) : (
                            <p className="text-red-500">Not available</p>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
        {isAuthorized && <Button onClick={handleOrderClick}>Commander</Button>}
      </div>
    </div>
  );
}

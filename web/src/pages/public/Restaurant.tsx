import { H4 } from "@/components/typography/h1";
import { H3 } from "@/components/typography/h3";
import { P } from "@/components/typography/p";
import { RestaurantInfoPublicService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function Restaurant() {
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

  return (
    <div className="flex flex-col gap-4">
      <H3>{data.data.name}</H3>
      <H4>{data.data.description}</H4>
      <P>{data.data.image}</P>
      {data.data.menuItems.map((item: any) => (
        <div key={item.id}>
          <P>{item.name}</P>
          <P>{item.description}</P>
          <P>{item.price}</P>
          <P>{item.available}</P>
          <P>{item.type}</P>
        </div>
      ))}
    </div>
  );
}

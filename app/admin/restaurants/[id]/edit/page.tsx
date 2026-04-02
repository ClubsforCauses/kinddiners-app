import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: { id: string } };

export default function AdminRestaurantEditPage({ params }: Props) {
  const { id } = params;
  return (
    <PlaceholderPage
      title={`Edit restaurant ${id}`}
      description="Legacy: /restaurant/edit/<restaurant_id>"
      routeGroup="(admin)"
    />
  );
}


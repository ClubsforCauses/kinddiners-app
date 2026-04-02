import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: { id: string } };

export default function RedeemPage({ params }: Props) {
  const { id } = params;
  return (
    <PlaceholderPage
      title={`Redeem visit — ${id}`}
      description="Redeem visit (member or restaurant flow). Legacy: /redeem/<user_id>"
      routeGroup="(member)"
    />
  );
}

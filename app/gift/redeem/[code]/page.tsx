import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: Promise<{ code: string }> };

export default async function GiftRedeemPage({ params }: Props) {
  const { code } = await params;
  return (
    <PlaceholderPage
      title={`Redeem gift: ${code}`}
      description="Gift code redemption; redirect to register if valid. Legacy: /giftcertificate_redeem/<gcc_id>"
      routeGroup="gifts"
    />
  );
}

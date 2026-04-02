import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: { code: string } };

export default function ReferralRedirectPage({ params }: Props) {
  const { code } = params;
  return (
    <PlaceholderPage
      title={`Referral: ${code}`}
      description="Set session r_code, redirect to promo-trial. Legacy: /<code>"
      routeGroup="referral"
    />
  );
}

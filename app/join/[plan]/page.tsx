import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: { plan: string } };

export default function JoinPlanPage({ params }: Props) {
  const { plan } = params;
  return (
    <PlaceholderPage
      title={`Join — ${plan}`}
      description={`Registration by plan type. Legacy: /register/<reg_type>`}
      routeGroup="join"
    />
  );
}

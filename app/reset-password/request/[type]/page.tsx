import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: Promise<{ type: string }> };

export default async function ResetPasswordRequestPage({ params }: Props) {
  const { type } = await params;
  return (
    <PlaceholderPage
      title={`Request password reset (${type})`}
      description={`Legacy: /password/reset/request/${type}`}
      routeGroup="(auth)"
    />
  );
}

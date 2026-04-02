import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: Promise<{ type: string; key: string }> };

export default async function ResetPasswordPage({ params }: Props) {
  const { type, key } = await params;
  return (
    <PlaceholderPage
      title="Set new password"
      description={`Legacy: /password/reset/${type}/${key}`}
      routeGroup="(auth)"
    />
  );
}

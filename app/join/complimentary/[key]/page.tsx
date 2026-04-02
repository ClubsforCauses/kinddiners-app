import { PlaceholderPage } from "@/components/PlaceholderPage";

type Props = { params: Promise<{ key: string }> };

export default async function JoinComplimentaryPage({ params }: Props) {
  const { key } = await params;
  return (
    <PlaceholderPage
      title="Complimentary signup"
      description={`Legacy: /register/complimentary/<email_key>`}
      routeGroup="join"
    />
  );
}

export default async function UserPage({
	params,
}: {
	params: Promise<{ uuid: string }>;
}) {
	const uuid = (await params).uuid;
	return <></>;
}

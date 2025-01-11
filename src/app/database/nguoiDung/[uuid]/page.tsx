import { retrieveAllUserRoles, retrieveUser } from "@/lib/userInteractions";
import UserEditForm from "./editUserForm";
import { User } from "@/lib/schema";

export default async function UserPage({
	params,
}: {
	params: Promise<{ uuid: string }>;
}) {
	const uuid = (await params).uuid;
	const roles = await retrieveAllUserRoles();
	const user: User | null = await retrieveUser({ maDinhDanh: uuid });

	return (
		<div className='mx-[100px]'>
			<UserEditForm
				user={
					user || {
						maDinhDanh: "",
						ten: "",
						email: "",
						maDinhDanhQuyen: "",
						initialSetupCompleted: false,
					}
				}
				roles={roles}
			></UserEditForm>
		</div>
	);
}

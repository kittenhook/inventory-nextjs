import { Session, User } from "@/lib/schema";
import UserEditForm from "../[uuid]/editUserForm";
import { cookies } from "next/headers";
import { retrieveAllUserRoles } from "@/lib/userInteractions";

type sessionObjectType = {
	user: User;
	session: Session;
};

export default async function MeUserPage() {
	const cookiesStore = await cookies();
	const sessionObjectJSON = cookiesStore.get("sessionObject")!.value;
	const sessionObject: sessionObjectType = JSON.parse(sessionObjectJSON);

	const roles = await retrieveAllUserRoles();
	return (
		<div className='mx-[100px]'>
			<UserEditForm
				user={
					sessionObject.user || {
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

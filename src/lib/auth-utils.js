import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "server-only";

export async function getAuthSession() {
    return await getServerSession(authOptions);
}

export async function checkAdmin() {
    const session = await getAuthSession();
    if (!session || session.user.role !== "admin") {
        return false;
    }
    return true;
}

export async function checkUser() {
    const session = await getAuthSession();
    if (!session) {
        return false;
    }
    return session;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push("/account");
    }, [router]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            Redirecting to account...
        </div>
    );
}

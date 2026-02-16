import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            const path = req.nextUrl.pathname;

            // Admin routes: Require 'admin' role
            if (path.startsWith("/admin")) {
                return token?.role === "admin";
            }

            // Protected user routes: Require authentication
            if (path.startsWith("/account") || path.startsWith("/profile")) {
                return !!token;
            }

            return true;
        },
    },
});

export const config = {
    matcher: ["/admin/:path*", "/account/:path*", "/profile/:path*"],
};

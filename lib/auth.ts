import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import prisma from "@/lib/db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn:true,
    },
    trustedOrigins : [
        "http://localhost:3000",
        "http://192.168.0.15:3000"
    ]
});

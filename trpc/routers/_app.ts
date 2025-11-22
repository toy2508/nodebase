import {createTRPCRouter, protectedProcedure, baseProcedure} from '../init';
import prisma from "@/lib/db";
import {inngest} from "@/inngest/client";

export const appRouter = createTRPCRouter({
    getWorkflows: baseProcedure
        .query(({ctx}) => {
            return prisma.workflow.findMany()
        }),
    createWorkflow: protectedProcedure
        .mutation(async () => {

            // console.log("test")
            //
            await inngest.send({
                name: "test/hello.world",
                data: {
                    email: "toy2508@naver.com"
                }
            })


            return {
                success: true,
                message: "Job queued"
            }
        })
});
// export type definition of API
export type AppRouter = typeof appRouter;
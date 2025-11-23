import {inngest} from "./client";
import prisma from "@/lib/db";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";

const google = createGoogleGenerativeAI();

export const helloWorld = inngest.createFunction(
    {id: "hello-world"},
    {event: "test/hello.world"},
    async ({event, step}) => {

        // Fetching the video
        await step.sleep("fetching", "5s");

        // Transcribing
        await step.sleep("transcribing", "5s");

        // Sending Transaction to AI
        await step.sleep("sending-to-ai", "5s");

        await step.run("create-workflow", () => {
            return prisma.workflow.create({
                data: {
                    name: "workflow-from-inngest"
                }
            })
        })
    },
);


export const executeAi = inngest.createFunction(
    {id: "execute-ai"},
    {event: "execute/ai"},
    async ({event, step}) => {


        await step.sleep("pretend", "5s");

        const {steps} = await step.ai.wrap(
            "gemini-generate-text",
            generateText,
            {
                model: google("gemini-2.5-flash"),
                system: "You are a helpful assistant.",
                prompt: "What is 2+2 ?"
            }
        )

        return steps;
    }
)
"use client"
import {LogoutButton} from "@/app/logout";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const Page = () => {

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const {data} = useQuery(trpc.getWorkflows.queryOptions());

    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess : () => {
            // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
            toast.success("Job queued")
        },
        onError: (error) => { console.log(error)}
    }));


    return (
        <div className={"min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6"}>
            Protected Server Component
            <div>
                {JSON.stringify(data, null, 2)}
            </div>
            <Button disabled={create.isPending} onClick={() => create.mutate()}>
                Create Workflow
            </Button>
            <LogoutButton/>
        </div>
    );
}


export default Page;
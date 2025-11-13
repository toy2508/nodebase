import {RegisterForm} from "@/features/auth/components/registger-form";
import {requireUnauth} from "@/lib/auth-utils";

const Page = async () => {

    await requireUnauth()

    return (
        <div>
            <RegisterForm/>
        </div>
    )
}

export default Page;
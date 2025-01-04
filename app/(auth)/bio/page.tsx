import { radialGradientBackground } from "@/lib/styles";
import BioForm from "./form";
import { getSelf } from "@/lib/db/utils";

export default async function BioPage() {
    const user = await getSelf()
    if (user == null) {
        throw new Error("User not found");
    }

    return (
        <div className="min-h-screen flex justify-center items-center" style={radialGradientBackground}>
            <div className="shadow-xl p-4 bg-white rounded-xl basis-[500px]">
                <BioForm 
                    id={user.id}
                />
            </div>
        </div>
    );
}
import { UserNoPassword } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

interface SpeakerCardProps {
    speaker: UserNoPassword;
    isAdminMode?: boolean; // New prop to indicate admin mode
    onDelete?: () => void; // Function to handle deletion
}

function SpeakerCard({ speaker, isAdminMode, onDelete }: SpeakerCardProps) {
    const { firstname, lastname, pronouns, image } = speaker;
    const name = `${firstname} ${lastname}`;
    return (
        <div className="relative">
            <div className="bg-white border border-[#1E2A78] border-1 pl-3 pr-3 py-1.5 rounded-3xl text-black text-sm font-sans font-medium flex flex-row">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden min-w-[50px]">
                    <Link href={"/main/profile/" + speaker.id} target="blank">
                        <Image
                            src={image}
                            alt="Profile"
                            className="h-full w-full"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>

                <div className="ml-1">
                    <span className="text-[#1E2A78] text-xl font-sans font-medium">
                        {name}
                    </span>
                    <br />
                    <span className="text-[#1E2A78] text-sm font-sans font-medium">
                        {pronouns}
                    </span>
                </div>

                {/* Render the delete button if isAdminMode and onDelete are provided */}
                {isAdminMode && onDelete && (
                    <button
                        className="ml-2"
                        onClick={onDelete}
                    >
                        <IoCloseOutline className="text-[#1E2A78] text-2xl" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SpeakerCard;
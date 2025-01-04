import PopupModal from "@/components/EngagementPopup/PopupModal";
import Typography from "@/components/Typography";
import { Email } from "@prisma/client";

interface EmailHistoryPopupProps {
    email: Email;
    onClose: () => void;
}

export default function EmailHistoryPopup({ email, onClose } : EmailHistoryPopupProps) {
    return (
        <PopupModal onClose={onClose}>
            <div className="space-y-3">
                <div>
                    <p className="font-bold underline"> Subject: </p> {email.subject}
                </div>
                <div>
                    <p className="font-bold underline"> Recipients: </p> {email.recipients.join(", ")}
                </div>
                <div>
                    <p className="font-bold underline"> Message: </p> {email.message}
                </div>
            </div>
        </PopupModal>
    )
}
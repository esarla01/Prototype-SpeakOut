import { getDefaultMessages, getTagsList } from "@/lib/db/utils"
import AdminSettings from "./AdminSettings"

export default async function Settings() {
    const tagsList = await getTagsList()
    const defaultMessages = await getDefaultMessages()

    const defaultMessagesObj = {
        speakerInvite: defaultMessages.filter(message => message.name == "speakerInvite")[0].message,
        speakerAccept: defaultMessages.filter(message => message.name == "speakerAccept")[0].message,
        speakerReject: defaultMessages.filter(message => message.name == "speakerReject")[0].message,
    }

    return (
        <AdminSettings 
            tagsList={tagsList.map(tag => tag.name)} 
            defaultMessages={defaultMessagesObj}
        />
    )
}
import { EngagementSchema } from "./schema"
import { EngagementWithSpeakers } from "./types"

export const validateEnagementData = (data: EngagementWithSpeakers) => {
    const validationResult = EngagementSchema.safeParse(data)
    if (!validationResult.success) {
        let newFormError = {}
        for (let error of validationResult.error.errors) {
            newFormError = { ...newFormError, [error.path[0]]: error.message }
        }
        return newFormError
    } else {
        return {}
    }
}

export const validateData = (data: any, schema: any) => {
    const validationResult = schema.safeParse(data)
    if (!validationResult.success) {
        let newFormError = {}
        for (let error of validationResult.error.errors) {
            newFormError = { ...newFormError, [error.path[0]]: error.message }
        }
        return newFormError
    } else {
        return {}
    }
}
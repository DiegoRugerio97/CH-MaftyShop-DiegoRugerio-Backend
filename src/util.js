// Validation functions

export const productBodyValidationPost = (body) => {

    const { title, description, code, price, status, stock, category } = body

    let fieldsCondition = title && description && code && price && status && stock && category
    if (!fieldsCondition) {
        throw "Incomplete fields: title, description, code, price, status, stock, category"
    }

    let typeCondition = typeof title == "string" && typeof description == "string" && typeof code == "string" && typeof price == "number" && typeof status == "boolean" && typeof stock == "number" && typeof category == "string"
    if (!typeCondition) {
        throw "Types not compatible: title (string), description (string), code (string), price (number), status (boolean), stock (number), category (string)"
    }

    const thumbnails = body.thumbnails ?? ["/img/placeholder.jpg"]
    return { title, description, code, price, status, stock, category, thumbnails }
}

export const productBodyValidationPut = (body) => {

    const prototypeObject = {
        title: "string",
        description: "string",
        code: "string",
        price: "number",
        status: "boolean",
        stock: "number",
        category: "string",
        thumbnails: "object",
    }

    for (let key of Object.keys(body)) {
        if (!(key in prototypeObject)) {
            throw `ERROR: Can't update unknown parameter ${key}`
        }
    }

    Object.keys(body).forEach((key) => {
        if (typeof body[key] != prototypeObject[key]) {
            throw `ERROR: Can't update uncompatible type, ${key} must be ${prototypeObject[key]}`
        }
    })

    return body
}

// Path utilities
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)


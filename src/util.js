// Validation functions

// Validations with custom error messages for product Body in POST
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
// Validations with custom error messages for product Body in PUT
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
// Builds links for respose and nav buttons in front end
export const linkBuilder = (URL, parameters, hasNextPage, hasPrevPage, page) => {
    const ROOT_URL = `${URL}?limit=${parameters.limit}`
    let finalURLString = ROOT_URL

    if (parameters.sort) {
        finalURLString += `&sort=${parameters.sort}`
    }
    if (parameters.queryField) {
        finalURLString += `&queryField=${parameters.queryField}`
    }
    if (parameters.queryVal) {
        finalURLString += `&queryField=${parameters.queryVal}`
    }

    const links = { prevLink: null, nextLink: null }
    if (hasPrevPage) {
        let prevPage = page - 1
        let prevPageURL = finalURLString
        prevPageURL += `&page=${prevPage}`
        links.prevLink = prevPageURL
    }
    if (hasNextPage) {
        let nextPage = page + 1
        let nextPageURL = finalURLString
        nextPageURL += `&page=${nextPage}`
        links.nextLink = nextPageURL
    }
    return links
}
// Validations for query params
export const sanitizeQueryParams = (parameters) => {

    const queryParameters = {}
    // limit
    let limitIsValid = parameters.limit && !isNaN(parameters.limit)
    if (limitIsValid) {
        queryParameters.limit = parseInt(parameters.limit)
    }
    else {
        const DEFAULT_LIMIT = 10
        queryParameters.limit = DEFAULT_LIMIT
    }
    // page
    let pageIsValid = parameters.page && !isNaN(parameters.page)
    if (pageIsValid) {
        queryParameters.pageNumber = parseInt(parameters.page)
    }
    else {
        const DEFAULT_PAGE = 1
        queryParameters.pageNumber = DEFAULT_PAGE
    }
    // sort
    let sortIsValid = parameters.sort && (parameters.sort == "asc" || parameters.sort == "desc")
    if (sortIsValid) {
        queryParameters.sort = parameters.sort
    }
    else {
        queryParameters.sort = null
    }
    // query
    let queryIsValid = parameters.queryField && parameters.queryField != "" && parameters.queryVal && parameters.queryVal != ""
    if (queryIsValid) {
        queryParameters.queryField = parameters.queryField
        queryParameters.queryVal = parameters.queryVal
    }
    else {
        queryParameters.queryField = null
        queryParameters.queryVal = null
    }

    return queryParameters
}

// Path utilities
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)



export const getHeadersJson = (userID: string | null): HeadersInit => {
    return [
        ['authorization', `${userID}`],
        ['Content-Type', `application/json`]
    ]
}
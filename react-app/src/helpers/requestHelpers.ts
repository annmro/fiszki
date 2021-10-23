//import fetchDefaults from 'fetch-defaults';


export const getHeadersJson = (userID: string | null): HeadersInit => {
    return [
        ['authorization', `${userID}`],
        ['Content-Type', `application/json`]
    ]
}

// export const getFetchDefaults = fetchDefaults(fetch, "https://example.com", {
//     headers: { Authorization: "Bearer 42" }
// })
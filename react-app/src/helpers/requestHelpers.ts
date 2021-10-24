import fetchDefaults from 'fetch-defaults';


export const getHeadersJson = (userID: string | null): HeadersInit => {
    return [
        ['authorization', `${userID}`],
        ['Content-Type', `application/json`]
    ]
}

export const getFetchDefaults = () => {
    return fetchDefaults(fetch, "https://fiszki-api.azurewebsites.net");
}
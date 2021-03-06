/* eslint-disable no-console */
import type { DocumentNode } from 'graphql';

import { API_URL, AUTH_TOKEN_NAME } from '../constants';

import { getCookie } from './cookie';


interface Options extends Omit<RequestInit, 'body'> {
    body?: unknown
}

interface Fetcher {
    <T extends unknown>(url: string, body?: unknown, options?: Options): Promise<T>
    <T extends unknown>(query: DocumentNode, body?: unknown, options?: Options): Promise<T>
}


async function graphqlFetcher(url: DocumentNode, body: unknown, options: Options) {
    const { print } = await import('graphql');

    const token = getCookie(AUTH_TOKEN_NAME);

    const response = await fetch(`${API_URL}/graphql`, {
        ...options,
        method: 'POST',
        body: JSON.stringify({
            query: print(url),
            variables: body,
        }),
        headers: {
            'Authorization': token
                ? `Bearer ${token}`
                : '',
            ...options.headers || {},
            'Content-Type': 'application/json',
        },
    });

    const { data, errors } = await response.json();

    if (errors) {
        const message = errors[0]?.extensions?.exception?.data?.message?.[0]?.messages?.[0]?.message
            || errors[0]?.message
            || 'Unexpected error. Try again later.';
        throw new Error(message);
    }

    if (process.browser && process.env.NODE_ENV === 'development') {
        console.groupCollapsed(`Response: ${print(url).split('{')[0]}`);
        console.debug(data);
        console.groupEnd();
    }

    return data;
}


async function restFetcher(url: string, body: unknown, options: Options) {
    const token = getCookie(AUTH_TOKEN_NAME);

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        body: JSON.stringify(body),
        headers: {
            'Authorization': token
                ? `Bearer ${token}`
                : '',
            ...options.headers || {},
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        console.error(error);
        const message = error.message || 'Unexpected error. Try again later.';
        throw new Error(message);
    }

    const json = await response.json();

    if (process.browser && process.env.NODE_ENV === 'development') {
        console.groupCollapsed(`Response: (${(options.method || 'GET').toUpperCase()}) ${url}`);
        console.debug(json);
        console.groupEnd();
    }

    return json;
}

const fetcher: Fetcher = async <T extends unknown>(
    url: string | DocumentNode,
    body?: unknown,
    options: Options = {},
): Promise<T> => {
    if (typeof url === 'string') {
        return restFetcher(url, body, options);
    }

    return graphqlFetcher(url, body, options);
};


export default fetcher;

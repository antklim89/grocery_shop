import { AUTH_TOKEN_NAME } from './constants';


interface Options extends Omit<RequestInit, 'body'> {
    body?: unknown
}

const fetcher = async <T extends unknown>(url: RequestInfo, options: Options = {}): Promise<T> => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        body: JSON.stringify(options.body),
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...options.headers || {},
            'Content-Type': 'application/json',
        },
    });

    return data.json();
};

export default fetcher;

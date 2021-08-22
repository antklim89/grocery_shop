

export function getCookie(name: string, cookies?: string): string | null {
    if (cookies) return cookies.match(new RegExp(`(^| )${name}=([^;]+)`, 'i'))?.pop() || null;
    if (process.browser) return document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`, 'i'))?.pop() || null;
    return null;
}

export function hasCookie(name: string): boolean {
    if (process.browser) return new RegExp(`(^| )${name}=([^;]+)`, 'i').test(document.cookie);
    return false;
}


export function setCookie(name: string, value: string, days = 12): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = date.toUTCString();
    if (process.browser) {
        document.cookie = `${name}=${value};path=/;expires=${expires}`;
    }
}

export function clearCookie(name: string): void {
    if (process.browser) {
        document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
}

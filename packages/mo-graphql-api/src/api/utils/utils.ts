export function safeEnv(key: string) {
    const envValue = process.env[key];

    if (!envValue) {
        throw new Error(`Missing ENV ${key}.`);
    }

    return envValue;
}

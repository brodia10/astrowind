export const checkEnvironmentVariables = (): boolean => {
    if (!process.env.BLOOM_FROM_NAME || !process.env.BLOOM_EMAIL) {
        console.error('BLOOM_FROM_NAME or BLOOM_EMAIL environment variable is not set.');
        return false;
    }
    return true;
};

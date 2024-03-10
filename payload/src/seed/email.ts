export const bloomEmailConfig = {
    tenant: 1, // This should be the actual ID of the Bloom tenant in your database
    fromEmailAddress: 'support@bloom.com',
    fromName: 'Bloom Support',
    postmarkServerId: null,
    postmarkServerToken: null,
    messageStreams: {
        transactional: null,
        broadcast: null,
    }
};
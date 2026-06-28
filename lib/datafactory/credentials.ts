export const credentials = { 
    validUser: {
    username: process.env.STANDARD_USERNAME!,
    password: process.env.STANDARD_PASSWORD!,
    },

    invalidUser: {
    username: 'invalid',
    password: 'wrongPassword',
    },
};
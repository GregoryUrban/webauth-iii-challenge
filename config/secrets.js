module.exports = { // this is to have one place to keep secret messages
    jwtSecret: process.env.JWT_SECRET || 'keep it secret, keep it safe!',
}
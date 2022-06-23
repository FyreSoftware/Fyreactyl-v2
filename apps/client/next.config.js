require('dotenv').config({ path: '../../.env' });

module.exports = {
    env: {
        SERVER_SIDE_URL: process.env.SERVER_SIDE_URL,
    },
}
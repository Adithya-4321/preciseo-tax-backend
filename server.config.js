module.exports = {
    port: 3000,
    env: process.env.NODE_ENV || 'development',
    smtp: {
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'info@preciseotax.com',
            pass: 'Khobtax@2024'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
};

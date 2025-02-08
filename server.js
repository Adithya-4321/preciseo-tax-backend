const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Create mail transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER || 'info@preciseotax.com',
        pass: process.env.SMTP_PASS || 'Khobtax@2024'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Test email configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('SMTP connection error:', error);
    } else {
        console.log('SMTP connection successful');
    }
});

// Handle form submissions
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        console.log('Received form submission:', { name, email, phone, service });

        const mailOptions = {
            from: {
                name: 'Preciseo Tax Website',
                address: process.env.SMTP_USER || 'info@preciseotax.com'
            },
            to: process.env.SMTP_USER || 'info@preciseotax.com',
            subject: `New Query from ${name} - ${service}`,
            html: `
                <h2>New Query Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        console.log('Attempting to send email...');
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        
        res.json({ 
            success: true, 
            message: 'Your message has been sent successfully! We will get back to you soon.' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        
        res.status(500).json({ 
            success: false, 
            message: `Failed to send message: ${error.message}. Please try again or contact us directly.` 
        });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

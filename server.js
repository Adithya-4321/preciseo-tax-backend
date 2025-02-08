const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Create mail transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Handle form submissions
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        
        if (!name || !email || !phone || !service || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
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

        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Your message has been sent successfully!' 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Please try again.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

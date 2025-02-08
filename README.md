# Preciseo Tax Backend Server

Backend server for the Preciseo Tax website that handles email form submissions.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=info@preciseotax.com
SMTP_PASS=your_password_here
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### POST /api/send-email
Sends email from contact forms.

Required fields:
- name
- email
- phone
- service
- message

## Deployment
This server is deployed on Render.com

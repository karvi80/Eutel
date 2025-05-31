// pages/api/send-email.js

import { sendMail } from '@/lib/mail';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, name, subject, body } = req.body;

        try {
            await sendMail({ to, name, subject, body });
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

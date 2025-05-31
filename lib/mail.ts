import nodemailer from 'nodemailer';

export async function sendMail({ to, name, subject, body }: {
    to: string;
    name: string;
    subject: string;
    body: string;
}) {

    console.log('Preparing to send email to:', to);

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: SMTP_EMAIL,
        to,
        subject,
        html: body,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


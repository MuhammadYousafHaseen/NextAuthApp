import nodemailer from 'nodemailer';
import User from "@/models/user.models"
import bcryptjs from 'bcryptjs'
export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        //todo:configure mail for useage
        if (emailType === "verify") {
            await User.findByIdAndUpdate(userId,{
              $set:  { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        });
        } else if (emailType === "Reset") {
            await User.findByIdAndUpdate(userId,{
               $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4e45ba6bf92bf9",// ❌
                pass: "526cb716c59cf7" //❌
            }
        });
        const mailOptions = {
            from: "mail@blessedtechs.com",
            to: email,
            subject: emailType === "verify" ? "Verify your email" : "Reset your password",
            html: `<P>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "verify" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`


            // `<h1>Verify your email</h1>
            // <p>Click the link below to verify your email</p>
            // <a href="http://localhost:3000/verify/${userId}">Verify</a>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
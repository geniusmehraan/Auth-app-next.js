import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10);

        if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 10*60*1000,  
        });
    }else if(emailType === "VERIFY"){
         await User.findByIdAndUpdate(userId,{
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 10*60*1000,  
        });
    }

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
           user: process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`,
    };

    await transport.sendMail(mailOptions);

    } catch (error:any) {
        throw new Error(error.message);
    }
}

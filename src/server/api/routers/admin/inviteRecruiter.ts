import { z } from "zod";
import {
  protectedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "y/server/api/trpc";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const inviteRecruiterRouter = createTRPCRouter({
  inviteRecruiter: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Inviting recruiter");
      const { email } = input;
      const admin = ctx.session?.user.id;
      const invitation = await ctx.prisma.invitation.create({
        data: {
          email,
          Admin: {
            connect: {
              id: admin,
            },
          },
        },
      });
      const invitationId = invitation.id;
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_EMAIL_PASSWORD,
        },
      });
      const mailOptions: Mail.Options = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: "Wellcome to the Nagarro Teamlinks Recruitment Portal",
        html: `<div> <p> You have been invited to join the Nagarro Teamlinks Recruitment Portal. Please click on the link below to register and start your journey with us.</p> <a href="http://teamlinks-delta.vercel.app/register?registerId=${invitationId}">Register</a> </div>`,
      };
      console.log("Sending email");
      const res = await transporter.sendMail(mailOptions);
      console.log("Email sent");
      //console.log(res);
      return res.accepted;
    }),
});

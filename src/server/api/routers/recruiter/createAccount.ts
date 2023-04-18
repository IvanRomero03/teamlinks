import { z } from "zod";
import {
  protectedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "y/server/api/trpc";

export const createAccountRouter = createTRPCRouter({
  createAccount: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        email: z.string().nonempty(),
        country: z.string().nonempty(),
        mainTech: z.string().nonempty(),
        secondaryTech: z.string().nonempty(),
        invite: z.string().nonempty(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, country, mainTech, secondaryTech, name, invite } = input;
      const user = ctx.session.user;
      const admin = await ctx.prisma.invitation.findUnique({
        where: {
          id: invite,
        },
        select: {
          Admin: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!admin) {
        throw new Error("Invalid invitation");
      }
      const recruiter = await ctx.prisma.reclutador.create({
        data: {
          id: user.id,
          country,
          tecPrincipal: mainTech,
          tecSecundaria: secondaryTech,
          adminId: admin.Admin.id,
        },
      });
      await ctx.prisma.user.update({
        where: { id: user.id },
        data: {
          name: name,
        },
      });

      return recruiter;
    }),
});

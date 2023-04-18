import { z } from "zod";
import {
  protectedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "y/server/api/trpc";

export const getInviteRouter = createTRPCRouter({
  getInvite: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const invitation = await ctx.prisma.invitation.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
        },
      });
      return invitation;
    }),
});

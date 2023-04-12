import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const recruitersRouter = createTRPCRouter({
  getTeam: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const recruitersTeam = await ctx.prisma.reclutador.findMany({
      where: {
        adminId: id,
      },
    });
    return recruitersTeam;
  }),
});

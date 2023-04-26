import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const recruitersRouter = createTRPCRouter({
  getTeam: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const recruitersTeam = await ctx.prisma.reclutador.findMany({
      where: {
        adminId: id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        Departamento: {
          select: {
            nombre: true,
          },
        },
        ReclutadorProyectos: {
          select: {
            proyecto: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    return recruitersTeam;
  }),
});

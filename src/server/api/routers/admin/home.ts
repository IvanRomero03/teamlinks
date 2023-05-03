import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const homeRouter = createTRPCRouter({
  getProyects: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const proyects = await ctx.prisma.proyecto.findMany({
      where: {
        adminId: id,
      },
      select: {
        id: true,
        nombre: true,
        numPosicionesDis: true,
        numPosicionesTot: true,
      },
    });
    return proyects;
  }),
  getTeam: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const team = await ctx.prisma.reclutador.findMany({
      where: {
        adminId: id,
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return team;
  }),
});

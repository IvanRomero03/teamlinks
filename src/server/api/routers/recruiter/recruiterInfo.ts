import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const recruiterInfo = createTRPCRouter({
  getInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user.id;
    const image = ctx.session.user.image;

    const userInfo = await ctx.prisma.reclutador.findUnique({
      where: {
        id: user,
      },
      include: {
        user: true,
        Departamento: true,
        RecruiterTechStack: true,
      },
    });
    return { data: userInfo, image };
  }),
  getProyects: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user.id;
    const proyects = await ctx.prisma.reclutadorProyectos.findMany({
      where: {
        reclutadorId: user,
      },
      include: {
        proyecto: {
          include: {
            Departamento: true,
            Requirement: true,
          },
        },
      },
    });
    return proyects;
  }),
  getProyectInfo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.id || input.id === "") throw new Error("No id provided");
      const proyect = await ctx.prisma.proyecto.findUnique({
        where: {
          id: input.id,
        },
        include: {
          puesto: true,
          Departamento: true,
          Requirement: true,
        },
      });
      return proyect;
    }),
});

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";

export const applicationRouter = createTRPCRouter({
  getApplication: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const application = await ctx.prisma.aplicacion.findMany({
      where: {
        reclutadorId: id,
      },
      select: {
        candidato: {
          select: {
            description: true,
            CandiadateTechStack: true,
            CandidateExpirience: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        Puestos: {
          select: {
            jobTitle: true,
          },
        },
        fechaCreacion: true,
        estatus: true,
      },
    });
    return application;
  }),
});

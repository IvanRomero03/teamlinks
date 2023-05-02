import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { profileRouter } from "./profile";

export const candidateRouter = createTRPCRouter({
  getOpportuninties: publicProcedure.query(async ({ ctx }) => {
    const opportunities = await ctx.prisma.puestos.findMany({
      select: {
        jobTitle: true,
        descripcion: true,
        estatus: true,
        fechaCreacion: true,
        tipo: true,
        id: true,
        numPosicionesDisponibles: true,
        mustHaves: true,
        proyecto: {
            select: {
                pais: true,
            }
        }
      },
    });
    return opportunities;
  }),
  getPosition: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const position = await ctx.prisma.puestos.findUnique({
        where: {
          id: input.id,
        },
        select: {
          jobTitle: true,
          descripcion: true,
          estatus: true,
          fechaCreacion: true,
          tipo: true,
          id: true,
          numPosicionesDisponibles: true,
          mustHaves: true,
          proyecto: {
              select: {
                  pais: true,
              }
          }
        },
      });
      return position;
    }),
  profile: profileRouter,
  createApply: protectedProcedure
    .input(
      z.object({
        idPosition: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const apply = await ctx.prisma.aplicacion.create({
        data: {
          candidatoId: id,
          puestosId: input.idPosition,
          estatus: "Applied",
        },
      });
    }),
});

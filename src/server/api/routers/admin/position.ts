import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const positionRouter = createTRPCRouter({
  createPosition: protectedProcedure
    .input(
      z.object({
        jobTitle: z.string(),
        description: z.string(),
        estatus: z.string(),
        numPosiciones: z.number(),
        numPosicionesDisponibles: z.number(),
        tipo: z.string(),
        hireCategory: z.string(),
        Requirements: z.array(z.string()),
        Genus: z.string(),
        proyectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        jobTitle,
        description,
        estatus,
        numPosiciones,
        numPosicionesDisponibles,
        tipo,
        hireCategory,
        Requirements,
        Genus,
        proyectId,
      } = input;
      const position = await ctx.prisma.puestos.create({
        data: {
          jobTitle: jobTitle,
          descripcion: description,
          estatus: estatus,
          numPosiciones: numPosiciones,
          numPosicionesDisponibles: numPosicionesDisponibles,
          tipo: tipo,
          hireCategory: hireCategory,
          mustHaves: {
            create: Requirements.map((req) => ({
              name: req,
            })),
          },
          Genus: Genus,
          contractor: false,
          employee: false,
          proyecto: {
            connect: {
              id: proyectId,
            },
          },
        },
      });
      return position;
    }),
  getPositions: protectedProcedure
    .input(
      z.object({
        proyectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { proyectId } = input;
      if (!proyectId) {
        throw new Error("No project id");
      }
      const positions = await ctx.prisma.puestos.findUniqueOrThrow({
        where: {
          id: proyectId,
        },
        include: {
          Departamento: true,
          mustHaves: true,
          _count: {
            select: {
              Aplicacion: true,
            },
          },
        },
      });
      return positions;
    }),
});

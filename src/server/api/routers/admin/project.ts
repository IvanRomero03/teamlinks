import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        country: z.string(),
        type: z.string(),
        status: z.string(),
        requirements: z.array(z.string()),
        pos_dis: z.number(),
        pos_tot: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        description,
        country,
        type,
        status,
        requirements,
        pos_dis,
        pos_tot,
      } = input;
      const project = await ctx.prisma.proyecto.create({
        data: {
          admin: {
            connect: {
              id: ctx.session.user.id ?? "asd",
            },
          },
          nombre: name,
          descripcion: description,
          pais: country,
          type: type,
          estatus: status,
          numPosicionesDis: pos_dis,
          numPosicionesTot: pos_tot,
          Requirement: {
            create: requirements.map((req) => ({
              name: req,
            })),
          },
        },
      });
      return project;
    }),
  getProyects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.proyecto.findMany({
      where: {
        adminId: ctx.session.user.id,
      },
      select: {
        id: true,
        nombre: true,
        numPosicionesDis: true,
        numPosicionesTot: true,
        Departamento: {
          select: {
            nombre: true,
          },
        },
      },
    });
    return projects;
  }),
  getProyect: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const project = await ctx.prisma.proyecto.findUnique({
        where: {
          id,
        },
        include: {
          Departamento: true,
          ReclutadorProyectos: {
            select: {
              reclutador: {
                include: {
                  user: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          Requirement: true,
        },
      });
      return project;
    }),
});

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const profileRouter = createTRPCRouter({
  getInfo: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const candidate = await ctx.prisma.candidato.findUnique({
      where: {
        id,
      },
      select: {
        pais: true,
        phone: true,
        description: true,
      },
    });
    return candidate;
  }),
  getExpirience: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    console.log(id);
    const candidate = await ctx.prisma.candidateExpirience.findMany({
      where: {
        candidatoId: id,
      },
    });
    console.log(candidate);
    return candidate;
  }),
  getTech: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const candidate = await ctx.prisma.candiadateTechStack.findMany({
      where: {
        candidatoId: id,
      },
    });
    return candidate;
  }),
  updateInfo: protectedProcedure
    .input(
      z.object({
        phone: z.string(),
        description: z.string(),
        pais: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const candidate = await ctx.prisma.candidato.update({
        where: {
          id,
        },
        data: {
          phone: input.phone,
          description: input.description,
          pais: input.pais,
        },
      });
      return candidate;
    }),
  createExp: protectedProcedure
    .input(
      z.object({
        organization: z.string(),
        position: z.string(),
        description: z.string(),
        start: z.string(),
        end: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const candidate = await ctx.prisma.candidateExpirience.create({
        data: {
          candidatoId: id,
          employer: input.organization,
          position: input.position,
          description: input.description,
          startDate: input.start,
          endDate: input.end,
        },
      });
      return candidate;
    }),
  updateExp: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        organization: z.string(),
        position: z.string(),
        description: z.string(),
        start: z.string(),
        end: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const candidate = await ctx.prisma.candidateExpirience.update({
        where: {
          id: input.id,
        },
        data: {
          candidatoId: id,
          employer: input.organization,
          position: input.position,
          description: input.description,
          startDate: input.start,
          endDate: input.end,
        },
      });
      return candidate;
    }),
  createTech: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const candidate = await ctx.prisma.candiadateTechStack.create({
        data: {
          candidatoId: id,
          name: input.name,
        },
      });
      return candidate;
    }),
});

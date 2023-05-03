import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const positionRouter = createTRPCRouter({
  getPosition: protectedProcedure
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
        include: {
          Aplicacion: {
            include: {
              candidato: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
      return position;
    }),
});

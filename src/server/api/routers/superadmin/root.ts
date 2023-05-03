import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const superadmin = createTRPCRouter({
  getAdmins: protectedProcedure.query(async ({ ctx }) => {
    const admins = await ctx.prisma.admin.findMany({
      include: {
        user: true,
      },
    });
    return admins;
  }),
  getAdminFull: protectedProcedure.query(async ({ ctx, input }) => {
    const admins = await ctx.prisma.admin.findMany({
      include: {
        Departamento: {
          select: {
            nombre: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        proyecto: {
          select: {
            nombre: true,
          },
        },
      },
    });
    return admins;
  }),
});

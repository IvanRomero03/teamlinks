import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";

export const notificationsRouter = createTRPCRouter({
  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const notifications = await ctx.prisma.aplicacion.findMany({
      where: {
        reclutadorId: id,
      },
      select: {
        Puestos: {
          select: {
            jobTitle: true,
          },
        },
        candidato: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        fechaCreacion: true,
      },
    });

    const notificationsWithTitle = notifications.map((notification) => ({
      ...notification,
      title: "Application received",
    }));

    return notifications;
  }),
});

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const applicationRouter = createTRPCRouter({
    getApplication: protectedProcedure.query(async ({ ctx }) => {
        const {id} = ctx.session.user;
        const application = await ctx.prisma.candidato.findUnique({
            where: {
                id
            },
            select: {
                aplicacion: {
                    select: {
                        estatus: true,
                        fechaCreacion: true,
                        Puestos: {
                            select: {
                                id: true,
                                jobTitle: true,
                                mustHaves: true,
                                tipo: true,
                                proyecto: {
                                    select: {
                                        pais: true,
                                    }
                                },
                            }
                        }
                    },
                }
            }
        });
        return application;
    }),
});
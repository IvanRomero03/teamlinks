import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "y/server/api/trpc";

export const permisionRouter = createTRPCRouter({
  checkIfUserInDB: protectedProcedure.query(async ({ ctx }) => {
    // If user id ethier in Admin, Candidate or Recruiter table, return true
    const userId = ctx.session.user.id;
    const admin = await ctx.prisma.admin.findUnique({
      where: { id: userId },
    });
    const candidate = await ctx.prisma.candidato.findUnique({
      where: { id: userId },
    });
    const recruiter = await ctx.prisma.reclutador.findUnique({
      where: { id: userId },
    });
    return admin || candidate || recruiter;
  }),
  checkIfUserIsAdmin: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const admin = await ctx.prisma.admin.findUnique({
      where: { id: userId },
    });
    return admin;
  }),
  checkIfUserIsCandidate: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const candidate = await ctx.prisma.candidato.findUnique({
      where: { id: userId },
    });
    return candidate;
  }),
  checkIfUserIsRecruiter: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const recruiter = await ctx.prisma.reclutador.findUnique({
      where: { id: userId },
    });
    return recruiter;
  }),
});

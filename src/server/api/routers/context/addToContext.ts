import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { supabase } from "y/server/supabase";
import { openai } from "y/server/openai";

export const addToContextRouter = createTRPCRouter({
  addProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const project = await ctx.prisma.proyecto.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          nombre: true,
          descripcion: true,
          Requirement: {
            select: {
              name: true,
            },
          },
        },
      });
      // check if project is already in context
      const { data: proyectInContext, error: errorInContext } = await supabase
        .from("proyectos")
        .select("id")
        .eq("id", id);
      if (errorInContext) {
        return null;
      }
      if (proyectInContext.length > 0) {
        return proyectInContext;
      }
      const contexto =
        project.nombre +
        " " +
        project.descripcion +
        " " +
        project.Requirement.map((req) => req.name).join(" ");
      const embedding = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: contexto,
      });

      const embeddingValue = embedding?.data?.data[0]?.embedding;

      if (!embeddingValue) {
        return null;
      }

      const { error: errorNewProyect, data: dataNewProyect } = await supabase
        .from("proyectos")
        .insert([
          {
            id: id,
            vector: embeddingValue,
            context: contexto,
          },
        ]);
      if (errorNewProyect) {
        return null;
      }
      return {
        id: id,
        vector: embeddingValue,
        context: contexto,
      };
    }),
  addPosition: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const position = await ctx.prisma.puestos.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          jobTitle: true,
          descripcion: true,
          Genus: true,
          mustHaves: true,
          Departamento: true,
        },
      });
      // check if position is already in context
      const { data: positionInContext, error: errorInContext } = await supabase
        .from("positions")
        .select("id")
        .eq("id", id);
      if (errorInContext) {
        return null;
      }
      if (positionInContext.length > 0) {
        return positionInContext;
      }
      const contexto =
        position.jobTitle +
        " " +
        position.descripcion +
        " " +
        position.Genus +
        " " +
        (position?.Departamento?.nombre ?? "") +
        " " +
        position.mustHaves.map((req) => req.name).join(" ");

      const embedding = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: contexto,
      });

      const embeddingValue = embedding?.data?.data[0]?.embedding;

      if (!embeddingValue) {
        return null;
      }

      const { error: errorNewPosition, data: dataNewPosition } = await supabase
        .from("positions")
        .insert([
          {
            id: id,
            vector: embeddingValue,
            context: contexto,
          },
        ]);
      if (errorNewPosition) {
        return null;
      }
      return {
        id: id,
        vector: embeddingValue,
        context: contexto,
      };
    }),
  addCandidate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return null;
    }),
  addRecruiter: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const recruiter = await ctx.prisma.reclutador.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          Departamento: true,
          description: true,
          RecruiterTechStack: {
            select: {
              name: true,
            },
          },
        },
      });
      // check if recruiter is already in context
      const { data: recruiterInContext, error: errorInContext } = await supabase
        .from("recruiters")
        .select("id")
        .eq("id", id);
      if (errorInContext) {
        return null;
      }
      if (recruiterInContext.length > 0) {
        return recruiterInContext;
      }
      const contexto =
        (recruiter?.Departamento?.nombre ?? "") +
        " " +
        recruiter.description +
        " " +
        recruiter.RecruiterTechStack.map((req) => req.name).join(" ");

      const embedding = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: contexto,
      });

      const embeddingValue = embedding?.data?.data[0]?.embedding;

      if (!embeddingValue) {
        return null;
      }

      const { error: errorNewRecruiter, data: dataNewRecruiter } =
        await supabase.from("recruiters").insert([
          {
            id: id,
            vector: embeddingValue,
            context: contexto,
          },
        ]);
      if (errorNewRecruiter) {
        return null;
      }
      return {
        id: id,
        vector: embeddingValue,
        context: contexto,
      };
    }),
  addApplication: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const application = await ctx.prisma.aplicacion.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          candidato: {
            include: {
              CandiadateTechStack: true,
              CandidateExpirience: true,
            },
          },
        },
      });
      // check if recruiter is already in context
      const { data: applicationInContext, error: errorInContext } =
        await supabase.from("applications").select("id").eq("id", id);

      if (errorInContext) {
        return null;
      }
      if (applicationInContext.length > 0) {
        return applicationInContext;
      }
      const contexto =
        application.candidato.description +
        " " +
        application.candidato.CandiadateTechStack.map((tech) => tech.name).join(
          " "
        ) +
        " " +
        application.candidato.CandidateExpirience.map(
          (exp) => exp.description
        ).join(" ");

      const embedding = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: contexto,
      });

      const embeddingValue = embedding?.data?.data[0]?.embedding;

      if (!embeddingValue) {
        return null;
      }

      const { error: errorNewRecruiter, data: dataNewRecruiter } =
        await supabase.from("applications").insert([
          {
            id: id,
            vector: embeddingValue,
            context: contexto,
          },
        ]);

      if (errorNewRecruiter) {
        return null;
      }
      return {
        id: id,
        vector: embeddingValue,
        context: contexto,
      };
    }),
});

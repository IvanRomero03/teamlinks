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
            vector: "[" + String(embeddingValue) + "]",
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
            vector: "[" + String(embeddingValue) + "]",
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
      console.log("errorInContext", errorInContext);
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
      console.log("embedding", embeddingValue);
      if (!embeddingValue) {
        return null;
      }

      const { error: errorNewRecruiter, data: dataNewRecruiter } =
        await supabase.from("recruiters").insert([
          {
            id: id,
            vector: "[" + String(embeddingValue) + "]",
            context: contexto,
          },
        ]);
      console.log(errorNewRecruiter);
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
      console.log("errorInContext", errorInContext);
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
      console.log("embedding", embeddingValue);
      if (!embeddingValue) {
        return null;
      }

      const { error: errorNewRecruiter, data: dataNewRecruiter } =
        await supabase.from("applications").insert([
          {
            id: id,
            vector: "[" + String(embeddingValue) + "]",
            context: contexto,
            position_id: String(application.puestosId),
          },
        ]);
      console.log(errorNewRecruiter);
      if (errorNewRecruiter) {
        return null;
      }
      return {
        id: id,
        vector: embeddingValue,
        context: contexto,
      };
    }),
  getRecruiter_Applicants: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      // get Recruiter embedding from supabase
      const { data: recruiter } = await supabase
        .from("recruiters")
        .select("vector")
        .eq("id", id);
      console.log(recruiter);
      if (!recruiter) {
        return [];
      }
      if (recruiter[0]?.vector) {
        const res = await supabase.rpc("recruiter_applicants_matches2", {
          embedding: recruiter[0].vector,
          match_count: 10,
        });
        console.log(res);
        const applicants = await ctx.prisma.aplicacion.findMany({
          where: {
            id: {
              in: res?.data?.map(
                (app: { id: string; similarity: number }) => app.id
              ),
            },
          },
          select: {
            id: true,
            candidato: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
        console.log(applicants);
        // add similarity for each applicant where applicationId = id
        const applicantsWithSimilarity = res?.data?.map((app) => {
          const applicant = applicants.find(
            (applicant) => applicant.id === app.id
          );
          return {
            id: app.id,
            name: applicant?.candidato?.user?.name ?? "",
            similarity: app.similarity,
          };
        });
        return applicantsWithSimilarity;
      }
      return [];
    }),
  getMatches: protectedProcedure
    .input(
      z.object({
        proyectId: z.string(),
        positionId: z.string(),
        min_similarity: z.number().default(0.0),
      })
    )
    .query(async ({ ctx, input }) => {
      const recruiterId = ctx.session.user.id;
      const { proyectId, positionId, min_similarity } = input;
      console.log(proyectId, positionId, min_similarity);
      console.log(recruiterId);
      // get_matches(recruiterId text, proyectId text, positionId text, min_similarity float)
      // returns table (id text, position_similarity float, proyect_similarity float, recruiter_similarity float, similarity float)
      const { data } = await supabase.rpc("get_matches", {
        recruiterid: recruiterId,
        proyectid: proyectId,
        positionid: positionId,
        min_similarity: min_similarity,
      });

      console.log(data);

      const applicants = await ctx.prisma.aplicacion.findMany({
        where: {
          id: {
            in: data?.map(
              (app: {
                id: string;
                position_similarity: number;
                proyect_similarity: number;
                recruiter_similarity: number;
                similarity: number;
              }) => app.id
            ),
          },
        },
        include: {
          candidato: {
            include: {
              user: true,
            },
          },
        },
      });
      console.log(applicants);

      return data?.map(
        (app: {
          id: string;
          position_similarity: number;
          proyect_similarity: number;
          recruiter_similarity: number;
          similarity: number;
        }) => {
          const applicant = applicants.find(
            (applicant) => applicant.id === app.id
          );
          return {
            ...app,
            name: applicant?.candidato?.user?.name ?? "",
            similarity: app.similarity,
          };
        }
      );
    }),
});

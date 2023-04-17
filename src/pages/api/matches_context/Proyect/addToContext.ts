import { prisma } from "y/server/db";
import { supabase } from "y/server/supabase";
import { openai } from "y/server/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../../../types/supabase";
import { PostgrestError } from "@supabase/supabase-js";

const addToContext = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body as { id: string };
  const proyect = await prisma.proyecto.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      Requirement: {
        select: {
          name: true,
        },
      },
    },
  });

  // Check if proyect is already in context
  const { data: proyectInContext, error: errorInContext } = await supabase
    .from("proyectos")
    .select("id")
    .eq("id", id);
  if (errorInContext) {
    return res.status(500).json({ error: errorInContext });
  }
  if (proyectInContext.length > 0) {
    return res.status(200).json({ data: proyectInContext });
  }

  const contexto =
    proyect.nombre +
    " " +
    proyect.descripcion +
    " " +
    proyect.Requirement.map((req) => req.name).join(" ");
  const embedding = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: contexto,
  });
  const embeddingValue = embedding?.data?.data[0]?.embedding;

  if (!embeddingValue) {
    return res.status(500).json({ error: "No se pudo crear el embedding" });
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
    return res.status(500).json({ error: errorNewProyect });
  }
  return res.status(200).json({ data: dataNewProyect });
};

export default addToContext;

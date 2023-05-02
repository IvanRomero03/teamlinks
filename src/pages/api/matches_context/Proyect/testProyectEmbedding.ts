import { prisma } from "y/server/db";
import { supabase } from "y/server/supabase";
import { openai } from "y/server/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../../types/supabase";
import { PostgrestError } from "@supabase/supabase-js";

const testProyectEmbedding = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
  interface res {
    error: PostgrestError | null;
    data: Database["public"]["Tables"]["test_embeddings"]["Row"][] | null;
  }
  const Res = await supabase.rpc("test_match_vector", {
    embedding: String(embeddingValue),
    match_count: 5,
    val: contexto,
  });
  if (Res.error) {
    return res.status(500).json({ error: Res.error });
  }
  return res.status(200).json({ data: Res?.data });
};

export default testProyectEmbedding;

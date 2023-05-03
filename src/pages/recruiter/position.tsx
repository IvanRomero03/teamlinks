import {
  InferGetStaticPropsType,
  type GetStaticProps,
  type NextPage,
} from "next";
import Layout from "y/components/layout/layout";

import { api } from "y/utils/api";

export const getStaticProps: GetStaticProps = (ctx) => {
  console.log(ctx.params);
  // params: { idPosition: position.id, idProyect: idProyecto },
  const { idPosition, idProyect } = ctx.params;

  return {
    props: {
      idPosition: idPosition as string,
      idProyect: idProyect as string,
    },
  };
};

const Projects = ({
  idPosition,
  idProyect,
}: {
  idPosition: string;
  idProyect: string;
}) => {
  const { data: positions, isLoading: positionsLoading } =
    api.position.getPosition.useQuery({ id: idPosition });
  const { data: matches, isLoading: matchesLoading } =
    api.context.getMatches.useQuery({
      min_similarity: 0,
      positionId: idPosition,
      proyectId: idProyect,
    });

  return (
    <Layout
      Items={[
        { title: "Home", section: "recruiter" },
        { title: "My User", section: "recruiter/user" },
        { title: "My Projects", section: "recruiter/projects" },
        { title: "Applications", section: "recruiter/applications" },
      ]}
    >
      <div className="m-auto mt-20 p-10">
        {positionsLoading ? (
          <p className="text-2xl font-bold text-white">Loading</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white">
              {positions?.jobTitle}
            </h1>
            <p className="text-md my-4 h-32 overflow-auto font-bold text-white">
              {positions?.descripcion}
            </p>
            <div className="flex flex-col justify-center border-2 border-gray-300 bg-white p-4 shadow-lg">
              {positions?.Aplicacion.map((aplicacion) => (
                <div
                  className="flex flex-row justify-between"
                  key={aplicacion.id}
                >
                  <p>{aplicacion.candidato.user.name}</p>
                  <p>{aplicacion.estatus}</p>
                </div>
              ))}
            </div>
            {matchesLoading ? (
              <p className="text-2xl font-bold">Loading</p>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white">Matches</h1>
                <div className="flex flex-col justify-center border-2 border-gray-300 bg-white p-4 shadow-lg">
                  {matches?.map((match) => (
                    <div
                      className="flex flex-row justify-between"
                      key={match.id}
                    >
                      <p>{match.name}</p>
                      <p>{match.position_similarity}</p>
                      <p>{match.proyect_similarity}</p>
                      <p>{match.recruiter_similarity}</p>
                      <p>{match.similarity}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Projects;

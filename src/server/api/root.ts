import { createTRPCRouter } from "y/server/api/trpc";
import { exampleRouter } from "y/server/api/routers/example";
import { permisionRouter } from "y/server/api/routers/permisions";
import { adminRouter } from "./routers/admin/root";
import { getInviteRouter } from "./routers/recruiter/getInvite";
import { createAccountRouter } from "./routers/recruiter/createAccount";
import { candidateRouter } from "./routers/candidate/root";
import { addToContextRouter } from "./routers/context/addToContext";
import { recruiterInfo } from "./routers/recruiter/recruiterInfo";
import { positionRouter } from "./routers/recruiter/position";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  permision: permisionRouter,
  admin: adminRouter,
  getInvite: getInviteRouter,
  createRecruiter: createAccountRouter,
  candidateRouter: candidateRouter,
  context: addToContextRouter,
  recruiterInfo: recruiterInfo,
  position: positionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

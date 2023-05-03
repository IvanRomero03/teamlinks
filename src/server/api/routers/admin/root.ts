import { createTRPCRouter } from "y/server/api/trpc";
import { inviteRecruiterRouter } from "./inviteRecruiter";
import { projectRouter } from "./project";
import { recruitersRouter } from "./recruiters";
import { positionRouter } from "./position";
import { homeRouter } from "./home";

export const adminRouter = createTRPCRouter({
  inviteRecruiter: inviteRecruiterRouter,
  projectRouter: projectRouter,
  recruiters: recruitersRouter,
  positions: positionRouter,
  home: homeRouter,
});

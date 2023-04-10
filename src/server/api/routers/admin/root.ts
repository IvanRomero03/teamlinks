import { createTRPCRouter } from "y/server/api/trpc";
import { inviteRecruiterRouter } from "./inviteRecruiter";

export const adminRouter = createTRPCRouter({
  inviteRecruiter: inviteRecruiterRouter,
});

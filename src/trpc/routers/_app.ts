import { projectsRouter } from "@/modules/projects/server/procedures";
import { createTRPCRouter } from "../init";
import { messagesRouter } from "@/modules/messages/server/procedures";
import { usageRouter } from "@/modules/usage/server/procedure";
export const appRouter = createTRPCRouter({
  usage: usageRouter,
  message: messagesRouter,
  project: projectsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

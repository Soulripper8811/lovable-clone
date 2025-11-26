import ProjectView from "@/modules/projects/ui/views/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { projectId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.message.getMany.queryOptions({ projectId })
  );
  void queryClient.prefetchQuery(
    trpc.project.getOne.queryOptions({ id: projectId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error occurred</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default page;

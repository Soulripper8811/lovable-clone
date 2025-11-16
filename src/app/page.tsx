import { getQueryClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";
import ClientTest from "./ClientTest";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const queryCient = getQueryClient();
  void queryCient.prefetchQuery(trpc.createAi.queryOptions({ text: "amit" }));

  return (
    <HydrationBoundary state={dehydrate(queryCient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientTest />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

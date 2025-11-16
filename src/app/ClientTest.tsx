"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const ClientTest = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.createAi.queryOptions({ text: "amit" })
  );

  return <div>{data?.greeting}</div>;
};

export default ClientTest;

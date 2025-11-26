"use client";
import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

interface Props {
  points: number;
  msBeforeNext: number;
}

const Usage = ({ points, msBeforeNext }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });

  const resetTime = useMemo(() => {
    try {
      return formatDuration(
        intervalToDuration({
          start: new Date(),
          end: new Date(Date.now() + msBeforeNext),
        }),
        {
          format: ["months", "days", "hours"],
        }
      );
    } catch (error) {
      console.error("Error Formatting Duration", error);
      return "Soon";
    }
  }, [msBeforeNext]);

  return (
    <div className="rounded-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">
            {points} {hasProAccess ? "" : "Free"} credits remaining
          </p>
          <p className="text-xs text-muted-foreground">Reset in {resetTime}</p>
        </div>
        {!hasProAccess && (
          <Button asChild variant={"tertiary"} size={"sm"} className="ml-auto">
            <Link href={"/pricing"}>
              <CrownIcon /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Usage;

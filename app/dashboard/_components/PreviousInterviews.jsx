"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function PreviousInterviews() {
  const user = useUser();
  const [interviews, setInterviews] = useState([]);
  const getPreviousInterviews = async () => {
    try {
      const res = await fetch(
        `/api/interview?email=${user?.user?.primaryEmailAddress?.emailAddress}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      if (res.status == "200") {
        setInterviews(result.interview);
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (!user?.user?.primaryEmailAddress?.emailAddress) return;
    getPreviousInterviews();
  }, [user?.user?.primaryEmailAddress?.emailAddress]);
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-xl sm:text-left text-center">Previously created Interviews</h2>
      <p className="tracking-tight text-gray-600 font-semibold mb-2 sm:text-left text-center">
        Retake a previously created interview, or view its report.
      </p>

      <div className="flex gap-4 flex-wrap sm:justify-start justify-center">
        {interviews.map((ele, ind) => (
          <div
            key={ind}
            className="p-4 border-2 rounded-md w-fit shadow-sm hover:shadow-md duration-200"
          >
            <div className="leading-">
              <h3 className="font-extrabold tracking-tighter text-2xl text-primary">
                {ele?.jobPosition}
              </h3>
              <p className="font-semibold text-gray-800">
                {ele?.jobExperience} years of experience
              </p>
              <p className="text-xs font-semibold text-gray-600">
                Created At:{" "}
                {new Date(ele?.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex justify-end">
              <Link href={`/dashboard/interview/${ele._id}`}>
                <Button className="px-6 font-semibold">Start</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousInterviews;

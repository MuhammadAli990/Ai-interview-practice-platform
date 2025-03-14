"use client";
import { ArrowDownFromLine, ChevronsDown, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function ReportPage({ params }) {
  const { id: interviewId, reportId } = params;
  const [report, setReport] = useState(null);
  const [feedback, setfeedback] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getReport = async () => {
    try {
      const result = await fetch(`/api/report?id=${reportId}`, {
        method: "GET",
      });
      const res = await result.json();
      setReport(res?.report);
      setfeedback(JSON.parse(res?.report?.feedback));
      setQuestions(JSON.parse(res?.report?.interview?.jsonMockResp));
      console.log(JSON.parse(res?.report?.feedback));
    } catch (e) {}
  };
  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="container py-6">
      {report == null && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader2
            height={60}
            width={60}
            className="animate-spin text-primary"
          />
        </div>
      )}

      {report != null && <div>
        <div className="leading-3">
          <p className="font-semibold text-gray-800">Status:</p>
          <h2 className="leading-[50px] tracking-tight  bg-gradient-to-r from-pink-600 via-blue-600 to-green-600  bg-clip-text text-transparent text-4xl font-extrabold">
            {report?.status}
          </h2>
        </div>

        <p className="text-xl font-semibold tracking-tight text-gray-700">
          Your overall Interview Rating:{" "}
          <strong>{report?.totalRating}/100</strong>
        </p>

        <p className="text-gray-500 font-semibold text-sm tracking-tight mt-6 mb-4">
          Find below interview feedback with correct answer, your answer and
          feedback for improvement.
        </p>

        {feedback.map((ele, ind) => (
          <Collapsible key={ind}>
            <CollapsibleTrigger className="text-left grid grid-cols-11 items-center gap-4 font-semibold border-2 bg-gray-200 p-4 rounded-lg w-full shadow-sm text-sm">
              <h4 className="col-span-10">{questions[ind]?.question}</h4>{" "}
              <ChevronsDown className="col-span-1" width={40} />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2 mt-2 mb-2 rounded-md">
              <div className="border-2 p-3 rounded-md">
                Rating: {ele?.question?.rating}
              </div>
              <div className="bg-pink-200 text-pink-700 leading-4 text-sm p-3 rounded-md">
                <strong>Your answer:</strong> {ele?.question?.userAnswer}
              </div>
              <div className="bg-green-200 text-green-700 leading-4 text-sm p-3 rounded-md">
                <strong>Correct Answer:</strong> {ele?.question?.correctAnswer}
              </div>
              <div className="bg-blue-200 text-blue-700 leading-4 text-sm p-3 rounded-md">
                <strong>Feedback:</strong> {ele?.question?.feedback}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>}
    </div>
  );
}

export default ReportPage;

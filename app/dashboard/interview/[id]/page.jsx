"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interviewpage({ params }) {
  const id = params?.id;
  const [interview, setInterview] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const router = useRouter();

  const getInterviewDetails = async () => {
    try {
      const res = await fetch(`/api/interview?id=${id}`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.status == "200") {
        setInterview(result.interview);
      }
    } catch (e) {}
  };

  const startInterview = () => {
    router.push(`/dashboard/interview/${id}/start`);
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div className="container py-8 space-y-6">
      <h2 className="font-bold text-2xl tracking-tight text-center">
        Let's Get Started!
      </h2>

      <div className=" gap-5 grid md:grid-cols-2">
        <div className="flex-1 space-y-2">
          <div className="border shadow-sm p-4 rounded-lg space-y-2">
            <span className="flex gap-1">
              <p className="font-bold">Job Role/Job Description:</p>{" "}
              {interview?.jobPosition}
            </span>
            <span className="flex gap-1">
              <p className="font-bold">Job Description/Tech Stack:</p>
              {interview?.jobDescription}
            </span>
            <span className="flex gap-1">
              <p className="font-bold">Experience:</p>{" "}
              {interview?.jobExperience} year/s
            </span>
          </div>

          <div className="bg-yellow-100 text-yellow-600 p-4 rounded-lg border space-y-1">
            <div className="flex gap-2 items-center text-lg font-bold">
              <Lightbulb />
              Information
            </div>
            <div className="text-sm leading-4">
              <p>
                Enable webcam and microphone to start your AI Generated
                interview. It has 5 questions which you can answer and at the
                end you will get the report based on your answers.
              </p>
              <p className="mt-1">
                NOTE: We never record your video. You can disable webcam access
                at any time if you want.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1 flex justify-center flex-col">
          {webcamEnabled && (
            <div className="h-[23rem] overflow-hidden">
              <Webcam className="h-full w-full object-cover" mirrored={true} />
            </div>
          )}
          {!webcamEnabled && (
            <div className="h-80 bg-primary text-white flex justify-center items-center">
              <WebcamIcon width={140} height={140} />
            </div>
          )}
          {!webcamEnabled && (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setWebcamEnabled(true)}
            >
              Enable webcam
            </Button>
          )}
          <Button onClick={startInterview} className="w-full font-bold">Start Interview</Button>
        </div>
      </div>

      <div className="flex justify-center"></div>
    </div>
  );
}

export default Interviewpage;

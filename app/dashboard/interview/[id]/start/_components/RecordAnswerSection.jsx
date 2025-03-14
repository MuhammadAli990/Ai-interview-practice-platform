"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { generateReport } from "@/lib/GeminiAi";
import { useRouter } from "next/navigation";

function RecordAnswerSection({ activeQuestion, questions, interviewId }) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const router = useRouter();

  const [userAnswer, setUserAnswer] = useState([
    { question: questions[0]?.question, answer: "" },
    { question: questions[1]?.question, answer: "" },
    { question: questions[2]?.question, answer: "" },
    { question: questions[3]?.question, answer: "" },
    { question: questions[4]?.question, answer: "" },
  ]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setUserAnswer(questions.map((q) => ({ question: q.question, answer: "" })));
  },[questions])
  
  useEffect(() => {
    console.log(results);
    if(results.length==0) return;
    const answer = results[0]?.transcript;
    if (answer.length > 10) {
      setUserAnswer((p) =>
        p.map((ele, ind) =>
          ind == activeQuestion ? { ...ele, answer }: ele
        )
      );
      toast("Your answer has been recorded successfully.")
    }
    else{
      toast("Your answer was not recorded properly. Please try again.")
    }
    results.shift();
  }, [results]);

  const endInterview = async()=>{
    setLoading(true);
    try{
      console.log(userAnswer)
      const report = await generateReport(userAnswer);
      const data = JSON.parse(report);
      const res = await fetch('/api/report',{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({data,interviewId})
      })
      const result = await res.json();
      router.push(`/dashboard/interview/${interviewId}/report/${result.id}`)
    }
    catch(e){
      console.log(e.message);
    }
    finally{
      setLoading(false);
    }
  }


  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="h-[23rem] w-full bg-primary text-white flex justify-center items-center">
          <WebcamIcon width={140} height={140} />
        </div>
        <div className="h-[23rem] w-full overflow-hidden absolute top-0">
          <Webcam className="h-full w-full object-cover" mirrored={true} />
        </div>
      </div>

      <div className="flex justify-center gap-2 z-10">
        <Button onClick={isRecording?stopSpeechToText:startSpeechToText}>
          {isRecording ? "Stop Recording" : "Start Recording"} <Mic />
        </Button>
        <Button onClick={()=>endInterview()}>
          {loading?"Ending interview...":"End interview"}
          {loading && <Loader2 className="animate-spin"/>}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;

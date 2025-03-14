'use client'
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

function page({params}) {
    const {id} = params;
    const [interview,setInterview] = useState(null);
    const [questions,setQuestions] = useState([])
    const [activeQuestion,setActiveQuestion] = useState(0);

    const getInterviewDetails = async () => {
        try {
          const res = await fetch(`/api/interview?id=${id}`,{
            method: "GET",
          });
          const result = await res.json();
          if (res.status == '200') {
            setInterview(result.interview);
            setQuestions(JSON.parse(result.interview.jsonMockResp));
          }
        } catch (e) {

        }
      };
    
      useEffect(() => {
        getInterviewDetails();
      }, []);

  return (
    <div className="container py-8 space-y-6">
      <h2 className="font-bold text-2xl tracking-tight text-center">
        Interview Started!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuestionSection questions={questions} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion}/>
        <RecordAnswerSection questions={questions} activeQuestion={activeQuestion} interviewId={id}/>
      </div>

    </div>
  );
}

export default page;

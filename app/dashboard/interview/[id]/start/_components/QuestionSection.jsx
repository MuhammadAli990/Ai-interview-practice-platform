import { LightbulbIcon, Loader2, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ questions, activeQuestion, setActiveQuestion }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support that.");
    }
  };

  if(questions.length==0){
    return <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <Loader2 className="animate-spin" height={50} width={50}/>
      <h2 className="text-lg font-bold">Loading...</h2>
    </div>
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="border rounded-lg p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {questions &&
            questions.map((_, ind) => (
              <h2 key={ind}
                className={`py-2 px-4 border rounded-full md:text-sm text-xs cursor-pointer hover:bg-primary/90 duration-200 hover:text-white ${
                  activeQuestion == ind
                    ? " bg-primary/90 text-white shadow-md"
                    : " bg-green-50 "
                }`}
                onClick={() => setActiveQuestion(ind)}
              >
                Question#{ind + 1}
              </h2>
            ))}
        </div>

        <h2 className="tracking-tight space-y-1">
          {questions[activeQuestion]?.question}
          <div className="flex justify-end">
            <Volume2
              onClick={() => textToSpeech(questions[activeQuestion]?.question)}
              className="hover:text-green-700 cursor-pointer duration-200 hover:scale-105 active:scale-95"
            />
          </div>
        </h2>
      </div>
      <div className="bg-blue-100 text-blue-700 p-4 rounded-lg space-y-2">
        <div className="font-bold text-lg flex items-center gap-2">
          <LightbulbIcon />
          Note:
        </div>
        <p className="text-sm leading-4">
          Click on Record Answer when you want to answer the question. At the
          end of interview we will give you the feedback along with correct
          answer of each question.
        </p>
      </div>
    </div>
  );
}

export default QuestionSection;

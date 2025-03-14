import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export const getInterviewQuestions = async (jobPosition, jobDescription, jobExperience) => {
    const prompt = `Based on the following job description, job position, and the candidate's experience level, create 5 interview questions that the candidate can answer in a few second to 1-2 minutes each. The questions should be **appropriate for the candidate's years of experience**:
    - If the candidate has **less experience**, the questions should be easier.
    - If the candidate has **more experience**, the questions should be more challenging and should require more in-depth answers.

    The questions should focus on the **job description** and **job position** while reflecting the **candidate's experience level**.

    Job Description: ${jobDescription}
    Job Experience: ${jobExperience} years
    Job Position: ${jobPosition}

    Please generate 5 interview questions that are **easier to some what harder** based on the years of experience provided. Each question should be relevant to the job position and description, ensuring that the difficulty increases with experience.

    The questions should be phrased as if the interviewer is asking the candidate face-to-face in a real-time interview (like Google Meet or a real interview), with the candidate answering in real time — no practical to do questions, just conversational questions.

    No compliments like great,wow,excellent etc. You can use words like "hi" or "welcome" etc in 1st question and words like "finally" or "at last" etc in last question.

    Return only the 5 questions in the json format:`

    let result = await model.generateContent(prompt);
    return result.response.text().replace('```json', '').replace('```', '');
}

export const generateReport = async (questions) => {
    const prompt = `Hello! I have 5 questions and answers that have been given by the user in a virtual interview. Please review each answer and provide the following information for each question:

    1. **Correct Answer:** What would be a good, correct answer to this question, in simple terms?
    2. **Feedback:** Based on the answer provided, how well did the person answer the question? Please provide constructive and friendly feedback.
    3. **Rating:** Rate the answer on a scale of 0 to 10, where 0 means 'not correct at all' and 10 means 'perfect answer.' Try to be humble and friendly while evaluating the answers.

    Additionally, provide the following:
    - **Total Rating:** The rating for all answers, ranging from 0 to 100.
    - **Status:** A friendly overall status based on the answers, such as 'Excellent,' 'Outstanding,' 'Satisfactory,' or any other appropriate term.

    Here are the 5 questions and their answers:

    [
      { 'question': '${questions[0]?.question}', 'answer': '${questions[0]?.answer}' },
      { 'question': '${questions[1]?.question}', 'answer': '${questions[1]?.answer}' },
      { 'question': '${questions[2]?.question}', 'answer': '${questions[2]?.answer}' },
      { 'question': '${questions[3]?.question}', 'answer': '${questions[3]?.answer}' },
      { 'question': '${questions[4]?.question}', 'answer': '${questions[4]?.answer}' }
    ]

    Please return the data in JSON format like this:

    {
        "questions": [
          {
            "question": {
              "userAnswer": "The answer which user gave",
              "correctAnswer": "The correct answer to question 1.",
              "feedback": "Friendly feedback about how the user answered question 1.",
              "rating": 7
            }
          },
          {
            "question": {
              "userAnswer": "The answer which user gave",
              "correctAnswer": "The correct answer to question 2.",
              "feedback": "Friendly feedback about how the user answered question 2.",
              "rating": 8
            }
          },
          {
            "question": {
              "userAnswer": "The answer which user gave",
              "correctAnswer": "The correct answer to question 3.",
              "feedback": "Friendly feedback about how the user answered question 3.",
              "rating": 6
            }
          },
          {
            "question": {
              "userAnswer": "The answer which user gave",
              "correctAnswer": "The correct answer to question 4.",
              "feedback": "Friendly feedback about how the user answered question 4.",
              "rating": 9
            }
          },
          {
            "question": {
              "userAnswer": "The answer which user gave",
              "correctAnswer": "The correct answer to question 5.",
              "feedback": "Friendly feedback about how the user answered question 5.",
              "rating": 8
            }
          }
        ],
        "totalRating": 40,
        "status": "Satisfactory"
    }


    Please ensure your responses are polite, encouraging, and friendly. Keep the evaluation easy and reasonable and not too harsh. Also try if possible to correct any spelling mistake in the answer to the question context on ur own.`

    let result = await model.generateContent(prompt);
    return result.response.text().replace('```json', '').replace('```', '');
}
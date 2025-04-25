"use client";

import { Button } from "@/components/ui/button";
import useAxios from "../utils/useAxios";
import { useEffect, useMemo, useState } from "react";
import Header from "../partials/home/header";
import PrivateRoute from "../utils/PrivateRoute";
import { mathsQuiz } from "../seed/maths";
import { decode } from "he";

function getRandomQuestions<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Home() {
  const api = useAxios();
  const questions = useMemo(() => getRandomQuestions(mathsQuiz, 10), []);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const handleAnswer = (questionIndex: number, answer: string) => {
    if (selectedAnswers[questionIndex]) return; // prevent multiple answers
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  return (
    <PrivateRoute>
      <Header />
      <section className="flex flex-col align-middle justify-center gap-[24px] h-[100%] w-full max-w-[850px] mt-8 mb-28 mx-auto">
        <div className="mt-2">
          <div className="is-quiz-progress lg:hidden">
            <div className="progress-bar">
              <div className="progress w-[15%]"></div>
            </div>
            <span>1/20</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-[30px] lg:p-0">
          {questions.map((item, index) => {
            const answers = useMemo(
              () =>
                [...item.incorrect_answers, item.correct_answer].sort(
                  () => Math.random() - 0.5
                ),
              [item]
            );

            return (
              <div key={index} className="flex flex-col gap-4">
                <div className="text-[18px] font-[600]">
                  {index + 1}. {decode(item.question)}
                </div>

                <div className="is-quiz-answer flex flex-col gap-3">
                  {answers.map((ans, i) => {
                    const selected = selectedAnswers[index];
                    const isCorrect = ans === item.correct_answer;
                    const isChosen = selected === ans;

                    let className =
                      "is-answer whitespace-break-spaces text-left flex";
                    let iconName = String.fromCharCode(65 + i);
                    if (selected) {
                      if (isCorrect) {
                        className += " is-correct";
                        iconName = "<i className='far fa-check'></i>";
                      } else if (isChosen && !isCorrect) {
                        className += " is-wrong";
                        iconName = '<i className="far fa-times"></i>';
                      }
                    }

                    return (
                      <Button
                        key={i}
                        className={className}
                        onClick={() => handleAnswer(index, ans)}
                        disabled={!!selected}
                      >
                        <span>{iconName}</span>
                        <span>{decode(ans)}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="is-quiz-footer">
          <div className="is-quiz-progress w-[25%] hidden lg:flex">
            <div className="progress-bar">
              <div className="progress w-[15%]"></div>
            </div>
            <span>1/20</span>
          </div>

          <Button
            className="h-[45px] w-[200px] hover:outline-primary hover:text-primary"
            disabled={true}
          >
            Continue
          </Button>
        </div>
      </section>
    </PrivateRoute>
  );
}

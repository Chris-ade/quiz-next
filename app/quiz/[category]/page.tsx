"use client";

import { Button } from "@/components/ui/button";
import { JSX, useEffect, useMemo, useState } from "react";
import Header from "@/app/partials/home/header";
import PrivateRoute from "@/app/utils/PrivateRoute";
import { decode } from "he";
import ScoreDialog from "@/app/partials/quiz/score-dialog";

import { scienceQuiz } from "@/app/seed/science";
import { techQuiz } from "@/app/seed/technology";
import { engrQuiz } from "@/app/seed/engineering";
import { mathsQuiz } from "@/app/seed/maths";
import { useParams } from "next/navigation";

const POINTS_PER_QUESTION = 5;
const QUESTIONS_TOTAL = 20;
const QUESTIONS_PER_PAGE = 10;

type QuizMap = {
  [key: string]: any[];
};

const quizMap: QuizMap = {
  science: scienceQuiz,
  technology: techQuiz,
  engineering: engrQuiz,
  maths: mathsQuiz,
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams<{ category: string }>();

  const fullData = quizMap[params.category];

  const questions = useMemo(() => {
    return [...fullData]
      .sort(() => 0.5 - Math.random())
      .slice(0, QUESTIONS_TOTAL);
  }, []);

  const start = page * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(start, start + QUESTIONS_PER_PAGE);

  const handleAnswer = (index: number, answer: string) => {
    if (selectedAnswers[index]) return;
    setSelectedAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleNext = () => {
    if (page < Math.floor(QUESTIONS_TOTAL / QUESTIONS_PER_PAGE) - 1) {
      setPage(page + 1);
    }
  };

  const handleAutoSubmit = () => {
    setIsSubmitted(true);

    // Fill in unanswered as null or skip
    const filledAnswers: Record<number, string> = { ...selectedAnswers };
    questions.forEach((q, index) => {
      if (!filledAnswers.hasOwnProperty(index)) {
        filledAnswers[index] = "";
      }
    });

    setSelectedAnswers(filledAnswers);
    setPage(1); // Show results page
  };

  const isCompleted = Object.keys(selectedAnswers).length === QUESTIONS_TOTAL;
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correct_answer ? acc + 1 : acc;
  }, 0);
  const progressPercent = (totalAnswered / QUESTIONS_TOTAL) * 100;
  const score = correctCount * POINTS_PER_QUESTION;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <PrivateRoute>
      <Header />
      <section className="flex flex-col align-middle justify-center gap-[24px] h-[100%] w-full max-w-[850px] mt-8 mb-28 mx-auto">
        <div className="mt-2 px-[30px] sticky top-0">
          <div className="is-quiz-progress lg:hidden">
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${progressPercent}%`,
                }}
              ></div>
            </div>
            <span>
              {totalAnswered}/{QUESTIONS_TOTAL}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-[30px] lg:p-0">
          {currentQuestions.map((item, i) => {
            const globalIndex = start + i;
            const answers = useMemo(
              () =>
                [...item.incorrect_answers, item.correct_answer].sort(
                  () => Math.random() - 0.5
                ),
              [item]
            );

            return (
              <div key={globalIndex} className="flex flex-col gap-4">
                <div className="text-[18px] font-[600]">
                  {globalIndex + 1}. {decode(item.question)}
                </div>

                <div className="is-quiz-answer flex flex-col gap-3">
                  {answers.map((ans, i) => {
                    const selected = selectedAnswers[globalIndex];
                    const isCorrect = ans === item.correct_answer;
                    const isChosen = selected === ans;

                    let className =
                      "is-answer whitespace-break-spaces text-left flex";
                    let icon: JSX.Element | string = String.fromCharCode(
                      65 + i
                    );
                    if (selected) {
                      if (isCorrect) {
                        className += " is-correct";
                        icon = <i className="far fa-check" />;
                      } else if (isChosen && !isCorrect) {
                        className += " is-wrong";
                        icon = <i className="far fa-times" />;
                      }
                    }

                    return (
                      <Button
                        key={i}
                        className={className}
                        onClick={() => handleAnswer(globalIndex, ans)}
                        disabled={!!selected || isSubmitted}
                      >
                        <span>{icon}</span>
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
          <div className="is-quiz-progress w-[20%] hidden lg:flex">
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${progressPercent}%`,
                }}
              ></div>
            </div>
            <span>
              {totalAnswered}/{QUESTIONS_TOTAL}
            </span>
          </div>

          {!isSubmitted && (
            <>
              <div>
                <i className="far fa-clock mr-3 text-lg" />
                <Button className="button text-sm font-bold text-white hover:bg-primary cursor-default">
                  {formatTime(timeLeft)}
                </Button>
              </div>

              {page > 0 && (
                <Button
                  className="h-[45px] w-[140px] hover:outline-destructive hover:text-destructive hover:text-white"
                  onClick={() => setPage(page - 1)}
                  variant="destructive"
                >
                  <i className="fas fa-arrow-left mr-auto" /> Previous
                </Button>
              )}

              {page < Math.floor(QUESTIONS_TOTAL / QUESTIONS_PER_PAGE) - 1 && (
                <Button
                  className="h-[45px] w-[140px] align-middle justify-center hover:outline-primary hover:text-primary"
                  onClick={() => setPage(page + 1)}
                >
                  Next <i className="fas fa-arrow-right ml-auto" />
                </Button>
              )}
            </>
          )}
        </div>

        {/* Summary */}
        {isCompleted && page === 1 && (
          <ScoreDialog
            score={score}
            correctCount={correctCount}
            totalQuestions={QUESTIONS_TOTAL}
            timeTaken={timeLeft}
          />
        )}
      </section>
    </PrivateRoute>
  );
}

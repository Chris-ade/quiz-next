"use client";

import Header from "../partials/home/header";
import PrivateRoute from "../utils/PrivateRoute";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxios from "../utils/useAxios";
import { useEffect, useState } from "react";

interface ScoreProps {
  id: number;
  userId: number;
  value: number;
  timeTaken: number;
  user: {
    name: string;
  };
}

export default function LeaderBoard() {
  const api = useAxios();
  const [scores, setScores] = useState<ScoreProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScore = async () => {
    try {
      const response = await api.get("/score");

      if (response.data.success) {
        setScores(response.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <PrivateRoute>
      <Header />
      <section className="flex flex-col align-middle justify-center gap-[24px] h-[100%] mt-8 mb-28 p-[30px] max-w-[750px] mx-auto">
        <div>
          <h4 className="font-bold">Leaderboard</h4>
          <p>Users scores ranking</p>
        </div>

        <div className="text-center">
          <i className="far fa-chevron-down" />
        </div>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell className="py-4 text-center" colSpan={4}>
                  Loading scores...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {scores.map((score, index) => (
                  <TableRow key={score.id}>
                    <TableCell className="w-[10%] py-4">
                      {index + 1 === 1 && (
                        <i className="fad fa-trophy text-lg text-[#ffd700]" />
                      )}
                      {index + 1 === 2 && (
                        <i className="fad fa-medal text-lg text-[#c0c0c0]" />
                      )}
                      {index + 1 === 3 && (
                        <i className="fad fa-medal text-[#cd7f32]" />
                      )}
                    </TableCell>
                    <TableCell className="py-4">{score.user.name}</TableCell>
                    <TableCell className="py-4">{score.value}%</TableCell>
                    <TableCell className="text-right py-4">
                      {formatTime(600 - score.timeTaken)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </section>
    </PrivateRoute>
  );
}

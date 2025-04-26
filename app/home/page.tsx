"use client";

import useAxios from "../utils/useAxios";
import Header from "../partials/home/header";
import PrivateRoute from "../utils/PrivateRoute";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const api = useAxios();

  return (
    <PrivateRoute>
      <Header />
      <section className="flex flex-col align-middle justify-center gap-[24px] h-[100%] mt-8 mb-28 p-[30px] max-w-[750px] mx-auto">
        <div>
          <h4 className="font-bold">Welcome back, {user?.name}</h4>
          <p>Choose the category you're interested in</p>
        </div>

        <div className="my-4 text-center">
          <i className="far fa-chevron-down" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/quiz/science" className="is-category-box">
            <div className="box-content">
              <i className="fad fa-flask-vial"></i>
              <div className="is-box-content">
                <h3 className="title">Science</h3>
                <p className="text-center"> Get quizzed on Science. </p>
              </div>
            </div>
          </Link>
          <Link href="/quiz/technology" className="is-category-box">
            <div className="box-content">
              <i className="fad fa-microchip"></i>
              <div className="is-box-content">
                <h3 className="title">Technology</h3>
                <p className="text-center">
                  {" "}
                  Get quizzed on anything technology.{" "}
                </p>
              </div>
            </div>
          </Link>
          <Link href="/quiz/engineering" className="is-category-box">
            <div className="box-content">
              <i className="fad fa-wrench"></i>
              <div className="is-box-content">
                <h3 className="title">Engineering</h3>
                <p className="text-center"> Get quizzed on Engineering. </p>
              </div>
            </div>
          </Link>
          <Link href="/quiz/maths" className="is-category-box">
            <div className="box-content">
              <i className="fad fa-square-root-variable"></i>
              <div className="is-box-content">
                <h3 className="title">Mathematics</h3>
                <p className="text-center">
                  {" "}
                  Get quizzed on general mathematics.{" "}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </PrivateRoute>
  );
}

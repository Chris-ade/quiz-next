"use client";

import Testimonials from "./testimonials";
import Faqs from "./faqs";

const Content = (): React.ReactNode => {
  return (
    <>
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-5xl">
          Taking quizzes{" "}
          <span className="relative whitespace-nowrap text-primary">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <span className="relative">made simple</span>
          </span>{" "}
          for everyone.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Looking for a fun and interactive way to test your knowledge?
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Enjoy fun, interactive quizzes whether you're studying, refreshing
          your knowledge, or just love trivia — here is your learning playground
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <a
            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            color="slate"
            href="/register"
          >
            Get started
          </a>
        </div>
      </section>

      {/* Down arrow */}
      <div className="flex justify-center">
        <button
          className="flex items-center text-base font-medium tracking-tight text-slate-900 hover:text-slate-700"
          onClick={() => {
            const element = document.querySelector("#why-us");
            element?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <i className="far fa-chevron-down ml-2 text-2xl"></i>
        </button>
      </div>

      {/* Why choose us section heading */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-14" id="why-us">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">
            Why choose us?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            We offer you the best quizzes, in <u>Science</u>, <u>Technology</u>,{" "}
            <u>Engineering</u> and <u>Mathematics</u> designed to challenge,
            entertain, and educate.
          </p>
        </div>
      </section>

      {/* Why choose us section content*/}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-16" id="features">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
              <div
                className="w-full flex-none lg:w-[40rem]"
                style={{ opacity: 1, transform: "none" }}
              >
                <div className="justify-center lg:justify-end relative flex aspect-[719/680] w-full grayscale">
                  <svg viewBox="0 0 655 680" fill="none" className="h-full">
                    <g clipPath="url(#clip)" className="group">
                      <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
                        <image
                          href="/static/images/vector.jpg"
                          width="655"
                          height="680"
                          className="w-full bg-neutral-100 object-cover"
                          style={{
                            color: "transparent",
                            aspectRatio: "655 / 680",
                          }}
                        />
                      </g>
                      <use
                        href="#shape"
                        strokeWidth="2"
                        className="stroke-neutral-950/10"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip">
                        <path
                          id="shape"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275c11.329-.874 21.411-7.529 24.88-25.981l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <ul
                role="list"
                className="text-base text-neutral-600 mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4"
              >
                {[
                  {
                    title: "STEM Oriented:",
                    description:
                      "Covering everything from science, tech, engineering and maths.",
                  },
                  {
                    title: "Instant Feedback:",
                    description: "Learn on the go with real-time answers.",
                  },
                  {
                    title: "Track Your Progress:",
                    description:
                      "Get insights and stats that show how you're improving over time.",
                  },
                  {
                    title: "Study Smarter:",
                    description:
                      "Use smart quiz modes like “Practice,” “Timed,” or “Challenge” to learn your way.",
                  },
                ].map((item, index) => (
                  <li className="group mt-10 first:mt-0" key={index}>
                    <div style={{ opacity: 1, transform: "none" }}>
                      <div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:top-0 before:left-0 before:h-px before:w-6 after:top-0 after:right-0 after:left-8 after:h-px">
                        <strong className="font-semibold text-neutral-950">
                          {item.title}{" "}
                        </strong>
                        {item.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Down arrow */}
      <div className="mt-10 flex justify-center">
        <button
          className="flex items-center text-base font-medium tracking-tight text-slate-900 hover:text-slate-700"
          onClick={() => {
            const element = document.querySelector("#testimonials");
            element?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <i className="far fa-chevron-down ml-2 text-2xl"></i>
        </button>
      </div>

      {/* Testimonials (not real btw.) */}
      <Testimonials />

      {/* FAQS Section */}
      <Faqs />
    </>
  );
};

export default Content;

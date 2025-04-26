"use client";

import UserAvatar from "./home/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I never thought studying could be this fun. The quizzes are super interactive and help me retain info way better than just reading notes.",
      name: "Samantha Littel",
      title: "Student",
    },
    {
      quote:
        "I'm addicted! I started with the engineering trivia and now I’m learning things I never thought I’d care about. It’s like social media for your brain.",
      name: "Paul Tyler",
      title: "Educator",
    },
    {
      quote:
        "Clean interface, smart quiz, and zero boring moments. I use it during lunch breaks at work to keep my brain sharp.",
      name: "Joe Allen",
      title: "Bootcamp Instructor",
    },
    {
      quote:
        "The progress tracking feature is amazing. It’s motivating to see my improvement over time, especially when prepping for exams.",
      name: "Steven Hackett",
      title: "Software Engineer",
    },

    {
      quote:
        "Finally an app where learning feels like a game. My kids and I play quizzes together every evening—it’s become our new family habit.",
      name: "Michael Scoffman",
      title: "Teacher",
    },

    {
      quote:
        "I was just looking for a quick quiz app, but this turned into my go-to study tool. The explanations after each question make a huge difference.",
      name: "Sarah Hamilton",
      title: "Student",
    },
  ];

  return (
    <section className="py-8 sm:py-10 lg:py-16">
      <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">
          Some kind words from our users...
        </h2>
        <p className="mt-4 text-lg tracking-tight text-slate-600">
          Here’s what they had to say about this platform.
        </p>
      </div>

      <div className="group mt-16">
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8"
        >
          {/* Testimonial Item */}
          {testimonials.map((testimonial, index) => (
            <li key={index} className="lg:hidden">
              <figure className="rounded-4xl p-8 shadow-md ring-1 ring-slate-900/5">
                <blockquote>
                  <p className="text-lg tracking-tight text-slate-900">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center">
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <UserAvatar name={testimonial.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base/6 font-medium tracking-tight text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {testimonial.title}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ul
          role="list"
          className="mx-auto hidden max-w-2xl grid-cols-1 gap-8 px-4 data-[expanded]:list-item lg:grid lg:max-w-7xl lg:grid-cols-3 lg:px-8 group-data-[expanded]:list-item"
        >
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <figure className="rounded-3xl p-8 shadow-md ring-1 ring-slate-900/5">
                <blockquote>
                  <p className="text-lg tracking-tight text-slate-900">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center">
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <UserAvatar name={testimonial.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base/6 font-medium tracking-tight text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {testimonial.title}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center text-base font-medium tracking-tight text-slate-900 hover:text-slate-700">
            <i className="far fa-chevron-down ml-2 text-2xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

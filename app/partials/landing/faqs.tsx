import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = (): React.ReactNode => {
  return (
    <section className="pb-8 sm:pb-10 lg:pb-16" id="faqs">
      <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12">
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">
          Frequently asked questions...
        </h2>
        <p className="mt-4 text-lg tracking-tight text-slate-600">
          Here are some questions you might have, already answered.
        </p>

        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is Quizzify free to use?</AccordionTrigger>
            <AccordionContent>
              Yes! we offer you top notch quizzes free of charge.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do I need to create an account to play quizzes?
            </AccordionTrigger>
            <AccordionContent>
              Yes! you need to create an account to get started.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Are the quizzes only based on STEM?
            </AccordionTrigger>
            <AccordionContent>
              Yes. We only offer quizzes based on Science, Technology,
              Engineering and Mathematics.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I use Quizzify on my phone or tablet?
            </AccordionTrigger>
            <AccordionContent>
              Yes! Quiz is fully responsive and works smoothly on mobile
              devices, tablets, and desktops.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How is my progress tracked?</AccordionTrigger>
            <AccordionContent>
              Once you're logged in, you'll see detailed stats for your quiz
              performance, including scores, accuracy, and improvement over
              time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;

/**
 * FAQ — the questions people actually ask before they call.
 *
 * Every answer here describes how the company works, not what it guarantees.
 * Nothing states a price, a turnaround time or a certification, because none
 * of those have been confirmed. Edit freely; delete anything that stops being
 * true, and the accordion simply shows one fewer question.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How do I get a quote?",
    answer:
      "Send the quote form on this page, call, or message us on WhatsApp with a description of the job. For anything beyond a small repair we'll arrange to come and look at the work in person — measuring and checking the site is the only way to quote it accurately.",
  },
  {
    question: "Do you charge for a site visit or an estimate?",
    answer:
      "Ask when you get in touch and we'll tell you straight away for your particular job. We'd rather be clear about that up front than surprise you afterwards.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We work across Jamaica, most often in Kingston, St. Andrew and St. Catherine. If you're further out, ask — depending on the size of the job it's often still workable.",
  },
  {
    question: "Do you supply the materials, or should I?",
    answer:
      "Either works. Some clients prefer to choose and buy their own tiles or fixtures; others would rather we handle the whole supply. Tell us which you'd prefer and the quote will be set out that way.",
  },
  {
    question: "Can you handle a job that involves more than one trade?",
    answer:
      "Yes — that's a large part of what we do. Tiling, plumbing, masonry and general construction are handled in-house, so a renovation touching several trades runs through one point of contact instead of you coordinating separate contractors.",
  },
  {
    question: "How long will my job take?",
    answer:
      "It depends entirely on the scope, the size of the area and the state of what's already there. We'll give you a realistic timeframe with your written quote, once we've seen the job — rather than a number over the phone that we'd have to walk back later.",
  },
  {
    question: "What happens if something changes mid-job?",
    answer:
      "We tell you as soon as we find it. If opening up a wall or lifting a floor reveals something that changes the scope, we stop, explain what we've found and what it means for the work and the cost, and agree the next step with you before carrying on.",
  },
  {
    question: "Do you clean up afterwards?",
    answer:
      "Yes. The area is cleared and cleaned at the end of the job, and we walk the finished work with you before we leave.",
  },
];

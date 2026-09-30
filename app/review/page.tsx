import type { Metadata } from "next";
import { concepts, questions, terms } from "@/content";
import { ReviewBoard } from "@/components/ReviewBoard";

export const metadata: Metadata = { title: "Review", description: "Your error log, weak words and depth progress." };

export default function ReviewPage() {
  return (
    <article className="page narrow">
      <h1>Review</h1>
      <p className="lede">Your error log, weak words, and how deep you have gone. Saved only in this browser.</p>
      <ReviewBoard
        questions={questions}
        titles={Object.fromEntries(concepts.map((c) => [c.id, c.title]))}
        words={Object.fromEntries(terms.map((t) => [t.id, t.word]))}
      />
    </article>
  );
}

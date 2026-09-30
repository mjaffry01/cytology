"use client";

import Link from "next/link";
import type { Mcq } from "@/content/schema";
import { toggleWeakTerm, useStore, write } from "@/lib/store";
import { QuizBlock } from "./QuizBlock";

export function ReviewBoard({
  questions,
  titles,
  words,
}: {
  questions: Mcq[];
  titles: Record<string, string>;
  words: Record<string, string>;
}) {
  const errors = useStore("onion.errors");
  const weak = useStore("onion.weakTerms");
  const progress = useStore("onion.progress");
  const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
  const logged = [...new Set(errors.map((e) => e.qid))].map((id) => byId[id]).filter(Boolean);
  const concepts = [...new Set(logged.map((q) => q.conceptId))];
  const opened = Object.keys(progress).length;

  return (
    <div className="review">
      <section>
        <h2>Retry what slipped</h2>
        {logged.length === 0 ? (
          <p className="muted">
            Nothing logged yet. Answer a practice set at the end of any concept; wrong answers and ones you mark “I
            guessed this” land here.
          </p>
        ) : (
          <>
            <p>
              {logged.length} question{logged.length === 1 ? "" : "s"} across{" "}
              {concepts.map((c, i) => (
                <span key={c}>
                  {i ? ", " : ""}
                  <Link href={`/study/${c}`}>{titles[c]}</Link>
                </span>
              ))}
              .
            </p>
            <QuizBlock questions={logged} linkToConcept titles={titles} />
            <button type="button" className="btn" onClick={() => write("onion.errors", [])}>
              Clear the error log
            </button>
          </>
        )}
      </section>

      <section>
        <h2>Weak words</h2>
        {weak.length === 0 ? (
          <p className="muted">Open any word card and press “Add to weak words”.</p>
        ) : (
          <ul className="wordlist">
            {weak.map((id) => (
              <li key={id}>
                <Link href={`/terms/${id}`}>{words[id] ?? id}</Link>
                <button type="button" className="linkish" onClick={() => toggleWeakTerm(id)} aria-label={`Remove ${words[id] ?? id}`}>
                  remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>How deep you have peeled</h2>
        <p className="muted">
          {opened} of {Object.keys(titles).length} concepts opened on this device.
        </p>
        <ul className="depthlist">
          {Object.entries(titles).map(([id, t]) => (
            <li key={id}>
              <Link href={`/study/${id}`}>{t}</Link>
              <span className="depth-meter" aria-label={progress[id] === undefined ? "not opened" : `L${progress[id]}`}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <i key={n} data-on={(progress[id] ?? -1) >= n} />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

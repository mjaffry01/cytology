"use client";

import Link from "next/link";
import { useState } from "react";
import { LAYER_LABELS, type ExamTag, type Mcq } from "@/content/schema";
import { clearError, logError, useStore } from "@/lib/store";

const TAGS: ExamTag[] = ["neet", "aiims", "jipmer", "cpmt"];

function Question({ q, n, linkToConcept, conceptTitle }: { q: Mcq; n: number; linkToConcept: boolean; conceptTitle?: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const errors = useStore("onion.errors");
  const guessed = errors.some((e) => e.qid === q.id && e.kind === "guessed");
  const done = pick !== null;
  const right = pick === q.answer;
  const layerHref = `${linkToConcept ? `/study/${q.conceptId}` : ""}#${q.layer}`;

  const answer = (i: number) => {
    if (done) return;
    setPick(i);
    if (i !== q.answer) logError({ qid: q.id, conceptId: q.conceptId, kind: "wrong" });
  };

  return (
    <li className="mcq" data-state={!done ? "open" : right ? "right" : "wrong"}>
      <p className="mcq-stem">
        <span className="mcq-n">{n}.</span> {q.stem}
      </p>
      <ol className="mcq-options" type="A">
        {q.options.map((o, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => answer(i)}
              disabled={done}
              data-picked={pick === i}
              data-correct={done && i === q.answer}
            >
              <span className="mcq-letter">{"ABCD"[i]}</span> {o}
            </button>
          </li>
        ))}
      </ol>
      {done && (
        <div className="mcq-explain" role="status">
          <p>
            <strong>{right ? "Right." : `Not quite — it is ${"ABCD"[q.answer]}.`}</strong> {q.explanation}
          </p>
          <p className="mcq-meta">
            Tests{" "}
            {linkToConcept ? (
              <Link href={layerHref}>
                {conceptTitle ?? ""} L{q.layer.slice(1)} {LAYER_LABELS[q.layer]}
              </Link>
            ) : (
              // plain anchor: a same-page hash must fire `hashchange` so the reader peels open
              <a href={layerHref}>
                L{q.layer.slice(1)} {LAYER_LABELS[q.layer]}
              </a>
            )}
            {" · "}
            {q.examTags.map((t) => t.toUpperCase()).join(" / ")} style
            {right && (
              <label className="guess">
                <input
                  type="checkbox"
                  checked={guessed}
                  onChange={() =>
                    guessed
                      ? clearError(q.id)
                      : logError({ qid: q.id, conceptId: q.conceptId, kind: "guessed" })
                  }
                />{" "}
                I guessed this
              </label>
            )}
            <button type="button" className="linkish" onClick={() => setPick(null)}>
              Try again
            </button>
          </p>
        </div>
      )}
    </li>
  );
}

export function QuizBlock({
  questions,
  linkToConcept = false,
  titles,
}: {
  questions: Mcq[];
  linkToConcept?: boolean;
  titles?: Record<string, string>;
}) {
  const [tag, setTag] = useState<ExamTag | "all">("all");
  const shown = tag === "all" ? questions : questions.filter((q) => q.examTags.includes(tag));
  const present = TAGS.filter((t) => questions.some((q) => q.examTags.includes(t)));

  if (!questions.length) return null;
  return (
    <div className="quiz">
      {present.length > 1 && (
        <div className="chips" role="group" aria-label="Filter by exam">
          <button type="button" aria-pressed={tag === "all"} onClick={() => setTag("all")}>
            All
          </button>
          {present.map((t) => (
            <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <ol className="mcq-list">
        {shown.map((q, i) => (
          <Question key={q.id} q={q} n={i + 1} linkToConcept={linkToConcept} conceptTitle={titles?.[q.conceptId]} />
        ))}
      </ol>
      <p className="muted small">
        Original practice items in NEET style, written for this site. Wrong answers and “I guessed this” go to your{" "}
        <Link href="/review">error log</Link>.
      </p>
    </div>
  );
}

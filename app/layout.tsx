import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Source_Serif_4 } from "next/font/google";
import { OnionMark } from "@/components/OnionMark";
import { SearchBox } from "@/components/SearchBox";
import "./globals.css";

const sans = Geist({ variable: "--font-ui", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-read", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Onion Cytology", template: "%s · Onion Cytology" },
  description:
    "Cell biology for NEET, AIIMS, JIPMER and old UP CPMT, taught in peelable layers: skin, flesh, core, seed, root.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <header className="site-head">
          <Link href="/" className="brand">
            <OnionMark size={28} />
            <span>
              Onion <em>Cytology</em>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Main">
            <Link href="/#shelves">Study</Link>
            <Link href="/terms">Glossary</Link>
            <Link href="/figures">Figures</Link>
            <Link href="/review">Review</Link>
          </nav>
          <SearchBox />
        </header>
        <main id="main">{children}</main>
        <footer className="site-foot">
          <p>
            Original teaching text, diagrams and questions. NCERT chapters are cited only as study pointers; this site is
            not NCERT and does not reproduce it.
          </p>
          <p className="muted">
            Keys: <kbd>[</kbd> shallower · <kbd>]</kbd> deeper · <kbd>/</kbd> search
          </p>
        </footer>
      </body>
    </html>
  );
}

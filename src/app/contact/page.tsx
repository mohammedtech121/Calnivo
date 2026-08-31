import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Mail, MessageCircle, Github } from "lucide-react";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the Calnivo team. Report a bug, request a calculator, or send feedback.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 text-lg text-brand-muted">
          Found a bug, have a calculator request, or want to send feedback? We&apos;d love to hear
          from you.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-brand-accent-deep">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-brand-ink">Email</h3>
                <p className="text-sm text-brand-muted">
                  For bug reports, calculator requests, and general feedback.
                </p>
              </div>
            </div>
            <a
              href="mailto:hello@calnivocalc.com"
              className="mt-3 inline-block font-medium text-brand-accent-deep hover:underline"
            >
              hello@calnivocalc.com
            </a>
          </div>

          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-brand-accent-deep">
                <Github className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-brand-ink">GitHub</h3>
                <p className="text-sm text-brand-muted">
                  Found a code issue or want to contribute? Open an issue.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/mohammedtech121/Calnivo/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-medium text-brand-accent-deep hover:underline"
            >
              github.com/mohammedtech121/Calnivo/issues
            </a>
          </div>

          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-brand-accent-deep">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-brand-ink">Calculator request</h3>
                <p className="text-sm text-brand-muted">
                  Want a new calculator? Tell us what you need and we&apos;ll consider it.
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-brand-muted">
              Email us with the calculator name, what inputs it should take, and what result you
              want. We&apos;ll build it if it fits the site.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-brand bg-gradient-to-br from-accent/40 to-white p-5 shadow-brand">
          <p className="text-sm leading-relaxed text-brand-muted">
            <strong className="text-brand-ink">Note:</strong> Calnivo is a free tool and we
            don&apos;t offer personalized financial, medical, or legal advice via email. For
            questions about your specific situation, please consult a qualified professional.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-brand-muted">
          <Link href="/" className="font-medium text-brand-accent-deep hover:underline">
            ← Back to all calculators
          </Link>
        </p>
      </div>
    </Layout>
  );
}

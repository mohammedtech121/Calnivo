/**
 * Trust footer for blog articles — shows author, reviewer, updated date, sources.
 * Per mentor feedback: add real author bios, sources (CDC/IRS/CFPB),
 * "reviewed by" and "updated on" dates.
 */

interface Props {
  author: string;
  reviewer: string;
  updatedDate: string;
  sources: { name: string; url: string }[];
}

export function ArticleTrustFooter({ author, reviewer, updatedDate, sources }: Props) {
  return (
    <div className="mt-10 rounded-xl border border-brand bg-white p-5">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-brand-muted">Written by:</span>
          <span className="font-semibold text-brand-ink">{author}</span>
          <span className="text-brand-muted">·</span>
          <span className="text-brand-muted">Founder, Calnivo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-muted">Reviewed by:</span>
          <span className="font-semibold text-brand-ink">{reviewer}</span>
          <span className="text-brand-muted">·</span>
          <span className="text-brand-muted">Founder, Calnivo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-muted">Updated:</span>
          <span className="font-semibold text-brand-ink">{updatedDate}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Sources & References</p>
        <ul className="mt-2 space-y-1">
          {sources.map((src) => (
            <li key={src.name}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-accent-deep hover:underline"
              >
                {src.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

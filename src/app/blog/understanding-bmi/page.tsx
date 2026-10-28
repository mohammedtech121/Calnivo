import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Understanding BMI: What It Means and How to Use It",
  description:
    "Learn what BMI is, how it's calculated, what the categories mean, and why it's a screening tool — not a diagnosis. Includes a free BMI calculator.",
  alternates: { canonical: "/blog/understanding-bmi" },
};

export default function Article() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <Link href="/blog" className="text-sm text-brand-accent-deep hover:underline">← Back to blog</Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Understanding BMI: What It Means and How to Use It
        </h1>
        <p className="mt-2 text-sm text-brand-muted">October 2026 · 7 min read</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            Body Mass Index (BMI) is one of the most widely used health metrics in the world. You
            will see it in doctor&apos;s offices, fitness apps, insurance forms, and online health
            calculators. But what exactly is BMI, how is it calculated, and what do the numbers
            actually mean? In this guide, we explain everything you need to know about BMI and how to
            use Calnivo&apos;s free <Link href="/calculators/bmi" className="font-medium text-brand-accent-deep hover:underline">BMI Calculator</Link>.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What Is BMI?</h2>
          <p>
            BMI is a simple screening metric that uses your height and weight to estimate whether
            you are in a healthy weight range. It was developed in the 19th century by the Belgian
            mathematician Adolphe Quetelet and has been adopted by the World Health Organization
            (WHO) as a standard for classifying adults as underweight, normal weight, overweight, or
            obese.
          </p>
          <p>
            It is important to understand that BMI is a screening tool, not a diagnostic of body
            fatness or overall health. A person with a high BMI might have a large amount of muscle
            mass rather than excess fat. Similarly, someone with a normal BMI might still have an
            unhealthy amount of visceral fat. BMI is a starting point for understanding your weight
            relative to your height — not a complete health assessment.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">How Is BMI Calculated?</h2>
          <p>
            The BMI formula is straightforward. For metric units:
          </p>
          <p className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm text-brand-ink">
            BMI = weight (kg) ÷ height (m)²
          </p>
          <p>For imperial units (pounds and inches):</p>
          <p className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm text-brand-ink">
            BMI = 703 × weight (lb) ÷ height (in)²
          </p>
          <p>
            For example, if you weigh 70 kg and are 1.75 meters tall, your BMI would be:
            70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.86. This falls in the Normal weight category.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">BMI Categories</h2>
          <p>
            The WHO has established the following BMI categories for adults aged 20 and older:
          </p>
          <div className="overflow-hidden rounded-lg border border-brand">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-muted/50 px-3 py-2 text-left font-semibold text-brand-ink">BMI Range</th>
                  <th className="bg-muted/50 px-3 py-2 text-left font-semibold text-brand-ink">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-brand"><td className="px-3 py-2">Below 18.5</td><td className="px-3 py-2">Underweight</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">18.5 – 24.9</td><td className="px-3 py-2">Normal weight</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">25.0 – 29.9</td><td className="px-3 py-2">Overweight</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">30.0 or higher</td><td className="px-3 py-2">Obese</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            These categories apply to adults aged 20 and older. BMI is interpreted differently for
            children and teens, who are assessed using age- and sex-specific percentiles rather than
            the adult categories.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Limitations of BMI</h2>
          <p>
            While BMI is a useful screening tool, it has several important limitations. It does not
            directly measure body fat, which means it cannot distinguish between fat mass and muscle
            mass. Athletes and bodybuilders often have a high BMI because muscle is denser than fat,
            but they are not necessarily overweight or unhealthy.
          </p>
          <p>
            BMI also does not account for where fat is stored on the body. Visceral fat (fat around
            the organs) is more strongly associated with health risks than subcutaneous fat (fat
            under the skin). Two people with the same BMI can have very different body compositions
            and health profiles.
          </p>
          <p>
            Additionally, BMI categories were developed primarily based on data from white
            populations and may not accurately reflect health risks for all ethnic groups. Some
            populations may face health risks at lower BMI thresholds than those defined by the WHO.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">When to Use BMI</h2>
          <p>
            BMI is most useful as a quick, accessible screening tool. It can help you identify
            whether your weight is in a healthy range relative to your height, and it can be a
            conversation starter with your healthcare provider. If your BMI falls outside the normal
            range, your doctor may recommend additional assessments such as waist circumference
            measurement, body fat percentage testing, or blood tests.
          </p>
          <p>
            BMI is also useful for tracking trends over time. If your BMI is gradually increasing,
            it may indicate weight gain that could affect your health. However, it should not be the
            only metric you use to assess your health — consider it alongside other measures like
            blood pressure, cholesterol, and physical fitness.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">How to Use the Calnivo BMI Calculator</h2>
          <p>
            Calnivo&apos;s free{" "}
            <Link href="/calculators/bmi" className="font-medium text-brand-accent-deep hover:underline">
              BMI Calculator</Link> makes it easy to calculate your BMI in seconds. Simply enter your
            height and weight (in metric or imperial units), and the calculator shows your BMI value,
            the category it falls into, your healthy weight range, and a visual scale showing where
            you stand. The calculator also shows your BMI Prime (your BMI divided by 25, the upper
            limit of normal), which is another way to express your weight status.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important Disclaimer</h2>
          <p>
            BMI is a screening metric, not a medical diagnosis. This article is for general
            educational purposes only and should not replace professional medical advice. If you
            have concerns about your weight, body composition, or overall health, consult a licensed
            healthcare provider who can assess your individual situation.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">Calculate your BMI now</p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your height and weight to see your BMI and category.
            </p>
            <Link
              href="/calculators/bmi"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open BMI Calculator →
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "How Many Calories Should You Eat? A Guide to TDEE",
  description:
    "Learn how to calculate your Total Daily Energy Expenditure (TDEE), understand BMR, and use Calnivo's free calorie calculator to reach your fitness goals.",
  alternates: { canonical: "/blog/how-many-calories-should-you-eat" },
};

export default function Article() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <Link href="/blog" className="text-sm text-brand-accent-deep hover:underline">← Back to blog</Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          How Many Calories Should You Eat? A Guide to TDEE
        </h1>
        <p className="mt-2 text-sm text-brand-muted">October 2026 · 8 min read</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            Whether you want to lose weight, gain muscle, or maintain your current physique, the most
            important number to know is your Total Daily Energy Expenditure (TDEE). This is the
            number of calories your body burns each day, and it is the foundation of any effective
            nutrition plan. In this guide, we explain how TDEE is calculated, what BMR means, and
            how to use Calnivo&apos;s free{" "}
            <Link href="/calculators/calorie" className="font-medium text-brand-accent-deep hover:underline">
            Calorie Calculator</Link> to reach your goals.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What Is BMR?</h2>
          <p>
            Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest
            just to stay alive. Even if you slept all day, your body would still burn calories to
            maintain breathing, circulation, cell production, and brain function. BMR accounts for
            approximately 60-70% of your total daily calorie burn.
          </p>
          <p>
            Several formulas exist for estimating BMR. The most widely used is the Mifflin-St Jeor
            equation, published in 1990:
          </p>
          <p className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm text-brand-ink">
            Men: BMR = 10 × W + 6.25 × H − 5 × A + 5<br />
            Women: BMR = 10 × W + 6.25 × H − 5 × A − 161
          </p>
          <p>Where:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li><strong className="text-brand-ink">W</strong> = Weight in kilograms</li>
            <li><strong className="text-brand-ink">H</strong> = Height in centimeters</li>
            <li><strong className="text-brand-ink">A</strong> = Age in years</li>
          </ul>
          <p>
            For example, a 30-year-old male weighing 75 kg and 175 cm tall would have a BMR of:
            10 × 75 + 6.25 × 175 − 5 × 30 + 5 = 750 + 1093.75 − 150 + 5 = 1,698.75 calories per day.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What Is TDEE?</h2>
          <p>
            Total Daily Energy Expenditure (TDEE) is your BMR multiplied by an activity factor that
            accounts for your daily movement and exercise. The standard activity multipliers are:
          </p>
          <div className="overflow-hidden rounded-lg border border-brand">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-muted/50 px-3 py-2 text-left font-semibold text-brand-ink">Activity Level</th>
                  <th className="bg-muted/50 px-3 py-2 text-right font-semibold text-brand-ink">Multiplier</th>
                  <th className="bg-muted/50 px-3 py-2 text-left font-semibold text-brand-ink">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-brand"><td className="px-3 py-2">Sedentary</td><td className="px-3 py-2 text-right tabular-nums">1.2</td><td className="px-3 py-2">Little or no exercise</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Lightly active</td><td className="px-3 py-2 text-right tabular-nums">1.375</td><td className="px-3 py-2">Light exercise 1-3 days/week</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Moderately active</td><td className="px-3 py-2 text-right tabular-nums">1.55</td><td className="px-3 py-2">Moderate exercise 3-5 days/week</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Very active</td><td className="px-3 py-2 text-right tabular-nums">1.725</td><td className="px-3 py-2">Hard exercise 6-7 days/week</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Extra active</td><td className="px-3 py-2 text-right tabular-nums">1.9</td><td className="px-3 py-2">Very hard exercise + physical job</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Using our example male with a BMR of 1,698.75 and a moderately active lifestyle
            (multiplier 1.55): TDEE = 1,698.75 × 1.55 = 2,633 calories per day.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">How to Use TDEE for Your Goals</h2>
          <p>
            Once you know your TDEE, you can adjust your calorie intake based on your goal:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">Lose weight:</strong> Eat 300-500 calories below
              your TDEE. This creates a calorie deficit that forces your body to burn stored fat for
              energy. A deficit of 500 calories per day typically results in about 1 pound of weight
              loss per week.
            </li>
            <li>
              <strong className="text-brand-ink">Maintain weight:</strong> Eat at your TDEE. Your
              calorie intake matches your calorie burn, so your weight stays roughly the same.
            </li>
            <li>
              <strong className="text-brand-ink">Gain muscle:</strong> Eat 300-500 calories above
              your TDEE. This calorie surplus provides the extra energy your body needs to build new
              muscle tissue, especially when combined with resistance training.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-brand-ink">Macronutrients: Protein, Carbs, and Fat</h2>
          <p>
            While calories determine whether you lose, maintain, or gain weight, macronutrients
            determine the quality of your results. A common starting split is:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li><strong className="text-brand-ink">Protein:</strong> 30% of total calories (supports muscle repair and growth)</li>
            <li><strong className="text-brand-ink">Carbohydrates:</strong> 40% of total calories (primary energy source)</li>
            <li><strong className="text-brand-ink">Fat:</strong> 30% of total calories (hormone production and nutrient absorption)</li>
          </ul>
          <p>
            For our example TDEE of 2,633 calories with a weight-loss goal (eating 2,133 calories):
            Protein = 160g, Carbs = 213g, Fat = 71g. The Calnivo Calorie Calculator provides these
            macro targets automatically.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important Considerations</h2>
          <p>
            BMR and TDEE are estimates, not exact measurements. Individual variation in metabolism,
            body composition, genetics, and hormonal factors means your actual calorie burn may differ
            from the calculated value. It is best to use TDEE as a starting point, track your
            results for 2-3 weeks, and adjust based on whether you are losing, maintaining, or
            gaining weight as expected.
          </p>
          <p>
            Also, drastically reducing calories below your BMR is not recommended without medical
            supervision. Very low calorie diets can lead to muscle loss, nutrient deficiencies,
            metabolic adaptation, and other health problems. A moderate deficit of 300-500 calories
            is generally safe and sustainable for most adults.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Using the Calorie Calculator</h2>
          <p>
            Calnivo&apos;s free{" "}
            <Link href="/calculators/calorie" className="font-medium text-brand-accent-deep hover:underline">
            Calorie Calculator</Link> uses the Mifflin-St Jeor equation and provides your BMR, TDEE,
            goal-specific calorie targets, and macro breakdown — all in one place. Enter your age,
            gender, height, weight, activity level, and goal to get started.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important Disclaimer</h2>
          <p>
            Calorie and macro calculations are estimates for general educational purposes. This
            article is not medical or nutritional advice. Individual needs vary based on health
            conditions, medications, and activity levels. Consult a healthcare provider or registered
            dietitian before making significant changes to your diet, especially if you have any
            medical conditions.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">Calculate your calories now</p>
            <p className="mt-1 text-sm text-brand-muted">
              Get your TDEE, goal calories, and macro targets in seconds.
            </p>
            <Link
              href="/calculators/calorie"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Calorie Calculator →
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

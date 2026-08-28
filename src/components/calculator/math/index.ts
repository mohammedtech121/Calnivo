import type { FC } from "react";

import ScientificCalculatorPage from "./scientific";
import FractionCalculator from "./fraction";
import PercentageCalculator from "./percentage";
import RandomNumberCalculator from "./random-number";
import TriangleCalculator from "./triangle";
import StandardDeviationCalculator from "./standard-deviation";

export const MathCalculators: Record<string, FC> = {
  scientific: ScientificCalculatorPage,
  fraction: FractionCalculator,
  percentage: PercentageCalculator,
  "random-number": RandomNumberCalculator,
  triangle: TriangleCalculator,
  "standard-deviation": StandardDeviationCalculator,
};

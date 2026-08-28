import type { FC } from "react";
import BMICalculator from "./bmi";
import CalorieCalculator from "./calorie";
import BodyFatCalculator from "./body-fat";
import BMRCalculator from "./bmr";
import IdealWeightCalculator from "./ideal-weight";
import PaceCalculator from "./pace";
import PregnancyCalculator from "./pregnancy";
import PregnancyConceptionCalculator from "./pregnancy-conception";
import DueDateCalculator from "./due-date";

export const HealthCalculators: Record<string, FC> = {
  bmi: BMICalculator,
  calorie: CalorieCalculator,
  "body-fat": BodyFatCalculator,
  bmr: BMRCalculator,
  "ideal-weight": IdealWeightCalculator,
  pace: PaceCalculator,
  pregnancy: PregnancyCalculator,
  "pregnancy-conception": PregnancyConceptionCalculator,
  "due-date": DueDateCalculator,
};

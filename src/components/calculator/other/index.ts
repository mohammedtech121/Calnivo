import type { FC } from "react";

import AgeCalculator from "./age";
import DateCalculator from "./date";
import TimeCalculator from "./time";
import HoursCalculator from "./hours";
import GpaCalculator from "./gpa";
import GradeCalculator from "./grade";
import ConcreteCalculator from "./concrete";
import SubnetCalculator from "./subnet";
import PasswordGenerator from "./password-generator";
import ConversionCalculator from "./conversion";

export const OtherCalculators: Record<string, FC> = {
  age: AgeCalculator,
  date: DateCalculator,
  time: TimeCalculator,
  hours: HoursCalculator,
  gpa: GpaCalculator,
  grade: GradeCalculator,
  concrete: ConcreteCalculator,
  subnet: SubnetCalculator,
  "password-generator": PasswordGenerator,
  conversion: ConversionCalculator,
};

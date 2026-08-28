import type { FC } from "react";
import { FinancialCalculators as _fin } from "./financial";
import { HealthCalculators as _hlth } from "./health";
import { MathCalculators as _math } from "./math";
import { OtherCalculators as _oth } from "./other";

export const FinancialCalculators: Record<string, FC> = _fin;
export const HealthCalculators: Record<string, FC> = _hlth;
export const MathCalculators: Record<string, FC> = _math;
export const OtherCalculators: Record<string, FC> = _oth;

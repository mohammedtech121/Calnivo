import type { FC } from "react";

import MortgageCalculator from "./mortgage";
import LoanCalculator from "./loan";
import AutoLoanCalculator from "./auto-loan";
import InterestCalculator from "./interest";
import PaymentCalculator from "./payment";
import RetirementCalculator from "./retirement";
import AmortizationCalculator from "./amortization";
import InvestmentCalculator from "./investment";
import InflationCalculator from "./inflation";
import FinanceCalculator from "./finance";
import IncomeTaxCalculator from "./income-tax";
import CompoundInterestCalculator from "./compound-interest";
import SalaryCalculator from "./salary";
import InterestRateCalculator from "./interest-rate";
import SalesTaxCalculator from "./sales-tax";

export const FinancialCalculators: Record<string, FC> = {
  mortgage: MortgageCalculator,
  loan: LoanCalculator,
  "auto-loan": AutoLoanCalculator,
  interest: InterestCalculator,
  payment: PaymentCalculator,
  retirement: RetirementCalculator,
  amortization: AmortizationCalculator,
  investment: InvestmentCalculator,
  inflation: InflationCalculator,
  finance: FinanceCalculator,
  "income-tax": IncomeTaxCalculator,
  "compound-interest": CompoundInterestCalculator,
  salary: SalaryCalculator,
  "interest-rate": InterestRateCalculator,
  "sales-tax": SalesTaxCalculator,
};

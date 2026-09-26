import { CalculatorAnswerKind } from '../../enums/calculatorAnswerKind';
import { CalculatorCtaKind } from '../../enums/calculatorCtaKind';
import { CalculatorQuoteStatus } from '../../enums/calculatorQuoteStatus';
import { CalculatorResultKind } from '../../enums/calculatorResultKind';

export interface ICalculatorPublicOption {
  id: string;
  code: string;
  label: string;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isDefault: boolean;
  exclusive?: boolean;
  sortOrder: number;
}

export interface ICalculatorPublicStep {
  scopeId?: string | null;
  instanceIndex?: number | null;
  instanceCount?: number | null;
  instanceLabel?: string | null;
  defaultValue?: number | null;
  maxLength?: number | null;
  id: string;
  key: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  answerKind: CalculatorAnswerKind;
  unit?: string | null;
  placeholder?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  stepValue?: number | null;
  isRequired: boolean;
  options: ICalculatorPublicOption[];
}

export interface ICalculatorConnection {
  profileCalculatorId: string;
  calculatorId: string;
  version: number;
  name: string;
  description?: string | null;
  ctaText?: string | null;
  ctaKind: CalculatorCtaKind;
  measurementServiceId?: string | null;
  resultNote?: string | null;
  entryStep?: ICalculatorPublicStep | null;
}

export interface ICalculatorAnswer {
  scopeId?: string | null;
  instanceIndex?: number | null;
  stepId: string;
  stepKey?: string;
  optionId?: string | null;
  optionCode?: string | null;
  optionIds?: string[] | null;
  numberValue?: number | null;
  textValue?: string | null;
}

export interface ICalculatorBreakdownItem {
  scopeId?: string | null;
  instanceIndex?: number | null;
  key: string;
  label?: string | null;
  amount: number;
  rateKey?: string | null;
  serviceId?: string | null;
  unit?: string | null;
  quantity?: number | null;
  unitPrice?: number | null;
  currency?: string | null;
}

export interface ICalculatorMeasurement {
  scopeId?: string | null;
  instanceIndex?: number | null;
  label: string;
}

export interface ICalculatorQuoteResult {
  resultKind: CalculatorResultKind;
  total?: number | null;
  totalIsFrom?: boolean;
  currency?: string | null;
  unavailableReason?: string | null;
  note?: string | null;
  ctaText?: string | null;
  ctaKind: CalculatorCtaKind;
  measurementServiceId?: string | null;
  breakdown: ICalculatorBreakdownItem[];
  measurements?: ICalculatorMeasurement[] | null;
}

/** Ответ POST quotes/{id}/master-notify. Бизнес-исходы всегда code 200. */
export interface ICalculatorMasterNotify {
  sent: boolean;
  reason?: string | null;
}

export interface ICalculatorQuoteState {
  answeredSteps?: ICalculatorPublicStep[] | null;
  runningTotal?: number | null;
  runningTotalIsFrom?: boolean;
  runningBreakdown?: ICalculatorBreakdownItem[] | null;
  runningMeasurements?: ICalculatorMeasurement[] | null;
  configuration?: unknown;
  quoteId: string;
  accessToken?: string | null;
  revision: number;
  status: CalculatorQuoteStatus;
  profileCalculatorId: string;
  calculatorId: string;
  version: number;
  answers: ICalculatorAnswer[];
  currentStep?: ICalculatorPublicStep | null;
  result?: ICalculatorQuoteResult | null;
  leadId?: string | null;
}

/** Как клиент отвечает на шаг. Числа — контракт JSON. */
export enum CalculatorAnswerKind {
  Choice = 0,
  Number = 1,
  Text = 2,
  ChoiceMultiple = 3,
  Result = 4
}

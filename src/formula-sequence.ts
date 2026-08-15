import type { ValueExpression, ValueOperation } from "./rule-system";

export type ArithmeticOperator = "sum" | "subtract" | "multiply" | "divide";

export interface FormulaSequence {
  terms: ValueExpression[];
  operators: ArithmeticOperator[];
}

const arithmeticOperations = new Set<ValueOperation>([
  "sum",
  "subtract",
  "multiply",
  "divide",
]);

const precedence: Record<ArithmeticOperator, number> = {
  sum: 1,
  subtract: 1,
  multiply: 2,
  divide: 2,
};

export const defaultFormulaTerm = (): ValueExpression => ({
  kind: "number",
  number: 0,
  rounding: "none",
});

function collectSameOperation(
  expression: ValueExpression,
  operation: ArithmeticOperator,
  terms: ValueExpression[],
  operators: ArithmeticOperator[],
  first = true,
) {
  if (
    expression.kind !== "operation" ||
    expression.grouped ||
    expression.operation !== operation ||
    !expression.operands?.length
  ) {
    terms.push(expression);
    return;
  }

  // Addition and multiplication are associative. Subtraction and division are
  // flattened only through their left branch, preserving explicit right-side
  // grouping such as a - (b - c).
  expression.operands.forEach((operand, index) => {
    const mayFlatten =
      operation === "sum" || operation === "multiply" || index === 0;
    if (mayFlatten) {
      collectSameOperation(
        operand,
        operation,
        terms,
        operators,
        first && index === 0,
      );
    } else {
      terms.push(operand);
    }
    if (index < expression.operands!.length - 1) operators.push(operation);
  });
}

export function expressionToFormulaSequence(
  expression: ValueExpression | undefined,
): FormulaSequence {
  const source = expression ?? defaultFormulaTerm();
  if (
    source.kind !== "operation" ||
    source.grouped ||
    !source.operation ||
    !arithmeticOperations.has(source.operation) ||
    !source.operands?.length
  )
    return { terms: [source], operators: [] };

  const terms: ValueExpression[] = [];
  const operators: ArithmeticOperator[] = [];
  collectSameOperation(
    source,
    source.operation as ArithmeticOperator,
    terms,
    operators,
  );
  return terms.length
    ? { terms, operators: operators.slice(0, Math.max(0, terms.length - 1)) }
    : { terms: [defaultFormulaTerm()], operators: [] };
}

function operationExpression(
  operation: ArithmeticOperator,
  left: ValueExpression,
  right: ValueExpression,
): ValueExpression {
  return {
    kind: "operation",
    operation,
    operands: [left, right],
    rounding: "none",
  };
}

export function formulaSequenceToExpression(
  sequence: FormulaSequence,
): ValueExpression {
  const terms = sequence.terms.length
    ? sequence.terms
    : [defaultFormulaTerm()];
  const operators = sequence.operators.slice(0, terms.length - 1);
  const valueStack: ValueExpression[] = [terms[0]];
  const operatorStack: ArithmeticOperator[] = [];

  const applyTop = () => {
    const operator = operatorStack.pop();
    const right = valueStack.pop();
    const left = valueStack.pop();
    if (!operator || !left || !right) return;
    valueStack.push(operationExpression(operator, left, right));
  };

  operators.forEach((operator, index) => {
    while (
      operatorStack.length &&
      precedence[operatorStack[operatorStack.length - 1]] >=
        precedence[operator]
    )
      applyTop();
    operatorStack.push(operator);
    valueStack.push(terms[index + 1] ?? defaultFormulaTerm());
  });
  while (operatorStack.length) applyTop();
  return valueStack[0] ?? defaultFormulaTerm();
}

export function updateFormulaTerm(
  sequence: FormulaSequence,
  index: number,
  term: ValueExpression,
): FormulaSequence {
  return {
    ...sequence,
    terms: sequence.terms.map((item, current) =>
      current === index ? term : item,
    ),
  };
}

export function addFormulaTerm(
  sequence: FormulaSequence,
  operator: ArithmeticOperator,
): FormulaSequence {
  return {
    terms: [...sequence.terms, defaultFormulaTerm()],
    operators: [...sequence.operators, operator],
  };
}

export function removeFormulaTerm(
  sequence: FormulaSequence,
  index: number,
): FormulaSequence {
  if (sequence.terms.length <= 1)
    return { terms: [defaultFormulaTerm()], operators: [] };
  return {
    terms: sequence.terms.filter((_, current) => current !== index),
    operators: sequence.operators.filter((_, current) =>
      index === 0 ? current !== 0 : current !== index - 1,
    ),
  };
}

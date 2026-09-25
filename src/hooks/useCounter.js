import { useState } from 'react'
import { clamp, parseNumber, roundPrecision } from '../utils/number'

export const INITIAL_VALUE = 0

function getStepError(step) {
  if (step === null) return 'Informe um step válido.'
  if (step <= 0) return 'O step deve ser maior que 0.'
  return ''
}

function getRangeError(min, max) {
  if (min === null || max === null) return 'Informe mínimo e máximo válidos.'
  if (min > max) return 'O mínimo deve ser menor ou igual ao máximo.'
  return ''
}

function isValidRange(min, max) {
  return min !== null && max !== null && min <= max
}

export function useCounter({ min: initialMin = 0, max: initialMax = 10, step: initialStep = 1 } = {}) {
  const [count, setCount] = useState(() => clamp(INITIAL_VALUE, initialMin, initialMax))
  const [stepInput, setStepInput] = useState(String(initialStep))
  const [minInput, setMinInput] = useState(String(initialMin))
  const [maxInput, setMaxInput] = useState(String(initialMax))

  const step = parseNumber(stepInput)
  const min = parseNumber(minInput)
  const max = parseNumber(maxInput)

  const stepError = getStepError(step)
  const rangeError = getRangeError(min, max)
  const isValid = !stepError && !rangeError

  const canIncrement = isValid && count < max
  const canDecrement = isValid && count > min

  function increment() {
    if (!canIncrement) return
    setCount((current) => clamp(roundPrecision(current + step), min, max))
  }

  function decrement() {
    if (!canDecrement) return
    setCount((current) => clamp(roundPrecision(current - step), min, max))
  }

  function reset() {
    if (rangeError) return
    setCount(clamp(INITIAL_VALUE, min, max))
  }

  function syncCountWithRange(nextMin, nextMax) {
    if (!isValidRange(nextMin, nextMax)) return
    setCount((current) => clamp(current, nextMin, nextMax))
  }

  function updateMin(value) {
    setMinInput(value)
    syncCountWithRange(parseNumber(value), max)
  }

  function updateMax(value) {
    setMaxInput(value)
    syncCountWithRange(min, parseNumber(value))
  }

  return {
    count,
    stepInput,
    minInput,
    maxInput,
    stepError,
    rangeError,
    canIncrement,
    canDecrement,
    canReset: !rangeError,
    increment,
    decrement,
    reset,
    setStep: setStepInput,
    setMin: updateMin,
    setMax: updateMax,
  }
}

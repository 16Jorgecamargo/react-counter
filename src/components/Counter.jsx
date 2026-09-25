import { useCounter } from '../hooks/useCounter'
import './Counter.css'

function NumberField({ id, label, value, onChange, invalid, min }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        min={min}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default function Counter() {
  const {
    count,
    stepInput,
    minInput,
    maxInput,
    stepError,
    rangeError,
    canIncrement,
    canDecrement,
    canReset,
    increment,
    decrement,
    reset,
    setStep,
    setMin,
    setMax,
  } = useCounter()

  const errors = [stepError, rangeError].filter(Boolean)

  return (
    <section className="counter" aria-labelledby="counter-title">
      <h1 id="counter-title" className="counter-title">Contador</h1>

      <output className="counter-value" aria-live="polite" aria-label="Valor atual">
        {count}
      </output>

      <div className="counter-actions">
        <button type="button" onClick={decrement} disabled={!canDecrement} aria-label="Decrementar">
          −
        </button>
        <button type="button" className="reset" onClick={reset} disabled={!canReset}>
          Resetar
        </button>
        <button type="button" onClick={increment} disabled={!canIncrement} aria-label="Incrementar">
          +
        </button>
      </div>

      <div className="counter-settings">
        <NumberField id="step" label="Step" value={stepInput} onChange={setStep} invalid={Boolean(stepError)} min="0" />
        <NumberField id="min" label="Mínimo" value={minInput} onChange={setMin} invalid={Boolean(rangeError)} />
        <NumberField id="max" label="Máximo" value={maxInput} onChange={setMax} invalid={Boolean(rangeError)} />
      </div>

      {errors.length > 0 && (
        <ul className="counter-errors" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

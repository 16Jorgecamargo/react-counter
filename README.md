# Contador React

Componente de contador com controle completo, feito com React 19 + Vite.

## Funcionalidades

- **Estado inicial:** o contador começa em `0`.
- **Incrementar:** soma o valor do step sem ultrapassar o máximo.
- **Decrementar:** subtrai o step sem ficar abaixo do mínimo.
- **Resetar:** volta para `0` — ou para o mínimo, se ele for maior que 0 (e para o máximo, se ele for menor que 0).
- **Step:** input numérico que precisa ser maior que 0.
- **Limites:** inputs de mínimo e máximo, com validação de `mínimo ≤ máximo`.
- **Validação automática:** ao alterar mínimo ou máximo, o contador é ajustado para continuar dentro do intervalo.

Entradas inválidas exibem mensagem de erro e desabilitam as ações afetadas. Steps decimais (ex.: `0.1`) são arredondados para evitar erros de ponto flutuante.

### Por que mínimo e máximo são inputs?

Eles tornam o contador dinâmico e configurável: o próprio usuário define o intervalo de valores sem precisar alterar o código.

## Estrutura

```
src/
├── components/
│   ├── Counter.jsx        # UI do contador
│   ├── Counter.css
│   └── Counter.test.jsx   # testes de comportamento
├── hooks/
│   └── useCounter.js      # estado e regras do contador
└── utils/
    └── number.js          # parse, clamp e arredondamento
```

## Como rodar

```bash
npm install
npm run dev
```

## Scripts

| Comando         | Descrição                    |
| --------------- | ---------------------------- |
| `npm run dev`   | servidor de desenvolvimento  |
| `npm test`      | testes (Vitest + Testing Library) |
| `npm run build` | build de produção            |
| `npm run lint`  | lint com oxlint              |

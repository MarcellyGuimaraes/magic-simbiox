# Card Explorer

Aplicação web para busca e exploração de cartas de *Magic: The Gathering*, consumindo a [API pública do Scryfall](https://scryfall.com/docs/api). O usuário pesquisa cartas pelo nome, navega pelos resultados em uma grade responsiva e abre qualquer carta para ver suas informações completas.

> Desafio técnico Simbiox.

## Demonstração

<!-- Substitua pela sua imagem ou GIF. Sugestão: grave um GIF curto mostrando
     uma busca, o carregamento e a abertura do modal de detalhe.
     Coloque o arquivo em uma pasta /docs e referencie aqui: -->

![Card Explorer](docs/preview.png)

## Funcionalidades

- **Busca de cartas** pelo nome, com resposta conforme o usuário digita.
- **Grade responsiva** que ajusta o número de colunas à largura da tela.
- **Detalhe da carta** em modal, com imagem, custo de mana, tipo, texto de regras, raridade, coleção e preço.
- **Tratamento completo dos estados de uso**: inicial, carregando, sem resultados e erro.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS 4** (estilização, via plugin oficial do Vite)
- **ESLint** (padronização do código)

Nenhuma biblioteca adicional de UI ou de data-fetching foi utilizada. A decisão foi manter o projeto enxuto e demonstrar o tratamento de dados e estados diretamente, dada a escala do desafio.

## Como executar

Pré-requisitos: **Node.js 18+**.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd magic-simbiox

# 2. Instale as dependências
npm install

# 3. Rode em modo de desenvolvimento
npm run dev
```

O terminal exibirá o endereço local (por padrão `http://localhost:5173`).

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

Nenhuma variável de ambiente é necessária: a API do Scryfall é pública e não exige chave.

### Scripts disponíveis

| Script | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento com HMR. |
| `npm run build` | Checagem de tipos (`tsc -b`) e build de produção em `dist/`. |
| `npm run preview` | Serve localmente a build de produção. |
| `npm run lint` | Roda o ESLint no projeto. |

## Estrutura do projeto

```
src/
├── api/
│   └── scryfall.ts        # Cliente HTTP e funções da API do Scryfall
├── components/
│   ├── SearchBar.tsx      # Campo de busca
│   ├── CardGrid.tsx       # Grade responsiva de cartas
│   ├── CardItem.tsx       # Carta individual (clicável)
│   ├── CardDetails.tsx    # Modal de detalhe da carta
│   └── states/
│       ├── LoadingState.tsx  # Skeletons durante o carregamento
│       ├── EmptyState.tsx    # Estado inicial e "nenhum resultado"
│       └── ErrorState.tsx    # Erro com opção de tentar novamente
├── hooks/
│   ├── useCardSearch.ts   # Lógica de busca, estados e retry
│   └── useDebounce.ts     # Debounce genérico do termo de busca
├── types.ts               # Tipagem das cartas
├── utils.ts               # Utilitários (ex: resolução de imagem)
└── App.tsx                # Composição da interface
```

A organização é por tipo (`components`, `hooks`, `api`), o que se adequa a uma aplicação de uma única funcionalidade. A separação da lógica de dados (hooks e api) da camada de apresentação (componentes) mantém os componentes focados em renderizar. Os estados de carregamento, vazio e erro foram isolados em componentes próprios em `components/states/` para deixar explícito o cuidado com essas situações.

## Como a aplicação funciona

O fluxo é linear e cabe em poucas peças:

1. `App.tsx` guarda o termo digitado e a carta selecionada — são os dois únicos estados de interface.
2. `useCardSearch` recebe o termo, aplica o debounce e conversa com a camada de API, devolvendo `cards`, `status` e `retry`.
3. `status` é uma máquina de estados de quatro valores — `idle`, `loading`, `success` e `error` — e é ele quem decide o que a tela renderiza. Como `success` com lista vazia é diferente de `idle`, a mensagem "nenhum resultado para *X*" nunca aparece antes da primeira busca.
4. Clicar em uma carta apenas guarda o objeto já carregado em `selectedCard`, e o modal é renderizado a partir dele.

Nenhum estado derivado é duplicado: a lista, o status e a seleção têm cada um uma única fonte de verdade.

## Decisões técnicas

Alguns pontos que foram tratados com atenção por refletirem situações reais de uso:

- **Debounce na busca.** O termo digitado passa por um debounce de 400ms antes de disparar a requisição, evitando uma chamada a cada tecla pressionada. Isso melhora a experiência e respeita os limites de uso da API do Scryfall.

- **404 tratado como "nenhum resultado", não como erro.** A API do Scryfall retorna HTTP 404 quando a busca não encontra nenhuma carta. Esse caso é convertido em uma lista vazia na camada de API, de modo que a interface exiba um estado vazio amigável em vez de uma tela de erro. Os demais códigos (500, rede indisponível) continuam propagando como erro real, através de um `ScryfallError` que carrega o status HTTP.

- **Proteção contra condição de corrida.** Buscas em sequência podem ter suas respostas retornadas fora de ordem. O hook de busca ignora respostas de requisições que já foram substituídas por uma busca mais recente, garantindo que a tela sempre reflita o termo atual.

- **Reaproveitamento dos dados no detalhe.** O endpoint de busca do Scryfall já retorna o objeto completo da carta. Por isso, ao abrir o detalhe, o dado já disponível é reutilizado em vez de fazer uma nova requisição — o modal abre instantaneamente e uma chamada de API é economizada.

- **Cartas de dupla face.** Algumas cartas possuem duas faces, com imagem e texto separados. Tanto a imagem na grade quanto o modal tratam esse caso, evitando informação faltante ou imagem quebrada.

- **Erro com retry, não com recarga.** O estado de erro oferece um botão que refaz a busca do termo atual, sem exigir que o usuário recarregue a página ou redigite o que já havia digitado.

- **Acessibilidade e experiência do modal.** O modal fecha com `Esc`, clique no fundo ou no botão de fechar; trava a rolagem do fundo enquanto aberto; move o foco ao abrir; e usa os atributos ARIA adequados (`role="dialog"`, `aria-modal`).

- **Carregamento com skeletons.** Durante a busca, são exibidos skeletons no mesmo formato das cartas, o que suaviza a espera e evita que o layout "salte" quando os resultados chegam.

## Cabeçalhos da API

Todas as requisições incluem o header `Accept`, conforme recomendado pela documentação do Scryfall para evitar bloqueio ou throttling do tráfego.

## Melhorias futuras

Com mais tempo, os próximos passos seriam:

- **Vitrine na tela inicial**: exibir uma seleção de cartas em destaque antes da primeira busca, tornando a entrada da aplicação mais convidativa.
- **Paginação / scroll infinito** para buscas com muitos resultados.
- **Filtros** por cor, tipo ou raridade.
- **Cache dos termos já buscados**, para que voltar a uma busca anterior não custe nova requisição.
- **Testes automatizados** para os hooks e o cliente da API.

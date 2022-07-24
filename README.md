<!-- markdownlint-disable-next-line first-line-h1 -->
<div align="center" id="top">

  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![GPL 3.0 License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<div align="center">
  <img src="docs/assets/icon.png" width="200" height="200">

  <h1>XT Brokers</h1>

  <p>
    <strong>A <em>Realtime</em> Stock Trading simulation app</strong><br>
    <a href="https://xt-brokers.vercel.app">xt-brokers.vercel.app</a>
  </p>

  <br>
  <br>
</div>

Está cansado de perder dinheiro com compra e venda de ações? Não consegue mais arriscar o que resta do seu patrimônio comprando FRTA3?

Simule um ambiente de trading de ações de risco nulo com o app da XT Brokers!

<br>
<br>

<div align="center">
  <kbd>
    <img
      src="docs/assets/Light theme.gif"
      title="Light theme"
    >
  </kbd>
  <br>
  <br>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#local-setup">Local Setup</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#known-issues">Known issues</a></li>
    <li><a href="#built-with">Built with</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Screenshots

<div style="display:flex;justify-content:space-around;flex-flow:row wrap;">
  <img src="docs/assets/Frame 1.png" height="450px" />
  <img src="docs/assets/Frame 2.png" height="450px" />
  <img src="docs/assets/Frame 3.png" height="450px" />
  <img src="docs/assets/Frame 4.png" height="450px" />
  <img src="docs/assets/Frame 5.png" height="450px" />
  <img src="docs/assets/Frame 6.png" height="450px" />
</div>

## Local setup

### Front End

1. Clone o repositório:

    ```bash
    git clone https://github.com/pedrossdemelo/xt-brokers.git
    ```

2. Instale as dependências:

    ```bash
    cd xt-brokers
    pnpm install
    ```

3. Rode localmente:

    ```bash
    # Certifique-se que o servidor está rodando no endereço localhost:5173
    pnpm dev
    ```

### Back End

- No momento atual, o back-end está totalmente desenvolvido pela interface gráfica do <a href="https://supabase.com/">Supabase</a>.

- A parte incrível do Supabase é que ele é <a href="https://github.com/supabase/supabase">open source</a> e você pode não só contribuir com o desenvolvimento da plataforma como também facilmente migrar todo o banco de dados Postgres junto com os plugins. Uma das maiores vantagens em relação ao Firebase. 

- As variáveis públicas do Supabase estão disponíveis no arquivo `.env`. É possível interagir com o banco de dados pelo front end instanciado localmente. <strong>Mas não é possível logar com sua conta Google nesse contexto</strong>. Para realizar testes manuais é necessário criar uma conta com algum email (não é necessário ser validado).

## Built with

### Front End
  - [React 18](https://reactjs.org/)
  - [React Router v6](https://reactrouter.com/)
  - [Tailwind](https://tailwindcss.com/)
  - [Flowbite](https://flowbite.com/)
  - [Framer Motion](https://framer.com/motion/)
  - [Hero Icons](https://heroicons.com/)
  - [React Hot Toast](https://react-hot-toast.com/)
  - [Immer](https://immerjs.github.io/immer/)

### Back End
  - [PostgreSQL](https://www.postgresql.org/)
  - [Supabase](https://supabase.com/)

### Development Tools
  - [GitHub](https://github.com/)
  - [Git](https://git-scm.com/)
  - [PNPM](https://pnpm.js.org/)
  - [Vite](https://vitejs.dev/)
  - [Vitest](https://vitest.dev/)
  - [React Testing Library](https://reacttestinglibrary.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Commitlint](https://commitlint.org/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Husky](https://typicode.github.io/husky/#/)
  - [Lint Staged](https://github.com/okonet/lint-staged)

## Roadmap

### Front End
  - [x] Página de Login
  - [x] Página de Depósito e Saque
  - [x] Página que lista todas as ações disponíveis para compra e todas as no portfólio do usuário
  - [x] Página/Modal para compra e venda de ações
  - [x] Salvar localmente o último usuário logado no input de email, assim como a data e hora do acesso
  - [x] Validação de email e senha
  - [x] Testes Unitários (componentes)
  - [x] Testes Unitários (hooks)
  - [x] Tratamento de Erros
  - [x] Feedback com <em>toasts</em> de erros e sucessos na comunicação com o servidor back-end
  - [x] Botão para esconder e mostrar valores monetários do usuário
  - [x] Layout mobile
  - [x] Layout responsivo
  - [x] Code splitting
  - [x] Animações no estado de carregamento
  - [x] Suporte à comunicação com o servidor back-end
  - [x] Suporte à comunicação realtime por websockets ([INSTÁBILIDADE NA SUPABASE](https://github.com/supabase/realtime/issues/268#issuecomment-1193184394))
  - [x] Feedback com transição sobre a remoção de ações do portfólio
  - [x] Página de histórico de transações
  - [ ] Página dedicada para visualização do portfólio do usuário
  - [x] Deploy na <a href="https://vercel.com/">Vercel</a>

### Back End
  - [x] Criação de tabelas no banco de dados
  - [x] Criação de regras de segurança a nível de fileira (Row Level Security)
  - [x] Criação de triggers no banco de dados
  - [x] Cadastro de usuário por email e senha
  - [x] Cadastro de usuário usando Google OAuth
  - [x] Requisições para compra de ativos
  - [x] Requisições para venda de ativos
  - [x] Requisições para consulta de portfolio de um usuário
  - [x] Requisições para consulta de ativos
  - [x] Requisições para consulta de saldo de um usuário
  - [x] <em>Remote Procedure Call</em> para depósito e saque de saldo
  - [x] Autenticação e autorização de usuários por token JWT
  - [x] Endpoint que fornece uma lista de ações disponíveis para o front-end
  - [ ] Testes Unitários (foram feitos manualmente)
  - [x] Deploy na <a href="https://supabase.com/">Supabase</a>

### Development
  - [x] Repositório no GitHub
  - [x] Convenção de commits
  - [x] Workflow de testes unitários

## Known issues

Não existem problemas conhecidos até o momento. Se encontrar um, por favor, [abra um issue](https://github.com/pedrossdemelo/xt-brokers/issues), eu agradeceria muito!

## License

Distributuído através da licensa GPL 3.0. Leia `LICENSE` para mais informações.

## Contact

- [pedrosousa.dev](https://pedrosousa.dev)

<p align="right"><a href="#top">Back to top</a></p>

[contributors-shield]: https://img.shields.io/github/contributors/pedrossdemelo/xt-brokers?style=for-the-badge
[contributors-url]: https://github.com/pedrossdemelo/xt-brokers/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/pedrossdemelo/xt-brokers?style=for-the-badge
[forks-url]: https://github.com/pedrossdemelo/xt-brokers/network/members
[stars-shield]: https://img.shields.io/github/stars/pedrossdemelo/xt-brokers?style=for-the-badge
[stars-url]: https://github.com/pedrossdemelo/xt-brokers/stargazers
[issues-shield]: https://img.shields.io/github/issues/pedrossdemelo/xt-brokers?style=for-the-badge
[issues-url]: https://github.com/pedrossdemelo/xt-brokers/issues
[license-shield]: https://img.shields.io/github/license/pedrossdemelo/xt-brokers?style=for-the-badge
[license-url]: https://github.com/pedrossdemelo/xt-brokers/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/pedrossdemelo/

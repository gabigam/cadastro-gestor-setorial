# Cadastro-Gestor-Setorial

O projeto **Cadastro-Gestor-Setorial** é uma aplicação React que permite o registro de gestores setoriais com validação de formulários. Os usuários podem inserir seu nome, setor de atuação, e-mail e telefone, com feedback instantâneo sobre os dados inseridos.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Reactstrap**: Biblioteca que fornece componentes Bootstrap para React.
- **Bootstrap**: Framework CSS para um design responsivo.

## Funcionalidades

- Validação de entrada para:
  - **Nome**: Deve conter apenas letras.
  - **E-mail**: Deve terminar com `ufs.br`.
  - **Telefone**: Deve estar no formato (DDD) 9 + 8 dígitos.
  - **Setor de atuação**: Deve ser selecionado.
- Mensagens de erro exibidas em tempo real.
- Mensagem de sucesso após cadastro.

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** instalado
- **npm** (gerenciador de pacotes do Node.js)

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/gabigam/cadastro-gestor-setorial.git

2. Navegue até o diretório do projeto:
cd cadastro-gestor-setorial

3. Instale as dependências:
npm install

4. Inicie o servidor de desenvolvimento:
npm start

Agora você pode acessar a aplicação no seu navegador, geralmente em http://localhost:3000

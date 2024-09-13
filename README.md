# Pokedex React Native com Expo

Este projeto é um case de aplicação React Native criada com Expo. As tecnologias utilizadas foram escolhidas de forma a facilitar o processo de desenvolvimento e levando em consideração a utilização das mesmas pela comunidade.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Ferramenta para desenvolvimento e construção de aplicativos React Native.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Expo-Router**: Biblioteca para navegação por roteamento baseado em arquivo.
- **Zustand**: Biblioteca para gestão de estado.
- **MMKV**: Biblioteca de persistência de dados para React Native.
- **Jest**: Framework para testes em JavaScript.
- **Testing Library**: Biblioteca para testes de componentes React e React Native.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project

   ```

2. Instale as dependências:
   `yarn install` ou `npm install`

3. Habilite a opção de desenvolvedor:
   É necessario que, caso deseje utilizar um dispositivo fisico, para executar o projeto em seu dispositivo android, você habilite as opções de desenvolvedor no seu dispositivo, e em seguida habilite a depuração usb e a permissão para instalar aplicativos por usb.

## Executando o Projeto

Para executar o projeto, deve-se iniciar o emulador ou conectar seu dipositivo ao computador, e utilizar o comando de acordo com a plataforma desejada, por exemplo:
`npm run android` ou `yarn ios`

Após executar o comando, aguarde até que o servidor inicie e o aplicativo rode no seu dispositivo ou emulador.

## Testes

Para executar os testes, utilize o comando:

`yarn test` ou `npm test`

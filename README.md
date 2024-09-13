# Pokedex React Native com Expo

Este projeto é um exemplo de aplicação React Native criada com Expo.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Ferramenta para desenvolvimento e construção de aplicativos React Native.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
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

   ````bash
   git clone https://github.com/your-username/your-project.git
   cd your-project```

   ````

2. Instale as dependências:
   `yarn install` ou `npm install`

3. Instale as dependências nativas:
   O projeto utiliza MMKV, que requer dependências nativas. Portanto, será necessário usar um build de desenvolvimento:
   `expo install`
   `expo prebuild`

## Executando o Projeto

Para executar o projeto pela primeira vez deve utilizar o comando de acordo com a plataforma desejada:
`expo run:android` ou `expo run:ios`

Após a primeira execução, para executar o projeto em um ambiente de desenvolvimento, use o seguinte comando:

`npm start` ou `yarn start`

Isso abrirá a interface do Expo DevTools, onde você pode escanear o QR code com o aplicativo Expo Go no seu dispositivo ou usar um emulador, mas antes disso, deve pressionar o atalho para alterar do ExpoGo para development-build, pressionando a tecla S quando o servidor estiver pronto.

## Testes

Para executar os testes, utilize o comando:

`yarn test` ou `npm test`

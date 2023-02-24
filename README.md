# Take a Bus Challenge

## Versões

- Node: v14.21.2 (Utilize o nvm para trocar entre versões do node de forma mais simples)

## Com o repositório clonado siga as instruções para rodar o projeto

- npm install (para instalar todas as dependências)

- npx expo start (para rodar o projeto)

## Partes que compõem o projeto

- Para o mapa, foi utilizado a lib [react-native-maps](https://www.npmjs.com/package/react-native-maps).
- As informações dos pontos de Ônibus estão sendo buscadas na [api do google](https://maps.googleapis.com/maps/api/place/nearbysearch/json).
- Existe um botão para esconder/mostrar os pontos de Ônibus próximos, o evento de click manipula um estado booleano que está sendo usado para renderizar ou não este botão na tela.

## Observações

- O Marker padrão, icone de check-in, foi trocado para um icone de ônibus para seguir o objetivo de mostrar paradas próximas ao usuário.

## Qualquer dúvida/problema entre em contato comigo pelo email: claudioletras2019@gmail.com

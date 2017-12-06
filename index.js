var Prismic = require('prismic-javascript');

var apiEndpoint = "https://ygor-website.prismic.io/api/v2";

window.onload = function() {
    Prismic.getApi(apiEndpoint).then(function(api) {
      return api.query(Prismic.Predicates.at('document.type', 'cliente')); // An empty query will return all the documents
    }).then(function(response) {
      console.log("Documents: ", response.results);

      response.results.forEach((result) => {

        let cliente = result.data;
        console.log(cliente.nome[0].text);
        console.log(cliente.descricao[0].text);
        console.log(cliente.telefone);
        console.log(cliente.imagem.url);
        console.log(cliente.apelido);

      });

    }, function(err) {
      console.log("Something went wrong: ", err);
    });
 };

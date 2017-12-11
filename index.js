var Prismic = require('prismic-javascript');

var apiEndpoint = "https://ygor-website.prismic.io/api/v2";

window.onload = function() {
    Prismic.getApi(apiEndpoint).then(function(api) {
      return api.query(Prismic.Predicates.at('document.type', 'post'),
      { orderings : '[my.last_publication_date desc]' }); // An empty query will return all the documents

    }).then(function(response) {
      console.log("Posts: ", response.results);

      response.results.forEach((result) => {

        renderizaPost(result.data);

      });

    }, function(err) {
      console.log("Something went wrong: ", err);
    });
 };

function renderizaPost(blogPost) {
  console.log(blogPost);

  let titulo = $('<h1>');
  titulo.text(blogPost.titulo[0].text);

  let corpo = $('<p>');
  corpo.text(blogPost.texto[0].text);


  let imagem = $('<img>');
  if (typeof blogPost.imgprincipal != undefined) {
    imagem.attr('src', blogPost.imgprincipal.url);
  }

  $('body').append(titulo);
  $('body').append(corpo);
  $('body').append(imagem);
}
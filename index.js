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

  let linhaTitulo = $('<div>');
  linhaTitulo.addClass('row');

  let colTitulo = $('<div>');
  colTitulo.addClass('col-md-12');

  let titulo = $('<h3>');
  titulo.text(blogPost.titulo[0].text);

  colTitulo.append(titulo);
  linhaTitulo.append(colTitulo);


  let linhaCorpo = $('<div>');
  linhaCorpo.addClass('row');

  let col1 = $('<div>');
  col1.addClass('col-md-4');

  let imagem = $('<img>');
  if (typeof blogPost.imgprincipal != undefined) {
    imagem.attr('src', blogPost.imgprincipal.url);
    imagem.css('width', '100%');
  }

  col1.append(imagem);

  let col2 = $('<div>');
  col2.addClass('col-md-8');

  let corpo = $('<p>');
  corpo.text(blogPost.texto[0].text);

  col2.append(corpo);

  linhaCorpo.append(col1);
  linhaCorpo.append(col2);


  $('#corpo').append(linhaTitulo);
  $('#corpo').append(linhaCorpo);
  $('#corpo').append($('<hr>'));
}
Decisão da arquitetura utilizada - Escohi o adonis, que trabalha com o modelo MVC, e ele tem uma facilidade de criar uma api simples como essa em pouco tempo, já que ele seta o MVC como padrão e inclui todos os pacotes necessários, como plugins para migrations e versionamento do banco, então com alguns comandos consigo dar migration em uma tabela ou alterar se necessário, além de possui uma suite de testes super fácil de utilizar e colocar em práticar os testes referentes a controller.

Lista de bibliotecas de terceiros utilizadas - As principais são: knex (query builder e responsável pelas migrations), express (lida com todas requisições http), adonisjs/vow (responsável por rodar a suíte de testes).

O que você melhoraria se tivesse mais tempo - refatoraria o código do front end para evitar menos repetições, trataria os casos de uniqueKey no front para retornar como uma mensagem na tela, e não como um alert. Incluiria nyc para coverage de testes, colocaria no heroku e com isso possibilitaria a CI/CD.

Quais requisitos obrigatórios que não foram entregues - nenhum
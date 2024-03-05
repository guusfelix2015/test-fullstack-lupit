# Instruções para o teste frontend

Para o frontend, devemos criar uma estrutura simples, contendo:
* Header
* Tabela
* Botão de adição

Segue abaixo um layout do projeto para usar de inspiração. O layout é propositalmente simples, feito apenas para mostrar onde cada informação deve ir. A estilização não é obrigatória e não é cobrada, validaremos a aplicação apenas funcionalmente.

Requisitos funcionais:
* Listar jogadores
* Adicionar jogador
* Editar jogador
* Listar os times existentes para adicionar/editar um jogador
* Tratar erros com o Sweet Alert (não é necessário estilizá-lo)
* Load (pode usar qualquer gif/svg animado) enquanto buscamos os dados do jogador

O propósito do teste é ser rápido e funcional, portanto:
* Não é necessário criar validações de campos complexas (apenas de campos obrigatórios)
* Não é necessário estilizar o frontend

Tecnologia/framework/biblioteca utilizada:
* Será informado via email

---

## Layout 1 - Home
Rota: /
Na home iremos ter basicamente dois componentes:
* header
* tabela

O **header** é um componente padrão que será utilizado em ambas as telas e será exatamente o mesmo componente.
A **tabela** é onde listaremos os jogadores cadastrados, contendo os campos:
* id
* nome
* nome do time em que joga
* data de criação

<img width="873" alt="image" src="https://user-images.githubusercontent.com/69265280/166817124-e2bfcd9b-983b-4abb-bcdf-857e262e6fc8.png">

Nesta tela, temos 3 botões:
* Adicionar jogador
* Editar jogador
* Remover jogador

Ao clicar no botão de Adicionar jogador, é esperado que o sistema direcione para a tela de adição de jogador (`/jogadores/novo`)
Ao clicar no botão de Editar jogador (ícone de lápis na coluna "Ações" da linha do jogador), direcionaremos para a tela (`/jogadores/<id>`) para editar o jogador da linha
Ao clicar no botão de Remover jogador (ícone de lixo na coluna "Ações" da linha do jogador), nós abriremos um Sweet Alert com a título "Tem certeza?" e a descrição "Remover o jogador é uma ação irreversível", com os botões "Sim" e "Não". 
  Ao clicar em "Não", cancelaremos a ação.
  Ao clicar em "Sim", removeremos o jogador.
  
<img width="540" alt="image" src="https://user-images.githubusercontent.com/69265280/166817906-a8241209-ec5b-45ee-932e-b30309d729db.png">

OBS.: Caso o backend não retorne nenhum jogador, devemos escrever em tela, no lugar da tabela, a mensagem "Não existe nenhum jogador cadastrado"


## Layout 2 - Adicionar/Editar jogador
Rota: `/jogador/novo` - Para **adicionar**

Rota: `/jogador/<id>` - Para **editar**

A tela de adicionar jogador é onde teremos o formulário contendo os campos do cadastro do jogador, nessa tela devemos ter:
* campo "Nome" - Texto
* campo "Time" - Dropdown com o nome dos times existentes no banco de dados
* campo "Idade" - Campo número (inteiro)
  
Ao editar, os campos já devem aparecer preenchidos ao acessar o formulário.

<img width="767" alt="image" src="https://user-images.githubusercontent.com/69265280/166818851-aab48340-b435-4e40-94a3-b5275d7e7cce.png">

Requisitos para a tela:
* Todos os campos são obrigatórios
* Não devemos aceitar texto no campo de idade
* É necessário listar todos os times existentes no campo Time, ou seja, o campo deve ser um dropdown ou select
* Caso dê um erro ao cadastrar o jogador, devemos exibir uma mensagem de erro via sweet alert
  * Título: "Erro!" 
  * Descrição: "Não conseguimos cadastrar o jogador, tente novamente mais tarde."
* Ao salvar, exibiremos um Sweet Alert com uma mensagem de sucesso, Titulo: "Sucesso", Descrição: "Jogador cadastrado com sucesso"
* Ao salvar com sucesso, retornar para a listagem de jogadores
  * A lista deve estar atualizada

**Não** precisamos validar:
* Se não existe nenhum time cadastrado
* Se o jogador já existe

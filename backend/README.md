# Instruções para o teste backend

Para o backend, criaremos o CRUD de **times** e de **jogadores**.

Requisitos funcionais:
* Listar jogadores
* Adicionar jogador
* Editar jogador
* Remover jogador
* Listar Times
* Adicionar Times
* Editar Times
* Remover Times

Considerações e Validações:
* Campos obrigatórios (todos são)
* Campo ID não deve ser informado ao cadastrar
* Campo create_at e updated_at não devem ser informados ao cadastrar ou editar, o sistema deve adicioná-los automaticamente considerando o datetime atual
  * Ao editar, apenas o campo updated_at deve ser atualizado com a datetime atual

O propósito do teste é ser rápido e funcional, portanto:
* Não é necessário criar validações de campos complexas (apenas validação de campos obrigatórios)

Tecnologia/framework/biblioteca utilizada:
* Será informado via email

<img width="552" alt="image" src="https://user-images.githubusercontent.com/69265280/166810448-6c5f1768-d7a3-420a-9bad-901cc9187daa.png">

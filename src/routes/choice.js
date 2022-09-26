/* 
POST / choice;

Deve receber pelo body da request, um parâmetro title, contendo o nome da opção a ser cadastrada e pollId. 

{
    title: "JavaScript",
		pollId: "54759eb3c090d83494e2d222",
}

- Validação:
    - [ ]  Uma opção de voto não pode ser inserida sem uma enquete existente, retornar status 404.
    - [ ]  **Title** não pode ser uma string vazia, retornar status 422.
    - [ ]  **Title** não pode ser repetido, retornar status 409.
  - []  Se a enquete já estiver expirado deve retornar erro com status 403.
    
  - [ ]  Deve retornar a opção de voto criada em caso de sucesso com status 201. */

/*
  - **POST** `/choice/:id/vote`
    - [ ]  Não recebe nenhum dado do body da requisição. Deve registrar um voto na opção selecionada.
    - [ ]  O voto deve armazenar a data e hora que foi criado no backend.
    - Validações:
        - [ ]  Verificar se é uma opção existente, se não existir retornar 404.
        - [ ]  Não pode ser registrado se a enquete já estiver expirado, retornar erro 403.
    - [ ]  Retorna status 201 em caso de sucesso. */

/* 
    - **GET** `/poll/:id/choice`
    - [ ]  Retorna a lista de opções de voto de uma enquete:
    
    ```jsx
    [
    	{
    		_id: "54759eb3c090d83494e2d999",
    		title: "Javascript",
    		pollId: "54759eb3c090d83494e2d222" 
    	 },
    	{
    		_id: "54759eb3c090d83494e2d888",
    	  title: "Python",
    		pollId: "54759eb3c090d83494e2d222"
    	},
    	...
    ]
    ```
    
    - [ ]  Validação: caso a enquete não exista deve retornar status 404. */

/* 
  - **GET** `/poll/:id/result`
    - [ ]  Retorna o resultado de uma enquete, ou seja, a opção de voto **mais votada** na enquete até o momento, seguindo o formato sugerido:
    
    ```jsx
    {
    	_id: "54759eb3c090d83494e2d222",
    	title: "Qual a sua linguagem de programação favorita?"
    	expireAt: "2022-02-14 01:00",
    	result : {
    		title: "Javascript",
    		votes: 487
    	}
    }
    ```
    
    - [ ]  Validação: caso a enquete não exista deve retornar status 404. */

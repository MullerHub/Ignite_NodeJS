# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro.
Deve ser possivel listar todas as categorias


**RN**
Não deve ser possivel cadastrar um carro com uma placa já existente
Não deve ser possivel alterar a placa de um carro já cadastrado
O carro deve ser cadastrado, por padrão, com disponibilidade.
* O usuario responsavel pelo cadastro deve ser um usuario administrador


# Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponivels
Deve ser possivel listar todos os carros disponivels pelo nome da categoria
Deve ser possivel listar todos os carros disponivels pelo nome da marca
Deve ser possivel listar todos os carros disponivels pelo nome do carro

**RN**
O usuario não precisar estar logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro 
O usuario responsavel pelo cadastro deve ser um usuario administrador


# Cadastro de imagens carro

**RF**
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuario responsavel pelo cadastro deve ser um usuario administrador

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel


**RN**
O aluguel deve ter duração minima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro


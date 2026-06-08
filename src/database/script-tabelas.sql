    -- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
    -- Você precisa executar os comandos no banco de dados para criar as tabelas,
    -- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

    /*
    comandos para mysql server
    */

    CREATE DATABASE easyServerMonitoramento;
    USE easyServerMonitoramento;

    CREATE TABLE Usuario (
        idUsuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL UNIQUE,
        telefone VARCHAR(11),
        cpf CHAR(11) UNIQUE,
        senha VARCHAR(45) NOT NULL,
        dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
    );


    CREATE TABLE Empresa (
        idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
        cnpj CHAR(18) NOT NULL UNIQUE,
        nome VARCHAR(45) NOT NULL,
        contato VARCHAR(45) NOT NULL,
        endereco VARCHAR(45) NOT NULL,
        cep CHAR(8),
        dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE Funcionario (
        idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
        fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaFuncionario FOREIGN KEY (fkEmpresa)	
            REFERENCES Empresa(idEmpresa),
        senha VARCHAR(45) NOT NULL,
        nome VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        cargo VARCHAR(45),
        dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP 
    );

    CREATE TABLE Lugar (
        idLugar INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR (60) NOT NULL,
        tipo VARCHAR (45) NOT NULL,
        descricaoLugar VARCHAR(200),
        fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaLugar FOREIGN KEY (fkEmpresa)	
            REFERENCES Empresa(idEmpresa)
    );

    CREATE TABLE Sensor (
        idSensor INT AUTO_INCREMENT PRIMARY KEY,
        fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaSensor FOREIGN KEY (fkEmpresa)	
            REFERENCES Empresa(idEmpresa),
        fkLugar INT NOT NULL,
        CONSTRAINT fkLugarSensor FOREIGN KEY (fkLugar)
            REFERENCES Lugar(idLugar),
        modeloSensor VARCHAR(5),
            CONSTRAINT chkModelo CHECK (modeloSensor IN('DHT11', 'LM35')),
        statusSensor VARCHAR(30) DEFAULT 'Pendente',
        CONSTRAINT ckSensor CHECK( statusSensor IN ('Ativo', 'Inativo', 'Pendente', 'Em manutenção')),
        dtInstalacao DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE Medicoes (
        idMedicao INT AUTO_INCREMENT PRIMARY KEY,
        fkSensor INT NOT NULL,
        CONSTRAINT fkSensorMedicoes  FOREIGN KEY (fkSensor)
            REFERENCES Sensor(idSensor),
        fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaMedicoes FOREIGN KEY (fkEmpresa)	
            REFERENCES Empresa(idEmpresa),
        valor DECIMAL(5,2) NOT NULL,
        unidadeDeMedida VARCHAR (15) NOT NULL,
    dtMedicao DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- INSERTS 
    INSERT INTO Empresa (cnpj, nome, contato, endereco, cep)
    VALUES ('12.789.678/0025-90', 'ADUBE AZURE', 'AMANDA MARTINES', 'AV. FRADIQUE COUTINHO, 1000 - SÃO PAULO', 78923546);

    INSERT INTO Funcionario (fkEmpresa, senha, nome, email, cargo)
    VALUES (1, 'SENHA56988', 'MARIA MOREIRA', 'MARIA.AZURE@GMAIL.COM.BR', 'GESTORA DE PROJETOS'),
    (1, 'SENHA12256', 'CARLOS ALMEIDA', 'CARLOS@TECHCORP.COM.BR', 'GERENTE DE TI');

    INSERT INTO Lugar (nome, tipo, descricaoLugar, fkEmpresa)
    VALUES
    ('Corredor Frio', 'Climatização', 'Área de entrada e saída de ar refrigerdo', 1),
    ('Rack B1', 'Rack', 'Rack com banco de dados ', 1);


    INSERT INTO Sensor (modeloSensor, fkEmpresa,  fkLugar, statusSensor, dtInstalacao)
    VALUES ('DHT11', 1, 1, 'Inativo', '2026-08-14');
        
    -- SELECT 

    SELECT * FROM Usuario;	
    SELECT * FROM Funcionario;



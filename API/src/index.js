const { PessoaController }= require('./controller/Pessoa_Controller');
const prompt = require ("prompt-sync")({sigint: true});
const pessoaController = new PessoaController();

console.log("Sou um programa para cadastrar pessoase cep!")

let resposta = true;
var cep

( async () => {
    while(resposta) {
        console.log(`Digite 1 - cadastrar pessoa`);
        console.log(`Digite 2 - listar cadastro`);
        console.log(`Digite 3 - editar cadastro`);
        console.log(`Digite 4 - deletar cadastro`);
        console.log(`Digite 5 - visualizar cep`);
        console.log(`Digite 6 - exit`);
        resposta = Number(prompt());
    
        switch (resposta) {
            case 1:
                var nome = prompt("digite o nome: ");
                cep = Number(prompt("digite o cep (caracter maxima: 8): "));
                await pessoaController.cadastrarPessoa(nome, cep);
                await pessoaController.buscaEndereco(cep);
                break;
            case 2:
                await pessoaController.listarPessoa(Number(prompt("digite o seu id (caracter maxima: 8): ")));
                break;
            case 3:
                let id2 = Number(prompt("digite o id do cadastro que deseja editar: "));
                await pessoaController.editarPessoa(
                    id2,
                    prompt("digite o nome: "), 
                    Number(prompt("digite o seu cep (caracter maxima: 8): ")),
                    );
                break;
            case 4:
                let id = Number(prompt("digite o id do cadastro que deseja deletar: "));
                await pessoaController.deletarPessoa(id);
                break;
            case 5:
                cep = Number(prompt("digite o seu cep (caracter maxima: 8): "))
                //let id3 = Number(prompt("digite o id do cadastro que deseja editar: "));
                await pessoaController.buscaEndereco(cep);
                break;
            case 6:
                resposta = false;
                break;
            default:
                console.log('informe numeros entre 1 e 6');
                break;
        }
    }
})();
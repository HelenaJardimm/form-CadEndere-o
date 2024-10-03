'use strict'; //ativa o modo restrito
// codigo para consumo de API da via cep
//https://viacep.com.br/
 
 
// LIMPAR CONSULTA DO FORM JA REALIZADO
 
const limparFormlario = () =>{
    document.getElementById('rua').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
}
 
//Função para preencher campos relacionados ao CEP
const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    //coloca o valor de logradouro da API dentro do campo Rua do formulário
    document.getElementById('bairro').value = endereco.bairro;
    //coloca o valor de Bairro da API dentro do campo Bairro do formulário
    document.getElementById('cidade').value = endereco.localidade;
    //coloca o valor de localidade da API dentro do campo Cidade do formulário
    document.getElementById('estado').value = endereco.uf;
    //coloca o valor de uf da API dentro do campo Estado do formulário
}
 
// Verifica se o CEP é valido
// faz uma expreção regular para verificar se apenas foram digitados números
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// Verifica o tamanho do cep
// Cria um const puxando o id de cep e limitando seu tamanho a oito caractéres
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
 
 
const pesquisarCep =async() => {
    limparFormlario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`; //Cria uma const para puxar a url da API do viaCep dizendo também onde deve ser adicionado o valor obtido nas ações posteriores dentro da API
    if(cepValido(cep.value)){
        const dados = await fetch(url);
            // Cria-se uma constante dados onde fetch vê se a URL da APi acima esta mandando um valor real com base nas infomações dadas a propria pela função eNumero e cepValido, onde o wait é usado para que o código não continue sendo executado até que fetch retorne com a promise
        const addres = await dados.json();
            // Cria-se uma costante addres onde novamente é utilizado um await para parar a função até que dados.json retorne com o valor desejado, onde json irá interpretar a resposta dada no formulário para transforma-lá em texto é assim proceguir com os valores no código
    if(addres.hasOwnProperty('erro')){
        // Esse if utiliza da constante addres, com o valor obtido na própia ele verifica se na API foi fornecida uma mensagem de erro, caso essa afirmação seja verdadeira então if será = a true
        alert('CEP não encontado')  
    }
    else{
        // Esse else é utilizado para o preenchimento do formulário caso o if anterior esteja incorreto
        preencherFormulario(addres);
    }
}else{
        alert('CEP incorreto')
    }
    }
// Executa a ação de preenchimento do formulário ao deixar o campo CEP
document.getElementById('cep').addEventListener('focusout', pesquisarCep);
 
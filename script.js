//////////////////////
/// Acessando DOM ///
////////////////////
let btnCadastroCurso = document.querySelector('#cadastro_curso');
let btnSalvarCurso = document.querySelector('#salvar');
// pegamos todos os elementos com a classe btn-editar
let btnSalvarEdicaoCurso = document.getElementsByClassName("btn-editar");
let btnCancelarCadastroCurso = document.querySelector('#cancelar');


////////////////////////
/// Lista de cursos ///
//////////////////////
var dadosCursos =[
    {'imagem': 'novoCursoImagem',
    'titulo': 'novoCursoTitulo',
    'id': 'novoCursoId',
    'descricao' : 'novoCursoDescricao',
    'aulas': 'novoCursoAulas'}
];


////////////////
/// FUNÇÕES ///
//////////////


// Funções: Criar, editar, Deletar
const cadastrarCurso = () => {
    btnSalvarCurso.style.display = 'initial';
    // btnSalvarEdicaoCurso.style.display ='none';
    document.querySelector('.modal').classList.add('active');
}
//adicionado salvar curso
const salvarCurso = () => {

        const curso = {
            nome: document.getElementById('titulo').value,
            img : document.getElementById('imagem'),
            descricao: document.getElementById('descricao').value 
        }
        createCurso(novoCurso)
        limparimput()
        closeModal()
}

// já foi declarado
const criarCurso = (curso) => {  
 

    let novoCursoTitulo = document.getElementById('novo_titulo').value;
    let novoCursoImagem = document.getElementById('novo_img').value;
    let novoCursoId = document.getElementById('novo_id').value;
    let novoCursoDescricao = document.getElementById('novo_descricao').value;
    
    if(novoCursoId == ""){
        window.alert('Digite um ID válido!')
        return false;
    }    

    for(let i = 0; i < dadosCursos.length; i++) {        
        if (dadosCursos[i]['id'] == novoCursoId){                       
            return window.alert('Esse ID de curso já existe!');
        }        
    }

    dadosCursos.push({
        'titulo': novoCursoTitulo,
        'imagem': novoCursoImagem,
        'id': novoCursoId,
        'descricao' : novoCursoDescricao,
    });

    const novoCurso = document.createElement('div')
    novoCurso.innerHTML = `
        <h2 class="curso_titulo">${novoCursoTitulo}</h2>
        <img src="${novoCursoImagem = '../imagens/teste.png'}" class="curso_imagem" alt="imagem curso">                
        <span class="curso_id">ID: ${novoCursoId}</span>
        <p class="curso_descricao">${novoCursoDescricao}</p>
        <div class="curso_botoes_editar_deletar">
            <button class="curso_botao_editar" onclick="abrirEdicaoCurso(${novoCursoId})">Editar</button>
            <button class="curso_botao_deletar" onclick="deletarCurso(${novoCursoId})">Deletar</button>
        </div>`;

    novoCurso.classList.add(`container_curso`);
    novoCurso.setAttribute('id', `${novoCursoId}`);
    document.querySelector('#container').appendChild(novoCurso);    
    document.querySelector('#form').reset();
}

const cancelarCriacaoCurso = () => {
    limparInputsCriacao()
    document.querySelector('.modal').classList.remove('active');
}

const limparInputsCriacao = () => {
    document.querySelector('#form').reset();
}
// já foi declarado
const abrirEdicaoCurso = (id) => {
    document.querySelector('.modal').classList.add('active');

    btnSalvarCurso.style.display = 'none';
    // btnSalvarEdicaoCurso.style.display ='initial';

    for(let i = 0; i < dadosCursos.length; i++) {        
        if (dadosCursos[i]['id'] == id){
            document.getElementById('novo_titulo').value = dadosCursos[i]['titulo'];
            document.getElementById('novo_img').value = dadosCursos[i]['image'];
            document.getElementById('novo_id').value = dadosCursos[i]['id'];
            document.getElementById('novo_descricao').value = dadosCursos[i]['descricao'];
        }        
    }   
}
//já foi declarado
const atualizarCurso = () => {  
    let atualizaCurso = document.getElementById('novo_id')

    abrirEdicaoCurso();    
    deletarCurso();
    criarCurso();
}
//já foi declarado
const deletarCurso = (id) => {    
    document.getElementById().remove();
    for(let i = 0; i < dadosCursos.length; i++) {        
        if (dadosCursos[i]['id'] == id){
            dadosCursos.splice(i, 1);
        }        
    }
};


////////////////
/// EVENTOS ///
//indefinido
btnCadastroCurso.addEventListener('click', cadastrarCurso);
btnSalvarCurso.addEventListener('click', criarCurso);
btnCancelarCadastroCurso.addEventListener('click', cancelarCriacaoCurso);

// for para pegar todos os elementos com a classe btn-editar e adicionar uma função no onclick
for (let i = 0; i < btnSalvarEdicaoCurso.length; i++) {
        btnSalvarEdicaoCurso[i].addEventListener('click', atualizarCurso);
}



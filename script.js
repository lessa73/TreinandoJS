
let btnCadastroCurso = document.querySelector('#cadastro_curso');
let btnSalvarCurso = document.querySelector('#salvar');
let btnSalvarEdicaoCurso = document.querySelector('#salvar-edicao');
let btnCancelarCadastroCurso = document.querySelector('#cancelar');

var dadosCursos =[];

const cadastrarCurso = () => {
    btnSalvarCurso.style.display = 'initial';
    btnSalvarEdicaoCurso.style.display ='none';
    document.querySelector('.modal').classList.add('active');
}

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

const criarCurso = (curso) => {  
    let novoCursoTitulo = document.getElementById('txt_nome').value;
    let novoCursoImagem = document.getElementById('txt_imagem').value;
    let novoCursoId = document.getElementById('id_curso').value;
    let novoCursoDescricao = document.getElementById('txt_descricao').value;
    
    if(novoCursoId == ""){
        window.alert('Digite um ID válido!')
        return false;
    }    

    for(let i = 0; i < dadosCursos.length; i++) {        
        if (dadosCursos[i]['id'] == novoCursoId){                       
            return window.alert('Esse ID de curso já existe!');
        }        
    }

    let novoCurso = {
        'titulo': novoCursoTitulo,
        'imagem': novoCursoImagem,
        'id': novoCursoId,
        'descricao' : novoCursoDescricao,
    };

    dadosCursos.push(novoCurso);
        
    criarLinhaTabela(novoCurso);
    
    localStorage.setItem('dadosCursos', JSON.stringify(dadosCursos));

}

const criarLinhaTabela = (curso) => {
    const novoCurso = document.createElement('tr')
    novoCurso.innerHTML = `
    <td>${curso.titulo}</td>
    <td><img src="${curso.imagem = 'imagens/ilustra-web.png'}" class="img-fluid" /></td>
    <td>${curso.descricao}</td>
    <td>
      <button class="btn btn-secondary m-1" onclick="abrirEdicaoCurso(${curso.id})">editar</button>
      <button class="btn btn-danger m-1" onclick="deletarCurso(${curso.id})">excluir</button>
    </td>`;

    novoCurso.setAttribute('id', `${curso.id}`);
    document.querySelector('#tabela1').appendChild(novoCurso);    
    document.querySelector('#form').reset();
}

const carregarPagina = () => {
    if (localStorage.getItem('dadosCursos') != null){
        let listaCursos = JSON.parse(localStorage.getItem('dadosCursos'));
        for (let i = 0; i < listaCursos.length; i++) {
            criarLinhaTabela(listaCursos[i]);
        }
    } 
}
carregarPagina();

const cancelarCriacaoCurso = () => {
    limparInputsCriacao()
    document.querySelector('.modal').classList.remove('active');
}

const limparInputsCriacao = () => {
    document.querySelector('#form').reset();
}

const abrirEdicaoCurso = (id) => {
    document.querySelector('.modal').classList.add('active');
    btnSalvarCurso.style.display = 'none';
    btnSalvarEdicaoCurso.style.display ='initial';

    for(let i = 0; i < dadosCursos.length; i++) {        
        if (dadosCursos[i]['id'] == id){
            document.getElementById('txt_nome').value = dadosCursos[i]['titulo'];
            document.getElementById('txt_imagem').value = dadosCursos[i]['imagem'];
            document.getElementById('id_curso').value = dadosCursos[i]['id'];
            document.getElementById('txt_descricao').value = dadosCursos[i]['descricao'];
        }        
    }   
}

const atualizarCurso = () => {  
    let atualizaCurso = document.getElementById('id_curso').value
    abrirEdicaoCurso();    
    deletarCurso(atualizaCurso);
    criarCurso();
    cancelarCriacaoCurso();
}

const deletarCurso = (id) => {    
    document.getElementById(id).remove();
    for(let i = 0; i < dadosCursos.length; i++) {        
        if (dadosCursos[i]['id'] == id){
            dadosCursos.splice(i, 1);
        }        
    }
};

btnCadastroCurso.addEventListener('click', cadastrarCurso);
btnSalvarCurso.addEventListener('click', criarCurso);
btnCancelarCadastroCurso.addEventListener('click', cancelarCriacaoCurso);
btnSalvarEdicaoCurso.addEventListener('click', atualizarCurso);




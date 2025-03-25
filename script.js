const precosHora = {
    corte: 20,
    montagem: 25,
    pintura: 30,
  };
  
const form = document.getElementById('formPeca');
const pecasContainer = document.getElementById('pecasContainer');

let pecas = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomePeca').value;
  const novaPeca = {
    id: Date.now(),
    nome,
    setores: [],
    tempos: {},
  };
  pecas.push(novaPeca);
  renderPecas();
  form.reset();
});

function renderPecas() {
  pecasContainer.innerHTML = '';
  pecas.forEach(peca => {
    const li = document.createElement('li');
    li.textContent = `ID: ${peca.id} - Nome: ${peca.nome}`;
    pecasContainer.appendChild(li);
  });
}

const pecaSelect = document.getElementById('pecaSelect');
const setorSelect = document.getElementById('setorSelect');
const logSetores = document.getElementById('logSetores');

function renderPecas() {
  pecasContainer.innerHTML = '';
  pecaSelect.innerHTML = '';

  pecas.forEach(peca => {
    // Lista no ecrã
    const li = document.createElement('li');
    li.textContent = `ID: ${peca.id} - Nome: ${peca.nome}`;
    pecasContainer.appendChild(li);

    // Dropdown de seleção
    const option = document.createElement('option');
    option.value = peca.id;
    option.textContent = peca.nome;
    pecaSelect.appendChild(option);
  });
}

function getPecaSelecionada() {
  const id = Number(pecaSelect.value);
  return pecas.find(p => p.id === id);
}

function registarEntrada() {
  const peca = getPecaSelecionada();
  const setor = setorSelect.value;
  if (!peca.tempos[setor]) {
    peca.tempos[setor] = { entrada: null, saida: null };
  }
  peca.tempos[setor].entrada = new Date();
  logSetores.innerText = `Entrada registada no setor ${setor.toUpperCase()} às ${peca.tempos[setor].entrada.toLocaleTimeString()}`;
}

function registarSaida() {
  const peca = getPecaSelecionada();
  const setor = setorSelect.value;
  if (peca.tempos[setor] && peca.tempos[setor].entrada) {
    peca.tempos[setor].saida = new Date();
    const entrada = peca.tempos[setor].entrada;
    const saida = peca.tempos[setor].saida;
    const tempo = ((saida - entrada) / 1000).toFixed(2); // segundos

    logSetores.innerHTML += `<p>Entrada registada no setor <strong>${setor.toUpperCase()}</strong> às ${peca.tempos[setor].entrada.toLocaleTimeString()}</p>`;
    logSetores.innerHTML += `<p>Saída registada no setor <strong>${setor.toUpperCase()}</strong> às ${peca.tempos[setor].saida.toLocaleTimeString()}</p>`;
    logSetores.innerHTML += `<p>Tempo no setor: ${tempo} segundos</p>`;
  } else {
    alert("Registe a entrada antes da saída.");
  }
}

function mostrarCusto() {
    const peca = getPecaSelecionada();
    const custo = calcularCusto(peca);
    document.getElementById('custoFinal').innerText = `Custo total: €${custo}`;
  }
  

function calcularCusto(peca) {
    let custoTotal = 0;
    for (const setor in peca.tempos) {
      const tempo = peca.tempos[setor];
      if (tempo.entrada && tempo.saida) {
        const minutos = (tempo.saida - tempo.entrada) / 60000;
        const preco = precosHora[setor];
        custoTotal += (preco / 60) * minutos;
      }
    }
    return custoTotal.toFixed(2);
  }


  const utilizadores = [];
let utilizadorAtual = null;

function registarUtilizador() {
  const nome = document.getElementById('username').value.trim();
  const perfil = document.getElementById('perfil').value;

  if (!nome) return alert("Insere um nome!");

  const existe = utilizadores.some(u => u.nome === nome);
  if (existe) return alert("Utilizador já existe!");

  utilizadores.push({ nome, perfil });
  alert("Utilizador registado com sucesso!");
}

function loginUtilizador() {
  const nome = document.getElementById('username').value.trim();
  const user = utilizadores.find(u => u.nome === nome);

  if (!user) {
    alert("Utilizador não encontrado!");
    return;
  }

  utilizadorAtual = user;
  document.getElementById('authStatus').innerText = `Bem-vindo, ${user.nome} [${user.perfil}]`;

  // Mostra secções principais após login
  document.querySelector('main').style.display = 'block';
      
  if (utilizadorAtual.perfil !== 'administrador') {
    document.getElementById('registo-peca').style.display = 'none';
  }
  
}


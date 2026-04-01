/* ============================================================
   ui — Helpers
============================================================ */
const ui = {
  open(id)  { document.getElementById(id).classList.add('open'); },
  close(id) { document.getElementById(id).classList.remove('open'); },

  clear(...ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
};

/* ============================================================
   CLIENTES — COM BANCO
============================================================ */
const Clientes = {


  novo() {
    document.getElementById('modal-cliente-title').textContent = 'Novo Cliente';
    ui.clear('cliente-edit-id','cliente-nome','cliente-tel','cliente-email');
    ui.open('modal-cliente');
  },

  salvar() {
    const nome  = document.getElementById('cliente-nome').value.trim();
    const tel   = document.getElementById('cliente-tel').value.trim();
    const email = document.getElementById('cliente-email').value.trim();
    const id    = document.getElementById('cliente-edit-id').value;

    const url = id ? "api/clientes/editar_cliente.php" : "api/clientes/salvar_cliente.php";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&nome=${nome}&telefone=${tel}&email=${email}`
    })
    .then(res => res.text())
    .then(res => {
      if (res === "ok") {
        ui.close('modal-cliente');
        this.carregar();
      } else {
        alert("Erro ao salvar");
      }
    });
  },

  carregar() {
    fetch("api/clientes/listar_clientes.php")
      .then(res => res.json())
      .then(data => {

        const tbody = document.getElementById('tbody-clientes');

        if (!data.length) {
          tbody.innerHTML = `
            <tr>
              <td colspan="4">Nenhum cliente cadastrado</td>
            </tr>
          `;
          return;
        }

        tbody.innerHTML = data.map(c => `
          <tr>
            <td>${c.nome}</td>
            <td>${c.telefone || '—'}</td>
            <td>${c.email || '—'}</td>

          <td>
            <div class="actions-cell">
              <button class="icon-btn edit" onclick="Clientes.editar(${c.id}, \`${c.nome}\`, \`${c.telefone}\`, \`${c.email}\`)">✏️</button>
              <button class="icon-btn del" onclick="Clientes.excluir(${c.id})">🗑️</button>
            </div>
          </td>

          </tr>

        `).join('');

        document.getElementById('cnt-clientes').textContent = data.length;
      });
  },

  editar(id, nome, telefone, email) {
    document.getElementById('cliente-edit-id').value = id;
    document.getElementById('cliente-nome').value = nome;
    document.getElementById('cliente-tel').value = telefone;
    document.getElementById('cliente-email').value = email;

    ui.open('modal-cliente');
  },

  excluir(id) {
    if (!confirm("Excluir cliente?")) return;

    fetch("api/clientes/deletar_cliente.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}`
    })
    .then(res => res.text())
    .then(res => {
      if (res === "ok") {
        this.carregar();
      } else {
        alert("Erro ao excluir");
      }
    });
  }
};


/* ============================================================
   NAVEGAÇÃO
============================================================ */
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (page === "clientes") {
    Clientes.carregar();
  }

  if (page === "pets") {
    Pets.carregar();
  }

  if (page === "servicos") {
  Servicos.carregar();
  }

  if (page === "agendamentos") {
  Agendamentos.carregar();
}

if (page === "home") {
  carregarDashboard();
}




}


/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Navegação
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigate(link.dataset.page);
    });
  });

  // Botões
  document.getElementById('btn-novo-cliente')
    .addEventListener('click', () => Clientes.novo());

  document.getElementById('btn-salvar-cliente')
    .addEventListener('click', () => Clientes.salvar());

  document.getElementById('btn-novo-pet')
  .addEventListener('click', () => Pets.novo());

  document.getElementById('btn-salvar-pet')
    .addEventListener('click', () => Pets.salvar());

  document.getElementById('btn-novo-servico')
  .addEventListener('click', () => Servicos.novo());

  document.getElementById('btn-salvar-servico')
  .addEventListener('click', () => Servicos.salvar());  

  document.getElementById('btn-novo-agend')
  .addEventListener('click', () => Agendamentos.novo());

  document.getElementById('btn-salvar-agend')
  .addEventListener('click', () => Agendamentos.salvar());

    

  // Fechar modal
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => ui.close(btn.dataset.close));
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) ui.close(overlay.id);
    });
  });

  // carregar inicial
  Clientes.carregar();
});

/* ============================================================
   PETS - COM BANCO
============================================================ */

const Pets = {

  novo() {
    fetch("api/clientes/listar_clientes.php")
      .then(res => res.json())
      .then(clientes => {

        const select = document.getElementById('pet-dono');

        select.innerHTML = clientes.map(c =>
          `<option value="${c.id}">${c.nome}</option>`
        ).join('');

        document.getElementById('modal-pet-title').textContent = 'Novo Pet';
        ui.clear('pet-edit-id','pet-nome','pet-raca','pet-idade');

        ui.open('modal-pet');
      });
  },

  salvar() {
    const nome = document.getElementById('pet-nome').value;
    const raca = document.getElementById('pet-raca').value;
    const idade = document.getElementById('pet-idade').value;
    const id_cliente = document.getElementById('pet-dono').value;
    const id = document.getElementById('pet-edit-id').value;

    const url = id ? "api/pets/editar_pet.php" : "api/pets/salvar_pet.php";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&nome=${nome}&raca=${raca}&idade=${idade}&id_cliente=${id_cliente}`
    })
    .then(res => res.text())
    .then(res => {
      if (res === "ok") {
        ui.close('modal-pet');
        this.carregar();
      } else {
        alert("Erro ao salvar pet");
      }
    });
  },

  carregar() {
    fetch("api/pets/listar_pets.php")
      .then(res => res.json())
      .then(data => {

        const tbody = document.getElementById('tbody-pets');

        if (!data.length) {
          tbody.innerHTML = `<tr><td colspan="5">Nenhum pet cadastrado</td></tr>`;
          return;
        }

        tbody.innerHTML = data.map(p => `
          <tr>
            <td>${p.nome}</td>
            <td>${p.raca}</td>
            <td>${p.idade}</td>
            <td>${p.dono}</td>
            <td>
              <div class="actions-cell">
                <button class="icon-btn edit" onclick="Pets.editar(${p.id}, \`${p.nome}\`, \`${p.raca}\`, \`${p.idade}\`, ${p.id_cliente})">✏️</button>
                <button class="icon-btn del" onclick="Pets.excluir(${p.id})">🗑️</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.getElementById('cnt-pets').textContent = data.length;
      });
  },

  editar(id, nome, raca, idade, id_cliente) {
    this.novo();

    document.getElementById('pet-edit-id').value = id;
    document.getElementById('pet-nome').value = nome;
    document.getElementById('pet-raca').value = raca;
    document.getElementById('pet-idade').value = idade;

    setTimeout(() => {
      document.getElementById('pet-dono').value = id_cliente;
    }, 100);
  },

  excluir(id) {
    if (!confirm("Excluir pet?")) return;

    fetch("api/pets/deletar_pet.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}`
    })
    .then(() => this.carregar());
  }
};


const Servicos = {

  novo() {
    document.getElementById('modal-servico-title').textContent = 'Novo Serviço';
    ui.clear('servico-edit-id','servico-nome','servico-preco');
    ui.open('modal-servico');
  },

  salvar() {
    const nome = document.getElementById('servico-nome').value;
    const preco = document.getElementById('servico-preco').value;
    const id = document.getElementById('servico-edit-id').value;

    const url = id ? "api/servicos/editar_servico.php" : "api/servicos/salvar_servico.php";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&nome=${nome}&preco=${preco}`
    })
    .then(res => res.text())
    .then(res => {
      if (res === "ok") {
        ui.close('modal-servico');
        this.carregar();
      }
    });
  },

  carregar() {
    fetch("api/servicos/listar_servicos.php")
      .then(res => res.json())
      .then(data => {

        const tbody = document.getElementById('tbody-servicos');

        if (!data.length) {
          tbody.innerHTML = `<tr><td colspan="3">Nenhum serviço cadastrado</td></tr>`;
          return;
        }

        tbody.innerHTML = data.map(s => `
          <tr>
            <td>${s.nome}</td>
            <td>R$ ${parseFloat(s.preco).toFixed(2)}</td>
            <td>
              <div class="actions-cell">
                <button class="icon-btn edit" onclick="Servicos.editar(${s.id}, \`${s.nome}\`, ${s.preco})">✏️</button>
                <button class="icon-btn del" onclick="Servicos.excluir(${s.id})">🗑️</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.getElementById('cnt-servicos').textContent = data.length;
      });
  },

  editar(id, nome, preco) {
    document.getElementById('servico-edit-id').value = id;
    document.getElementById('servico-nome').value = nome;
    document.getElementById('servico-preco').value = preco;

    ui.open('modal-servico');
  },

  excluir(id) {
    if (!confirm("Excluir serviço?")) return;

    fetch("api/servicos/deletar_servico.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}`
    })
    .then(() => this.carregar());
  }
};


const Agendamentos = {

  novo() {
    Promise.all([
      fetch("api/pets/listar_pets.php").then(r => r.json()),
      fetch("api/servicos/listar_servicos.php").then(r => r.json())
    ]).then(([pets, servicos]) => {

      document.getElementById('agend-pet').innerHTML =
        pets.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');

      document.getElementById('agend-servico').innerHTML =
        servicos.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');

      ui.clear('agend-edit-id','agend-data','agend-hora');
      document.getElementById('modal-agend-title').textContent = 'Novo Agendamento';

      ui.open('modal-agendamento');
    });
  },

  salvar() {
    const data = document.getElementById('agend-data').value;
    const hora = document.getElementById('agend-hora').value;
    const id_pet = document.getElementById('agend-pet').value;
    const id_servico = document.getElementById('agend-servico').value;
    const id = document.getElementById('agend-edit-id').value;

    const url = id
      ? "api/agendamentos/editar_agendamento.php"
      : "api/agendamentos/salvar_agendamento.php";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&data=${data}&hora=${hora}&id_pet=${id_pet}&id_servico=${id_servico}`
    })
    .then(r => r.text())
    .then(res => {
      if (res === "ok") {
        ui.close('modal-agendamento');
        this.carregar();
      }
    });
  },

  carregar() {
    fetch("api/agendamentos/listar_agendamentos.php")
      .then(r => r.json())
      .then(data => {

        const tbody = document.getElementById('tbody-agendamentos');

        if (!data.length) {
          tbody.innerHTML = `<tr><td colspan="6">Nenhum agendamento</td></tr>`;
          return;
        }

        tbody.innerHTML = data.map(a => `
          <tr>
            <td>${a.data}</td>
            <td>${a.hora}</td>
            <td>${a.pet}</td>
            <td>${a.cliente}</td>
            <td>${a.servico}</td>
            <td>
              <div class="actions-cell">
                <button class="icon-btn edit" onclick="Agendamentos.editar(${a.id}, \`${a.data}\`, \`${a.hora}\`, ${a.id_pet}, ${a.id_servico})">✏️</button>
                <button class="icon-btn del" onclick="Agendamentos.excluir(${a.id})">🗑️</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.getElementById('cnt-agendamentos').textContent = data.length;
      });
  },

 editar(id, data, hora, id_pet, id_servico) {

  Promise.all([
    fetch("api/pets/listar_pets.php").then(r => r.json()),
    fetch("api/servicos/listar_servicos.php").then(r => r.json())
  ]).then(([pets, servicos]) => {

    document.getElementById('agend-pet').innerHTML =
      pets.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');

    document.getElementById('agend-servico').innerHTML =
      servicos.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');

    // 👉 AGORA SIM coloca os dados
    document.getElementById('agend-edit-id').value = id;
    document.getElementById('agend-data').value = data;
    document.getElementById('agend-hora').value = hora;

    document.getElementById('agend-pet').value = id_pet;
    document.getElementById('agend-servico').value = id_servico;

    document.getElementById('modal-agend-title').textContent = 'Editar Agendamento';

    ui.open('modal-agendamento');
  });
},


  excluir(id) {
    if (!confirm("Excluir agendamento?")) return;

    fetch("api/agendamentos/deletar_agendamento.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}`
    })
    .then(() => this.carregar());
  }
};

function carregarDashboard() {
  fetch("api/dashboard/contadores.php")
    .then(res => res.json())
    .then(data => {
      document.getElementById('cnt-clientes').textContent = data.clientes;
      document.getElementById('cnt-pets').textContent = data.pets;
      document.getElementById('cnt-servicos').textContent = data.servicos;
      document.getElementById('cnt-agendamentos').textContent = data.agendamentos;
    });
}

carregarDashboard();
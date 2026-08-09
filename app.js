const docs=[
["RPO Futebol 11 Seniores 2026/27","RPO","Art. 125 — Delegado ao Jogo da AFL"],
["RPO Futebol 9 e 7 2026/27","RPO","Art. 125 — Delegado ao Jogo da AFL"],
["RPO Futebol 11 e 9 Feminino 2026/27","RPO","Art. 125 — Delegado ao Jogo da AFL"],
["Regulamento de Prevenção da Violência 2026/27","Segurança","Consulta operacional"],
["Regulamento de Arbitragem AFL 2026/27","Arbitragem","Consulta operacional"]
];
const tasks=[
"Dirigir a reunião preparatória",
"Verificar condições de segurança",
"Verificar com o árbitro as condições técnicas do campo",
"Fiscalizar o cumprimento das normas regulamentares",
"Reportar anomalias ou irregularidades",
"Elaborar o relatório circunstanciado das ocorrências"
];
const app=document.querySelector("#app");
function nav(){return `<nav class="bottom">
<button onclick="home()">🏠<br>Início</button>
<button onclick="docsPage()">📚<br>Regras</button>
<button onclick="game()">⚽<br>Jogo</button>
</nav>`}
function shell(content){app.innerHTML=`<main class="wrap">${content}</main>${nav()}`}
function home(){shell(`<div class="top"><div><div class="kicker">AFL • ÉPOCA 2026/27</div><div class="title">Delegado AFL</div><div class="sub">Consulta rápida para o dia de jogo</div></div><div class="logo">🛡️</div></div>
<button class="primary" onclick="game()"><div><small>PRÓXIMA AÇÃO</small><strong>⚽ Dia de Jogo</strong><span>Abrir checklist do Delegado</span></div><b>→</b></button>
<div class="section">Acesso rápido</div><div class="grid">
<button class="card" onclick="docsPage()"><div class="icon">📚</div><b>Regulamentos</b><small>RPO e normas</small></button>
<button class="card" onclick="incident()"><div class="icon">🚨</div><b>Incidentes</b><small>Consulta rápida</small></button>
<button class="card" onclick="report()"><div class="icon">📝</div><b>Relatório</b><small>Registar ocorrência</small></button>
<button class="card" onclick="alert('Favoritos: em desenvolvimento na V1.1')"><div class="icon">⭐</div><b>Favoritos</b><small>Artigos guardados</small></button>
</div><div class="section">Pesquisa</div><input class="search" placeholder="Pesquisar nos regulamentos..." oninput="quickSearch(this.value)">
<div id="results"></div><div class="notice">🟢 Base inicial 2026/27 preparada. A versão final terá a referência exata a cada artigo e fonte oficial.</div>`)}
function docsPage(){shell(`<button class="back" onclick="home()">← Voltar</button><div class="title">Regulamentos</div><p class="sub">Documentação prioritária para o Delegado</p><input id="q" class="search" placeholder="Pesquisar..." oninput="renderDocs(this.value)"><div id="list" class="list" style="margin-top:14px"></div>`);renderDocs("")}
function renderDocs(q){const l=document.querySelector("#list");if(!l)return;const a=docs.filter(d=>d.join(" ").toLowerCase().includes(q.toLowerCase()));l.innerHTML=a.map(d=>`<div class="item"><b>${d[0]}</b><small>${d[1]} • ${d[2]}</small></div>`).join("")||`<div class="empty">Nenhum resultado.</div>`}
function quickSearch(q){const r=document.querySelector("#results");if(!r)return;if(!q){r.innerHTML="";return}const a=docs.filter(d=>d.join(" ").toLowerCase().includes(q.toLowerCase()));r.innerHTML=`<div class="section">Resultados</div>`+(a.map(d=>`<div class="item" style="margin-bottom:8px"><b>${d[0]}</b><small>${d[2]}</small></div>`).join("")||`<div class="empty">Nenhum resultado.</div>`)}
function game(){shell(`<button class="back" onclick="home()">← Voltar</button><div class="title">⚽ Dia de Jogo</div><p class="sub">Checklist operacional inicial</p>${tasks.map((t,i)=>`<label class="check"><input type="checkbox" onchange="saveTask(${i},this.checked)"><span>${t}</span></label>`).join("")}<div class="notice">Fonte-base: RPO AFL 2026/27, Art. 125 — Delegado ao Jogo da AFL.</div>`);document.querySelectorAll(".check input").forEach((x,i)=>x.checked=localStorage.getItem("task"+i)==="1")}
function saveTask(i,v){localStorage.setItem("task"+i,v?"1":"0")}
function incident(){shell(`<button class="back" onclick="home()">← Voltar</button><div class="title">🚨 Incidentes</div><p class="sub">Consulta rápida — módulo inicial</p><div class="list">${["Invasão de campo","Agressão","Confrontos / adeptos","Arremesso de objetos","Problema de segurança","Problema nas instalações"].map(x=>`<div class="item"><b>${x}</b><small>Procedimento regulamentar detalhado será ligado na próxima versão.</small></div>`).join("")}</div>`)}
function report(){shell(`<button class="back" onclick="home()">← Voltar</button><div class="title">📝 Relatório</div><p class="sub">Registo rápido de ocorrência</p><textarea id="txt" class="search" style="min-height:180px" placeholder="Descreve objetivamente a ocorrência..."></textarea><button class="primary" style="margin-top:12px" onclick="localStorage.setItem('report',document.querySelector('#txt').value);alert('Ocorrência guardada no telemóvel.')">Guardar ocorrência</button>`)}
home();
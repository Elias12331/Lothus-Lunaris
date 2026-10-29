/* LUNARETH — Observatório das Dez Luas. Não usa a data gregoriana. */
const LUNARETH_LUAS = [{"id": "alun-vaeris", "name": "Alun Vaeris", "title": "A Lua do Despertar", "symbol": "✧", "virtue": "Esperança", "hue": "#b9e4a8", "short": "O despertar de tudo que ainda pode nascer.", "quote": "Toda jornada começa quando abrimos os olhos."}, {"id": "solmira", "name": "Solmira", "title": "A Lua dos Brotos", "symbol": "❧", "virtue": "Crescimento", "hue": "#7bdba6", "short": "Raízes, paciência e promessas que crescem.", "quote": "Aquilo que cresce em silêncio se torna forte."}, {"id": "veloria", "name": "Veloria", "title": "A Lua dos Ventos", "symbol": "〰", "virtue": "Liberdade", "hue": "#95d9f4", "short": "Mensagens que só o céu conhece.", "quote": "Nem toda mensagem precisa de palavras."}, {"id": "aquareth", "name": "Aquareth", "title": "A Lua das Águas", "symbol": "◈", "virtue": "Purificação", "hue": "#85baff", "short": "Deixar ir também é uma forma de lembrar.", "quote": "A água sempre encontra seu caminho."}, {"id": "thaloren", "name": "Thaloren", "title": "A Lua da Colheita", "symbol": "❊", "virtue": "Generosidade", "hue": "#e7c981", "short": "Nenhuma mesa deve ficar vazia.", "quote": "Toda recompensa nasce do esforço."}, {"id": "ignoria", "name": "Ignoria", "title": "A Lua das Chamas", "symbol": "♨", "virtue": "Coragem", "hue": "#ffa56f", "short": "Enfrentar o medo sem negar sua existência.", "quote": "A coragem não nasce da ausência do medo."}, {"id": "lyren", "name": "Lyren", "title": "A Lua das Histórias", "symbol": "❦", "virtue": "Memória", "hue": "#c7a3ff", "short": "Vozes antigas que continuam presentes.", "quote": "Aquilo que é lembrado nunca morre."}, {"id": "astraelis-lua", "name": "Astraelis", "title": "A Lua das Estrelas", "symbol": "✵", "virtue": "Esperança", "hue": "#dbe4f9", "short": "A lua mais aguardada de Elarin.", "quote": "Olhe para o céu e lembre-se de quem você é."}, {"id": "elaria", "name": "Elaria", "title": "A Lua da Gratidão", "symbol": "❖", "virtue": "Gratidão", "hue": "#f1e8e7", "short": "O calor de pertencer a uma família.", "quote": "Nenhuma jornada é percorrida sozinho."}, {"id": "novareth", "name": "Novareth", "title": "A Lua do Recomeço", "symbol": "◔", "virtue": "Renascimento", "hue": "#8196e0", "short": "Despedidas que abrem espaço para a vida.", "quote": "Todo fim carrega o nascimento de algo novo."}];
const lunaById = Object.fromEntries(LUNARETH_LUAS.map(m=>[m.id,m]));
let lunarethCurrentFolder = 'alun-vaeris';
function setupLunareth(){
  const year=document.getElementById('lunarethYear');
  const day=document.getElementById('lunarethDay');
  const slider=document.getElementById('lunarethSlider');
  const monthTrack=document.getElementById('lunarethMonthTrack');
  const result=document.getElementById('lunarethResult');
  const prev=document.getElementById('lunaPrev');
  const next=document.getElementById('lunaNext');
  const read=document.getElementById('lunaReadCurrent');
  if(!year||!day||!slider||!monthTrack||!result||!read) return;
  const safeInt=(value,fallback,min,max)=>{
    const n=Number(value);
    return Number.isFinite(n)?Math.max(min,Math.min(max,Math.floor(n))):fallback;
  };
  monthTrack.replaceChildren();
  LUNARETH_LUAS.forEach((m,i)=>{
    const button=document.createElement('button');
    button.type='button';button.className='luna-track-cell';button.style.setProperty('--moon',m.hue);
    button.title=`${m.name} · dias ${i*36+1}–${(i+1)*36}`;
    button.setAttribute('aria-label',`Ir ao primeiro dia de ${m.name}`);
    button.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><strong>${m.symbol}</strong><small>${m.name}</small>`;
    button.onclick=()=>{day.value=i*36+1;render();};
    monthTrack.appendChild(button);
  });
  const stored=()=>{try{return JSON.parse(localStorage.getItem('lunareth-observatorio')||'null')}catch(_){return null}};
  const saved=stored();
  if(saved){year.value=safeInt(saved.year,1,1,9999);day.value=safeInt(saved.day,1,1,361)}
  function render(){
    const y=safeInt(year.value,1,1,9999);
    const max=y%10===0?361:360;
    const d=safeInt(day.value,1,1,max);
    year.value=y;day.value=d;day.max=max;slider.max=max;slider.value=d;
    const tick=document.getElementById('lunaSliderMax');if(tick)tick.textContent='DIA '+String(max).padStart(3,'0');
    const vigil=d===361;
    let moon=null;
    let localDay=0;
    if(!vigil){const index=Math.floor((d-1)/36);moon=LUNARETH_LUAS[index];localDay=(d-1)%36+1;lunarethCurrentFolder=moon.id}
    else{lunarethCurrentFolder='vigilia'}
    const label=String(d).padStart(3,'0');
    result.style.setProperty('--moon',moon?.hue||'#d4d4f8');
    result.innerHTML=`<div class="luna-result-orb">${moon?.symbol||'☾'}</div><div class="luna-result-copy"><span>ANO ${y} · DIA ${label}</span><h4>${moon?.name||'A Vigília Celeste'}</h4><p>${moon?`${moon.title} · Dia ${localDay} de 36`:'O dia extra fora das dez luas'}</p><small>${moon?`Virtude: ${moon.virtue}`:'O silêncio que visita Elarin a cada década'}</small></div><button id="lunaReadCurrent" type="button">${moon?'Ler esta lua ↗':'Conhecer a Vigília ↗'}</button>`;
    result.querySelector('#lunaReadCurrent').onclick=()=>{
      if(typeof setRoute==='function')setRoute('lunareth',lunarethCurrentFolder);
    };
    monthTrack.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('current',!vigil&&i===Math.floor((d-1)/36)));
    const pct=((d-1)/(max-1))*100;slider.style.setProperty('--filled',pct+'%');
    try{localStorage.setItem('lunareth-observatorio',JSON.stringify({year:y,day:d}))}catch(_){}
  }
  day.addEventListener('input',render);
  year.addEventListener('input',render);
  slider.addEventListener('input',()=>{day.value=slider.value;render()});
  prev.addEventListener('click',()=>{day.value=Math.max(1,safeInt(day.value,1,1,361)-1);render()});
  next.addEventListener('click',()=>{day.value=Math.min(safeInt(year.value,1,1,9999)%10===0?361:360,safeInt(day.value,1,1,361)+1);render()});
  render();
}
window.addEventListener('DOMContentLoaded',setupLunareth);

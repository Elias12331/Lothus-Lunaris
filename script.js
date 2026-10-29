/* FAMÍLIA LUNARIS — ARQUIVO CELESTIAL
   Funciona diretamente com index.html, sem login ou servidor.
   Os registros editáveis ficam no localStorage deste navegador. */

const GLYPH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GLYPH_SIGNS = ['𖤓','𖤐','𖤔','𖤕','𖤖','𖤗','𖤘','𖤙','𖤚','𖤛','𖤜','𖤝','𖤞','𖤟','𖤠','𖤡','𖤢','𖤣','𖤤','𖤥','𖤦','𖤧','𖤨','𖤩','𖤪','𖤫'];
const glifos = Object.fromEntries([...GLYPH_ALPHABET].map((letter,index) => [letter,GLYPH_SIGNS[index]]));
const letras = Object.fromEntries(Object.entries(glifos).map(([letter,glyph]) => [glyph,letter]));
const editorNames = ['astraelis','astrael','sirius','lyranoctis','obsessao','desejo'];
const viewNames = ['home','astraelis','ovelha','sirius','lyranoctis','aelari','lunareth','casas','planetario'];
const folderNames = {ovelha:['obsessao','desejo'],aelari:['alfabeto','simbolos','pontuacao','regras','exemplos','niveis','sagrado','tradutor'],lunareth:['origem', 'alun-vaeris', 'solmira', 'veloria', 'aquareth', 'thaloren', 'ignoria', 'lyren', 'astraelis-lua', 'elaria', 'novareth', 'vigilia', 'observatorio','festivais'],casas:['vaelorn','lunaris','aerith','ignovar','astraelis','conselho']};
let modoTraducao='normal', chapterIndex=0, chapters=[], astraelChapterIndex=0, astraelChapters=[], toastTimer=null;
let motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const byId = id => document.getElementById(id);
const escapeHtml = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function toast(message){
  const box=byId('toast');
  if(!box) return;
  box.textContent='✦ '+message;
  box.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer=window.setTimeout(()=>box.classList.remove('show'),3300);
}

function setRoute(view,folder=null,updateHash=true){
  if(!viewNames.includes(view)) view='home';
  document.querySelectorAll('.view').forEach(el=>{el.classList.toggle('active',el.id==='view-'+view)});
  document.querySelectorAll('[data-open]').forEach(el=>el.classList.toggle('active',el.dataset.open===view && el.classList.contains('nav-link')));
  const heading=byId('view-'+view);
  byId('breadcrumbTitle').textContent=heading?.dataset.title||'Salão Celestial';
  document.title=(view==='home'?'Salão Celestial':heading?.dataset.title||'Arquivo')+' — Família Lunaris';
  Object.entries(folderNames).forEach(([group,values])=>{
    if(group===view && folder && values.includes(folder)){
      document.querySelectorAll(`[data-group-panel="${group}"]`).forEach(p=>{p.hidden=p.id!=='folder-'+folder});
      document.querySelectorAll(`[data-folder][data-group="${group}"]`).forEach(btn=>btn.classList.toggle('selected',btn.dataset.folder===folder));
      const prompt=byId(group+'Empty'); if(prompt)prompt.hidden=true;
    }else{
      document.querySelectorAll(`[data-group-panel="${group}"]`).forEach(p=>p.hidden=true);
      document.querySelectorAll(`[data-folder][data-group="${group}"]`).forEach(btn=>btn.classList.remove('selected'));
      const prompt=byId(group+'Empty'); if(prompt)prompt.hidden=false;
    }
  });
  byId('sidebar')?.classList.remove('open');
  if(updateHash){const route='#'+(view==='home'?'salao':view)+(folder?'/'+folder:'');if(location.hash!==route)history.pushState(null,'',route)}
  if((view==='lunareth'||view==='casas')&&folder){requestAnimationFrame(()=>byId('folder-'+folder)?.scrollIntoView({block:'start',behavior:motionReduced?'auto':'smooth'}));}else{window.scrollTo({top:0,behavior:motionReduced?'auto':'smooth'});}
  if(view==='ovelha'&&folder==='obsessao')renderChapters();
  document.dispatchEvent(new CustomEvent('lunaris:route',{detail:{view,folder}}));
}
function abrirPerfil(id){setRoute(id)}
function voltarSalao(){setRoute('home')}
function abrirSubpasta(id){
  const parent=byId('folder-'+id)?.dataset.groupPanel;
  if(!parent){toast('Pasta não encontrada.');return}
  setRoute(parent,id);
}
function restoreRoute(){
  const path=decodeURIComponent(location.hash.slice(1)).split('/');
  const view=path[0]==='salao'?'home':path[0];
  setRoute(viewNames.includes(view)?view:'home',path[1]||null,false);
}

function loadEditors(){
  for(const name of editorNames){
    for(const type of ['historia','nota']){
      const field=byId(`${type}-${name}`);
      if(!field)continue;
      let saved=null;
      try{saved=localStorage.getItem(`${type}-${name}`)}catch(err){console.warn('Armazenamento não disponível',err)}
      if(saved!==null)field.value=saved;
      else if(name==='obsessao'&&type==='historia')field.value=window.LORE_RASIEL||'';
      else if(name==='astrael'&&type==='historia')field.value=window.LORE_ASTRAEL||'';
    }
  }
}
function saveField(type,name){
  const field=byId(`${type}-${name}`);
  if(!field){toast('Não foi possível encontrar este registro.');return}
  try{localStorage.setItem(`${type}-${name}`,field.value)}catch(err){toast('Não foi possível salvar neste navegador.');return}
  if(type==='historia'&&name==='obsessao'){
    prepareChapters();renderChapters();
  }
  if(type==='historia'&&name==='astrael'){
    prepareAstraelChapters();renderAstraelChapters();
  }
  toast(type==='historia'?'História salva entre as estrelas.':'Memórias preservadas com sucesso.');
}
function salvarHistoria(name){saveField('historia',name)}
function salvarNota(name){saveField('nota',name)}

/* Leitor da história de Ra’siel: o arquivo original não é alterado. */
function roman(n){const romans=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV'];return romans[n]||String(n+1)}
function prepareChapters(){
  const text=byId('historia-obsessao')?.value||'';
  const parts=text.split(/(?=^#\s*CAP[IÍ]TULO\s+\S+)/gim).filter(x=>x.trim());
  const actual=parts.filter(x=>/^#\s*CAP[IÍ]TULO\s+/i.test(x.trimStart()));
  if(actual.length){
    chapters=actual.map((part,i)=>{
      const lines=part.split('\n');
      const heading=(lines[0]||'').replace(/^#\s*/,'').trim();
      const titleline=lines.find(line=>/^##\s/.test(line));
      const title=titleline?.replace(/^##\s*/, '').trim()||`Crônica ${i+1}`;
      return {heading,title,content:lines.slice(1).join('\n')};
    });
  }else{
    chapters=[{heading:'O MANUSCRITO',title:'Crônicas de Ra’siel',content:text||'Nenhuma história registrada.'}];
  }
  chapterIndex=Math.max(0,Math.min(chapterIndex,chapters.length-1));
  const list=byId('chapterList'); if(!list)return;
  list.replaceChildren();
  chapters.forEach((chapter,i)=>{
    const button=document.createElement('button');button.type='button';button.className='chapter-btn';
    button.innerHTML='<small>CAPÍTULO '+roman(i)+'</small><span>'+escapeHtml(chapter.title)+'</span>';
    button.onclick=()=>openChapter(i);
    list.appendChild(button);
  });
}
function markdownInline(s){return escapeHtml(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>')}
function renderChapterContent(source){
  const chunks=source.split(/\n\s*\n+/).map(x=>x.trim()).filter(Boolean);
  const markup=chunks.map((chunk,i)=>{
    if(/^##\s+/.test(chunk))return `<h3>${markdownInline(chunk.replace(/^##\s+/,''))}</h3>`;
    if(/^###\s+/.test(chunk))return `<h3>${markdownInline(chunk.replace(/^###\s+/,''))}</h3>`;
    if(/^#\s+/.test(chunk))return `<h3>${markdownInline(chunk.replace(/^#\s+/,''))}</h3>`;
    if(/^—\s*/.test(chunk))return `<p class="dialogue">${markdownInline(chunk).replace(/\n/g,'<br>')}</p>`;
    return `<p>${markdownInline(chunk).replace(/\n/g,'<br>')}</p>`;
  }).join('');
  return markup||'<p>Este manuscrito ainda não possui registros.</p>';
}
function renderChapters(){
  if(!chapters.length)prepareChapters();
  if(!chapters.length)return;
  const chapter=chapters[chapterIndex];
  byId('chapterPosition').textContent=`FÓLIO ${roman(chapterIndex)}`;
  byId('loreReader').innerHTML=`<h2>${escapeHtml(chapter.heading)}</h2>${renderChapterContent(chapter.content)}`;
  byId('readerProgress').textContent=`${String(chapterIndex+1).padStart(2,'0')} / ${String(chapters.length).padStart(2,'0')}`;
  byId('previousChapter').disabled=chapterIndex===0;
  byId('nextChapter').disabled=chapterIndex===chapters.length-1;
  document.querySelectorAll('#chapterList .chapter-btn').forEach((b,i)=>b.classList.toggle('active',i===chapterIndex));
}
function openChapter(index){
  if(index<0||index>=chapters.length)return;
  chapterIndex=index;renderChapters();
  byId('loreReader').scrollIntoView({block:'start',behavior:motionReduced?'auto':'smooth'});
}
function setupReader(){
  prepareChapters();
  byId('previousChapter').onclick=()=>openChapter(chapterIndex-1);
  byId('nextChapter').onclick=()=>openChapter(chapterIndex+1);
  let size=17;
  byId('readingSize').onclick=()=>{
    size=size>=23?15:size+2;
    byId('loreReader').style.setProperty('--reading-size',size+'px');
    toast('Tamanho de leitura ajustado.');
  };
  byId('editRasiel').onclick=()=>{
    const editor=byId('rasielEditor'),reading=byId('loreReader');
    const showing=editor.hidden;
    editor.hidden=!showing;reading.hidden=showing;
    byId('editRasiel').textContent=showing?'✧ Voltar à leitura':'✎ Editar texto';
    if(!showing){renderChapters()}
  };
}

/* Leitor independente de ASTRAEL BELOS. Mantém Ra'siel intacto. */
function prepareAstraelChapters(){
  const original=byId('historia-astrael')?.value||'';
  const header=/^##\s*Capítulo\s+([IVXLCDM]+)\s*[—–-]\s*(.+)\s*$/gmi;
  const matches=[...original.matchAll(header)];
  if(matches.length){
    astraelChapters=matches.map((match,i)=>({
      heading:`Capítulo ${match[1]} — ${match[2].trim()}`,
      title:match[2].trim(),
      content:original.slice(match.index+match[0].length,i+1<matches.length?matches[i+1].index:original.length).trim()
    }));
  }else{
    astraelChapters=[{heading:'Astrael Belos',title:'Manuscrito integral',content:original||'Nenhuma história registrada.'}];
  }
  astraelChapterIndex=Math.max(0,Math.min(astraelChapterIndex,astraelChapters.length-1));
  const list=byId('astraelChapterList');if(!list)return;
  list.replaceChildren();
  astraelChapters.forEach((ch,i)=>{
    const b=document.createElement('button');b.type='button';b.className='chapter-btn';
    b.innerHTML=`<small>CAPÍTULO ${roman(i)}</small><span>${escapeHtml(ch.title)}</span>`;
    b.onclick=()=>openAstraelChapter(i);list.appendChild(b);
  });
}
function renderAstraelChapters(){
  if(!astraelChapters.length)prepareAstraelChapters();
  const ch=astraelChapters[astraelChapterIndex];if(!ch)return;
  byId('astraelChapterPosition').textContent=`FÓLIO ${roman(astraelChapterIndex)} · ${astraelChapters.length}`;
  byId('astraelLoreReader').innerHTML=`<h2>${escapeHtml(ch.heading)}</h2>${renderChapterContent(ch.content)}`;
  byId('astraelReaderProgress').textContent=`${String(astraelChapterIndex+1).padStart(2,'0')} / ${String(astraelChapters.length).padStart(2,'0')}`;
  byId('previousAstraelChapter').disabled=astraelChapterIndex===0;
  byId('nextAstraelChapter').disabled=astraelChapterIndex===astraelChapters.length-1;
  byId('astraelProgressBar').style.width=`${((astraelChapterIndex+1)/astraelChapters.length*100).toFixed(2)}%`;
  document.querySelectorAll('#astraelChapterList .chapter-btn').forEach((b,i)=>b.classList.toggle('active',i===astraelChapterIndex));
}
function openAstraelChapter(i){
  if(i<0||i>=astraelChapters.length)return;
  astraelChapterIndex=i;renderAstraelChapters();
  byId('astraelLoreReader').scrollIntoView({block:'start',behavior:motionReduced?'auto':'smooth'});
}
function setupAstraelReader(){
  prepareAstraelChapters();renderAstraelChapters();
  byId('previousAstraelChapter').onclick=()=>openAstraelChapter(astraelChapterIndex-1);
  byId('nextAstraelChapter').onclick=()=>openAstraelChapter(astraelChapterIndex+1);
  let size=17;
  byId('astraelReadingSize').onclick=()=>{
    size=size>=23?15:size+2;
    byId('astraelLoreReader').style.setProperty('--reading-size',size+'px');
    toast('Tamanho de leitura ajustado.');
  };
  byId('editAstrael').onclick=()=>{
    const editor=byId('astraelEditor'),reading=byId('astraelLoreReader');
    const editing=editor.hidden;editor.hidden=!editing;reading.hidden=editing;
    byId('editAstrael').textContent=editing?'✧ Voltar à leitura':'✎ Editar manuscrito';
    if(!editing)renderAstraelChapters();
  };
}

/* Aelari: transliteração, não interpretação semântica. */
function traduzirTexto(){
  const input=byId('textoEntrada'),output=byId('textoSaida');
  if(!input||!output)return;
  if(modoTraducao==='normal'){
    const normalized=input.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
    output.value=[...normalized].map(c=>c===' '?' ○ ':(glifos[c]??c)).join('');
    output.classList.add('glyph-output');
  }else{
    output.value=[...input.value].map(c=>c==='○'?' ':(letras[c]??c)).join('').replace(/ {2,}/g,' ');
    output.classList.remove('glyph-output');
  }
}
function inverterTradutor(){
  const input=byId('textoEntrada'),output=byId('textoSaida');
  if(!input||!output)return;
  const opposite=output.value;
  modoTraducao=modoTraducao==='normal'?'reverso':'normal';
  byId('tituloEntrada').textContent=modoTraducao==='normal'?'Português':'Aelari';
  byId('tituloSaida').textContent=modoTraducao==='normal'?'Aelari':'Português';
  input.placeholder=modoTraducao==='normal'?'Escreva seu texto aqui…':'Cole ou digite os glifos aqui…';
  input.value=opposite;
  traduzirTexto();
}
async function copiar(text){
  if(!text){toast('Ainda não há texto para copiar.');return}
  try{
    if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text)}
    else{
      const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.left='-9999px';document.body.appendChild(area);area.select();if(!document.execCommand('copy'))throw new Error('Falha');area.remove();
    }
    toast('Copiado para o seu livro de estrelas.');
  }catch(err){toast('Selecione o texto para copiá-lo manualmente.');}
}
function setupDictionary(){
  byId('glyphSearch').addEventListener('input',event=>{
    const q=event.target.value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
    document.querySelectorAll('.glyph-table tbody tr').forEach(row=>{
      const hay=row.textContent.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      row.hidden=!hay.includes(q);
    });
  });
  document.querySelectorAll('.glyph-table tbody tr').forEach(row=>row.addEventListener('click',()=>copiar(row.cells[1]?.textContent||'')));
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copiar(button.dataset.copy)));
  byId('clearTranslator').onclick=()=>{byId('textoEntrada').value='';traduzirTexto();byId('textoEntrada').focus()};
  byId('copyTranslation').onclick=()=>copiar(byId('textoSaida').value);
}

function exportarRegistros(){
  const records={};
  for(const name of editorNames){for(const type of ['historia','nota']){
    const id=`${type}-${name}`,field=byId(id);if(field)records[id]=field.value;
  }}
  const data={application:'Família Lunaris',version:1,exportedAt:new Date().toISOString(),records};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='lunaris-registros-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),2000);
  toast('Cópia dos registros criada.');
}
async function importarRegistros(file){
  if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    if(data.application!=='Família Lunaris'||typeof data.records!=='object'||data.records===null)throw new Error('Formato desconhecido');
    if(!confirm('Importar registros substituirá histórias e memórias locais que existam neste navegador. Continuar?'))return;
    let count=0;
    for(const name of editorNames){for(const type of ['historia','nota']){
      const id=`${type}-${name}`;if(typeof data.records[id]!=='string')continue;
      const field=byId(id);if(field){field.value=data.records[id];localStorage.setItem(id,field.value);count++}
    }}
    prepareChapters();renderChapters();
    toast(`${count} registros restaurados com sucesso.`);
  }catch(err){toast('O arquivo não é um backup Lunaris válido.');}
  finally{byId('importFile').value=''}
}



/* COSMOS VIVO — versão 3: o céu inteiro é desenhado a cada quadro.
   Três camadas de profundidade, deriva contínua e lampejos independentes,
   com pausas suaves para não transformar o céu em uma luz estroboscópica. */
function setupStarfield(){
  const canvas=byId('starfield');
  if(!canvas)return()=>{};
  const ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx)return()=>{};
  const TAU=Math.PI*2;
  const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const smooth=(t)=>t*t*(3-2*t);
  let width=0,height=0,dpr=1,stars=[],raf=0,last=0,active=true;
  let clockOrigin=performance.now();
  const pointer={x:0,y:0,aimX:0,aimY:0};
  const seedRandom=(seed)=>()=>{
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    return seed/4294967296;
  };
  const rand=seedRandom(212408);
  const range=(a,b)=>lerp(a,b,rand());

  // Pequenos halos pré-desenhados para que o brilho fique visível sem
  // criar centenas de gradientes novos por segundo.
  const halos={};
  for(const tint of ['silver','blue','gold','pink']){
    const tmp=document.createElement('canvas');tmp.width=tmp.height=96;
    const g=tmp.getContext('2d');
    const rgb={silver:'230,234,255',blue:'159,197,255',gold:'255,224,167',pink:'230,186,255'}[tint];
    const grad=g.createRadialGradient(48,48,1,48,48,47);
    grad.addColorStop(0,`rgba(${rgb},.92)`);
    grad.addColorStop(.12,`rgba(${rgb},.34)`);
    grad.addColorStop(.44,`rgba(${rgb},.09)`);
    grad.addColorStop(1,`rgba(${rgb},0)`);
    g.fillStyle=grad;g.fillRect(0,0,96,96);
    halos[tint]=tmp;
  }

  const colors={
    silver:'236,237,255',blue:'166,208,255',gold:'255,224,170',pink:'230,197,255'
  };
  function resize(){
    width=Math.max(1,window.innerWidth);height=Math.max(1,window.innerHeight);
    dpr=Math.min(window.devicePixelRatio||1,1.55);
    canvas.width=Math.round(width*dpr);
    canvas.height=Math.round(height*dpr);
    canvas.style.width=width+'px';canvas.style.height=height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    // Mantém a densidade da versão anterior, mas com mais pontos luminosos.
    const total=Math.min(790,Math.max(320,Math.round(width*height/2150)));
    stars=Array.from({length:total},(_,i)=>{
      const layer=i<total*.56?0:i<total*.86?1:2;
      const tintRoll=rand();
      const tint=tintRoll<.66?'silver':tintRoll<.82?'blue':tintRoll<.94?'gold':'pink';
      const bright=rand()<(layer===0?.13:layer===1?.28:.50);
      const beacon=rand()<(layer===0?.12:layer===1?.25:.42);
      const radius=layer===0?range(.35,.9):layer===1?range(.65,1.5):range(1.1,2.15);
      const speed=(layer===0?.24:layer===1?.52:.85);
      return {
        x:range(0,width),y:range(0,height),layer,tint,bright,beacon,
        radius,base:layer===0?range(.21,.42):layer===1?range(.29,.58):range(.38,.72),
        // Movimento contínuo, mas leve: pode ser percebido em poucos segundos.
        vx:range(-1,1)*speed,vy:range(-.72,.72)*speed,
        swingX:range(2.5,5)+layer*3,swingY:range(2,4)+layer*2,
        swingSpeed:range(.18,.39),swingPhase:range(0,TAU),
        twinkleSpeed:range(1.05,2.6),twinklePhase:range(0,TAU),
        flashEvery:range(5.2,12),flashOffset:range(0,11),flashLength:range(.65,1.1)
      };
    });
    paint(0,true);
  }

  function paint(time,still=false){
    ctx.clearRect(0,0,width,height);
    if(!still){
      pointer.x=lerp(pointer.x,pointer.aimX,.055);
      pointer.y=lerp(pointer.y,pointer.aimY,.055);
    }
    for(const s of stars){
      const t=still?0:time;
      const px=s.x+s.vx*t+Math.sin(t*s.swingSpeed+s.swingPhase)*s.swingX+pointer.x*(s.layer+.5);
      const py=s.y+s.vy*t+Math.cos(t*s.swingSpeed*.85+s.swingPhase)*s.swingY+pointer.y*(s.layer+.5);
      const x=((px%width)+width)%width;
      const y=((py%height)+height)%height;
      // O ciclo reduz e aumenta o brilho perceptivelmente, de forma assíncrona.
      const pulse=.12+.88*Math.pow(.5+.5*Math.sin(t*s.twinkleSpeed+s.twinklePhase),1.45);
      const flashPosition=((t+s.flashOffset)%s.flashEvery)/s.flashEvery;
      let flash=0;
      if(s.beacon&&!still){
        const phase=(t+s.flashOffset)%s.flashEvery;
        if(phase<s.flashLength){
          const envelope=Math.sin(Math.PI*phase/s.flashLength);
          flash=smooth(Math.pow(envelope,1.6));
        }
      }
      const opacity=clamp(s.base*(.27+.93*pulse)+flash*.47,.035,1);
      const rgb=colors[s.tint];
      // Brilho em pontos espalhados, com profundidade visual.
      if(s.bright||flash>.035){
        const size=s.radius*(s.layer===0?10:s.layer===1?14:19)+flash*17;
        ctx.globalAlpha=Math.min(.68,opacity*(s.bright?.65:.38)+flash*.30);
        ctx.drawImage(halos[s.tint],x-size/2,y-size/2,size,size);
        ctx.globalAlpha=1;
      }
      ctx.beginPath();ctx.arc(x,y,s.radius*(1+flash*.28),0,TAU);
      ctx.fillStyle=`rgba(${rgb},${opacity.toFixed(3)})`;
      ctx.fill();
      // No máximo algumas estrelas apresentam raios por vez.
      // Cada brilho é gradual e dura perto de um segundo.
      if(flash>.15){
        const length=(3.3+s.radius*1.7+flash*5.5)*(s.layer===0?.8:1);
        ctx.save();ctx.globalAlpha=flash*.75;
        ctx.strokeStyle=`rgba(${rgb},.85)`;ctx.lineWidth=.7;
        ctx.beginPath();ctx.moveTo(x-length,y);ctx.lineTo(x+length,y);
        ctx.moveTo(x,y-length);ctx.lineTo(x,y+length);ctx.stroke();
        ctx.restore();
      }
    }
  }
  function frame(now){
    if(motionReduced||document.hidden){raf=0;return;}
    if(now-last>=33){
      paint((now-clockOrigin)/1000);
      last=now;
    }
    raf=requestAnimationFrame(frame);
  }
  function refresh(){
    cancelAnimationFrame(raf);raf=0;last=0;
    pointer.x=pointer.y=pointer.aimX=pointer.aimY=0;
    if(motionReduced)paint(0,true);
    else if(!document.hidden){clockOrigin=performance.now()-2100;raf=requestAnimationFrame(frame);}
  }
  window.addEventListener('resize',()=>{resize();refresh();},{passive:true});
  document.addEventListener('visibilitychange',refresh);
  document.addEventListener('pointermove',event=>{
    if(motionReduced||event.pointerType==='touch')return;
    pointer.aimX=(event.clientX/Math.max(width,1)-.5)*7;
    pointer.aimY=(event.clientY/Math.max(height,1)-.5)*7;
  },{passive:true});
  document.addEventListener('pointerleave',()=>{pointer.aimX=pointer.aimY=0;},{passive:true});
  resize();refresh();return refresh;
}

window.addEventListener('DOMContentLoaded',()=>{
  loadEditors();setupReader();setupAstraelReader();setupDictionary();
  restoreRoute();window.addEventListener('popstate',restoreRoute);window.addEventListener('hashchange',restoreRoute);
  document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>setRoute(button.dataset.open)));
  document.querySelectorAll('[data-folder]').forEach(button=>button.addEventListener('click',()=>setRoute(button.dataset.group,button.dataset.folder)));
  byId('exploreButton').onclick=()=>byId('constelacoes').scrollIntoView({behavior:motionReduced?'auto':'smooth',block:'start'});
  byId('originCenterLink')?.addEventListener('click',()=>byId('constelacoes')?.scrollIntoView({behavior:motionReduced?'auto':'smooth',block:'start'}));
  byId('exportButton').onclick=exportarRegistros;
  byId('importButton').onclick=()=>byId('importFile').click();
  byId('importFile').onchange=event=>importarRegistros(event.target.files?.[0]);
  byId('mobileNav').onclick=()=>byId('sidebar').classList.toggle('open');
  document.addEventListener('keydown',event=>{if(event.key==='Escape')byId('sidebar').classList.remove('open')});
  const motionButton=byId('motionToggle');
  try{motionReduced=motionReduced||localStorage.getItem('lunaris-reduce-motion')==='true'}catch(_){}
  document.body.classList.toggle('reduce-motion',motionReduced);
  const refreshStarfield=setupStarfield();
  function motionLabel(){motionButton.querySelector('.motion-status').textContent=motionReduced?'LIG.':'DESL.';motionButton.setAttribute('aria-pressed',String(motionReduced));}
  motionLabel();
  motionButton.onclick=()=>{motionReduced=!motionReduced;document.body.classList.toggle('reduce-motion',motionReduced);try{localStorage.setItem('lunaris-reduce-motion',String(motionReduced))}catch(_){}motionLabel();refreshStarfield()};
});

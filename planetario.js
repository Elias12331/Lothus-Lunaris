/* FAMÍLIA LUNARIS · ATLAS DOS OITO MUNDOS
   Cosmologia ficcional; corpos esféricos e órbitas ilustrativas.
   Tudo funciona offline — sem bibliotecas externas. */
(() => {
  'use strict';
  const planets = [
    {
      name:'Vesperion', epithet:'O mundo das primeiras cinzas', type:'Rochoso', kind:'rock', color:'#dca180', dark:'#6b3441', element:'Cinzas e ferro', phenomenon:'A Chuva de Ferro', orbit:'I · Órbita interior', symbol:'◇', rotation:1.2, size:11, speed:1.16, angle:2.65,
      quote:'As pedras também se lembram do fogo.', teaser:'Desertos de cobre, ruínas enterradas e sinos que ainda ecoam sob a areia.',
      lore:[
        'Vesperion foi o primeiro fragmento a se desprender da luz de Aurelis. Durante eras, seu solo permaneceu em brasa, até que a superfície se fechou em extensos desertos de cobre e montanhas de ferro escuro. As marcas deixadas pelas antigas correntes de lava parecem letras de uma escrita que ninguém consegue terminar de ler.',
        'Os viajantes que contam ter visto Vesperion descrevem um fenômeno chamado Chuva de Ferro. Uma vez a cada grande ciclo, pequenas partículas metálicas atravessam o céu como estrelas cadentes e fazem os desertos cantar. Os habitantes das lendas dizem que os sons são sinos forjados antes de existir qualquer templo.',
        'Na tradição dos observadores de Elarin, Vesperion representa a persistência. Seu segredo não é a riqueza escondida debaixo das montanhas, mas a capacidade de permanecer inteiro mesmo depois de ter sido atravessado pelo fogo.'
      ]
    },
    {
      name:'Aqualis', epithet:'O oceano que conserva lembranças', type:'Oceânico', kind:'ocean', color:'#67d8da', dark:'#0a4267', element:'Água e memória', phenomenon:'As Marés de Vidro', orbit:'II · Órbita azul', symbol:'≈', rotation:.9, size:14, speed:.92, angle:4.3,
      quote:'O mar nunca devolve a mesma lembrança duas vezes.', teaser:'Oceanos bioluminescentes e ilhas que surgem apenas durante as marés.',
      lore:[
        'Aqualis não conhece continentes permanentes. Suas águas cobrem quase toda a superfície, e as pequenas ilhas de coral se movem lentamente, acompanhando correntes tão antigas quanto o próprio planeta. À noite, organismos luminosos formam rios de estrelas sob a superfície escura.',
        'A cada ciclo das Marés de Vidro, o oceano se torna perfeitamente liso. Os antigos navegadores acreditavam que, nesse instante, ele refletia não o céu presente, mas céus que já deixaram de existir. Era possível reconhecer uma constelação desaparecida ou a silhueta de uma cidade que jamais havia sido construída.',
        'Em Elarin, Aqualis é lembrado pelos guardiões das histórias como o mundo da memória. A lenda ensina que lembrar não significa permanecer parado: até mesmo uma lembrança precisa aprender a navegar.'
      ]
    },
    {
      name:'Vaeloria', epithet:'O jardim que cresce em direção às estrelas', type:'Florestal', kind:'forest', color:'#9bcaa4', dark:'#204f46', element:'Raízes e vida', phenomenon:'O Florescer Noturno', orbit:'III · Órbita verde', symbol:'❧', rotation:1.05, size:15, speed:.78, angle:1.05,
      quote:'Nenhuma raiz esquece a direção da luz.', teaser:'Florestas monumentais, vales de musgo e árvores cujas copas imitam mapas celestes.',
      lore:[
        'Em Vaeloria, a floresta cresceu até encontrar as nuvens. Árvores de troncos largos como salões sustentam jardins suspensos, enquanto rios cristalinos correm entre raízes que formam pontes naturais. Não há estações de desfolhamento: a vegetação muda de cor conforme as estrelas que atravessam o céu.',
        'O Florescer Noturno é seu mistério mais famoso. Quando a noite atinge o ponto mais profundo, flores translúcidas se abrem no alto das árvores, reproduzindo as figuras do firmamento. Quem contempla a floresta do espaço enxerga, por alguns instantes, duas constelações idênticas: uma acima e outra abaixo.',
        'Os Vaelorn de Elarin dizem que Vaeloria é a lembrança viva de uma promessa feita pela terra. A história do planeta se tornou uma lição sobre paciência: aquilo que cresce com cuidado alcança lugares que a pressa nunca conhecerá.'
      ]
    },
    {
      name:'Caelith', epithet:'O coração de cristal do silêncio', type:'Cristalino', kind:'crystal', color:'#b3a3ed', dark:'#342a78', element:'Cristal e ressonância', phenomenon:'O Canto das Agulhas', orbit:'IV · Órbita violeta', symbol:'✧', rotation:.73, size:13, speed:.62, angle:3.8,
      quote:'Há verdades que só a quietude consegue ouvir.', teaser:'Planícies ametistas, montanhas transparentes e tempestades que soam como música.',
      lore:[
        'Caelith se formou quando um fragmento de luz esfriou antes de terminar sua transformação. Em vez de rochas comuns, sua superfície desenvolveu grandes veios de cristais azulados e ametistas. A paisagem parece um oceano congelado no instante de uma onda, com penhascos que devolvem a cor do céu.',
        'Quando as correntes elétricas atravessam suas agulhas minerais, o planeta inteiro emite um som delicado conhecido como Canto das Agulhas. As notas viajam pelos vales, mudando conforme a luz da estrela central. Dizem que nenhum viajante consegue ouvir a mesma melodia duas vezes.',
        'Os astrônomos da Casa Astraelis enxergam Caelith como o mundo da escuta. Sua lenda ensina que o conhecimento não nasce apenas de procurar respostas: algumas chegam quando finalmente aprendemos a ficar em silêncio.'
      ]
    },
    {
      name:'Ignathor', epithet:'A forja que nunca se apaga', type:'Vulcânico', kind:'lava', color:'#ff9b65', dark:'#612633', element:'Magma e coragem', phenomenon:'Os Rios de Fogo Branco', orbit:'V · Órbita ardente', symbol:'✺', rotation:.95, size:14, speed:.49, angle:5.1,
      quote:'O verdadeiro calor é aquele que protege.', teaser:'Mares de lava, cordilheiras negras e correntes de fogo branco.',
      lore:[
        'Ignathor parece feroz visto de longe. Enormes vulcões lançam colunas rubras à atmosfera, enquanto mares de magma desenham linhas luminosas sobre a crosta escura. Mas entre as regiões mais hostis existem vales de pedra morna que permanecem protegidos das erupções.',
        'A tradição afirma que seus Rios de Fogo Branco surgiram quando o planeta tentou defender uma pequena estrela perdida de uma tempestade do vazio. O esforço deixou marcas claras na superfície: veios incandescentes que jamais esfriaram e que, nas noites mais longas, podem ser vistos de muito longe.',
        'Para os Ignovar de Elarin, o fogo de Ignathor não é símbolo de destruição. É a lembrança de que a coragem se prova quando alguém usa sua força para guardar aquilo que é frágil.'
      ]
    },
    {
      name:'Auróvion', epithet:'O soberano das tempestades douradas', type:'Gigante gasoso', kind:'gas', color:'#e6c591', dark:'#7b5174', element:'Ventos e auroras', phenomenon:'O Grande Anel', orbit:'VI · Órbita dourada', symbol:'◎', rotation:.55, size:23, speed:.35, angle:1.9, rings:true,
      quote:'Até o maior dos gigantes precisa aprender a girar.', teaser:'Faixas de nuvens douradas, tempestades perenes e um anel de poeira estelar.',
      lore:[
        'Auróvion é tão vasto que seus ventos formam oceanos sem água. Correntes de gás dourado e violeta atravessam a atmosfera, desenhando faixas que se deslocam como tecidos imensos. Em sua superfície visível, uma tempestade antiga gira há incontáveis gerações sem jamais alcançar o repouso.',
        'Seu Grande Anel não é feito apenas de gelo e rocha. As lendas dizem que ali se acumulam poeiras de cometas que se recusaram a desaparecer. Quando Auróvion passa diante de Aurelis, cada fragmento devolve um pequeno brilho, e o anel se transforma numa coroa de milhares de pontos luminosos.',
        'Os viajantes contam que Auróvion representa humildade. Mesmo gigantesco, ele não se aproxima da estrela para tomar seu lugar. Permanece em sua trajetória, lembrando que grandeza não é o mesmo que domínio.'
      ]
    },
    {
      name:'Nivareth', epithet:'O guardião das auroras adormecidas', type:'Glacial', kind:'ice', color:'#b7e8f6', dark:'#33577a', element:'Gelo e luz', phenomenon:'A Aurora do Norte Eterno', orbit:'VII · Órbita do gelo', symbol:'✳', rotation:.66, size:16, speed:.25, angle:4.9,
      quote:'Até o inverno mais longo guarda uma cor.', teaser:'Oceanos congelados, montanhas de safira e auroras que percorrem os polos.',
      lore:[
        'Longe do calor de Aurelis encontra-se Nivareth, um planeta envolto por mares congelados e vales de neve azul. À primeira vista, tudo parece imóvel. No entanto, correntes de água profunda continuam a se deslocar sob o gelo, mantendo vivos pequenos jardins de cristais e luz.',
        'O fenômeno chamado Aurora do Norte Eterno atravessa as noites desse mundo como fitas turquesa e violeta. Segundo a tradição, cada faixa de luz corresponde a uma promessa que alguém foi forte o bastante para conservar, mesmo quando todos os outros já a haviam esquecido.',
        'Os sábios de Elarin relacionam Nivareth à resistência silenciosa. Sua história lembra que permanecer não é deixar de mudar: às vezes, a maior transformação acontece onde ninguém consegue enxergar.'
      ]
    },
    {
      name:'Nocthara', epithet:'O último jardim da penumbra', type:'Crepuscular', kind:'night', color:'#c6a5ec', dark:'#241840', element:'Sombra e mistério', phenomenon:'O Véu das Estrelas', orbit:'VIII · Órbita distante', symbol:'☾', rotation:.48, size:17, speed:.17, angle:.24, rings:true,
      quote:'A noite não existe para esconder. Existe para revelar outras luzes.', teaser:'Um mundo de crepúsculo, névoa lilás e anéis tão escuros quanto o vazio.',
      lore:[
        'Nocthara gira no limite das antigas cartas celestes. A luz de Aurelis chega tão fraca que o planeta parece viver em um entardecer permanente. Sob uma atmosfera violeta, planícies de rocha escura dividem espaço com lagos espelhados que refletem estrelas invisíveis aos outros mundos.',
        'Em certas noites, o Véu das Estrelas se abre: partículas luminosas se espalham sobre a atmosfera, formando caminhos que mudam de lugar a cada observação. As lendas dizem que os viajantes perdidos não encontram em Nocthara respostas prontas; encontram perguntas que ainda não sabiam fazer.',
        'Nocthara encerra os Oito Mundos como a última página de um livro que não pretende terminar. Os guardiões de Elarin afirmam que além dele o céu continua, e que talvez exista outra estrela esperando sua própria história.'
      ]
    }
  ];
  const $ = id => document.getElementById(id);
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const reduced = () => document.body.classList.contains('reduce-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const activeView = () => $('view-planetario')?.classList.contains('active') && !document.hidden;
  const TAU=Math.PI*2;
  let selected=0, playing=true, speed=1, showPaths=true, zoom=1, panX=0, panY=0, time=1.2, last=0, raf=0;
  let stage,canvas,ctx,preview,previewCtx,w=1,h=1,dpr=1, projected=[], stars=[], pointer=null, dragging=null, moved=false;
  const sphereImages = [];
  const seed = (n) => {let x=n>>>0;return ()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;}};
  const rand=seed(19872);
  const rgb = str => {const h=str.replace('#','');const n=parseInt(h,16);return [n>>16,(n>>8)&255,n&255];};
  const rgba = (hex,a=1)=>{const [r,g,b]=rgb(hex);return `rgba(${r},${g},${b},${a})`;};
  const mix=(a,b,t)=>a.map((v,i)=>v*(1-t)+b[i]*t);
  const fract = v => v-Math.floor(v);
  const hash=(x,y,s=0)=>fract(Math.sin(x*127.1+y*311.7+s*71.3)*43758.5453);
  function smooth(x){return x*x*(3-2*x)}
  function noise(x,y,s=0){const ix=Math.floor(x),iy=Math.floor(y),fx=smooth(fract(x)),fy=smooth(fract(y));const a=hash(ix,iy,s)*(1-fx)+hash(ix+1,iy,s)*fx;const b=hash(ix,iy+1,s)*(1-fx)+hash(ix+1,iy+1,s)*fx;return a*(1-fy)+b*fy}
  function fbm(x,y,s=0){return .55*noise(x,y,s)+.27*noise(x*2.18,y*2.18,s+11)+.12*noise(x*4.17,y*4.17,s+23)+.06*noise(x*8,y*8,s+37)}
  function sampleColor(planet,x,y,depth){
    const p=planet.kind;const n=fbm(x*4+3,y*4+5,depth),n2=fbm(x*11+19,y*11+7,depth+1),wave=Math.sin(y*19+x*5+n*6);
    const dark=rgb(planet.dark),light=rgb(planet.color),pale=[234,230,247];
    if(p==='rock')return mix(mix(dark,light,clamp(n*.9+.15,0,1)),[233,183,120],clamp((n2-.58)*1.2,0,.33));
    if(p==='ocean') {const land=fbm(x*4.4+21,y*4.4+19,18);return land>.57?mix([26,105,110],[98,189,158],clamp((land-.54)*4,0,1)):mix([5,45,88],[34,166,192],clamp(n*.95+.17,0,1));}
    if(p==='forest')return n>.56?mix([30,87,66],[158,191,125],clamp(n2,0,1)):mix([9,64,71],[40,139,100],clamp(n*1.7,0,1));
    if(p==='crystal') {const lines=Math.abs(Math.sin((x+y*.53)*22+4*n));return mix(mix(dark,light,clamp(n*1.2,0,1)),[218,203,253],clamp(Math.pow(lines,18)*.62+n2*.11,0,.7));}
    if(p==='lava'){const crack=Math.abs(Math.sin(x*15+y*12+fbm(x*5,y*5,26)*13));const edge=crack<.115?1:0;return mix(mix([24,21,40],[102,45,45],n*.62),[255,148,65],clamp((.15-crack)*6+edge*.22,0,.92));}
    if(p==='gas'){const band=Math.sin(y*34+x*1.8+n*3.1)+Math.sin(y*78+x*2.4+n2*3)*.28;return mix(mix([107,74,97],[233,191,142],clamp(.53+.42*band,0,1)),[255,225,175],.11);}
    if(p==='ice'){const veins=Math.abs(Math.sin(x*20-y*8+n*9));return mix(mix([39,83,133],[180,230,243],clamp(.22+n*.85,0,1)),[235,249,255],clamp((veins-.78)*2.5,0,.36));}
    if(p==='night'){const r=fbm(x*4.3+21,y*5+11,37);return mix(mix([25,18,63],[112,72,148],clamp(r+.19,0,.88)),[178,131,201],clamp((n2-.65)*.85,0,.2));}
    return mix(dark,light,n);
  }
  function buildSphere(planet,index,res=216){
    const cnv=document.createElement('canvas');cnv.width=cnv.height=res;const c=cnv.getContext('2d');const img=c.createImageData(res,res);const data=img.data;
    const sun=[-.56,-.48,.72],r=res*.48,center=res*.5;
    for(let yy=0;yy<res;yy++){for(let xx=0;xx<res;xx++){
      const sx=(xx-center)/r,sy=(yy-center)/r,rad=sx*sx+sy*sy,idx=(yy*res+xx)*4;
      if(rad>=1){data[idx+3]=0;continue}
      const sz=Math.sqrt(1-rad),lat=sy,lon=Math.atan2(sx,sz)/Math.PI;
      const swirl=fbm(lon*2.5+10,lat*2.5+3,index+19);
      const col=sampleColor(planet,lon*1.85+swirl*.1,lat*1.5,index+1);
      const diffuse=clamp(sx*sun[0]+sy*sun[1]+sz*sun[2],0,1),light=.16+.82*diffuse+.12*Math.pow(sz,9);
      const rim=Math.pow(1-sz,3)*.35;
      for(let k=0;k<3;k++)data[idx+k]=clamp(col[k]*light+rgb(planet.color)[k]*rim,0,255);
      data[idx+3]=Math.round(clamp((1-rad)*r*2.1,0,1)*255);
    }}
    c.putImageData(img,0,0);
    return cnv;
  }
  function makeStars(){stars=[];for(let i=0;i<500;i++){stars.push({x:rand(),y:rand(),r:.45+rand()*1.4,phase:rand()*TAU,rate:.22+rand()*1.4,alpha:.16+rand()*.58,depth:i%3,flash:rand()<.16,cycle:5+rand()*13,shift:rand()*TAU});}}
  function resize(){if(!canvas||!stage)return;const b=stage.getBoundingClientRect();if(b.width<2||b.height<2)return;w=b.width;h=b.height;dpr=Math.min(window.devicePixelRatio||1,1.7);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function circle(x,y,r,fill){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=fill;ctx.fill()}
  function starCross(x,y,size,color,alpha){ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x-size,y);ctx.lineTo(x+size,y);ctx.moveTo(x,y-size);ctx.lineTo(x,y+size);ctx.stroke();ctx.restore()}
  function systemCenter(){return {x:w*.49+panX,y:h*.53+panY}}
  function parameters(i){const base=Math.min(w*.42,h*.50)*zoom;const radius=base*(.30+i*.105);const phi=planets[i].angle+time*planets[i].speed*.19;return {rx:radius,ry:radius*.68,phi};}
  function backdrop(){ctx.clearRect(0,0,w,h);const center=systemCenter();let mist=ctx.createRadialGradient(center.x,center.y,8,center.x,center.y,Math.max(w,h)*.7);mist.addColorStop(0,'rgba(139,99,192,.19)');mist.addColorStop(.45,'rgba(85,89,158,.085)');mist.addColorStop(1,'rgba(12,14,35,0)');ctx.fillStyle=mist;ctx.fillRect(0,0,w,h);
    for(let i=0;i<stars.length;i++){const s=stars[i],travel=reduced()?0:time*(.00006+s.depth*.000035);const x=((s.x+travel)%1)*w+panX*.035*(s.depth+1),y=((s.y+travel*.23)%1)*h+panY*.025*(s.depth+1);
      const shimmer=.56+.44*(.5+.5*Math.sin(time*s.rate+s.phase));const burst=s.flash?Math.pow(Math.max(0,Math.sin(time*TAU/s.cycle+s.shift)),24)*.65:0;const a=clamp(s.alpha*shimmer+burst,0,.96);
      if(burst>.27){let g=ctx.createRadialGradient(x,y,0,x,y,11);g.addColorStop(0,`rgba(239,232,255,${burst*.4})`);g.addColorStop(1,'rgba(239,232,255,0)');circle(x,y,11,g);starCross(x,y,2.7,'#e8e1ff',burst)}
      circle(x,y,s.r,`rgba(224,227,255,${a})`);
    }
    // A poeira cósmica se espalha atrás do sistema.
    ctx.save();ctx.globalCompositeOperation='screen';const neb=ctx.createRadialGradient(w*.76,h*.25,0,w*.65,h*.43,w*.58);neb.addColorStop(0,'rgba(87,103,188,.085)');neb.addColorStop(.47,'rgba(134,87,158,.045)');neb.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=neb;ctx.fillRect(0,0,w,h);ctx.restore();
  }
  function starCore(){const c=systemCenter(),r=58*zoom;const g=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,r*3.3);g.addColorStop(0,'rgba(255,248,206,.96)');g.addColorStop(.13,'rgba(252,211,148,.58)');g.addColorStop(.3,'rgba(205,146,137,.24)');g.addColorStop(.66,'rgba(143,103,179,.07)');g.addColorStop(1,'rgba(143,103,179,0)');circle(c.x,c.y,r*3.3,g);
    const d=ctx.createRadialGradient(c.x-r*.27,c.y-r*.27,1,c.x,c.y,r*.5);d.addColorStop(0,'#fffdf0');d.addColorStop(.35,'#ffebbb');d.addColorStop(.75,'#eab68e');d.addColorStop(1,'rgba(206,135,123,.1)');circle(c.x,c.y,r*.49,d);
    ctx.save();ctx.translate(c.x,c.y);ctx.rotate(time*.013);ctx.fillStyle='#fff4d0';ctx.shadowColor='#ffe6ad';ctx.shadowBlur=28;ctx.beginPath();for(let i=0;i<8;i++){const a=i*TAU/8-Math.PI/2;const rr=i%2?4*zoom:19*zoom;const x=Math.cos(a)*rr,y=Math.sin(a)*rr;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.fill();ctx.restore();
    ctx.textAlign='center';ctx.font='9px DM Sans, sans-serif';ctx.fillStyle='rgba(241,218,189,.7)';ctx.fillText('A U R E L I S',c.x,c.y+r*.83);
  }
  function planetDraw(body){const {x,y,r,i,p,depth}=body,chosen=i===selected;const shade=rgba(p.color,chosen?.7:.32);
    const gl=ctx.createRadialGradient(x,y,0,x,y,r*2.9);gl.addColorStop(0,rgba(p.color,chosen?.35:.14));gl.addColorStop(1,rgba(p.color,0));circle(x,y,r*2.9,gl);
    if(chosen){ctx.save();ctx.strokeStyle=rgba(p.color,.52);ctx.lineWidth=1.25;ctx.setLineDash([3,5]);ctx.beginPath();ctx.arc(x,y,r+9,0,TAU);ctx.stroke();ctx.setLineDash([]);ctx.restore();}
    if(p.rings){ringBack(ctx,x,y,r,p)}
    ctx.drawImage(sphereImages[i],x-r,y-r,r*2,r*2);
    if(p.rings){ringFront(ctx,x,y,r,p)}
    if(chosen){starCross(x+r+11,y-r-6,3.5,p.color,.75);ctx.textAlign='center';ctx.font='10px DM Sans, sans-serif';ctx.fillStyle='rgba(239,233,253,.85)';ctx.fillText(p.name,x,y+r+23)}
  }
  function ringBack(c,x,y,r,p){c.save();c.translate(x,y);c.rotate(-.26);c.beginPath();c.ellipse(0,0,r*1.85,r*.6,0,Math.PI,TAU);c.strokeStyle=rgba(p.color,.3);c.lineWidth=Math.max(1,r*.15);c.stroke();c.restore()}
  function ringFront(c,x,y,r,p){c.save();c.translate(x,y);c.rotate(-.26);c.beginPath();c.ellipse(0,0,r*1.85,r*.6,0,0,Math.PI);c.strokeStyle=rgba(p.color,.64);c.lineWidth=Math.max(1,r*.18);c.stroke();c.beginPath();c.ellipse(0,0,r*1.6,r*.5,0,0,Math.PI);c.strokeStyle='rgba(245,238,251,.38)';c.lineWidth=Math.max(.7,r*.055);c.stroke();c.restore()}
  function draw(){if(!ctx||w<2)return;backdrop();const c=systemCenter();if(showPaths){for(let i=planets.length-1;i>=0;i--){const {rx,ry}=parameters(i);ctx.save();ctx.strokeStyle= i===selected ?rgba(planets[i].color,.34):'rgba(196,184,231,.15)';ctx.lineWidth=i===selected?1.2:.8;ctx.setLineDash(i%2?[2,6]:[]);ctx.beginPath();ctx.ellipse(c.x,c.y,rx,ry,-.08,0,TAU);ctx.stroke();ctx.restore();}}
    starCore();projected=planets.map((p,i)=>{const {rx,ry,phi}=parameters(i);const depth=Math.sin(phi);const size=(p.size*(.84+depth*.15))*clamp(zoom,.74,1.5);return {i,p,x:c.x+Math.cos(phi)*rx,y:c.y+Math.sin(phi)*ry,depth,r:size};}).sort((a,b)=>a.depth-b.depth);projected.forEach(planetDraw);}
  function drawPreview(){if(!previewCtx)return;const cw=preview.width,ch=preview.height,pp=planets[selected];previewCtx.clearRect(0,0,cw,ch);const cx=cw*.5,cy=ch*.50,rad=118;let g=previewCtx.createRadialGradient(cx,cy,0,cx,cy,178);g.addColorStop(0,rgba(pp.color,.22));g.addColorStop(1,rgba(pp.color,0));previewCtx.fillStyle=g;previewCtx.fillRect(0,0,cw,ch);
    // Anéis atrás e à frente do globo, ilustrados separadamente.
    function ring(part){previewCtx.save();previewCtx.translate(cx,cy);previewCtx.rotate(-.24);previewCtx.beginPath();previewCtx.ellipse(0,0,rad*1.57,rad*.49,0,part?0:Math.PI,part?Math.PI:TAU);previewCtx.lineWidth=10;previewCtx.strokeStyle=rgba(pp.color,part?.66:.22);previewCtx.stroke();previewCtx.restore()}
    if(pp.rings)ring(false);previewCtx.save();previewCtx.shadowBlur=32;previewCtx.shadowColor=rgba(pp.color,.35);previewCtx.drawImage(sphereImages[selected],cx-rad,cy-rad,rad*2,rad*2);previewCtx.restore();if(pp.rings)ring(true);
    previewCtx.fillStyle=rgba(pp.color,.7);previewCtx.font='14px Georgia';previewCtx.fillText('✧',cx-151,cy-96);previewCtx.fillText('✦',cx+145,cy+63);
  }
  function info(index){selected=clamp(index,0,planets.length-1);const p=planets[selected];$('plIndex').textContent=`${String(selected+1).padStart(2,'0')} / 08`;$('plPlanetNumber').textContent=`${String(selected+1).padStart(2,'0')} / VIII · ${p.type.toUpperCase()}`;$('plInspectorHeading').textContent=p.name;$('plPlanetTitle').textContent=p.epithet;$('plPlanetQuote').textContent=`“${p.quote}”`;$('plNature').textContent=p.type;$('plElement').textContent=p.element;$('plOrbit').textContent=p.orbit;$('plPhenomenon').textContent=p.phenomenon;$('plDescription').textContent=p.teaser;
    document.querySelector('.pl-inspector')?.style.setProperty('--moon-glow',p.color);
    document.querySelectorAll('.pl-moon-card').forEach((b,i)=>{b.classList.toggle('is-active',i===selected);b.setAttribute('aria-pressed',String(i===selected));});
    $('plCodexTitle').innerHTML=`Crônicas de <em>${p.name}.</em>`;$('plCodexSubtitle').textContent=p.epithet;
    const codex=$('plCodex');if(codex){codex.style.setProperty('--codex-ink',p.color);}
    $('plCodexFolio').textContent=`FÓLIO ${['I','II','III','IV','V','VI','VII','VIII'][selected]} · VIII`;
    $('plCodexPlateNumber').textContent=`${['I','II','III','IV','V','VI','VII','VIII'][selected]} / VIII`;
    $('plCodexGlyph').textContent=p.symbol;
    $('plCodexOrbit').textContent=p.orbit;
    $('plCodexPhenomenon').textContent=p.phenomenon;
    $('plCodexQuote').textContent=p.quote;
    const codexPlanet=$('plCodexPlanet');codexPlanet.src=sphereImages[selected].toDataURL('image/png');codexPlanet.alt=`Ilustração do planeta ${p.name}`;
    $('plCodexBody').replaceChildren(...p.lore.map((paragraph,i)=>{const el=document.createElement('p');el.textContent=paragraph;if(i===0)el.className='pl-first-paragraph';return el;}));$('plPrev').disabled=selected===0;$('plNext').disabled=selected===planets.length-1;
    drawPreview();draw();
  }
  function controls(){if(!$('plPlay'))return;const locked=reduced();$('plPlay').disabled=locked;$('plPlay').textContent=locked?'✦ Movimento reduzido':playing?'Ⅱ Pausar':'▶ Continuar';$('plStageMode').textContent=locked?'CÉU EM REPOUSO':playing?`ÓRBITAS EM MOVIMENTO · ${String(speed).replace('.',',')}×`:'ÓRBITAS PAUSADAS';$('plPaths').textContent=showPaths?'◎ Órbitas visíveis':'◌ Mostrar órbitas';$('plPaths').setAttribute('aria-pressed',String(showPaths));$('plZoomLevel').textContent=Math.round(zoom*100)+'%';}
  function zoomBy(v){zoom=clamp(zoom+v,.7,1.7);controls();draw();}
  function touchPoint(e){const rect=stage.getBoundingClientRect();return {x:e.clientX-rect.left,y:e.clientY-rect.top}}
  function hit(x,y){return projected.map(b=>({b,d:Math.hypot(b.x-x,b.y-y)})).filter(o=>o.d<Math.max(20,o.b.r+12)).sort((a,b)=>a.d-b.d)[0]?.b||null;}
  function hover(x,y){const b=hit(x,y);const tip=$('plTooltip');if(b){tip.textContent=`${b.p.name} · Explorar planeta`;tip.hidden=false;tip.style.left=clamp(x,12,w-175)+'px';tip.style.top=clamp(y,36,h-14)+'px';stage.style.cursor='pointer';}else{tip.hidden=true;stage.style.cursor=dragging?'grabbing':'grab';}}
  function frame(now){raf=0;if(!activeView())return;if(!reduced()&&playing){if(last)time=clamp(time+(now-last)/1000*speed,0,1e9);}last=now;if(!reduced()){draw();raf=requestAnimationFrame(frame)}}
  function sync(){if(raf){cancelAnimationFrame(raf);raf=0;}last=0;if(activeView()){resize();drawPreview();if(!reduced())raf=requestAnimationFrame(frame)}controls()}
  function initialize(){canvas=$('plCanvas');stage=$('plStage');preview=$('plPreview');if(!canvas||!stage||!preview)return;ctx=canvas.getContext('2d');previewCtx=preview.getContext('2d');if(!ctx||!previewCtx)return;
    makeStars();planets.forEach((p,i)=>sphereImages.push(buildSphere(p,i)));
    $('plPlanetList').replaceChildren(...planets.map((p,i)=>{const b=document.createElement('button');b.type='button';b.className='pl-moon-card'+(p.rings?' is-ringed':'');b.style.setProperty('--moon-glow',p.color);b.setAttribute('aria-label',`Selecionar planeta ${p.name}`);b.innerHTML=`<span class="pl-number">PLANETA ${String(i+1).padStart(2,'0')}</span><span class="pl-card-planet" aria-hidden="true"><img alt="" src="${sphereImages[i].toDataURL('image/png')}"></span><strong>${p.name}</strong><small>${p.epithet}</small>`;b.addEventListener('click',()=>{info(i);stage.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'center'})});return b;}));
    $('plRead').onclick=()=>$('plCodex').scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});
    $('plPrev').onclick=()=>{info(selected-1);$('plCodex').scrollIntoView({behavior:reduced()?'instant':'smooth'})};$('plNext').onclick=()=>{info(selected+1);$('plCodex').scrollIntoView({behavior:reduced()?'instant':'smooth'})};
    $('plPlay').onclick=()=>{playing=!playing;controls()};$('plSpeed').onchange=e=>{speed=Number(e.target.value)||1;controls()};$('plPaths').onclick=()=>{showPaths=!showPaths;controls();draw()};$('plZoomIn').onclick=()=>zoomBy(.15);$('plZoomOut').onclick=()=>zoomBy(-.15);$('plReset').onclick=()=>{panX=panY=0;zoom=1;time=1.2;info(0);controls()};
    stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;const p=touchPoint(e);dragging={id:e.pointerId,x:p.x,y:p.y,px:panX,py:panY};moved=false;stage.setPointerCapture(e.pointerId)});
    stage.addEventListener('pointermove',e=>{const p=touchPoint(e);if(dragging){const dx=p.x-dragging.x,dy=p.y-dragging.y;if(Math.hypot(dx,dy)>5)moved=true;if(moved){panX=clamp(dragging.px+dx,-w*.26,w*.26);panY=clamp(dragging.py+dy,-h*.3,h*.3);$('plTooltip').hidden=true;stage.classList.add('is-dragging');draw()}}else hover(p.x,p.y)});
    stage.addEventListener('pointerup',e=>{const p=touchPoint(e);if(dragging&&!moved){const b=hit(p.x,p.y);if(b)info(b.i);}dragging=null;stage.classList.remove('is-dragging');hover(p.x,p.y)});
    stage.addEventListener('pointercancel',()=>{dragging=null;stage.classList.remove('is-dragging')});stage.addEventListener('pointerleave',()=>{if(!dragging){$('plTooltip').hidden=true;stage.style.cursor='grab'}});
    stage.addEventListener('wheel',e=>{if(!activeView())return;e.preventDefault();zoomBy(e.deltaY<0?.09:-.09)},{passive:false});stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();info((selected+1)%8)}if(e.key==='ArrowLeft'){e.preventDefault();info((selected+7)%8)}if(e.key==='+'||e.key==='='){e.preventDefault();zoomBy(.1)}if(e.key==='-'){e.preventDefault();zoomBy(-.1)}if(e.key===' '){e.preventDefault();playing=!playing;controls()}});
    document.addEventListener('lunaris:route',sync);document.addEventListener('visibilitychange',sync);$('motionToggle')?.addEventListener('click',()=>requestAnimationFrame(sync));window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change',sync);
    const ro=new ResizeObserver(()=>{if(activeView())resize()});ro.observe(stage);info(0);sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize);else initialize();
})();

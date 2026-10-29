/* Casas e Festivais: navegação interativa sem servidor. */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-festival-jump]').forEach(button => {
    button.addEventListener('click', () => {
      const id=button.dataset.festivalJump;
      if(typeof setRoute!=='function')return;
      setRoute('lunareth', id);
      window.setTimeout(()=>document.getElementById('festival-'+id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}),180);
    });
  });
  document.querySelectorAll('[data-open-moon]').forEach(button => button.addEventListener('click', () => {
    if(typeof setRoute==='function')setRoute('lunareth',button.dataset.openMoon);
  }));
  document.querySelectorAll('[data-scroll-festival]').forEach(button => button.addEventListener('click', () => {
    const el=document.getElementById('festival-'+button.dataset.scrollFestival);
    el?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }));
  const lanterns=[...document.querySelectorAll('[data-lantern]')];
  const status=document.getElementById('lanternStatus');
  const room=document.querySelector('.council-room');
  const update=()=>{
    const on=lanterns.filter(l=>l.getAttribute('aria-pressed')==='true').length;
    room?.classList.toggle('all-lit',on===5);
    if(status)status.textContent=on===5?'✦ As cinco lanternas estão acesas. O Conselho pode se reunir!':`${on} de 5 lanternas acesas · ${on===0?'O conselho aguarda.':'Aguardando as outras casas.'}`;
  };
  lanterns.forEach(b=>b.addEventListener('click',()=>{
    const lit=b.getAttribute('aria-pressed')==='true';
    b.setAttribute('aria-pressed',String(!lit));update();
  }));
  document.getElementById('resetLanterns')?.addEventListener('click',()=>{
    lanterns.forEach(l=>l.setAttribute('aria-pressed','false'));update();
  });
  update();
});

const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];

function driveSources(id){return[
  `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
  `https://drive.google.com/uc?export=view&id=${id}`,
  `https://drive.usercontent.google.com/download?id=${id}&export=view&authuser=0`
]}

$$('img[data-drive-id]').forEach(img=>{const srcs=driveSources(img.dataset.driveId);let i=0;img.src=srcs[i];img.onerror=()=>{i++;if(i<srcs.length)img.src=srcs[i]}});

const gate=$('#gate'),music=$('#bgMusic'),musicBtn=$('#musicBtn'),musicCopy=$('#musicCopy');music.volume=.48;
$('#openBtn').addEventListener('click',async()=>{gate.classList.add('hide');try{await music.play();musicBtn.classList.add('playing')}catch(e){musicCopy.textContent='tap ♫'}});
musicBtn.addEventListener('click',async()=>{if(music.paused){try{await music.play();musicBtn.classList.add('playing')}catch(e){}}else{music.pause();musicBtn.classList.remove('playing')}});
music.addEventListener('loadedmetadata',()=>{if(Number.isFinite(music.duration)){const m=Math.floor(music.duration/60),s=Math.floor(music.duration%60).toString().padStart(2,'0');musicCopy.textContent=`${m}:${s}`}});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});$$('.reveal').forEach(el=>io.observe(el));
addEventListener('scroll',()=>{const d=document.documentElement,max=d.scrollHeight-innerHeight;$('#progressBar').style.width=(max?scrollY/max*100:0)+'%'},{passive:true});
$('#lastBtn').addEventListener('click',()=>$('#ending').scrollIntoView({behavior:'smooth'}));
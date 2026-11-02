const boot=document.querySelector('.boot');
const desktop=document.querySelector('.desktop');
const enterButton=document.querySelector('.enter-button');
const navLinks=[...document.querySelectorAll('.sidebar nav a')];
const panels=[...document.querySelectorAll('.panel')];
document.querySelectorAll('[data-year]').forEach(node=>{node.textContent=new Date().getFullYear()});
function enterSite(){boot.classList.add('is-gone');desktop.hidden=false;desktop.classList.add('is-visible');document.body.classList.remove('is-locked');window.setTimeout(()=>boot.setAttribute('hidden',''),520)}
function showPanel(hash,updateHistory=true){const target=document.querySelector(hash);if(!target?.classList.contains('panel'))return;panels.forEach(panel=>panel.classList.toggle('active',panel===target));navLinks.forEach(link=>link.classList.toggle('active',link.hash===hash));document.querySelector('.content').scrollTop=0;if(updateHistory)history.replaceState(null,'',hash);document.title=`${target.dataset.title} · 刘闽秦`;if(hash==='#writing')window.setTimeout(()=>moveCarousel(articleIndex),30)}
enterButton.addEventListener('click',enterSite);
document.addEventListener('keydown',event=>{if(event.key==='Enter'&&!boot.hidden)enterSite()});
document.addEventListener('click',event=>{const link=event.target.closest('a[href^="#"]');const nextButton=event.target.closest('[data-next]');if(link&&document.querySelector(link.hash)?.classList.contains('panel')){event.preventDefault();showPanel(link.hash)}if(nextButton)showPanel(`#${nextButton.dataset.next}`)});
window.addEventListener('hashchange',()=>showPanel(location.hash||'#about',false));
if(location.hash&&document.querySelector(location.hash)?.classList.contains('panel'))showPanel(location.hash,false);

const carousel=document.querySelector('.article-carousel');
const carouselWindow=document.querySelector('.carousel-window');
const articleTrack=document.querySelector('.article-track');
const articleCards=[...document.querySelectorAll('.article-track .article-card')];
const articleCurrent=document.querySelector('[data-article-current]');
const dots=document.querySelector('.carousel-dots');
let articleIndex=0;
let touchStart=0;

articleCards.forEach((card,index)=>{
  const dot=document.createElement('button');
  dot.type='button';
  dot.setAttribute('aria-label',`查看第 ${index+1} 篇文章`);
  dot.addEventListener('click',()=>moveCarousel(index));
  dots.append(dot);
  card.addEventListener('click',event=>{
    if(index!==articleIndex){event.preventDefault();moveCarousel(index)}
  });
});

function moveCarousel(index){
  articleIndex=(index+articleCards.length)%articleCards.length;
  const card=articleCards[articleIndex];
  const offset=carouselWindow.clientWidth/2-card.offsetLeft-card.offsetWidth/2;
  articleTrack.style.transform=`translateX(${offset}px)`;
  articleCards.forEach((item,i)=>item.classList.toggle('is-current',i===articleIndex));
  [...dots.children].forEach((dot,i)=>dot.classList.toggle('active',i===articleIndex));
  articleCurrent.textContent=String(articleIndex+1).padStart(2,'0');
}

carousel.querySelector('.prev').addEventListener('click',()=>moveCarousel(articleIndex-1));
carousel.querySelector('.next').addEventListener('click',()=>moveCarousel(articleIndex+1));
carousel.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX},{passive:true});
carousel.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>45)moveCarousel(articleIndex+(distance<0?1:-1))},{passive:true});
window.addEventListener('resize',()=>moveCarousel(articleIndex));
window.addEventListener('hashchange',()=>{if(location.hash==='#writing')window.setTimeout(()=>moveCarousel(articleIndex),30)});
moveCarousel(0);

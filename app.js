const library = window.NIKAYA_LIBRARY;
const books = library.books;
const articles = library.suttas;
const sourceGroups = library.source_groups;
const search = document.getElementById('search');
const suttaList = document.getElementById('suttaList');
const count = document.getElementById('resultCount');
const reader = document.getElementById('detailCard');
const readerBody = document.getElementById('detailBody');
let activeFilter = 'all';
let activeReading = 'long';
const sourceReadings = (library.readings||[]).filter(e=>!e.canonical_id&&e.reading_type!=='grouped').map(e=>({...e,title:e.source_heading,id:e.id,pali:e.chapter,kind:'source-reading'}));
const readingItems = [...articles,...sourceReadings];
let libraryScroll = 0;
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/\b(dn|mn|sn|an)\s*0*(\d+)/g,'$1 $2').replace(/\s+/g,' ').trim();
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const matches = (item,q) => !q || normalize([item.id,item.title,item.pali||'',item.book].join(' ')).includes(q);
function openReader(item) {
  libraryScroll = window.scrollY;
  document.body.classList.add('focus-mode');
  document.getElementById('detailTitle').textContent = `${item.id} — ${item.title}`;
  document.getElementById('detailSubtitle').textContent = [item.pali,books[item.book].title].filter(Boolean).join(' · ');
  document.getElementById('sourceLink').href = item.source_link||item.source_url;
  readerBody.replaceChildren();
  if(item.article_html) {
    readerBody.innerHTML = item.article_html;
  } else {
    const note = document.createElement('p');
    note.className = 'article-source';
    note.textContent = item.reading_type==='long' ? 'Bài này nằm trong danh sách ưu tiên phân tích. Nội dung chưa hoàn tất; Thầy có thể đọc nguyên văn tại BuddhaSasana bằng nút phía trên.' : 'Mục này dẫn đến trang nguồn. Các bài ngắn đọc trực tiếp tại BuddhaSasana.';
    readerBody.append(note);
  }
  window.scrollTo({top:0,behavior:'instant'});
  document.getElementById('detailTitle').focus({preventScroll:true});
}
function render() {
  const q=normalize(search.value);
  const visible = readingItems.filter(s=>(activeFilter==='all'||s.book===activeFilter)&&s.reading_type===activeReading&&matches(s,q));
  const written=visible.filter(s=>s.article_html).length;
  count.textContent=`${visible.length} mục · ${written} có phân tích`;
  suttaList.innerHTML=visible.map(s=>{
    const code=s.kind==='source-reading'?s.book:s.id;
    const inside=`<span class="sutta-code">${escapeHtml(code)}</span><span class="sutta-name"><strong>${escapeHtml(s.title)}</strong><span>${escapeHtml(s.pali||'')}</span></span><span class="article-status ${s.article_html?'ready':''}">${activeReading==='short'?'Đọc nguyên văn ↗':s.article_html?'Có phân tích':'Chờ phân tích'}</span>`;
    const url=escapeHtml(s.source_link||s.source_url);
    const pick=activeReading==='short'?`<a class="sutta-pick" href="${url}" target="_blank" rel="noopener">${inside}</a>`:`<button type="button" class="sutta-pick" data-sutta="${escapeHtml(s.id)}">${inside}</button>`;
    return `<div class="sutta-row">${pick}<a class="row-source" href="${url}" target="_blank" rel="noopener" aria-label="Nguyên văn ${escapeHtml(s.title)}">↗</a></div>`;
  }).join('');
  for(const btn of suttaList.querySelectorAll('[data-sutta]'))btn.addEventListener('click',()=>openReader(readingItems.find(s=>s.id===btn.dataset.sutta)));
  const groups=sourceGroups.filter(g=>(activeFilter==='all'||g.book===activeFilter)&&matches(g,q));
  if(groups.length){
    const details=document.createElement('details');
    const summary=document.createElement('summary');summary.className='source-heading';summary.textContent='Mục lục nguồn và các nhóm bài gộp';details.append(summary);
    for(const group of groups){
      const a=document.createElement('a');a.className='source-group-row';a.innerHTML=`<span class="sutta-code">${escapeHtml(group.book)}</span><strong>${escapeHtml(group.title)}</strong><span class="article-status">Mục lục nguồn ↗</span>`;a.href=group.source_url;a.target='_blank';a.rel='noopener';details.append(a);
    }
    suttaList.append(details);
  }
  if(!visible.length&&!groups.length)suttaList.innerHTML='<p class="empty">Không có mục phù hợp. Thầy có thể đổi giữa Kinh dài và Kinh ngắn.</p>';
}
function syncFilters(){document.querySelectorAll('.reading-filter').forEach(btn=>{const selected=btn.dataset.reading===activeReading;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));});document.querySelectorAll('.filter').forEach(btn=>{const selected=btn.dataset.filter===activeFilter;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));});}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;syncFilters();render();}));
document.querySelectorAll('.reading-filter').forEach(btn=>btn.addEventListener('click',()=>{activeReading=btn.dataset.reading;syncFilters();render();}));
document.getElementById('clearSearch').addEventListener('click',()=>{search.value='';activeFilter='all';syncFilters();render();search.focus();});
search.addEventListener('input',render);
document.getElementById('backToLibrary').addEventListener('click',()=>{document.body.classList.remove('focus-mode');window.scrollTo({top:libraryScroll,behavior:'instant'});search.focus({preventScroll:true});});
document.getElementById('libraryHome').addEventListener('click',event=>{
  if(event.button||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  document.body.classList.remove('focus-mode');
  search.value='';activeFilter='all';activeReading='long';syncFilters();render();
  window.scrollTo({top:0,behavior:'instant'});
  search.focus({preventScroll:true});
});
syncFilters();render();

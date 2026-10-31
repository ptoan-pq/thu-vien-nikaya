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
let libraryScroll = 0;
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/\b(dn|mn|sn|an)\s*0*(\d+)/g,'$1 $2').replace(/\s+/g,' ').trim();
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const matches = (item,q) => !q || normalize([item.id,item.title,item.pali||'',item.book].join(' ')).includes(q);
function openReader(item) {
  libraryScroll = window.scrollY;
  document.body.classList.add('focus-mode');
  document.getElementById('detailTitle').textContent = `${item.id} — ${item.title}`;
  document.getElementById('detailSubtitle').textContent = [item.pali,books[item.book].title].filter(Boolean).join(' · ');
  document.getElementById('sourceLink').href = item.source_url;
  readerBody.replaceChildren();
  if(item.article_html) {
    readerBody.innerHTML = item.article_html;
  } else {
    const note = document.createElement('p');
    note.className = 'article-source';
    note.textContent = 'Bài này đã có trong mục lục. Bản tóm lược chi tiết chưa hoàn tất; có thể mở nguyên văn tại BuddhaSasana bằng nút phía trên.';
    readerBody.append(note);
  }
  window.scrollTo({top:0,behavior:'instant'});
  document.getElementById('detailTitle').focus({preventScroll:true});
}
function openSourceGroup(group) {
  openReader(group);
  document.getElementById('detailTitle').textContent = group.title;
  if(!group.entries.length)return;
  const intro = document.createElement('p');
  intro.className = 'article-source';
  intro.textContent = 'Danh sách dưới đây giữ số mục theo trang nguồn. Chưa đối chiếu toàn bộ với hệ số kinh quốc tế; các đường dẫn mở trang nguyên văn đang chứa bài đó.';
  readerBody.append(intro);
  const list = document.createElement('ul');
  for(const entry of group.entries) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = `${entry.source_number}. ${entry.title}`;
    a.href = entry.source_url;a.target='_blank';a.rel='noopener';
    li.append(a);list.append(li);
  }
  readerBody.append(list);
}
function render() {
  const q=normalize(search.value);
  const visibleArticles = articles.filter(s=>(activeFilter==='all'||s.book===activeFilter)&&matches(s,q));
  const visibleGroups = sourceGroups.filter(s=>(activeFilter==='all'||s.book===activeFilter)&&(matches(s,q)||s.entries.some(e=>matches({...e,book:s.book},q))));
  const written=visibleArticles.filter(s=>s.article_html).length;
  count.textContent=`${visibleArticles.length} bài · ${written} có bài học · ${visibleGroups.length} mục nguồn`;
  suttaList.innerHTML=visibleArticles.map(s=>`<div class="sutta-row"><button type="button" class="sutta-pick" data-sutta="${escapeHtml(s.id)}"><span class="sutta-code">${escapeHtml(s.id)}</span><span class="sutta-name"><strong>${escapeHtml(s.title)}</strong><span>${escapeHtml(s.pali||'')}</span></span><span class="article-status ${s.article_html?'ready':''}">${s.article_html?'Có bài học':'Chưa tóm lược'}</span></button><a class="row-source" href="${escapeHtml(s.source_url)}" target="_blank" rel="noopener" aria-label="Nguyên văn ${escapeHtml(s.id)}">↗</a></div>`).join('');
  for(const btn of suttaList.querySelectorAll('[data-sutta]'))btn.addEventListener('click',()=>openReader(articles.find(s=>s.id===btn.dataset.sutta)));
  for(const group of visibleGroups){
    const btn=document.createElement('button');btn.type='button';btn.className='source-group-row';
    const code=document.createElement('span');code.className='sutta-code';code.textContent=`${group.book} ${group.number}`;
    const title=document.createElement('strong');title.textContent=group.title;
    const status=document.createElement('span');status.className='article-status';status.textContent=group.entries.length?`${group.entries.length} mục theo nguồn`:'Mục lục nguồn';
    btn.append(code,title,status);btn.addEventListener('click',()=>openSourceGroup(group));suttaList.append(btn);
  }
  if(!visibleArticles.length&&!visibleGroups.length)suttaList.innerHTML='<p class="empty">Không có bài phù hợp với tìm kiếm.</p>';
}
function syncFilters(){document.querySelectorAll('.filter').forEach(btn=>{const selected=btn.dataset.filter===activeFilter;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));});}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;syncFilters();render();}));
document.getElementById('clearSearch').addEventListener('click',()=>{search.value='';activeFilter='all';syncFilters();render();search.focus();});
search.addEventListener('input',render);
document.getElementById('backToLibrary').addEventListener('click',()=>{document.body.classList.remove('focus-mode');window.scrollTo({top:libraryScroll,behavior:'instant'});search.focus({preventScroll:true});});
syncFilters();render();

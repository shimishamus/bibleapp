const C='kitveihakodesh-v23';
const ASSETS=["./","./index.html","./support.js","./app-logo.png","./manifest.webmanifest","./icon-192.png","./icon-512.png","./fonts/Narkissim-Regular.ttf","./fonts/Narkissim-Bold.ttf","./data/text/acts.txt","./data/text/amos.txt","./data/text/chron1.txt","./data/text/chron2.txt","./data/text/col.txt","./data/text/cor1.txt","./data/text/cor2.txt","./data/text/daniel.txt","./data/text/deuteronomy.txt","./data/text/ecclesiastes.txt","./data/text/eph.txt","./data/text/esther.txt","./data/text/exodus.txt","./data/text/ezekiel.txt","./data/text/ezra.txt","./data/text/gal.txt","./data/text/genesis.txt","./data/text/habakkuk.txt","./data/text/haggai.txt","./data/text/heb.txt","./data/text/hosea.txt","./data/text/isaiah.txt","./data/text/james.txt","./data/text/jeremiah.txt","./data/text/job.txt","./data/text/joel.txt","./data/text/john.txt","./data/text/john1.txt","./data/text/john2.txt","./data/text/john3.txt","./data/text/jonah.txt","./data/text/joshua.txt","./data/text/jude.txt","./data/text/judges.txt","./data/text/kings1.txt","./data/text/kings2.txt","./data/text/lamentations.txt","./data/text/leviticus.txt","./data/text/luke.txt","./data/text/malachi.txt","./data/text/mark.txt","./data/text/matthew.txt","./data/text/micah.txt","./data/text/nahum.txt","./data/text/nehemiah.txt","./data/text/numbers.txt","./data/text/obadiah.txt","./data/text/pet1.txt","./data/text/pet2.txt","./data/text/phil.txt","./data/text/philemon.txt","./data/text/proverbs.txt","./data/text/psalms.txt","./data/text/revelation.txt","./data/text/romans.txt","./data/text/ruth.txt","./data/text/samuel1.txt","./data/text/samuel2.txt","./data/text/song.txt","./data/text/thess1.txt","./data/text/thess2.txt","./data/text/tim1.txt","./data/text/tim2.txt","./data/text/titus.txt","./data/text/zechariah.txt","./data/text/zephaniah.txt"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(ASSETS.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
const put=(req,resp)=>{ if(resp&&resp.ok){ const cp=resp.clone(); caches.open(C).then(c=>c.put(req,cp)).catch(()=>{}); } return resp; };
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin) return;
  if(/admin/i.test(url.pathname)) return;
  if(req.mode==='navigate'||url.search||/\.(json|html)$/.test(url.pathname)){
    e.respondWith(fetch(req).then(r=>url.search?r:put(req,r)).catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(resp=>put(req,resp))));
});

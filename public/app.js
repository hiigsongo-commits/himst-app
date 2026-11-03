"use strict";
/* HIMST client. Talks to /api/generate; falls back to a small offline bank if the API is unreachable. */
const LANGS=[["en","English","ltr","English","en-US"],["zh","中文","ltr","Mandarin Chinese","zh-CN"],["hi","हिन्दी","ltr","Hindi","hi-IN"],["es","Español","ltr","Spanish","es-ES"],["ar","العربية","rtl","Arabic","ar-SA"],["fr","Français","ltr","French","fr-FR"],["bn","বাংলা","ltr","Bengali","bn-BD"],["pt","Português","ltr","Portuguese","pt-BR"],["ru","Русский","ltr","Russian","ru-RU"],["id","Indonesia","ltr","Indonesian","id-ID"],["ur","اردو","rtl","Urdu","ur-PK"],["sw","Kiswahili","ltr","Swahili","sw-KE"],["so","Soomaali","ltr","Somali","so-SO"]];
const EM=["🍀","❤️","💼","💰","⚡","🎓","👨‍👩‍👧","📅","👶","💵","🦸","🍽️"];
const PAST=["#fde7f0","#e8dcff","#ffe3ef","#dcefff","#dcf7e6","#ffe1e6","#d6efff","#e4ecff"];
const EN={hello:"Hi, I’m HIMST! 🤖😂 Send me your topic: I’ve got jokes to spark your brain, laughs to shake your belly and encouragement to warm your heart. Remember, it’s all for fun, but I always keep it true!",sub:"Check your situation, discover your chances, plan your next steps.",fun:"✨ For fun and encouragement only: not predictions, medical or financial advice.",about:"About you (so the jokes fit you)",age:"Age",male:"Male",female:"Female",other:"Prefer not to say",parent:"I am under 13 and a parent or guardian agreed that I can use HIMST.",parentblock:"Ask a parent or guardian to agree first, then tick the box and save.",save:"Save",edit:"Edit",cta:"Check My Situation Now",more:"Another one",share:"Share",think:"HIMST is thinking…",free:"Tell HIMST your situation",freeph:"Write anything: your day, your worry, your dream…",send:"Ask HIMST",q:"Quick question to know you better:",offline:"Offline mode: HIMST’s AI can’t be reached, so here is a classic.",err:"HIMST can’t reach the AI right now. Try again in a moment.",novoice:"No voice for this language on your device.",copied:"Copied",streak:"days",note:"HIMST is a comedy robot, not a doctor, banker or fortune-teller.",
T:["My Luck Today","My Heart","My Work","My Money Mood","My Energy","My Study","My Family","My Future","My First Child","My First Salary","My Superpower","Tonight’s Dinner"]};
const SO={hello:"Soo dhawoow, waa HIMST! 🤖😂 Soo dir mowduucaaga: waxaan kuu hayaa kaftan maskaxdaada kicinaaya, qosol calooshaada ruxaya iyo dhiirrigelin qalbiga taabanaysa. Xusuusnow, farriimahaygu waa madadaalo, laakiin runta waan ilaaliyaa!",sub:"Eeg xaaladdaada, ogow fursadahaaga, qorshee tallaabada xigta.",fun:"✨ Madadaalo iyo dhiirrigelin keliya: ma aha saadaal, talo caafimaad ama maaliyadeed.",about:"Adiga (si kaftanku kuu ku habboonaado)",age:"Da’da",male:"Lab",female:"Dhedig",other:"Ma sheego",parent:"Waan ka yarahay 13 sano, waalidkay ama masuulkaygu wuu ogolaaday inaan isticmaalo HIMST.",parentblock:"Waalid ama masuul weydii marka hore, kadibna calaamadee oo kaydi.",save:"Kaydi",edit:"Bedel",cta:"Hadda eeg xaaladdayda",more:"Mid kale",share:"La wadaag",think:"HIMST way ka fikiraysaa…",free:"U sheeg HIMST xaaladdaada",freeph:"Qor wax kasta: maalintaada, walaacaaga, riyadaada…",send:"Weydii HIMST",q:"Su’aal yar si kuu loo aqoonsado:",offline:"Habka offline: AI-ga HIMST lama gaadhi karo, haddaba kani waa mid caadi ah.",err:"HIMST hadda AI ma gaadho. Isku day mar kale.",novoice:"Qalabkaaga ma haysto cod luuqaddan.",copied:"Waa la koobiyeeyay",streak:"maalmood",note:"HIMST waa robot qosol, ma aha dhakhtar, bangi ama saadaaliye.",
T:["Nasiibkayga Maanta","Qalbigayga","Shaqadayda","Xaaladda Lacagtayda","Tamartayda","Waxbarashadayda","Qoyskayga","Mustaqbalkayga","Ilmahayga Koowaad","Mushaarkayga Koowaad","Awoodayda Gaarka ah","Cashadayda Caawa"]};
const DICT={en:EN,so:SO};
const BANK={en:["Luck is on a coffee break, but it left you a sticky note: ‘Try again after lunch.’","Your heart called. It says it is fine, just a little dramatic.","Work forecast: 80% chance of emails, 20% chance of you being brilliant anyway.","Your wallet and you are in a complicated relationship. Today, be kind to it.","Energy level: phone at 4%. Charge yourself with water and a snack.","Your brain is a muscle, and today it is doing squats. Be proud.","Family is the only group chat you can never leave. Send one kind message.","The future called: it says ‘take your time, I’m not going anywhere.’","Guess: the baby will be whatever you work hardest for. Start by practicing the lullabies.","Your first salary will be exactly enough for one celebration and one regret. Both are worth it.","Your superpower: finding the one sock that disappeared. Use it wisely.","Tonight’s dinner: something warm, something tasty, and zero guilt."],
so:["Nasiibku waa nasasho qaadanayaa, laakiin warqad yar ayuu kuu daayay: ‘Casho kadib mar kale ku soo noqo.’","Qalbigaagu wuu soo wacay. Wuxuu leeyahay waan fiicanahay, waan yar ayaan riwaayad badan.","Saadaasha shaqada: 80% iimaylo, 20% adigoo si kasta u hodan ah.","Boorsadaada iyo adiga waa xiriir adag. Maanta u naxariiso.","Tamarta: telefoonku 4%. Isku shub biyo iyo wax yar oo cuntada ah.","Maskaxdaadu waa muruq, maanta waxay samaynaysaa jimicsi. Faraxso.","Qoyskaagu waa kooxda WhatsApp ee aadan ka bixi karin. U dir hal fariin wanaagsan.","Mustaqbalku wuu soo wacay: wuxuu leeyahay ‘degdeg ha samayn, ma tago.’","Qiyaas: ilmuhu wuxuu noqonayaa wixii aad ugu dadaasho. Ka bilow heesaha hurdada.","Mushaarkaaga koowaad wuxuu ku filan yahay hal dabaaldeg iyo hal ka-xumaansho. Labaduba way ay qiimo leeyihiin.","Awoodaada gaarka ah: helidda sooskii lumay. Si wanaagsan u isticmaal.","Casho caawa: wax diirran, wax macaan, oo dambi la’aan."]};
let S={lang:"en",age:"",g:"",parent:false,likes:[],streak:{last:"",n:0},cnt:0};
let sel=null,recent=[],busy=false,saved=false,lastFree=null,lastI=null;
const $=id=>document.getElementById(id);
try{const s=JSON.parse(localStorage.getItem("himst")||"null");if(s){S=Object.assign(S,s);saved=!!(S.age||S.g)}}catch(e){}
const persist=()=>{try{localStorage.setItem("himst",JSON.stringify(S))}catch(e){}};
const LI=c=>LANGS.find(l=>l[0]===c)||LANGS[0];
const tx=k=>(DICT[S.lang]&&DICT[S.lang][k])||EN[k];
const tile=i=>(DICT[S.lang]&&DICT[S.lang].T&&DICT[S.lang].T[i])||EN.T[i];
function group(){const a=parseInt(S.age,10);return isNaN(a)?"unknown":a<13?"child":a<18?"teen":"adult"}
function blocked(){return group()==="child"&&!S.parent}
function render(){
 const l=LI(S.lang);document.documentElement.lang=l[0];document.documentElement.dir=l[2];
 ["sub","hello","fun","note"].forEach(k=>$(k).textContent=tx(k));
 $("aboutH").textContent=tx("about");$("ageL").textContent=tx("age");$("save").textContent=tx("save");$("parentL").textContent=tx("parent");
 $("cta").textContent=tx("cta")+" →";$("more").textContent=tx("more");$("share").textContent="📤 "+tx("share");
 $("freeH").textContent=tx("free");$("free").placeholder=tx("freeph");$("send").textContent=tx("send");
 $("age").value=S.age;$("parent").checked=S.parent;
 $("parentRow").hidden=group()!=="child";$("freeCard").hidden=group()==="child";
 if(S.streak.n>0){$("streak").hidden=false;$("streak").textContent="🔥 "+S.streak.n+" "+tx("streak")}
 $("langs").innerHTML="";
 LANGS.forEach(x=>{const b=document.createElement("button");b.textContent=x[1];b.setAttribute("aria-pressed",x[0]===S.lang);b.onclick=()=>setLang(x[0]);$("langs").appendChild(b)});
 $("gens").innerHTML="";
 [["male","male"],["female","female"],["other","unspecified"]].forEach(([k,v])=>{const b=document.createElement("button");b.className="chip";b.textContent=tx(k);b.setAttribute("aria-pressed",S.g===v);b.onclick=()=>{S.g=v;render()};$("gens").appendChild(b)});
 $("prof").hidden=saved;$("sum").hidden=!saved;
 if(saved){$("sum").innerHTML="";const b=document.createElement("button");b.className="chip";b.textContent="✏️ "+tx("edit")+": "+(S.age||"–")+" · "+(S.g==="male"?tx("male"):S.g==="female"?tx("female"):tx("other"));b.onclick=()=>{saved=false;render()};$("sum").appendChild(b)}
 $("tiles").innerHTML="";
 EM.forEach((e,i)=>{const b=document.createElement("button");b.style.background=PAST[i%PAST.length];b.setAttribute("aria-pressed",sel===i);b.innerHTML="<span>"+e+"</span>";const t=document.createElement("div");t.textContent=tile(i);b.appendChild(t);b.onclick=()=>gen(i);$("tiles").appendChild(b)});
}
async function api(body){
 const c=new AbortController(),t=setTimeout(()=>c.abort(),25000);
 try{const r=await fetch("/api/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body),signal:c.signal});
  if(!r.ok)throw new Error("http "+r.status);return await r.json()}finally{clearTimeout(t)}
}
async function setLang(c){
 S.lang=c;persist();
 if(!DICT[c]){try{const k=JSON.parse(localStorage.getItem("himst_ui_"+c)||"null");if(k)DICT[c]=k}catch(e){}}
 render();
 if(!DICT[c]){try{const d=await api({mode:"translate",lang:c,dict:EN});if(d&&d.T&&d.T.length===EN.T.length){DICT[c]=d;try{localStorage.setItem("himst_ui_"+c,JSON.stringify(d))}catch(e){}if(S.lang===c)render()}}catch(e){}}
}
function body(i,free){return{mode:free?"free":"tile",topic:i,free:free||undefined,lang:S.lang,age:parseInt(S.age,10)||null,g:S.g,likes:S.likes,recent}}
function bump(){
 const d=new Date(),f=x=>x.toISOString().slice(0,10),today=f(d),y=new Date(d.getTime()-864e5);
 if(S.streak.last!==today){S.streak={last:today,n:S.streak.last===f(y)?S.streak.n+1:1}}
 persist();$("streak").hidden=false;$("streak").textContent="🔥 "+S.streak.n+" "+tx("streak");
}
async function gen(i,free){
 if(busy)return;
 $("res").hidden=false;$("qbox").hidden=true;$("msg").textContent="";
 if(blocked()){$("kind").textContent="";$("txt").textContent=tx("parentblock");return}
 busy=true;sel=free?null:i;lastFree=free||null;lastI=i;
 $("kind").textContent=free?"💬":EM[i]+" "+tile(i);$("txt").textContent=tx("think");$("more").disabled=true;
 $("res").scrollIntoView({behavior:"smooth",block:"nearest"});
 let d=null;
 try{d=await api(body(i,free));if(!d||!d.text)throw new Error("empty")}
 catch(e){
  if(free)d={text:tx("err")};
  else{const b=BANK[S.lang]||BANK.en;d={text:b[i%b.length]};$("msg").textContent=tx("offline")}
 }
 $("txt").textContent=d.text;recent.push(String(d.text).slice(0,90));recent=recent.slice(-6);
 S.cnt=(S.cnt||0)+1;
 if(d.q&&d.opts&&d.opts.length&&S.cnt%3===0&&group()!=="child"){
  $("qt").textContent=tx("q")+" "+d.q;$("opts").innerHTML="";
  d.opts.slice(0,3).forEach(o=>{const b=document.createElement("button");b.className="chip";b.textContent=o;b.onclick=()=>{S.likes.push(d.q+" → "+o);S.likes=S.likes.slice(-10);persist();gen(i,free)};$("opts").appendChild(b)});
  $("qbox").hidden=false;
 }
 if(d.text!==tx("err"))bump();
 persist();busy=false;$("more").disabled=false;
 [...$("tiles").children].forEach((b,k)=>b.setAttribute("aria-pressed",!free&&k===i));
}
$("save").onclick=()=>{S.age=$("age").value.trim();S.parent=$("parent").checked;if(group()==="child")S.likes=[];persist();saved=!!(S.age||S.g);render()};
$("age").oninput=()=>{S.age=$("age").value.trim();$("parentRow").hidden=group()!=="child"};
$("cta").onclick=()=>{let i;do{i=Math.floor(Math.random()*EM.length)}while(i===lastI);gen(i)};
$("more").onclick=()=>lastFree?gen(null,lastFree):gen(lastI==null?0:lastI);
$("send").onclick=()=>{const v=$("free").value.trim();if(v)gen(null,v)};
$("voice").onclick=()=>{
 const code=LI(S.lang)[4],t=$("txt").textContent;
 if(!("speechSynthesis" in window))return $("msg").textContent=tx("novoice");
 const v=speechSynthesis.getVoices();
 if(v.length&&!v.some(a=>a.lang.toLowerCase().startsWith(code.slice(0,2))))return $("msg").textContent=tx("novoice");
 const u=new SpeechSynthesisUtterance(t);u.lang=code;speechSynthesis.cancel();speechSynthesis.speak(u);
};
function wrap(x,t,max){const sp=/\s/.test(t);const parts=sp?t.split(/\s+/):[...t];const out=[];let l="";for(const p of parts){const tr=l?(sp?l+" "+p:l+p):p;if(x.measureText(tr).width>max&&l){out.push(l);l=p}else l=tr}if(l)out.push(l);return out}
async function card(){
 const W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#1747c9");g.addColorStop(1,"#2f86ea");x.fillStyle=g;x.fillRect(0,0,W,H);
 const img=await new Promise(r=>{const m=new Image();m.onload=()=>r(m);m.onerror=()=>r(null);m.src="logo.webp"});
 if(img)x.drawImage(img,W/2-80,60,160,160);
 const F="'Bricolage Grotesque',system-ui,sans-serif";
 x.font="italic 800 90px "+F;x.textAlign="left";x.direction="ltr";
 const w1=x.measureText("HIMS").width,w2=x.measureText("T").width,s=(W-w1-w2)/2;
 x.fillStyle="#fff";x.fillText("HIMS",s,330);x.fillStyle="#ffc43d";x.fillText("T",s+w1,330);
 x.fillStyle="#fff";x.beginPath();x.roundRect(60,380,W-120,820,48);x.fill();
 x.direction=LI(S.lang)[2];x.textAlign="center";
 x.fillStyle="#1747c9";x.font="800 40px "+F;x.fillText($("kind").textContent,W/2,460);
 const t=$("txt").textContent;let size=58,lines;
 do{x.font="600 "+size+"px "+F;lines=wrap(x,t,W-240);size-=3}while(lines.length*(size+22)>640&&size>26);
 x.fillStyle="#10224f";const lh=size+22;let y=560;lines.forEach(l=>{x.fillText(l,W/2,y);y+=lh});
 x.direction="ltr";x.fillStyle="#fff";x.font="600 36px "+F;x.fillText("How Is My Situation Today? ✨",W/2,1290);
 return new Promise(r=>c.toBlob(r,"image/png"));
}
$("share").onclick=async()=>{
 try{
  const blob=await card(),file=new File([blob],"himst.png",{type:"image/png"});
  if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:"HIMST ✨"});return}
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="himst.png";a.click();
 }catch(e){}
};
setLang(S.lang);

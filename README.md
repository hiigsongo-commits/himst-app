# HIMST — How Is My Situation Today?

App qosol iyo dhiirrigelin ah oo AI isticmaala. Waa **PWA** (waa la rakibi karaa telefoonka: Add to Home Screen).
**Fiiro gaar ah:** farriimuhu waa madadaalo, ma aha saadaal, talo caafimaad, sharci ama maaliyadeed.

## Qaab-dhismeedka
```
public/          # frontend (index.html, app.js, style.css, PWA manifest, icons)
server.js        # server-ka Render (Node)
api/generate.js  # server function: furaha Claude API halkan ayuu ku jiraa, ma ahan browser-ka
.env.example     # tusaale doorsoomayaal
```

## Tijaabo degdeg ah (10 daqiiqo)
1. **GitHub:** abuur repo cusub (`himst`), geli faylalkan oo dhan, `git push`.
2. **Vercel** (bilaash): https://vercel.com → *Add New → Project* → dooro repo-ga `himst` → *Deploy*.
3. Vercel → *Settings → Environment Variables*, ku dar:
   - `ANTHROPIC_API_KEY` = furahaaga ka yimid https://console.anthropic.com
   - `MODEL` = `claude-haiku-5-5` (jaban oo degdeg ah)
   - `DAILY_LIMIT` = `60` (xaddidaad IP kasta maalintii)
4. *Redeploy*. Fur linkiga telefoonkaaga → **Add to Home Screen**.

**Ha geliyo furaha `.env` GitHub.** `.gitignore` ayaa ka ilaaliya.

### Render (haddii aad Vercel ka isticmaali weydo)
- Build Command: `npm install`  |  Start Command: `node server.js`  (ha ku qorin "$")
- Environment Variables: `ANTHROPIC_API_KEY`, `MODEL=claude-haiku-5-5`, `DAILY_LIMIT=60`
- `server.js` wuxuu bixiyaa `public/` iyo `/api/generate`.

### Haddii aad GitHub Pages oo keliya isticmaasho
Pages ma haysto server, sidaas darteed AI ma shaqeyso. App-ku wuxuu u beddelmayaa **habka offline** (12 farriimood oo diyaarsan: English iyo Soomaali). Waa wanaagsan tijaabada naqshadda, ma aha tijaabada AI.

### Dev maxalli ah
```
npm i -g vercel
cp .env.example .env.local   # geli furahaaga
vercel dev
```

## Waxa ku jira
- 12 tile + badhanka "Check My Situation Now"; 13 luuqadood (loo kala horeeyay tirada hadlayaasha). UI-ga luuqadaha aan Soomaali/English ahayn AI ayaa turjuma oo keydiya.
- Da’da + jinsiga → kaftanka ayaa lagu habeeyaa. Kooxaha: **<13** (waalid oggolaansho, AI aan keydin xog, qoraal xor ah la xiray), **13–17** (kid-safe), **18+**.
- Su’aal barasho oo ka muuqata jawaab kasta saddexaad; jawaabaha waa la xasuustaa (browser-ka gudihiisa keliya).
- 🔥 Streak maalinle ah; 📤 kaarka la wadaago (sawir PNG); 🔊 cod (browser TTS).
- Xaalad murugo/halis: AI wuxuu joojiyaa kaftanka oo wuxuu la talinayaa qof la aamino ama adeeg degdeg ah.

## Ka hor intaadan daabicin (muhiim)
- [ ] **Turjumaad:** qof afkaas dhalasho ahaan ku hadla ha imtixaano kaftanka (gaar ahaan Soomaali, Swahili, Urdu, Bengali).
- [ ] **Kharash:** daawo isticmaalka console.anthropic.com; dhig *spend limit*. `DAILY_LIMIT` hadda waa xusuus-gaar ah (instance kasta); u beddel Upstash/Redis marka tirada qofka koraan.
- [ ] **Sharciga:** Privacy Policy iyo Terms; COPPA/GDPR ee carruurta (<13); App Store iyo Play waxay rabaan sharaxaad cad oo "madadaalo ah".
- [ ] **Ammaan:** tijaabi qoraallo murugo iyo halis ah luuqad kasta; ku dar xidhiidhka adeegyada degdegga ah ee dal kasta marka la daabaco.
- [ ] **Digniin maalinle (push):** PWA keliya ma diri karo marka app-ku xiran yahay; ku dar OneSignal/Firebase Cloud Messaging marka xigta.
- [ ] **Mustaqbal:** isbarbar-dhig saaxiibo, kaydinta xogta account-ka, App Store/Play (Capacitor ayaa PWA u rogi kara app).

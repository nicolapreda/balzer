# balzer bergamo — brief operativo completo per generazione sito next.js

## contesto progetto
stiamo progettando il sito web di **balzer**, storico locale di bergamo: **caffetteria, pasticceria e ristorante dal 1850**, situato sotto i portici del sentierone. il sito dovrà trasmettere immediatamente una percezione di **storicità, eleganza, autorevolezza e qualità**, ma con un'esecuzione visiva **molto moderna, pulita, editoriale e premium**.

questo documento deve essere usato come **fonte unica di istruzioni** per generare una base di progetto in **next.js**, pronta per essere sviluppata, containerizzata con docker e collegata a mysql.

---

## obiettivo del sito
creare un sito web capace di:

1. valorizzare il brand balzer come locale iconico e storico di bergamo;
2. presentare in modo raffinato l'offerta: colazioni, pasticceria, aperitivi, pranzi, cocktail;
3. mostrare informazioni pratiche in modo chiarissimo: location, orari, contatti, menu;
4. integrare un **pannello admin** per la gestione dinamica del menu;
5. generare automaticamente un **qr code** collegato al menu digitale, da stampare e posizionare ai tavoli;
6. avere una struttura tecnica pulita, moderna, riusabile e facilmente deployabile su vps tramite docker.

---

## direzione creativa / art direction

### identità da comunicare
il sito deve sembrare:
- storico ma non vecchio;
- elegante ma non freddo;
- premium ma accessibile;
- italiano, raffinato, urbano;
- contemporaneo con richiami visivi al mondo bistrot/pasticceria d'autore.

### ispirazione estetica
partire da un linguaggio visivo che fonde:
- **heritage italiano**;
- **editorial design pulito**;
- **layout moderni e modulari**;
- una palette morbida e raffinata che riprende il logo e le reference.

### elementi visual da riprendere dalle reference
- largo uso di **spazio bianco o superfici molto pulite**;
- composizione a blocchi modulari;
- alternanza tra **tipografia grande** e contenuti più piccoli;
- immagini inserite in card o layout editoriali;
- dettagli cromatici sofisticati, non aggressivi;
- look complessivo premium, luminoso, curato, con accenti cromatici ben dosati.

### cosa evitare assolutamente
- layout standard da template qualsiasi;
- hero banali con testo centrato e bottone generico;
- colori troppo saturi o cheap;
- font anonimi stile saas;
- interfacce troppo “tech”, fredde o corporate;
- effetti glassmorphism, gradienti casuali, ombre pesanti inutili;
- look da sito wordpress prefabbricato.

---

## palette colori
la palette deve nascere dal logo e dalle reference.

### colori principali
- **blu balzer**: `#365071` circa, da usare come colore identitario principale;
- **avorio / crema chiaro**: `#f7f3eb` o simile, per fondi caldi ed eleganti;
- **bianco sporco**: `#fcfbf7`;
- **grigio caldo chiarissimo**: `#e8e2d8`;
- **testo scuro raffinato**: `#1f2530`;

### colori secondari / accenti
- azzurro polveroso tenue, usato con parsimonia;
- blu più profondo per hover, titoli, footer;
- champagne / sabbia molto soft per sezioni alternate.

la sensazione deve essere simile a un incontro tra:
- il **blu storico del logo**,
- la **pulizia quasi museale** della reference con il menu,
- e l'uso di **superfici calde e sofisticate** come nella reference più editoriale.

---

## tipografia
serve una coppia tipografica distintiva e coerente.

### direzione tipografica consigliata
- **serif elegante ad alto contrasto** per titoli e grandi headline;
- **sans raffinata e leggibile** per testi, navigazione, pannello admin.

### mood dei font
la serif deve ricordare il mondo:
- editoriale,
- heritage,
- moda / hotellerie,
- bistrot storico modernizzato.

la sans deve essere:
- molto pulita,
- contemporanea,
- leggibile anche in admin.

### esempio di approccio
- heading: canela / cormorant / fraunces / editorial-new style vibe
- body: suisse, neue haas, manrope, general sans, switzer vibe

non è obbligatorio usare esattamente questi font, ma il risultato deve avere questo livello di raffinatezza.

---

## stile ui / ux

### esperienza utente desiderata
l'utente deve percepire subito:
1. che balzer è un posto iconico;
2. che il locale è elegante e curato;
3. che può consultare menu e informazioni pratiche in modo semplicissimo.

### linee guida ui
- griglia precisa ma non rigida;
- molto respiro;
- bordi morbidi ma non giocosi;
- microinterazioni fini;
- hover sobri e premium;
- animazioni leggere, lente, curate;
- immagini grandi e ben valorizzate;
- blocchi informativi chiari;
- cta poche ma forti.

### vibe da ottenere
una combinazione fra:
- sito di un locale storico di alto livello,
- mini esperienza editoriale,
- menu digitale elegante e facilissimo da consultare.

---

## struttura del sito — pagine pubbliche

### 1. home page
la home deve essere fortemente visuale e autorevole.

#### sezioni consigliate
**hero**
- grande impatto visivo;
- possibile claim tipo: “dal 1850, nel cuore di bergamo”;
- sottotitolo breve che racconti caffetteria, pasticceria e ristorante;
- cta verso menu e contatti/prenotazione.

**sezione heritage / storia**
- racconto sintetico della storia di balzer;
- focus sul fatto che è una realtà storica del sentierone;
- tono elegante e non troppo lungo.

**sezione esperienze / momenti della giornata**
- colazione
- pranzo
- aperitivo
- pasticceria
- cocktail

questa sezione può essere costruita come moduli o card editoriali.

**sezione menu preview**
- mostra alcune categorie principali;
- rimando al menu completo.

**sezione location**
- via portici, sentierone 41, bergamo;
- descrizione del contesto sotto i portici;
- eventuale mappa integrata o bottone “apri su maps”.

**sezione orari**
mostrare chiaramente:
- venerdì: 07–02
- sabato: 07:30–02
- domenica: 08–23
- lunedì: 07–23
- martedì: 07–22
- mercoledì: 07–22
- giovedì: 07–23

**footer**
- marchio
- contatti
- indirizzo
- orari
- link social
- note legali e privacy

---

### 2. pagina menu
questa è una pagina centrale.

#### requisiti
- design molto leggibile, elegante, ordinato;
- categorie dinamiche caricate da database;
- prodotti dinamici caricati da database;
- possibilità di mostrare:
  - nome prodotto
  - descrizione breve
  - prezzo
  - eventuali varianti
  - tag opzionali: veg, gluten free, signature, novità
- ottima resa mobile;
- consultazione rapidissima da qr code;
- filtri o navigazione sticky per categorie;
- url pubblico dedicato, ad esempio `/menu`.

#### comportamento mobile
la versione mobile deve essere prioritaria, perché sarà aperta spesso tramite qr ai tavoli.

---

### 3. pagina storia / chi siamo
pagina editoriale per raccontare:
- la storia dal 1850;
- il ruolo di balzer a bergamo;
- il taglio elegante del locale;
- eventuali immagini d'archivio o ambienti.

---

### 4. pagina contatti / info
contenuti:
- indirizzo completo;
- orari;
- telefono;
- email se disponibile;
- mappa;
- servizi: tavoli all'aperto, terrazza panoramica, cocktail, ecc.

---

## admin panel — requisiti funzionali
serve una **dashboard admin protetta da login**.

### obiettivo admin
permettere al gestore di modificare il menu senza toccare codice.

### accesso admin
- route dedicata, ad esempio `/admin`;
- login con email + password;
- sessione protetta;
- middleware per proteggere le route private.

### funzionalità admin richieste

#### gestione categorie menu
- creare categoria;
- modificare categoria;
- riordinare categorie;
- nascondere / pubblicare categoria;
- eliminare categoria.

campi categoria:
- nome;
- slug;
- descrizione opzionale;
- ordine visualizzazione;
- visibile sì/no.

#### gestione prodotti menu
- creare prodotto;
- modificare prodotto;
- eliminare prodotto;
- assegnare prodotto a categoria;
- impostare disponibilità;
- riordinare prodotti.

campi prodotto:
- nome;
- slug;
- descrizione breve;
- prezzo;
- categoria;
- immagine opzionale;
- disponibile sì/no;
- tag opzionali;
- ordine visualizzazione.

#### qr code generator
nell'admin deve esserci una sezione che:
- genera automaticamente il qr code del menu pubblico;
- permette download in png e svg;
- idealmente mostra una mini anteprima stampabile;
- consente eventualmente di scegliere fra:
  - qr verso `/menu`
  - qr verso una categoria specifica
  - qr con parametri lingua, se in futuro serviranno.

#### settings di base
una sezione impostazioni può includere:
- nome locale;
- claim breve;
- indirizzo;
- telefono;
- orari;
- link social;
- url sito pubblico.

---

## architettura tecnica consigliata

### stack richiesto
- **next.js** ultima versione stabile con app router;
- **typescript**;
- **tailwind css** per lo styling;
- **mysql** come database;
- **prisma** come orm consigliato;
- autenticazione admin semplice e robusta;
- libreria qr code per generazione lato server o client;
- deploy in docker.

### struttura consigliata del progetto
- `app/` per routing next;
- `components/` per componenti riusabili;
- `lib/` per utility, db, auth;
- `prisma/` per schema e migration;
- `public/` per asset statici;
- `app/admin/` per dashboard;
- `app/api/` per route handlers.

### priorità tecniche
- codice pulito e mantenibile;
- componenti ben separati;
- attenzione a responsive;
- seo base ben fatta;
- performance buone;
- immagini ottimizzate;
- struttura pronta a future estensioni.

---

## database — schema logico suggerito

### tabella admins
campi suggeriti:
- id
- name
- email
- password_hash
- created_at
- updated_at

### tabella menu_categories
campi suggeriti:
- id
- name
- slug
- description
- sort_order
- is_visible
- created_at
- updated_at

### tabella menu_items
campi suggeriti:
- id
- category_id
- name
- slug
- description
- price
- image_url
- tags_json oppure colonna semplice/stringa
- is_available
- sort_order
- created_at
- updated_at

### tabella site_settings
campi suggeriti:
- id
- site_name
- tagline
- address
- phone
- email
- google_maps_url
- opening_hours_json
- social_links_json
- updated_at

in alternativa, se si vuole maggiore ordine, alcuni campi json possono essere normalizzati.

---

## api / funzionalità server
prevedere route handler o server actions per:

### public
- lettura categorie menu visibili;
- lettura prodotti disponibili;
- lettura impostazioni sito.

### admin
- login/logout;
- crud categorie;
- crud prodotti;
- update settings;
- generazione qr code.

serve validazione dati robusta.

---

## seo e metadati
il sito deve avere una base seo pulita.

### indispensabile
- title e description per home e pagine principali;
- open graph;
- favicon;
- metadati coerenti con brand locale;
- headings ben strutturati;
- schema markup locale se possibile in una seconda fase.

### focus seo locale
balzer è una realtà fisica e locale, quindi valorizzare:
- bergamo;
- sentierone;
- caffetteria;
- pasticceria;
- ristorante;
- aperitivi;
- locale storico.

---

## responsive design
il sito deve essere **mobile first ma desktop premium**.

### mobile
- menu super leggibile;
- sticky nav leggera;
- spazi generosi;
- pulsanti ben cliccabili;
- qr target experience eccellente.

### desktop
- grande impatto visuale;
- layout editoriali;
- immagini ampie;
- alternanza di moduli con ritmo elegante.

---

## motion / microinterazioni
animazioni molto sobrie e di qualità.

### consentito
- fade-up delicati;
- reveal immagini;
- hover sottili su link e card;
- transizioni lente e premium;
- piccoli spostamenti di pochi pixel.

### da evitare
- animazioni aggressive;
- effetti cheap;
- zoom eccessivi;
- motion da landing aggressiva.

---

## contenuti iniziali da predisporre nel codice
in assenza di contenuti completi, predisporre placeholder eleganti ma realistici.

### contenuti iniziali fondamentali
- nome: **balzer**
- payoff / descriptor: **caffetteria pasticceria ristorante**
- fondazione: **dal 1850**
- indirizzo: **via portici, sentierone 41, 24121 bergamo bg**
- descrizione breve: **colazioni, aperitivi e pranzi in un elegante bistrot-pasticceria dal 1850, con tavoli anche sotto i portici**
- servizi:
  - tavoli su terrazza panoramica
  - tavoli all'aperto
  - ottimi cocktail

### orari iniziali
- venerdì 07–02
- sabato 07:30–02
- domenica 08–23
- lunedì 07–23
- martedì 07–22
- mercoledì 07–22
- giovedì 07–23

---

## dockerizzazione
il progetto deve essere pronto per deploy tramite docker.

### richiesta
creare:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- documentazione minima per run in locale e deploy

### docker compose di riferimento
usare una struttura ispirata a questa, adattata al progetto balzer:

```yaml
version: '3.8'

services:
  balzer-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: balzer_web
    restart: unless-stopped
    ports:
      - "3005:3000"
    env_file:
      - .env
    environment:
      - MYSQL_HOST=${MYSQL_HOST}
      - MYSQL_PORT=${MYSQL_PORT}
      - MYSQL_USER=${MYSQL_USER}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
      - MYSQL_DATABASE=${MYSQL_DATABASE}
    volumes:
      - ./public/uploads:/app/public/uploads
      - ./public/assets:/app/public/assets
    networks:
      - nginx_network

networks:
  nginx_network:
    external: true
```

### note docker
- produzione con `next build` e `next start`;
- gestione corretta delle variabili ambiente;
- container pronto per reverse proxy con nginx proxy manager;
- cartelle pubbliche montabili con volume se necessario.

---

## variabili ambiente
creare un `.env.example` chiaro.

### esempio di base
```env
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
MYSQL_DATABASE=balzer_db
NEXTAUTH_SECRET=change_me
NEXTAUTH_URL=http://localhost:3005
```

se si usa auth diversa, adattare di conseguenza.

---

## collegamento database
il sito dovrà collegarsi a mysql usando credenziali environment-based.

### esempio info ricevute
```env
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
MYSQL_DATABASE=dtphoto_db
```

per questo progetto, usare un database dedicato, preferibilmente:

```env
MYSQL_DATABASE=balzer_db
```

non hardcodare mai credenziali nel codice.

---

## pannello admin — ux desiderata
la dashboard admin non deve sembrare un backend brutto improvvisato.

### mood
- essenziale;
- pulita;
- ordinata;
- molto leggibile;
- coerente con il brand ma più funzionale del front-end pubblico.

### sezioni admin ideali
sidebar con:
- dashboard
- categorie menu
- prodotti
- qr code
- impostazioni
- logout

### dashboard home admin
mostrare in modo semplice:
- numero categorie;
- numero prodotti;
- quanti prodotti visibili / non disponibili;
- pulsante rapido per aprire il menu pubblico;
- pulsante rapido per scaricare il qr code.

---

## funzionalità qr code — dettaglio
serve una funzionalità concreta, non solo decorativa.

### requisiti
- generazione qr del link pubblico menu;
- visualizzazione anteprima;
- download png;
- download svg;
- possibilità di stampare;
- eventuale box con label tipo “scansiona per il menu”.

### possibile extra futuro
- generazione qr personalizzato per singolo tavolo;
- tracking scansioni;
- qr per lingue differenti.

non è obbligatorio sviluppare subito gli extra, ma la struttura deve essere estendibile.

---

## accessibilità
pur mantenendo un'estetica premium, il sito deve restare usabile.

### tenere conto di
- contrasti leggibili;
- dimensioni testo adeguate;
- focus states;
- bottoni accessibili;
- navigazione tastiera di base;
- alt text per immagini principali.

---

## output richiesto
voglio che il progetto generato includa:

1. base completa **next.js + typescript + tailwind**;
2. front-end pubblico di alta qualità visiva;
3. pagina menu dinamica;
4. admin panel con autenticazione;
5. crud categorie e prodotti;
6. generazione qr code;
7. prisma schema e connessione mysql;
8. dockerfile + docker-compose;
9. file env example;
10. struttura ordinata e pronta da sviluppare in produzione.

---

## priorità assolute
in ordine:

1. **estetica forte e distintiva, non da template**;
2. **menu digitale mobile eccellente**;
3. **admin semplice ma davvero utile**;
4. **architettura pulita e pronta al deploy**;
5. **coerenza fra brand storico e interfaccia contemporanea**.

---

## istruzione finale per la generazione del codice
genera il progetto come se fosse un lavoro reale per un cliente premium.

non creare un semplice mockup o una landing statica: crea una base concreta, funzionante e ben organizzata, con forte attenzione al design, alla leggibilità, alla struttura del codice e alla futura manutenibilità.

il risultato deve sembrare il sito di un locale storico importante reinterpretato in chiave contemporanea, con una qualità visiva superiore alla media e una base tecnica pulita.

// Every word on the site, in English (the default) and Spanish. The manifesto
// is the same text as MANIFESTO.md in the Mutiny repo; keep them in step.

export type Lang = 'en' | 'es';

export const T = {
  en: {
    htmlTitle: 'Mutiny — Words start mutinies',
    description: 'A free, open-source writing app for essays and ideas. Local, private, with an AI that questions you instead of writing for you.',
    nav: { manifesto: 'Manifesto', writings: 'Writings', manual: 'Manual', github: 'GitHub', download: 'Join the mutiny', theme: 'Theme', otherLang: 'ES', otherLangName: 'Español' },
    announce: (v: string) => `Mutiny ${v} is out`,
    hero: {
      title: 'The world is broken. Write anyway.',
      sub: 'Mutiny is a free, open-source writing app for essays and ideas. It lives on your computer, keeps your words private, and comes with an AI that asks hard questions instead of writing for you.',
      download: 'Download Mutiny',
      manifesto: 'Read the manifesto'
    },
    manifesto: {
      kicker: 'The Mutiny Manifesto',
      title: 'Words start mutinies.',
      intro: 'Every change started as a sentence someone was afraid to write. Mutiny exists for that sentence.',
      principles: [
        ['Words change the world.', 'Laws, revolutions, apologies and love letters were all written first. If the world is broken, the fix begins on a page. Yours counts.'],
        ['Say it with your name on it.', 'Mutiny is for people who sign what they think. The voice that counts is the one that stands behind its words and risks being wrong in public.'],
        ['Your page is yours.', 'No accounts, no cloud, nobody reading over your shoulder. Your texts are plain files on your computer. If Mutiny disappeared tomorrow, every word would still be there.'],
        ['The AI asks. You decide.', "A good editor makes you think harder. Mutiny's assistant researches, doubts and questions your argument. It never writes your ideas for you, and it never changes a word without your yes."],
        ['Argue like you mean it.', 'Opinions are cheap; arguments cost work. Mutiny gives you the tools writers have always earned the hard way: an outline before the draft, sources you can cite, the strongest objection faced head on.'],
        ['Free as in freedom.', "Mutiny is free and open source, and it always will be. Take it, read it, change it, share it. A tool for dissent can't have an owner."],
        ["Start before you're ready.", "A draft doesn't have to be good. It just has to exist. The mutiny starts with the first line."]
      ],
      close: 'Join the mutiny.',
      sign: 'Maxx Darko, World Mutiny',
      readAll: 'Read it all, and why Mutiny',
      why: [
        ['Why an app?', 'Ideas need somewhere to take shape before they can change anything. Most writing tools want your attention, your data or your subscription. Mutiny wants your argument to be better.'],
        ['Why the name?', "A mutiny is a crew that refuses to follow a course it knows is wrong. It's also the scrappy company in Halt and Catch Fire: a handful of misfits who built the future over a dial-up line because nobody else would."],
        ['Why World Mutiny?', 'Because the ship is the world, and the crew is anyone with something to say.']
      ],
      whyTitle: 'Why Mutiny'
    },
    action: {
      kicker: 'See it in action',
      title: 'Tune in.',
      sub: 'Five channels, each one a close-up of something Mutiny does. Change the channel whenever you like.',
      channels: [
        ['WRITE', 'A clean page. Mark what you still need and keep going; the note waits on the side.'],
        ['CRITIQUE', 'The assistant reads your section and leaves the objections a sharp editor would raise.'],
        ['VERSIONS', 'Three other ways to say it, the changed words marked. You pick one, or none.'],
        ['TEMPLATES', 'An essay by Toulmin, a blog post, a script, a speech. Each one starts with its own outline.'],
        ['THEMES', 'Six themes, and on Omarchy it follows your desktop live.']
      ],
      channel: 'Channel',
      power: 'Play / pause',
      // the five scenes drawn inside the set (public/js/tv.js plays them);
      // *words* between asterisks are the ones a version changed
      scenes: {
        tabs: ['Draft', 'Notes', 'Outline', 'Sources', 'Later'],
        words: 'words',
        inText: 'In the text',
        chat: 'Chat',
        noNotes: 'No notes yet',
        write: {
          untitled: 'Untitled',
          title: 'Words start mutinies',
          byline: 'Maxx Darko',
          p1: 'Every change started as a sentence someone was afraid to write. Laws, revolutions and love letters were all ',
          marked: 'written first',
          p2: '. If the world is broken, write anyway.',
          menu: [['Cut', 'Ctrl+X'], ['Add a Mark', 'Ctrl+Shift+M'], ['Cite a Source', 'Ctrl+Shift+K'], ['Critique This Section', 'Ctrl+Shift+C']],
          tag: 'Mark',
          note: 'Find one law that began as a letter.'
        },
        critique: {
          title: 'The city we walk',
          h: 'The problem',
          s: ['Mexico City was designed for the car.', 'Walk ten blocks and you’ll see it: broken sidewalks, impossible crossings, footbridges three floors high.', 'The car is a minority.'],
          cmd: 'Critique this section',
          reading: 'Reading your section',
          cards: [['Thesis', 'Your central claim is never stated. Say what you want changed.', 0], ['Logic', 'From broken sidewalks to “designed for the car” is a jump. Bridge it.', 1], ['Evidence', '“A minority” of what? Cite the survey: year, agency, figures.', 2]],
          toast: '3 observations, marked ✦ in the text'
        },
        versions: {
          before: 'Bogotá closes avenues on Sundays so people can walk. ',
          target: 'That is not a mobility policy. It is a privilege with good press.',
          title: 'Versions',
          yours: 'Yours',
          use: 'Use this',
          chips: ['Clearer', 'Shorter', 'Stronger', 'Less formal'],
          options: ['That isn’t *mobility* policy. It’s privilege with a *good publicist*.', '*Call it what it is:* not a mobility policy, *but* a privilege *the press applauds*.', '*This is no* mobility policy; it is privilege, *well reviewed*.'],
          pick: 0,
          toast: 'Replaced. Your original waits in Later.'
        },
        templates: {
          library: 'In progress',
          create: '+ New',
          title: 'New text',
          types: [['Essay', 'An argument, built to persuade.'], ['Free writing', 'No structure, just the page.'], ['Blog post', 'A hook, headings, a call to action.'], ['Newsletter', 'A letter to your subscribers.'], ['Script', 'Video or podcast, to be heard.'], ['Speech', 'A talk or a toast, said out loud.']],
          form: 'Form',
          forms: [['Toulmin', 'Claim, grounds, warrant, rebuttal.'], ['Peterson', 'Ten-odd sentences first.'], ['Dialectic', 'Thesis, antithesis, synthesis.'], ['They say / I say', 'Start from what others say.']],
          ok: 'Create',
          outline: [['Claim', 'what you hold to be true'], ['Grounds', 'the evidence you have'], ['Warrant', 'why that evidence supports the claim'], ['Backing', 'what holds the warrant up'], ['Rebuttal', 'the most serious objection'], ['Conclusion', 'what follows from all this']]
        },
        themes: {
          follow: 'On Omarchy it follows your desktop, live.'
        }
      }
    },
    write: {
      kicker: 'What you write',
      title: 'Essays, posts, scripts, speeches. Whatever it takes.',
      sub: 'Pick what you are writing and Mutiny gives it a shape: an outline of guiding questions, a bar that counts what matters, and an assistant that knows what kind of text it is reading.',
      types: [
        ['Essay', 'Peterson · Dialectic · Toulmin · They say / I say · Pyramid · Exploratory · Five paragraphs'],
        ['Free writing', 'Free · Morning pages'],
        ['Blog post', 'Opinion · How-to · List — with reading time, meta description and Markdown for your site'],
        ['Newsletter', 'Personal letter · Digest'],
        ['Script', 'Long video · Short · Podcast — timed out loud'],
        ['Speech', 'Talk · Toast — timed out loud']
      ],
      tools: [
        ['Sources and citations', 'Paste a link, a DOI or an ISBN; cite as you write; the list builds itself.'],
        ['Reorder', 'Your draft as cards. Read the skeleton: the first line of every paragraph.'],
        ['My voice', 'Feed it your own texts and the assistant learns how you write, not how an AI writes.'],
        ['Later', 'Cut without fear. Everything you cut waits in its own tab.']
      ]
    },
    ai: {
      kicker: 'The assistant',
      title: 'An editor, not a ghostwriter.',
      sub: 'Optional, and yours to choose. It researches the facts you flag, questions your argument and offers other wordings. It never writes your ideas for you, and it never changes a word without your yes.',
      items: [
        ['Research', 'Flag a fact and it goes looking: an answer, and sources with the exact quote that backs it.'],
        ['Critique', 'Three to seven remarks, pinned where they belong. Different for an essay, a blog post or a speech.'],
        ['Questions', 'In an exploratory essay or free writing it does not correct. It asks what you have not asked yourself.'],
        ['Chat', 'Talk about your draft with the draft in view. Take a line back into the page if it earns it.']
      ],
      providers: 'Runs on what you already have: Claude Code, Codex, the Anthropic API, or any OpenAI-compatible service, including a model on your own machine.'
    },
    privacy: {
      kicker: 'Privacy',
      title: 'Nobody reads over your shoulder.',
      sub: 'No accounts, no cloud, no telemetry. Your texts are plain files on your computer, and the app itself cannot reach the internet.',
      staysTitle: 'Stays on your computer',
      stays: ['Every text, note, source and outline, as plain files', 'Your API keys, encrypted by your system keychain', 'Your style profile and your daily backups'],
      leavesTitle: 'Leaves only when you ask',
      leaves: ['The text you give the assistant, to the service you chose', 'A link or DOI you look up, to that page or catalogue', 'A daily check for new versions on GitHub (you can turn it off)'],
      note: 'What an AI provider keeps of your text depends on its own policy. With a local model, nothing leaves at all.'
    },
    themes: {
      kicker: 'Themes',
      title: 'Pick your flag. Change everything.',
      sub: 'Six themes for the whole app. Try them here: this page changes with them.',
      omarchy: 'On Omarchy, Mutiny follows your desktop theme, live.'
    },
    free: {
      kicker: 'Free. Open. Yours.',
      title: 'A tool for dissent can’t have an owner.',
      sub: 'Mutiny is free and open source under the MIT license. Read every line, change what you want, share it with anyone. It is built on NEO, the writer’s app by Hugh Howey.',
      points: ['No price, no subscription, no ads', 'Linux, macOS and Windows', 'English and Spanish', 'Issues and ideas welcome on GitHub'],
      github: 'Mutiny on GitHub',
      neo: 'NEO by Hugh Howey'
    },
    writings: {
      kicker: 'Writings',
      title: 'Dispatches from the mutiny.',
      sub: 'Essays, arguments and loose ideas, written in Mutiny and published here as they were written.',
      by: 'by',
      min: (n: number) => `${n} min read`,
      draft: 'Draft',
      sources: 'Sources',
      back: 'All writings',
      other: 'Leer en español',
      written: 'Written in Mutiny.',
      writtenSub: 'A free, open-source app for essays and ideas. Yours too.',
      empty: 'Nothing published yet. The first dispatch is on its way.',
      rss: 'RSS',
      newer: 'Newer',
      older: 'Older'
    },
    download: {
      kicker: "For the ones who won't stay quiet.",
      title: 'Join the mutiny',
      sub: (v: string) => `Mutiny ${v} for Linux, macOS and Windows. Free, forever.`,
      yours: 'For your computer',
      other: 'Other systems',
      unsigned: 'The builds are not signed with paid Apple or Microsoft certificates, so your system asks once before opening Mutiny:',
      steps: {
        linux: 'Make the AppImage executable (chmod +x) and run it. On Omarchy, scripts/install-linux.sh adds it to the menu.',
        mac: 'Drag Mutiny to Applications. The first time, right-click it → Open → Open. If macOS says it is damaged, run xattr -cr /Applications/Mutiny.app once.',
        windows: 'SmartScreen says "Windows protected your PC": click More info → Run anyway.'
      },
      verify: 'SHA-256',
      all: 'All releases and notes on GitHub',
      source: 'Source code'
    },
    footer: {
      line: 'Built on NEO by Hugh Howey. Made by Maxx Darko and the mutineers. MIT licensed.',
      contact: 'Contact',
      privacy: 'This site uses Cloudflare Web Analytics: no cookies, nothing that follows you.'
    }
  },
  es: {
    htmlTitle: 'Mutiny — Las palabras empiezan motines',
    description: 'Una app gratuita y de código abierto para escribir ensayos e ideas. Local, privada, con una IA que te cuestiona en lugar de escribir por ti.',
    nav: { manifesto: 'Manifiesto', writings: 'Escritos', manual: 'Manual', github: 'GitHub', download: 'Únete al motín', theme: 'Tema', otherLang: 'EN', otherLangName: 'English' },
    announce: (v: string) => `Ya salió Mutiny ${v}`,
    hero: {
      title: 'El mundo está roto. Escribe de todos modos.',
      sub: 'Mutiny es una app gratuita y de código abierto para escribir ensayos e ideas. Vive en tu computadora, guarda tus palabras en privado y trae una IA que te hace preguntas difíciles en lugar de escribir por ti.',
      download: 'Descargar Mutiny',
      manifesto: 'Leer el manifiesto'
    },
    manifesto: {
      kicker: 'El Manifiesto Mutiny',
      title: 'Las palabras empiezan motines.',
      intro: 'Todo cambio empezó como una frase que alguien tenía miedo de escribir. Mutiny existe para esa frase.',
      principles: [
        ['Las palabras cambian el mundo.', 'Leyes, revoluciones, disculpas y cartas de amor: todo se escribió primero. Si el mundo está roto, el arreglo empieza en una página. La tuya cuenta.'],
        ['Dilo con tu nombre.', 'Mutiny es para quien firma lo que piensa. La voz que cuenta es la que da la cara por sus palabras y se arriesga a equivocarse en público.'],
        ['Tu página es tuya.', 'Sin cuentas, sin nube, sin nadie leyendo por encima de tu hombro. Tus textos son archivos normales en tu computadora. Si Mutiny desapareciera mañana, cada palabra seguiría ahí.'],
        ['La IA pregunta. Tú decides.', 'Un buen editor te hace pensar más. El asistente de Mutiny investiga, duda y cuestiona tu argumento. Nunca escribe tus ideas por ti y nunca cambia una palabra sin que tú lo autorices.'],
        ['Argumenta en serio.', 'Las opiniones son baratas; los argumentos cuestan trabajo. Mutiny te da las herramientas que los escritores siempre se ganaron a pulso: un esquema antes del borrador, fuentes que puedes citar, la objeción más fuerte de frente.'],
        ['Libre de verdad.', 'Mutiny es gratis y de código abierto, y lo será siempre. Tómalo, léelo, cámbialo, compártelo. Una herramienta para disentir no puede tener dueño.'],
        ['Empieza antes de estar listo.', 'Un borrador no tiene que ser bueno; solo tiene que existir. El motín empieza con la primera línea.']
      ],
      close: 'Únete al motín.',
      sign: 'Maxx Darko, World Mutiny',
      readAll: 'Léelo completo, y por qué Mutiny',
      why: [
        ['¿Por qué una app?', 'Las ideas necesitan un lugar donde tomar forma antes de poder cambiar algo. Casi todas las herramientas de escritura quieren tu atención, tus datos o tu suscripción. Mutiny quiere que tu argumento sea mejor.'],
        ['¿Por qué el nombre?', 'Un motín es una tripulación que se niega a seguir un rumbo que sabe equivocado. También es la empresa de Halt and Catch Fire: un puñado de inadaptados que construyeron el futuro por una línea telefónica porque nadie más lo iba a hacer.'],
        ['¿Por qué World Mutiny?', 'Porque el barco es el mundo, y la tripulación es cualquiera que tenga algo que decir.']
      ],
      whyTitle: 'Por qué Mutiny'
    },
    action: {
      kicker: 'Míralo en acción',
      title: 'Sintoniza.',
      sub: 'Cinco canales, cada uno un primer plano de algo que hace Mutiny. Cambia de canal cuando quieras.',
      channels: [
        ['ESCRIBIR', 'Una página limpia. Marca lo que te falta y sigue; la nota espera a un lado.'],
        ['CRÍTICA', 'El asistente lee tu sección y deja las objeciones que haría un buen editor.'],
        ['VERSIONES', 'Otras tres maneras de decirlo, con las palabras cambiadas marcadas. Eliges una, o ninguna.'],
        ['PLANTILLAS', 'Un ensayo de Toulmin, un post, un guion, un discurso. Cada uno empieza con su esquema.'],
        ['TEMAS', 'Seis temas, y en Omarchy sigue a tu escritorio en vivo.']
      ],
      channel: 'Canal',
      power: 'Reproducir / pausar',
      scenes: {
        tabs: ['Borrador', 'Notas', 'Esquema', 'Fuentes', 'Después'],
        words: 'palabras',
        inText: 'En el texto',
        chat: 'Chat',
        noNotes: 'Aún no hay notas',
        write: {
          untitled: 'Sin título',
          title: 'Las palabras empiezan motines',
          byline: 'Maxx Darko',
          p1: 'Todo cambio empezó como una frase que alguien tenía miedo de escribir. Las leyes, las revoluciones y las cartas de amor fueron ',
          marked: 'escritas primero',
          p2: '. Si el mundo está roto, escribe de todos modos.',
          menu: [['Cortar', 'Ctrl+X'], ['Añadir una marca', 'Ctrl+Shift+M'], ['Citar una fuente', 'Ctrl+Shift+K'], ['Criticar esta sección', 'Ctrl+Shift+C']],
          tag: 'Marca',
          note: 'Busca una ley que empezó como carta.'
        },
        critique: {
          title: 'La ciudad que caminamos',
          h: 'El problema',
          s: ['La Ciudad de México se diseñó para el coche.', 'Camina diez cuadras y lo verás: banquetas rotas, cruces imposibles, puentes peatonales de tres pisos.', 'El coche es una minoría.'],
          cmd: 'Criticar esta sección',
          reading: 'Leyendo tu sección',
          cards: [['Tesis', 'Nunca dices tu idea central. Di qué quieres que cambie.', 0], ['Lógica', 'De banquetas rotas a «diseñada para el coche» hay un salto. Únelo.', 1], ['Evidencia', '¿«Una minoría» de qué? Cita la encuesta: año, institución, cifras.', 2]],
          toast: '3 observaciones, marcadas con ✦ en el texto'
        },
        versions: {
          before: 'Bogotá cierra avenidas los domingos para que la gente camine. ',
          target: 'Eso no es una política de movilidad. Es un privilegio con buena prensa.',
          title: 'Versiones',
          yours: 'La tuya',
          use: 'Usar esta',
          chips: ['Más clara', 'Más corta', 'Más fuerte', 'Menos formal'],
          options: ['*No es* política de movilidad. Es privilegio con *buen publicista*.', '*Llamémoslo por su nombre:* no es política de movilidad, *sino* un privilegio *que la prensa aplaude*.', '*Esto no es* política de movilidad; es privilegio, *bien reseñado*.'],
          pick: 0,
          toast: 'Reemplazada. Tu original espera en Después.'
        },
        templates: {
          library: 'En curso',
          create: '+ Nuevo',
          title: 'Texto nuevo',
          types: [['Ensayo', 'Un argumento hecho para convencer.'], ['Escritura libre', 'Sin estructura, solo la página.'], ['Post de blog', 'Un gancho, subtítulos, una llamada a la acción.'], ['Newsletter', 'Una carta a tus suscriptores.'], ['Guion', 'Video o pódcast, para escucharse.'], ['Discurso', 'Una charla o un brindis, en voz alta.']],
          form: 'Forma',
          forms: [['Toulmin', 'Tesis, datos, garantía, refutación.'], ['Peterson', 'Primero unas diez frases.'], ['Dialéctica', 'Tesis, antítesis, síntesis.'], ['Ellos dicen / yo digo', 'Parte de lo que dicen otros.']],
          ok: 'Crear',
          outline: [['Tesis', 'lo que sostienes'], ['Datos', 'la evidencia que tienes'], ['Garantía', 'por qué esa evidencia apoya la tesis'], ['Respaldo', 'lo que sostiene la garantía'], ['Refutación', 'la objeción más seria'], ['Conclusión', 'lo que se sigue de todo esto']]
        },
        themes: {
          follow: 'En Omarchy sigue a tu escritorio, en vivo.'
        }
      }
    },
    write: {
      kicker: 'Qué escribes',
      title: 'Ensayos, posts, guiones, discursos. Lo que haga falta.',
      sub: 'Elige qué vas a escribir y Mutiny le da forma: un esquema de preguntas guía, una barra que cuenta lo que importa y un asistente que sabe qué tipo de texto está leyendo.',
      types: [
        ['Ensayo', 'Peterson · Dialéctico · Toulmin · Ellos dicen / Yo digo · Pirámide · Exploratorio · Cinco párrafos'],
        ['Escritura libre', 'Libre · Páginas matutinas'],
        ['Blog', 'Opinión · Tutorial · Lista — con tiempo de lectura, meta-descripción y Markdown para tu sitio'],
        ['Newsletter', 'Carta personal · Resumen'],
        ['Guion', 'Video largo · Video corto · Podcast — medido en voz alta'],
        ['Discurso', 'Charla · Brindis — medido en voz alta']
      ],
      tools: [
        ['Fuentes y citas', 'Pega un enlace, un DOI o un ISBN; cita mientras escribes; la lista se arma sola.'],
        ['Reordenar', 'Tu borrador como tarjetas. Lee el esqueleto: la primera línea de cada párrafo.'],
        ['Mi voz', 'Dale tus propios textos y el asistente aprende cómo escribes tú, no cómo escribe una IA.'],
        ['Para después', 'Recorta sin miedo. Todo lo que cortas espera en su pestaña.']
      ]
    },
    ai: {
      kicker: 'El asistente',
      title: 'Un editor, no un escritor fantasma.',
      sub: 'Opcional, y lo eliges tú. Investiga los datos que marcas, cuestiona tu argumento y te ofrece otras maneras de decirlo. Nunca escribe tus ideas por ti y nunca cambia una palabra sin que tú lo autorices.',
      items: [
        ['Investigar', 'Marca un dato y lo busca: una respuesta y fuentes con la cita textual que la respalda.'],
        ['Criticar', 'De tres a siete observaciones, ancladas donde van. Distintas para un ensayo, un post o un discurso.'],
        ['Preguntar', 'En un ensayo exploratorio o en escritura libre no corrige. Te pregunta lo que no te has preguntado.'],
        ['Chat', 'Platica sobre tu borrador con el borrador a la vista. Lleva una frase a la página si se lo gana.']
      ],
      providers: 'Funciona con lo que ya tienes: Claude Code, Codex, la API de Anthropic o cualquier servicio compatible con OpenAI, incluido un modelo en tu propia máquina.'
    },
    privacy: {
      kicker: 'Privacidad',
      title: 'Nadie lee por encima de tu hombro.',
      sub: 'Sin cuentas, sin nube, sin telemetría. Tus textos son archivos normales en tu computadora, y la app misma no puede conectarse a internet.',
      staysTitle: 'Se queda en tu computadora',
      stays: ['Cada texto, nota, fuente y esquema, como archivos normales', 'Tus API keys, cifradas con el llavero de tu sistema', 'Tu perfil de estilo y tus copias diarias'],
      leavesTitle: 'Sale solo cuando tú lo pides',
      leaves: ['El texto que le das al asistente, al servicio que elegiste', 'Un enlace o DOI que buscas, a esa página o catálogo', 'Una revisión diaria de versiones nuevas en GitHub (se puede apagar)'],
      note: 'Lo que un proveedor de IA guarde de tu texto depende de su propia política. Con un modelo local, no sale nada.'
    },
    themes: {
      kicker: 'Temas',
      title: 'Elige tu bandera. Cambia todo.',
      sub: 'Seis temas para toda la app. Pruébalos aquí: esta página cambia con ellos.',
      omarchy: 'En Omarchy, Mutiny sigue el tema de tu escritorio, en vivo.'
    },
    free: {
      kicker: 'Libre. Abierto. Tuyo.',
      title: 'Una herramienta para disentir no puede tener dueño.',
      sub: 'Mutiny es gratis y de código abierto con licencia MIT. Lee cada línea, cambia lo que quieras, compártelo con quien sea. Está construido sobre NEO, la app para escritores de Hugh Howey.',
      points: ['Sin precio, sin suscripción, sin anuncios', 'Linux, macOS y Windows', 'Inglés y español', 'Problemas e ideas, bienvenidos en GitHub'],
      github: 'Mutiny en GitHub',
      neo: 'NEO de Hugh Howey'
    },
    writings: {
      kicker: 'Escritos',
      title: 'Despachos desde el motín.',
      sub: 'Ensayos, argumentos e ideas sueltas, escritos en Mutiny y publicados aquí tal como se escribieron.',
      by: 'por',
      min: (n: number) => `${n} min de lectura`,
      draft: 'Borrador',
      sources: 'Fuentes',
      back: 'Todos los escritos',
      other: 'Read in English',
      written: 'Escrito en Mutiny.',
      writtenSub: 'Una app gratuita y de código abierto para ensayos e ideas. También es tuya.',
      empty: 'Todavía no hay nada publicado. El primer despacho viene en camino.',
      rss: 'RSS',
      newer: 'Más reciente',
      older: 'Anterior'
    },
    download: {
      kicker: 'Para quienes no se van a quedar callados.',
      title: 'Únete al motín',
      sub: (v: string) => `Mutiny ${v} para Linux, macOS y Windows. Gratis, para siempre.`,
      yours: 'Para tu computadora',
      other: 'Otros sistemas',
      unsigned: 'Las apps no llevan firma de pago de Apple ni de Microsoft, así que tu sistema pregunta una vez antes de abrir Mutiny:',
      steps: {
        linux: 'Haz ejecutable el AppImage (chmod +x) y ábrelo. En Omarchy, scripts/install-linux.sh lo agrega al menú.',
        mac: 'Arrastra Mutiny a Aplicaciones. La primera vez, clic derecho → Abrir → Abrir. Si macOS dice que está dañado, ejecuta una vez xattr -cr /Applications/Mutiny.app.',
        windows: 'SmartScreen dice "Windows protegió tu PC": haz clic en Más información → Ejecutar de todos modos.'
      },
      verify: 'SHA-256',
      all: 'Todas las versiones y notas en GitHub',
      source: 'Código fuente'
    },
    footer: {
      line: 'Construido sobre NEO de Hugh Howey. Hecho por Maxx Darko y los amotinados. Licencia MIT.',
      contact: 'Contacto',
      privacy: 'Este sitio usa Cloudflare Web Analytics: sin cookies, nada que te siga.'
    }
  }
} as const;

export const path = (lang: Lang, p: string) => (lang === 'en' ? p : '/es' + p);
// the writings live under a word of each language
export const writingsPath = (lang: Lang, slug = '') => (lang === 'en' ? '/writings/' : '/es/escritos/') + (slug ? slug + '/' : '');

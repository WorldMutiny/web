// Every word on the site, in English (the default) and Spanish. The manifesto
// is the same text as MANIFESTO.md in the Mutiny repo; keep them in step.

export type Lang = 'en' | 'es';

export const T = {
  en: {
    htmlTitle: 'Mutiny — Words start mutinies',
    description: 'A free, open-source writing app for essays and ideas. Local, private, with an AI that questions you instead of writing for you.',
    nav: { manifesto: 'Manifesto', manual: 'Manual', github: 'GitHub', download: 'Join the mutiny', theme: 'Theme', otherLang: 'ES', otherLangName: 'Español' },
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
    nav: { manifesto: 'Manifiesto', manual: 'Manual', github: 'GitHub', download: 'Únete al motín', theme: 'Tema', otherLang: 'EN', otherLangName: 'English' },
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
        ['La IA pregunta. Tú decides.', 'Un buen editor te hace pensar más. El asistente de Mutiny investiga, duda y cuestiona tu argumento. Nunca escribe tus ideas por ti y nunca cambia una palabra sin tu sí.'],
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

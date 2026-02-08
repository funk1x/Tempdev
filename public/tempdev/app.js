const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");
const floatingQuote = document.getElementById("floating-quote");
const contactSection = document.getElementById("contact");
const languageSelect = document.getElementById("language-select");

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem("tempdev-theme", theme);
  const isLight = theme === "light";
  themeLabel.textContent = isLight ? "Light" : "Dark";
  themeIcon.textContent = isLight ? "☀" : "☾";
};

const initTheme = () => {
  const stored = localStorage.getItem("tempdev-theme");
  if (stored) {
    setTheme(stored);
    return;
  }
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
};

const initFloatingQuote = () => {
  if (!contactSection || !floatingQuote) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        floatingQuote.classList.toggle("is-hidden", entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  observer.observe(contactSection);
};

const initHeaderHide = () => {
  const header = document.querySelector(".top-nav");
  if (!header) return;
  let lastScroll = 0;
  const threshold = 120;

  window.addEventListener("scroll", () => {
    const current = window.scrollY || 0;
    const scrollingDown = current > lastScroll;
    if (current > threshold && scrollingDown) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
    lastScroll = current;
  });
};

const translations = {
  EN: {
    nav_process: "Process",
    nav_work: "Work",
    nav_quote: "Quote",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    hero_title: "Clean, premium web builds for modern founders.",
    hero_body:
      "I'm Temp, a developer who designs and ships minimal, high-converting websites that look expensive and feel effortless.",
    cta_quote: "Get a quote",
    cta_process: "See the process",
    stat_turnaround: "5 business days",
    stat_turnaround_label: "Project turnaround",
    stat_mock: "48 hours",
    stat_mock_label: "Free mock, no charge",
    stat_responsive: "Responsive + SEO-ready",
    hero_about_cta: "About Temp",
    process_title: "Process",
    process_subtitle: "Clear steps, zero fluff. You always know what happens next.",
    process_1_title: "Discovery",
    process_1_body: "We align on your goals, audience, and brand tone in a focused call.",
    process_2_title: "Design",
    process_2_body: "Free mock in 48 hours, plus a visual system tailored to you.",
    process_3_title: "Build",
    process_3_body: "Fast, accessible code with performance, SEO, and motion polish.",
    process_4_title: "Launch",
    process_4_body: "Final QA, handoff docs, and deployment to your domain.",
    hero_featured: "Featured",
    hero_studio_title: "Temp Dev Studio",
    hero_studio_subtitle: "Brand system · Motion accents · Conversion copy",
    dashboard_label: "Landing Dashboard",
    dashboard_title: "Temp Dev Analytics",
    dashboard_live: "Live",
    dashboard_views_label: "Views",
    dashboard_views_value: "482,900",
    dashboard_ctr_label: "CTR",
    dashboard_ctr_value: "6.7%",
    dashboard_leads_label: "Leads",
    dashboard_leads_value: "1,240",
    dashboard_trend_label: "Views trending up",
    dashboard_trend_value: "+128%",
    quote_text:
      "“Minimal doesn’t mean simple. It means every element earns its place.”",
    quote_credit: "— Temp, Developer & Designer",
    work_title: "What you get",
    work_subtitle: "Everything you need to ship a strong website.",
    work_1_title: "Clear plan",
    work_1_body: "We map the pages, copy, and CTAs so visitors know what to do.",
    work_2_title: "Premium design",
    work_2_body: "Clean layout, strong typography, and spacing that looks expensive.",
    work_3_title: "Fast build",
    work_3_body: "Quick load times, mobile-ready, and easy to maintain.",
    work_4_title: "Launch support",
    work_4_body: "Domain setup, analytics, and a handoff you can use.",
    pages_title: "Pages",
    pages_subtitle: "Landing page plus optional subpages to expand your story.",
    pages_services_title: "Services",
    pages_services_body: "Detailed breakdown of offerings, pricing ranges, and deliverables.",
    pages_services_cta: "View services page",
    pages_method_title: "Methodology",
    pages_method_body: "Principles, timelines, and how the work is delivered.",
    pages_method_cta: "View methodology",
    pages_case_title: "Case studies",
    pages_case_body: "Before/after insights, metrics, and the build process.",
    pages_case_cta: "View case studies",
    contact_title: "Contact",
    contact_subtitle: "Share your project and I’ll reply within 12 hours.",
    faq_pill: "FAQ",
    faq_title: "Frequently asked questions",
    faq_subtitle:
      "Clear answers about pricing, timelines, and what it’s like to work together.",
    faq_cta_primary: "Get a quote",
    faq_cta_secondary: "See the process",
    faq_q1: "How is pricing determined?",
    faq_a1:
      "Pricing is based on the scope, number of pages, and level of strategy needed. I’ll outline the cost after the initial call so you know exactly what you’re paying for.",
    faq_q2: "How long does a typical website take?",
    faq_a2:
      "Most builds are delivered in 5 business days once the mock is approved. Timelines can shift slightly if content or feedback arrives late.",
    faq_q3: "Do I get a free mock first?",
    faq_a3:
      "Yes. You’ll receive a free mock within 48 hours so we align on layout and visual direction before any build work starts.",
    faq_q4: "What do you need from me to start?",
    faq_a4:
      "A short brief, your goals, and any existing brand assets. If you don’t have copy yet, I can help shape it.",
    faq_q5: "How many revisions are included?",
    faq_a5:
      "Revisions are included during design and build so the final result feels right. I keep the process tight to avoid endless loops.",
    faq_q6: "Can you handle hosting and launch?",
    faq_a6:
      "Yes. I can deploy to your domain and provide simple documentation so you can update content easily after launch.",
    contact_name_label: "Name",
    contact_name_placeholder: "Your full name",
    contact_email_label: "Email",
    contact_email_placeholder: "you@company.com",
    contact_budget_label: "Budget range",
    contact_budget_placeholder: "Select budget",
    contact_budget_1: "Under $2k",
    contact_budget_2: "$2k – $5k",
    contact_budget_3: "$5k – $10k",
    contact_budget_4: "$10k+",
    contact_type_label: "Project type",
    contact_type_placeholder: "Select type",
    contact_type_1: "Portfolio / Personal brand",
    contact_type_2: "Startup / Business site",
    contact_type_3: "E-commerce",
    contact_type_4: "Web app marketing",
    contact_details_label: "Additional details",
    contact_details_placeholder: "Tell me about your goals, pages, or timeline.",
    contact_cta: "Send request",
    contact_note: "Submissions are sent securely. Reply within 12 hours.",
    contact_sending: "Sending...",
    contact_success: "Thanks! Ticket #{ticket} created. Reply within 12 hours.",
    contact_fallback: "Opening your email client as a fallback...",
    contact_info_title: "Contact info",
    contact_email_title: "Email",
    contact_phone_title: "Phone",
    contact_avail_title: "Availability",
    contact_avail_body: "Taking on new projects now. Limited slots.",
    contact_timezones_title: "World clocks",
    clock_ny: "New York",
    clock_ldn: "London",
    clock_paris: "Paris",
    clock_tokyo: "Tokyo",
    floating_quote: "Get quote"
  },
  FR: {
    nav_process: "Processus",
    nav_work: "Portfolio",
    nav_quote: "Devis",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    hero_title: "Sites premium, clairs et modernes pour fondateurs.",
    hero_body:
      "Je suis Temp, developer qui livre des sites minimalistes et performants.",
    cta_quote: "Demander un devis",
    cta_process: "Voir le process",
    stat_turnaround: "5 jours ouvrables",
    stat_turnaround_label: "Delai projet",
    stat_mock: "48 heures",
    stat_mock_label: "Mock gratuit",
    stat_responsive: "Responsive + SEO",
    hero_about_cta: "A propos de Temp",
    process_title: "Processus",
    process_subtitle: "Etapes claires, sans perte de temps.",
    process_1_title: "Decouverte",
    process_1_body: "Alignement sur objectifs, audience, et positionnement.",
    process_2_title: "Design",
    process_2_body: "Mock gratuit en 48h, direction visuelle sur mesure.",
    process_3_title: "Build",
    process_3_body: "Code rapide, accessible, SEO et motion polish.",
    process_4_title: "Lancement",
    process_4_body: "QA finale, handoff, et deployment sur votre domaine.",
    hero_featured: "En vedette",
    hero_studio_title: "Temp Dev Studio",
    hero_studio_subtitle: "Systeme de marque · Motion · Copy conversion",
    dashboard_label: "Dashboard landing",
    dashboard_title: "Temp Dev Analytics",
    dashboard_live: "Live",
    dashboard_views_label: "Vues",
    dashboard_views_value: "482 900",
    dashboard_ctr_label: "CTR",
    dashboard_ctr_value: "6,7%",
    dashboard_leads_label: "Leads",
    dashboard_leads_value: "1 240",
    dashboard_trend_label: "Vues en hausse",
    dashboard_trend_value: "+128%",
    quote_text:
      "“Minimal ne veut pas dire simple. Chaque element a sa place.”",
    quote_credit: "— Temp, Developer & Designer",
    work_title: "Ce que vous obtenez",
    work_subtitle: "Tout ce qu’il faut pour un site solide.",
    work_1_title: "Plan clair",
    work_1_body: "Pages, message, et CTA pour guider le visiteur.",
    work_2_title: "Design premium",
    work_2_body: "Layout propre, typo forte, et rythme elegant.",
    work_3_title: "Build rapide",
    work_3_body: "Chargement rapide, mobile OK, et simple a maintenir.",
    work_4_title: "Support launch",
    work_4_body: "Domaine, analytics, et handoff utilisable.",
    pages_title: "Pages",
    pages_subtitle: "Landing + sous-pages pour renforcer votre histoire.",
    pages_services_title: "Services",
    pages_services_body: "Offres, prix, et livrables detailes.",
    pages_services_cta: "Voir la page services",
    pages_method_title: "Methodologie",
    pages_method_body: "Principes, timeline, et delivery.",
    pages_method_cta: "Voir la methodologie",
    pages_case_title: "Case studies",
    pages_case_body: "Avant/apres, metrics, et process.",
    pages_case_cta: "Voir les case studies",
    contact_title: "Contact",
    contact_subtitle: "Partagez votre projet et reponse sous 12h.",
    faq_pill: "FAQ",
    faq_title: "Questions frequentes",
    faq_subtitle: "Reponses claires sur prix, delais, et collaboration.",
    faq_cta_primary: "Demander un devis",
    faq_cta_secondary: "Voir le process",
    faq_q1: "Comment est fixe le prix ?",
    faq_a1:
      "Le prix depend du scope, du nombre de pages, et de la strategie. Je confirme le budget apres l’appel initial.",
    faq_q2: "Combien de temps prend un site ?",
    faq_a2:
      "La plupart des projets se livrent en 5 jours ouvrables apres validation du mock.",
    faq_q3: "Le mock est-il gratuit ?",
    faq_a3:
      "Oui. Un mock gratuit sous 48h pour valider la direction avant le build.",
    faq_q4: "Que dois-je fournir ?",
    faq_a4:
      "Un brief simple, vos objectifs, et vos assets. Je peux aider pour le copy.",
    faq_q5: "Combien de revisions ?",
    faq_a5:
      "Les revisions sont incluses pendant le design et le build pour un resultat propre.",
    faq_q6: "Gerez-vous l’hebergement et le lancement ?",
    faq_a6:
      "Oui. Je deploye sur votre domaine et fournis une doc simple.",
    contact_name_label: "Nom",
    contact_name_placeholder: "Votre nom complet",
    contact_email_label: "Email",
    contact_email_placeholder: "vous@entreprise.com",
    contact_budget_label: "Budget",
    contact_budget_placeholder: "Selectionner le budget",
    contact_budget_1: "Moins de 2k$",
    contact_budget_2: "2k$ – 5k$",
    contact_budget_3: "5k$ – 10k$",
    contact_budget_4: "10k$+",
    contact_type_label: "Type de projet",
    contact_type_placeholder: "Selectionner le type",
    contact_type_1: "Portfolio / Marque perso",
    contact_type_2: "Startup / Site business",
    contact_type_3: "E-commerce",
    contact_type_4: "Marketing web app",
    contact_details_label: "Details",
    contact_details_placeholder: "Objectifs, pages, ou timeline.",
    contact_cta: "Envoyer la demande",
    contact_note: "Demande envoyee en securite. Reponse sous 12h.",
    contact_sending: "Envoi en cours...",
    contact_success: "Merci. Ticket #{ticket} cree. Reponse sous 12h.",
    contact_fallback: "Ouverture de votre client email en secours...",
    contact_info_title: "Infos contact",
    contact_email_title: "Email",
    contact_phone_title: "Telephone",
    contact_avail_title: "Disponibilite",
    contact_avail_body: "Nouveaux projets ouverts. Places limitees.",
    contact_timezones_title: "Horloges du monde",
    clock_ny: "New York",
    clock_ldn: "Londres",
    clock_paris: "Paris",
    clock_tokyo: "Tokyo",
    floating_quote: "Devis"
  },
  ES: {
    nav_process: "Proceso",
    nav_work: "Portafolio",
    nav_quote: "Cotizar",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    hero_title: "Sitios premium, limpios y modernos para founders.",
    hero_body:
      "Soy Temp, developer que diseña sitios minimalistas y de alta conversion.",
    cta_quote: "Pedir cotizacion",
    cta_process: "Ver proceso",
    stat_turnaround: "5 dias habiles",
    stat_turnaround_label: "Entrega del proyecto",
    stat_mock: "48 horas",
    stat_mock_label: "Mock gratis",
    stat_responsive: "Responsive + SEO",
    hero_about_cta: "Sobre Temp",
    process_title: "Proceso",
    process_subtitle: "Pasos claros, sin vueltas.",
    process_1_title: "Descubrimiento",
    process_1_body: "Alineamos objetivos, audiencia y tono de marca.",
    process_2_title: "Diseno",
    process_2_body: "Mock gratis en 48h, sistema visual a medida.",
    process_3_title: "Build",
    process_3_body: "Codigo rapido, accesible, con SEO y motion polish.",
    process_4_title: "Lanzamiento",
    process_4_body: "QA final, handoff y deployment al dominio.",
    hero_featured: "Destacado",
    hero_studio_title: "Temp Dev Studio",
    hero_studio_subtitle: "Sistema de marca · Motion · Copy conversion",
    dashboard_label: "Dashboard landing",
    dashboard_title: "Temp Dev Analytics",
    dashboard_live: "Live",
    dashboard_views_label: "Vistas",
    dashboard_views_value: "482,900",
    dashboard_ctr_label: "CTR",
    dashboard_ctr_value: "6.7%",
    dashboard_leads_label: "Leads",
    dashboard_leads_value: "1,240",
    dashboard_trend_label: "Vistas en alza",
    dashboard_trend_value: "+128%",
    quote_text:
      "“Minimal no significa simple. Cada elemento tiene su lugar.”",
    quote_credit: "— Temp, Developer & Designer",
    work_title: "Lo que obtienes",
    work_subtitle: "Todo lo necesario para un sitio fuerte.",
    work_1_title: "Plan claro",
    work_1_body: "Paginas, mensaje y CTAs para guiar al visitante.",
    work_2_title: "Diseno premium",
    work_2_body: "Layout limpio, tipografia fuerte y ritmo elegante.",
    work_3_title: "Build rapido",
    work_3_body: "Carga rapida, mobile listo y facil de mantener.",
    work_4_title: "Soporte launch",
    work_4_body: "Dominio, analiticas y handoff usable.",
    pages_title: "Paginas",
    pages_subtitle: "Landing + subpaginas para reforzar tu historia.",
    pages_services_title: "Servicios",
    pages_services_body: "Ofertas, rangos de precio y entregables.",
    pages_services_cta: "Ver servicios",
    pages_method_title: "Metodologia",
    pages_method_body: "Principios, timeline y entrega.",
    pages_method_cta: "Ver metodologia",
    pages_case_title: "Casos de estudio",
    pages_case_body: "Antes/despues, metricas y proceso.",
    pages_case_cta: "Ver casos",
    contact_title: "Contacto",
    contact_subtitle: "Comparte tu proyecto y respondo en 12h.",
    faq_pill: "FAQ",
    faq_title: "Preguntas frecuentes",
    faq_subtitle: "Respuestas claras sobre precios, tiempos y trabajo.",
    faq_cta_primary: "Pedir cotizacion",
    faq_cta_secondary: "Ver proceso",
    faq_q1: "Como se define el precio?",
    faq_a1:
      "El precio depende del alcance, paginas y estrategia. Confirmo el costo despues de la llamada inicial.",
    faq_q2: "Cuanto tarda un sitio?",
    faq_a2:
      "La mayoria se entrega en 5 dias habiles despues de aprobar el mock.",
    faq_q3: "El mock es gratis?",
    faq_a3:
      "Si. Recibes un mock gratis en 48h para validar la direccion visual.",
    faq_q4: "Que necesitas para empezar?",
    faq_a4:
      "Un brief corto, objetivos y assets. Puedo ayudar con el copy.",
    faq_q5: "Cuantas revisiones hay?",
    faq_a5:
      "Las revisiones estan incluidas durante diseno y build.",
    faq_q6: "Puedes hacer hosting y launch?",
    faq_a6:
      "Si. Hago el deploy y dejo una doc simple.",
    contact_name_label: "Nombre",
    contact_name_placeholder: "Tu nombre completo",
    contact_email_label: "Email",
    contact_email_placeholder: "tu@empresa.com",
    contact_budget_label: "Presupuesto",
    contact_budget_placeholder: "Selecciona presupuesto",
    contact_budget_1: "Menos de $2k",
    contact_budget_2: "$2k – $5k",
    contact_budget_3: "$5k – $10k",
    contact_budget_4: "$10k+",
    contact_type_label: "Tipo de proyecto",
    contact_type_placeholder: "Selecciona tipo",
    contact_type_1: "Portafolio / Marca personal",
    contact_type_2: "Startup / Sitio business",
    contact_type_3: "E-commerce",
    contact_type_4: "Marketing web app",
    contact_details_label: "Detalles",
    contact_details_placeholder: "Objetivos, paginas o timeline.",
    contact_cta: "Enviar solicitud",
    contact_note: "Envio seguro. Respondo en 12h.",
    contact_sending: "Enviando...",
    contact_success: "Gracias. Ticket #{ticket} creado. Respondo en 12h.",
    contact_fallback: "Abriendo tu cliente de correo como respaldo...",
    contact_info_title: "Info de contacto",
    contact_email_title: "Email",
    contact_phone_title: "Telefono",
    contact_avail_title: "Disponibilidad",
    contact_avail_body: "Nuevos proyectos abiertos. Cupos limitados.",
    contact_timezones_title: "Relojes del mundo",
    clock_ny: "Nueva York",
    clock_ldn: "Londres",
    clock_paris: "Paris",
    clock_tokyo: "Tokio",
    floating_quote: "Cotizar"
  },
  DE: {
    nav_process: "Ablauf",
    nav_work: "Arbeiten",
    nav_quote: "Angebot",
    nav_faq: "FAQ",
    nav_contact: "Kontakt",
    hero_title: "Cleanes, premium Webdesign fuer moderne Founder.",
    hero_body:
      "Ich bin Temp, developer fuer minimalistische und starke Webseiten.",
    cta_quote: "Angebot anfragen",
    cta_process: "Ablauf ansehen",
    stat_turnaround: "5 Werktage",
    stat_turnaround_label: "Projektlaufzeit",
    stat_mock: "48 Stunden",
    stat_mock_label: "Mock kostenlos",
    stat_responsive: "Responsive + SEO",
    hero_about_cta: "About Temp",
    process_title: "Ablauf",
    process_subtitle: "Klare Schritte, kein Ballast.",
    process_1_title: "Discovery",
    process_1_body: "Ziele, Zielgruppe und Ton werden abgestimmt.",
    process_2_title: "Design",
    process_2_body: "Mock in 48h, plus visuelles System nach Mass.",
    process_3_title: "Build",
    process_3_body: "Schneller Code, accessible, mit SEO und motion polish.",
    process_4_title: "Launch",
    process_4_body: "QA, handoff und deployment auf eure Domain.",
    hero_featured: "Featured",
    hero_studio_title: "Temp Dev Studio",
    hero_studio_subtitle: "Brand System · Motion · Conversion Copy",
    dashboard_label: "Landing Dashboard",
    dashboard_title: "Temp Dev Analytics",
    dashboard_live: "Live",
    dashboard_views_label: "Views",
    dashboard_views_value: "482.900",
    dashboard_ctr_label: "CTR",
    dashboard_ctr_value: "6,7%",
    dashboard_leads_label: "Leads",
    dashboard_leads_value: "1.240",
    dashboard_trend_label: "Views im Aufwaerts",
    dashboard_trend_value: "+128%",
    quote_text:
      "“Minimal bedeutet nicht simpel. Jedes Element hat seinen Platz.”",
    quote_credit: "— Temp, Developer & Designer",
    work_title: "Was Sie bekommen",
    work_subtitle: "Alles fuer eine starke Website.",
    work_1_title: "Klarer Plan",
    work_1_body: "Seiten, Message und CTAs, damit Besucher handeln.",
    work_2_title: "Premium Design",
    work_2_body: "Sauberes Layout, starke Typo und gutes Spacing.",
    work_3_title: "Schneller Build",
    work_3_body: "Schnell, mobilbereit und leicht zu pflegen.",
    work_4_title: "Launch Support",
    work_4_body: "Domain, Analytics und handoff.",
    pages_title: "Seiten",
    pages_subtitle: "Landing + Unterseiten fuer Ihre Story.",
    pages_services_title: "Services",
    pages_services_body: "Leistungen, Preise und Deliverables.",
    pages_services_cta: "Services ansehen",
    pages_method_title: "Methodik",
    pages_method_body: "Prinzipien, Timeline und Delivery.",
    pages_method_cta: "Methodik ansehen",
    pages_case_title: "Case Studies",
    pages_case_body: "Vorher/Nachher, Metriken und Prozess.",
    pages_case_cta: "Case Studies ansehen",
    contact_title: "Kontakt",
    contact_subtitle: "Teilen Sie Ihr Projekt, Antwort in 12h.",
    faq_pill: "FAQ",
    faq_title: "Haeufige Fragen",
    faq_subtitle: "Klare Antworten zu Preis, Zeit und Zusammenarbeit.",
    faq_cta_primary: "Angebot anfragen",
    faq_cta_secondary: "Ablauf ansehen",
    faq_q1: "Wie wird der Preis bestimmt?",
    faq_a1:
      "Der Preis haengt vom Umfang, der Seitenzahl und der Strategie ab. Ich bestaetige den Preis nach dem Erstgespraech.",
    faq_q2: "Wie lange dauert ein Projekt?",
    faq_a2:
      "Die meisten Builds sind in 5 Werktagen nach Mock-Freigabe fertig.",
    faq_q3: "Gibt es ein kostenloses Mock?",
    faq_a3:
      "Ja. Ein kostenloses Mock in 48h, um die Richtung zu bestaetigen.",
    faq_q4: "Was brauchen Sie von mir?",
    faq_a4:
      "Ein kurzes Briefing, Ziele und vorhandene Assets. Copy kann ich helfen.",
    faq_q5: "Wie viele Revisionen?",
    faq_a5:
      "Revisionen sind waehrend Design und Build inklusive.",
    faq_q6: "Koennen Sie Hosting und Launch uebernehmen?",
    faq_a6:
      "Ja. Ich deploye auf Ihre Domain und liefere eine einfache Doku.",
    contact_name_label: "Name",
    contact_name_placeholder: "Ihr voller Name",
    contact_email_label: "Email",
    contact_email_placeholder: "sie@firma.com",
    contact_budget_label: "Budget",
    contact_budget_placeholder: "Budget waehlen",
    contact_budget_1: "Unter $2k",
    contact_budget_2: "$2k – $5k",
    contact_budget_3: "$5k – $10k",
    contact_budget_4: "$10k+",
    contact_type_label: "Projektart",
    contact_type_placeholder: "Typ waehlen",
    contact_type_1: "Portfolio / Personal Brand",
    contact_type_2: "Startup / Business",
    contact_type_3: "E-commerce",
    contact_type_4: "Web App Marketing",
    contact_details_label: "Details",
    contact_details_placeholder: "Ziele, Seiten oder Timeline.",
    contact_cta: "Anfrage senden",
    contact_note: "Sicher versendet. Antwort in 12h.",
    contact_sending: "Senden...",
    contact_success: "Danke. Ticket #{ticket} erstellt. Antwort in 12h.",
    contact_fallback: "Email-Client als Fallback wird geoeffnet...",
    contact_info_title: "Kontaktinfo",
    contact_email_title: "Email",
    contact_phone_title: "Telefon",
    contact_avail_title: "Verfuegbarkeit",
    contact_avail_body: "Neue Projekte moeglich. Limitierte Slots.",
    contact_timezones_title: "Weltuhren",
    clock_ny: "New York",
    clock_ldn: "London",
    clock_paris: "Paris",
    clock_tokyo: "Tokio",
    floating_quote: "Angebot"
  }
};

let currentLang = "EN";

const applyTranslations = (lang) => {
  const dictionary = translations[lang] || translations.EN;
  currentLang = lang;
  document.documentElement.lang = lang.toLowerCase();
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      node.setAttribute("placeholder", dictionary[key]);
    }
  });
};

const t = (key) => {
  const active = translations[currentLang] || translations.EN;
  return active[key] || translations.EN[key] || "";
};

const initClocks = () => {
  const clockNodes = Array.from(document.querySelectorAll("[data-clock]"));
  if (!clockNodes.length) return;

  const formatTime = (zone) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: zone
    }).format(new Date());

  const updateClocks = () => {
    clockNodes.forEach((node) => {
      node.textContent = formatTime(node.dataset.clock);
    });
  };

  updateClocks();
  setInterval(updateClocks, 1000 * 30);
};

const initTrendCounter = () => {
  const trendNode = document.querySelector(".chart-trend");
  if (!trendNode) return;
  const baseValue = 128;
  let current = 0;
  const duration = 3500;

  const tick = () => {
    current += 1;
    if (current > baseValue) current = baseValue;
    trendNode.textContent = `+${current}%`;
  };

  const animate = () => {
    current = 0;
    const stepMs = Math.max(20, Math.floor(duration / baseValue));
    const interval = setInterval(() => {
      tick();
      if (current >= baseValue) {
        clearInterval(interval);
      }
    }, stepMs);
  };

  animate();
};

const init = () => {
  initTheme();
  initFloatingQuote();

  if (languageSelect) {
    const storedLang = localStorage.getItem("tempdev-lang") || "EN";
    const trigger = languageSelect.querySelector(".lang-trigger");
    const label = languageSelect.querySelector(".lang-label");
    const options = Array.from(languageSelect.querySelectorAll("[data-lang]"));

    const setLang = (lang) => {
      label.textContent = lang;
      options.forEach((option) => {
        option.classList.toggle("active", option.dataset.lang === lang);
      });
      localStorage.setItem("tempdev-lang", lang);
      applyTranslations(lang);
    };

    setLang(storedLang);

    trigger.addEventListener("click", () => {
      const isOpen = languageSelect.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        setLang(option.dataset.lang);
        languageSelect.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!languageSelect.contains(event.target)) {
        languageSelect.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        languageSelect.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  initClocks();
  initTrendCounter();
  initHeaderHide();

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const budget = formData.get("budget");
      const projectType = formData.get("project-type");
      const details = formData.get("details");
      const status = document.getElementById("contact-status");
      if (status) status.textContent = t("contact_sending");

      const subject = `New project inquiry from ${name || "TempDev.xyz"}`;
      const body = [
        `Name: ${name || ""}`,
        `Email: ${email || ""}`,
        `Budget: ${budget || ""}`,
        `Project type: ${projectType || ""}`,
        "",
        "Details:",
        details || ""
      ].join("\n");

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          budget,
          projectType,
          details
        })
      })
        .then((response) => {
          if (!response.ok) throw new Error("Request failed");
          return response.json();
        })
        .then((payload) => {
          if (status) {
            const message = t("contact_success").replace(
              "{ticket}",
              payload.ticket || ""
            );
            status.textContent = message.trim();
          }
          contactForm.reset();
        })
        .catch(() => {
          if (status) {
            status.textContent = t("contact_fallback");
          }
          const mailto = `mailto:info@tempdev.xyz?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;
          window.location.href = mailto;
        });
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
      setTheme(nextTheme);
    });
  }
};

init();

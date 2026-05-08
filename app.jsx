/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSelect, TweakToggle */
const { useState, useEffect, useRef } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#3d4a3d", "#d8cfc0", "#f5f1ea"],
  "accent": "#3d4a3d",
  "headingFont": "Cormorant Garamond",
  "bodyFont": "Inter",
  "darkHero": true,
  "showWhatsapp": true,
  "whatsappNumber": "5511984080770",
  "whatsappMessage": "Olá Andrea! Vim pelo site e gostaria de agendar uma conversa."
}/*EDITMODE-END*/;

const PALETTES = [
  ["#3d4a3d", "#d8cfc0", "#f5f1ea"], // sage + sand
  ["#2d4a5c", "#c4b8a8", "#faf7f2"], // navy + warm gray
  ["#7a5a3f", "#e8d9c4", "#fbf6ee"], // terracotta + cream
  ["#5b4b6b", "#d4c5d0", "#f7f3f5"], // muted plum
  ["#1f2937", "#9ca3af", "#ffffff"], // editorial mono
];

const HEADING_FONTS = ["Cormorant Garamond", "Fraunces", "EB Garamond", "Playfair Display", "DM Serif Display"];
const BODY_FONTS = ["Inter", "DM Sans", "Manrope", "Work Sans", "Source Sans 3"];

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [waName, setWaName] = useState("");

  const dark = t.palette[0];
  const mid = t.palette[1];
  const light = t.palette[2];
  const accent = t.accent || dark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--c-dark", dark);
    root.style.setProperty("--c-mid", mid);
    root.style.setProperty("--c-light", light);
    root.style.setProperty("--c-accent", accent);
    root.style.setProperty("--font-heading", `"${t.headingFont}", serif`);
    root.style.setProperty("--font-body", `"${t.bodyFont}", system-ui, sans-serif`);
  }, [dark, mid, light, accent, t.headingFont, t.bodyFont]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="page" data-screen-label="01 Home">
      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <button className="nav__brand" onClick={() => scrollTo("hero")} aria-label="Andrea do Val — Psicóloga">
            <img src="logo-andrea.png" alt="Andrea do Val" className="nav__brand-logo" />
          </button>
          <div className="nav__links">
            <button onClick={() => scrollTo("sobre")}>Sobre</button>
            <button onClick={() => scrollTo("atuacao")}>Atuação</button>
            <button onClick={() => scrollTo("como")}>Como funciona</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <button className="nav__cta" onClick={() => scrollTo("contato")}>Agendar conversa</button>
          </div>
          <button className="nav__menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        {menuOpen && (
          <div className="nav__mobile">
            <button onClick={() => scrollTo("sobre")}>Sobre</button>
            <button onClick={() => scrollTo("atuacao")}>Atuação</button>
            <button onClick={() => scrollTo("como")}>Como funciona</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <button onClick={() => scrollTo("contato")}>Agendar conversa</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className={`hero ${t.darkHero ? "hero--dark" : "hero--light"}`} id="hero" data-screen-label="Hero">
        <div className="hero__grid">
          <div className="hero__copy">
            <div className="hero__eyebrow">
              <span className="hero__dot"></span>
              Atendimento online · CRP 06/303379
            </div>
            <h1 className="hero__title">
              Um espaço para <em>respirar</em>, se ouvir e <em>recomeçar</em>.
            </h1>
            <p className="hero__lead">
              Psicoterapia online para adultos e idosos. Atendimento por videochamada,
              com escuta atenta, ética e acolhimento — onde você estiver.
            </p>
            <div className="hero__ctas">
              <button className="btn btn--primary" onClick={() => scrollTo("contato")}>
                Agendar primeira conversa
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <button className="btn btn--ghost" onClick={() => scrollTo("sobre")}>
                Conhecer Andrea
              </button>
            </div>
            <div className="hero__trust">
              <div className="hero__trust-item">
                <strong>Longa</strong>
                <span>experiência em prática clínica</span>
              </div>
              <div className="hero__trust-divider"></div>
              <div className="hero__trust-item">
                <strong>100%</strong>
                <span>online · seguro · sigiloso</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__photo">
              <div className="hero__photo-inner">
                <img src="andrea-foto.png" alt="Andrea do Val, psicóloga, sorrindo" className="hero__photo-img" />
              </div>
              <div className="hero__photo-logo">
                <img src="logo-andrea.png" alt="Andrea do Val · Psicóloga · CRP-SP 06/303379" />
              </div>
              <div className="hero__photo-tag">
                <div className="hero__photo-tag-dot"></div>
                <div>
                  <div className="hero__photo-tag-label">Disponível esta semana</div>
                  <div className="hero__photo-tag-sub">Horários segunda a sexta</div>
                </div>
              </div>
            </div>
            <div className="hero__shape hero__shape--1"></div>
            <div className="hero__shape hero__shape--2"></div>
          </div>
        </div>

        <div className="hero__marquee" aria-hidden="true">
          <div className="hero__marquee-track">
            {Array(2).fill(0).map((_, k) => (
              <div className="hero__marquee-row" key={k}>
                <span>Ansiedade</span><span>•</span>
                <span>Luto</span><span>•</span>
                <span>Aposentadoria</span><span>•</span>
                <span>Relacionamentos</span><span>•</span>
                <span>Autoestima</span><span>•</span>
                <span>Envelhecimento</span><span>•</span>
                <span>Cuidado de pais idosos</span><span>•</span>
                <span>Transições de vida</span><span>•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="sobre" id="sobre" data-screen-label="Sobre">
        <div className="container sobre__grid">
          <div className="sobre__label">
            <div className="section-label">
              <span className="section-label__num">01</span>
              <span className="section-label__text">Sobre</span>
            </div>
          </div>
          <div className="sobre__copy">
            <h2 className="h2">
              Cada pessoa carrega uma história. <span className="h2__accent">Minha escuta começa por aí.</span>
            </h2>
            <div className="sobre__body">
              <p>
                Sou Andrea do Val, psicóloga clínica com longa experiência
                em atendimento a adultos e idosos. Trabalho a partir de uma escuta cuidadosa,
                ética e construída em parceria — sem fórmulas prontas.
              </p>
              <p>
                Meu trabalho parte da ideia de que falar é, em si, um ato terapêutico — desde que
                exista um espaço seguro para isso. É esse espaço que ofereço: confidencial,
                acolhedor, e adaptado ao seu ritmo.
              </p>
            </div>
            <div className="sobre__creds">
              <div className="sobre__cred">
                <div className="sobre__cred-key">CRP</div>
                <div className="sobre__cred-val">06/303379</div>
              </div>
              <div className="sobre__cred">
                <div className="sobre__cred-key">Formação</div>
                <div className="sobre__cred-val">Psicologia Clínica</div>
              </div>
              <div className="sobre__cred">
                <div className="sobre__cred-key">Atende</div>
                <div className="sobre__cred-val">Adultos · Idosos</div>
              </div>
              <div className="sobre__cred">
                <div className="sobre__cred-key">Horários</div>
                <div className="sobre__cred-val">Segunda a sexta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATUAÇÃO */}
      <section className="atuacao" id="atuacao" data-screen-label="Atuação">
        <div className="container">
          <div className="section-head">
            <div className="section-label section-label--light">
              <span className="section-label__num">02</span>
              <span className="section-label__text">Áreas de atuação</span>
            </div>
            <h2 className="h2 h2--light">
              Quando procurar.<br/>
              <span className="h2__accent">O que trabalhamos juntos.</span>
            </h2>
          </div>

          <div className="atuacao__grid">
            {[
              { t: "Ansiedade & estresse", d: "Pensamentos acelerados, insônia, sensação constante de cobrança ou de não dar conta." },
              { t: "Luto & perdas", d: "Lidar com a ausência de alguém querido, ou com perdas simbólicas — papéis, projetos, tempo." },
              { t: "Envelhecer com sentido", d: "Aposentadoria, mudanças no corpo, no papel familiar, e a busca por um lugar próprio nessa fase." },
              { t: "Cuidar de quem cuida", d: "Filhos e familiares cuidadores de idosos — o peso, a culpa, o cansaço, e o direito ao próprio cuidado." },
              { t: "Relações & vínculos", d: "Conflitos familiares, dificuldades em relacionamentos, padrões que se repetem." },
              { t: "Transições de vida", d: "Mudanças, separações, decisões grandes — e a sensação de estar 'entre' duas vidas." },
            ].map((c, i) => (
              <article className="card" key={i}>
                <div className="card__num">{String(i+1).padStart(2,"0")}</div>
                <h3 className="card__title">{c.t}</h3>
                <p className="card__desc">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="como" id="como" data-screen-label="Como funciona">
        <div className="container">
          <div className="section-head">
            <div className="section-label">
              <span className="section-label__num">03</span>
              <span className="section-label__text">Como funciona</span>
            </div>
            <h2 className="h2">
              Atendimento online,<br/>
              <span className="h2__accent">do conforto de onde você estiver.</span>
            </h2>
          </div>

          <div className="como__steps">
            {[
              { n: "01", t: "Primeiro contato", d: "Entre em contato comigo por WhatsApp. Combinamos um horário para uma conversa inicial, sem compromisso." },
              { n: "02", t: "Duração da sessão", d: "As sessões podem ser de 30 ou 50 minutos, conforme o que faz mais sentido pra você." },
              { n: "03", t: "Acompanhamento", d: "Frequência escolhida pelo paciente, em dia e horário fixos, por uma plataforma de vídeo segura. Sigilo absoluto." },
            ].map((s) => (
              <div className="como__step" key={s.n}>
                <div className="como__step-num">{s.n}</div>
                <div className="como__step-content">
                  <h3 className="como__step-title">{s.t}</h3>
                  <p className="como__step-desc">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="como__features">
            <div className="como__feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2v8l-4-2z"/></svg>
              <div>
                <strong>Videochamada</strong>
                <span>Plataforma segura, sem instalações complicadas.</span>
              </div>
            </div>
            <div className="como__feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <div>
                <strong>Horário fixo semanal</strong>
                <span>Continuidade é parte do trabalho terapêutico.</span>
              </div>
            </div>
            <div className="como__feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <strong>Sigilo & ética</strong>
                <span>Conduta regulada pelo Conselho Federal de Psicologia.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq" data-screen-label="FAQ">
        <div className="container faq__grid">
          <div className="faq__head">
            <div className="section-label">
              <span className="section-label__num">04</span>
              <span className="section-label__text">Perguntas frequentes</span>
            </div>
            <h2 className="h2">
              É normal ter dúvidas <span className="h2__accent">antes de começar.</span>
            </h2>
            <p className="faq__intro">
              Se a sua não estiver aqui, me escreva. Respondo pessoalmente todos os contatos.
            </p>
          </div>
          <div className="faq__list">
            {[
              { q: "Atendimento online funciona mesmo?", a: "Sim. A pesquisa em psicologia clínica mostra que a terapia por videochamada tem eficácia comparável ao atendimento presencial, desde que feita por profissional qualificado e em ambiente adequado dos dois lados." },
              { q: "E se eu não souber muito de tecnologia?", a: "Tudo é simples — basta um celular, tablet ou computador com câmera, e uma conexão estável. No primeiro contato eu te explico o passo a passo, sem pressa." },
              { q: "Quanto tempo dura a terapia?", a: "Não existe uma resposta única. Algumas pessoas vêm para um momento específico, outras seguem por anos. Conversamos sobre isso ao longo do processo, sem nenhum compromisso de continuidade que não faça sentido pra você." },
              { q: "Atende pelo plano de saúde?", a: "O atendimento é particular." },
            ].map((f, i) => (
              <button
                className={`faq__item ${openFaq === i ? "faq__item--open" : ""}`}
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <div className="faq__q">
                  <span>{f.q}</span>
                  <span className="faq__icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={openFaq === i ? "M5 12h14" : "M12 5v14M5 12h14"}/>
                    </svg>
                  </span>
                </div>
                <div className="faq__a">
                  <p>{f.a}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="contato" id="contato" data-screen-label="Contato">
        <div className="container contato__grid">
          <div className="contato__copy">
            <div className="section-label section-label--light">
              <span className="section-label__num">05</span>
              <span className="section-label__text">Vamos conversar</span>
            </div>
            <h2 className="h2 h2--light">
              Dar o primeiro passo<br/>
              <span className="h2__accent">já é parte do cuidado.</span>
            </h2>
            <p className="contato__lead">
              Me conte brevemente o que te trouxe até aqui. Respondo pessoalmente em até 48 horas.
            </p>
            <div className="contato__channels">
              <a href="mailto:andreafval@gmail.com" className="contato__channel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                <div>
                  <span className="contato__channel-key">E-mail</span>
                  <span className="contato__channel-val">andreafval@gmail.com</span>
                </div>
              </a>
              <div className="contato__channel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <span className="contato__channel-key">CRP</span>
                  <span className="contato__channel-val">06/303379</span>
                </div>
              </div>
              <div className="contato__channel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <div>
                  <span className="contato__channel-key">Atendimento</span>
                  <span className="contato__channel-val">Segunda a sexta · sob agenda</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contato__cta-wrap">
            <div className="contato__cta">
              <div className="contato__cta-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="contato__cta-title">Fale comigo no WhatsApp</h3>
              <p className="contato__cta-desc">É a forma mais rápida de chegar até mim. Te respondo pessoalmente.</p>
              <button
                type="button"
                className="contato__cta-btn"
                onClick={() => setWaOpen(true)}
              >
                Iniciar conversa
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="logo-andrea.png" alt="Andrea do Val" className="footer__brand-logo" />
          </div>
          <div className="footer__copy">
            © 2026 Psicóloga Andrea do Val — Atendimento online.<br/>
            Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      {t.showWhatsapp && (
        <button
          className="wa-float"
          onClick={() => setWaOpen(true)}
          aria-label="Conversar pelo WhatsApp"
          title="Conversar pelo WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </button>
      )}

      {/* WHATSAPP PROMPT MODAL */}
      {waOpen && (
        <div className="wa-modal" onClick={() => setWaOpen(false)}>
          <div className="wa-modal__panel" onClick={(e) => e.stopPropagation()}>
            <button className="wa-modal__close" onClick={() => setWaOpen(false)} aria-label="Fechar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="wa-modal__icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <h3 className="wa-modal__title">Vamos conversar pelo WhatsApp</h3>
            <p className="wa-modal__lead">Como posso te chamar? Preparo uma mensagem inicial pra você.</p>
            <form
              className="wa-modal__form"
              onSubmit={(e) => {
                e.preventDefault();
                const nome = waName.trim();
                if (!nome) return;
                const msg = `Olá Andrea, meu nome é ${nome}. Vim pelo seu site e gostaria de agendar uma conversa.`;
                const url = `https://wa.me/${t.whatsappNumber}?text=${encodeURIComponent(msg)}`;
                window.open(url, "_blank", "noopener,noreferrer");
                setWaOpen(false);
                setWaName("");
              }}
            >
              <input
                className="wa-modal__input"
                type="text"
                placeholder="Seu nome"
                value={waName}
                onChange={(e) => setWaName(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="wa-modal__submit" disabled={!waName.trim()}>
                Abrir WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
            <p className="wa-modal__note">Você será direcionado(a) ao WhatsApp com uma mensagem pronta.</p>
          </div>
        </div>
      )}

      {/* TWEAKS */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Paleta">
          <TweakColor
            label="Cores principais"
            value={t.palette}
            onChange={(v) => setTweak({ palette: v, accent: v[0] })}
            options={PALETTES}
          />
        </TweakSection>
        <TweakSection title="Tipografia">
          <TweakSelect
            label="Fonte títulos"
            value={t.headingFont}
            options={HEADING_FONTS}
            onChange={(v) => setTweak("headingFont", v)}
          />
          <TweakSelect
            label="Fonte texto"
            value={t.bodyFont}
            options={BODY_FONTS}
            onChange={(v) => setTweak("bodyFont", v)}
          />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakToggle
            label="Hero escuro"
            value={t.darkHero}
            onChange={(v) => setTweak("darkHero", v)}
          />
          <TweakToggle
            label="Botão WhatsApp"
            value={t.showWhatsapp}
            onChange={(v) => setTweak("showWhatsapp", v)}
          />
        </TweakSection>
        <TweakSection title="WhatsApp">
          <TweakText
            label="Número (DDI+DDD+número)"
            value={t.whatsappNumber}
            onChange={(v) => setTweak("whatsappNumber", v)}
          />
          <TweakText
            label="Mensagem inicial"
            value={t.whatsappMessage}
            onChange={(v) => setTweak("whatsappMessage", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

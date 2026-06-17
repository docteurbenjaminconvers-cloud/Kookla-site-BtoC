import styles from './landing.module.css';

const BEFORE = [
  "Appeler 5 centres pour comparer les prix",
  "Attendre des jours pour une réponse",
  "Impossible de comparer les technologies laser",
  "Aucune visibilité sur les vraies disponibilités",
  "Zéro fidélité — tout recommencer à chaque fois",
];

const AFTER = [
  "Tous les centres comparés en une seule page",
  "Réservation confirmée en moins de 2 minutes",
  "Prix, technologie et avis — tout transparent",
  "Agendas réels synchronisés, sans appel",
  "Des KCoins gagnés à chaque séance",
];

const TESTIMONIALS = [
  {
    initials: "SM",
    name: "Sophie M.",
    location: "Paris 9e",
    quote:
      "J'ai réservé ma séance aisselles en 3 minutes depuis mon canapé. Le centre était impeccable et j'ai gagné des KCoins pour la prochaine fois !",
  },
  {
    initials: "CR",
    name: "Camille R.",
    location: "Paris 15e",
    quote:
      "Enfin un outil qui permet de comparer les prix honnêtement. J'ai économisé 40€ sur mon forfait jambes complètes. Merci Kookla !",
  },
  {
    initials: "LD",
    name: "Léa D.",
    location: "Paris 11e",
    quote:
      "Le système de KCoins c'est brillant. J'ai parrainé ma sœur et on a toutes les deux eu une réduction sur notre prochaine séance.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={`${styles.container} ${styles.navInner}`}>
          <div className={styles.logo}>
            <span className={styles.logoDot} />
            kookla
          </div>
          <div className={styles.navLinks}>
            <a href="#comment">Comment ça marche</a>
            <a href="#avantages">Avantages</a>
            <a href="#pro">Pour les centres</a>
          </div>
          <a
            href="https://kookla.fr"
            className={styles.btnGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            Je gère un centre →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgePulse} />
            Lancement Paris — Été 2026
          </div>

          <h1 className={styles.heroH1}>
            L&apos;épilation laser,<br />
            <span className={styles.gradientText}>enfin simple.</span>
          </h1>

          <p className={styles.heroSub}>
            Kookla réunit les meilleurs centres laser de Paris sur une seule plateforme.
            Comparez, réservez et payez en&nbsp;2&nbsp;minutes — sans appel, sans galère.
          </p>

          <div className={styles.heroCtas}>
            <a
              href="https://kookla.fr"
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔍 Trouver mon centre
            </a>
            <a href="#pro" className={styles.btnGhost}>
              Je gère un centre →
            </a>
          </div>

          <div className={styles.heroTrust}>
            <span>⭐ Note 4,9/5</span>
            <span className={styles.trustDot} />
            <span>50+ centres partenaires</span>
            <span className={styles.trustDot} />
            <span>🔒 Paiement sécurisé Stripe</span>
            <span className={styles.trustDot} />
            <span>Gratuit pour les clientes</span>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className={styles.statsStrip}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {[
              { num: "2 min", lbl: "pour réserver" },
              { num: "50+",   lbl: "centres à Paris" },
              { num: "4,9★",  lbl: "note moyenne" },
              { num: "0 €",   lbl: "pour les clientes" },
            ].map(({ num, lbl }) => (
              <div key={lbl}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLbl}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.section} id="comment">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowPink}`}>
              Comment ça marche
            </div>
            <h2 className={styles.sectionTitle}>
              Réservez en 3 étapes,<br />
              <span className={styles.gradientText}>pas en 3 jours.</span>
            </h2>
            <p className={styles.sectionSub}>
              Tout ce qu&apos;il faut pour réserver votre séance, rien de superflu.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {[
              {
                no: "Étape 01",
                icon: "🗺️",
                title: "Comparez",
                desc: "Sélectionnez vos zones, entrez votre arrondissement. Kookla affiche tous les centres disponibles avec prix réels, technologie et avis vérifiés.",
              },
              {
                no: "Étape 02",
                icon: "📅",
                title: "Réservez",
                desc: "Choisissez votre créneau, payez en ligne en toute sécurité. Le centre est prévenu instantanément — vous recevez une confirmation immédiate.",
              },
              {
                no: "Étape 03",
                icon: "🪙",
                title: "Gagnez",
                desc: "Chaque séance vous rapporte des KCoins (1 KCoin = 1€). Parrainez vos amies, doublez vos gains, payez moins cher la prochaine fois.",
              },
            ].map(({ no, icon, title, desc }) => (
              <div key={title} className={styles.stepCard}>
                <span className={styles.stepNo}>{no}</span>
                <div className={styles.stepIcon}>{icon}</div>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={`${styles.section} ${styles.altBg}`} id="avantages">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowTeal}`}>
              Pourquoi Kookla
            </div>
            <h2 className={styles.sectionTitle}>
              Une expérience conçue<br />pour vous.
            </h2>
            <p className={styles.sectionSub}>
              Chaque fonctionnalité a été pensée pour vous faire gagner du temps et de l&apos;argent.
            </p>
          </div>

          <div className={styles.featsGrid}>
            {[
              {
                icon: "🗓️",
                title: "Disponibilités en temps réel",
                desc: "Fini les créneaux fantômes. Les disponibilités que vous voyez sont synchronisées en direct avec l'agenda du centre.",
                accent: false,
              },
              {
                icon: "🔒",
                title: "Paiement 100% sécurisé",
                desc: "Paiement via Stripe, le standard mondial. Vos données bancaires ne transitent jamais par Kookla.",
                accent: false,
              },
              {
                icon: "🪙",
                title: "Programme KCoins",
                desc: "Gagnez des KCoins à chaque séance et pour chaque amie parrainée. Utilisez-les comme réduction sur vos prochaines visites.",
                accent: true,
              },
              {
                icon: "⭐",
                title: "Avis clients certifiés",
                desc: "Seules les vraies clientes ayant réservé via Kookla peuvent noter un centre. Zéro faux avis, zéro manipulation.",
                accent: false,
              },
            ].map(({ icon, title, desc, accent }) => (
              <div
                key={title}
                className={`${styles.featCard} ${accent ? styles.featCardAccent : ""}`}
              >
                <span className={styles.featIcon}>{icon}</span>
                <h3 className={styles.featTitle}>{title}</h3>
                <p className={styles.featDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowPink}`}>
              Avant / Après
            </div>
            <h2 className={styles.sectionTitle}>
              La différence{' '}
              <span className={styles.gradientText}>parle d&apos;elle-même.</span>
            </h2>
            <p className={styles.sectionSub}>
              Voici ce que Kookla change concrètement dans votre quotidien.
            </p>
          </div>

          <div className={styles.compGrid}>
            <div className={`${styles.compCard} ${styles.compBefore}`}>
              <div className={styles.compHead}>
                <span>😩</span> Sans Kookla
              </div>
              <div className={styles.compItems}>
                {BEFORE.map((text) => (
                  <div key={text} className={`${styles.compRow} ${styles.compRowBefore}`}>
                    <span className={`${styles.compBadge} ${styles.badgeX}`}>✕</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.compCard} ${styles.compAfter}`}>
              <div className={styles.compHead}>
                <span>✨</span> Avec Kookla
              </div>
              <div className={styles.compItems}>
                {AFTER.map((text) => (
                  <div key={text} className={`${styles.compRow} ${styles.compRowAfter}`}>
                    <span className={`${styles.compBadge} ${styles.badgeCheck}`}>✓</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRO ── */}
      <section className={`${styles.section} ${styles.altBg}`} id="pro">
        <div className={styles.container}>
          <div className={styles.proCard}>
            <div className={`${styles.proBlob} ${styles.proBlob1}`} />
            <div className={`${styles.proBlob} ${styles.proBlob2}`} />
            <div className={styles.proInner}>
              <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>
                ✦ Kookla Pro
              </div>
              <h2 className={styles.proTitle}>
                Vous gérez un centre laser<br />à Paris&nbsp;?
              </h2>
              <p className={styles.proSub}>
                Rejoignez la première marketplace 100&nbsp;% dédiée à l&apos;épilation laser en France.
                Agenda en ligne, paiement automatisé, visibilité immédiate — Kookla ne prend
                une commission que quand vous encaissez.
              </p>
              <div className={styles.proStats}>
                {[
                  { num: "0 €", lbl: "Abonnement mensuel" },
                  { num: "25%", lbl: "Commission à la réservation" },
                  { num: "48h", lbl: "Pour être en ligne" },
                ].map(({ num, lbl }) => (
                  <div key={lbl}>
                    <span className={styles.proStatNum}>{num}</span>
                    <span className={styles.proStatLbl}>{lbl}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://kookla.fr"
                className={styles.btnViolet}
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Inscrire mon centre gratuitement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowTeal}`}>
              Elles en parlent
            </div>
            <h2 className={styles.sectionTitle}>
              Des vraies Parisiennes,<br />de vrais avis.
            </h2>
            <p className={styles.sectionSub}>
              Seules les clientes ayant réservé via Kookla peuvent laisser un avis.
            </p>
          </div>

          <div className={styles.testimGrid}>
            {TESTIMONIALS.map(({ initials, name, location, quote }) => (
              <div key={name} className={styles.testimCard}>
                <span className={styles.stars}>★★★★★</span>
                <p className={styles.testimQuote}>&ldquo;{quote}&rdquo;</p>
                <div className={styles.testimAuthor}>
                  <div className={styles.avatar}>{initials}</div>
                  <div>
                    <div className={styles.authorName}>{name}</div>
                    <div className={styles.authorLoc}>{location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={`${styles.section}`}>
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBlob1} />
            <div className={styles.ctaBlob2} />
            <div className={styles.ctaInner}>
              <div className={`${styles.eyebrow} ${styles.eyebrowTeal}`} style={{ marginBottom: 16 }}>
                Paris vous attend
              </div>
              <h2 className={styles.ctaTitle}>
                Prête à rayonner&nbsp;?<br />
                <span className={styles.gradientText}>Rejoignez Kookla.</span>
              </h2>
              <p className={styles.ctaSub}>
                Les premières Parisiennes sont déjà inscrites. Trouvez votre centre
                laser idéal en moins de 2&nbsp;minutes.
              </p>
              <a
                href="https://kookla.fr"
                className={styles.btnPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔍 Trouver mon centre laser →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerRow}>
            <div className={styles.footerLogo}>
              <span className={styles.logoDot} />
              kookla
            </div>
            <div className={styles.footerLinks}>
              <a href="https://kookla.fr" target="_blank" rel="noopener noreferrer">
                kookla.fr
              </a>
              <a href="#comment">Comment ça marche</a>
              <a href="#avantages">Avantages</a>
              <a href="#pro">Kookla Pro</a>
            </div>
          </div>
          <div className={styles.footerCopy}>
            © 2026 Kookla SAS — La marketplace de l&apos;épilation laser en France ·
            Conçu &amp; développé à Paris 🗼
          </div>
        </div>
      </footer>

    </div>
  );
}

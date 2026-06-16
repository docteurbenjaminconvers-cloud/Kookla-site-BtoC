'use client';

import { useEffect } from 'react';
import styles from './landing.module.css';

export default function Home() {
  useEffect(() => {
    const colors = ['#FF4D8D', '#FFD23F', '#2EC4B6', '#6C3FC5'];
    const bg = document.getElementById('confettiBg');
    if (!bg) return;
    for (let i = 0; i < 24; i++) {
      const dot = document.createElement('span');
      const size = 6 + Math.random() * 10;
      dot.style.cssText = `position:absolute;border-radius:50%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${(0.12 + Math.random() * 0.18).toFixed(2)};`;
      bg.appendChild(dot);
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.confettiBg} id="confettiBg" />

      {/* ── NAV ── */}
      <div className={styles.wrap}>
        <header className={styles.navHeader}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <span className={styles.logoDot} />
              kookla
            </div>
            <a
              href="https://kookla.fr"
              className={styles.navPro}
              target="_blank"
              rel="noopener noreferrer"
            >
              Je suis un centre →
            </a>
          </nav>
        </header>
      </div>

      {/* ── HERO ── */}
      <section className={`${styles.hero} ${styles.wrap}`}>
        <span className={`${styles.mascot} ${styles.m1}`}>✨</span>
        <span className={`${styles.mascot} ${styles.m2}`}>💖</span>
        <span className={`${styles.mascot} ${styles.m3}`}>⚡</span>
        <span className={`${styles.mascot} ${styles.m4}`}>🌟</span>

        <div className={styles.badgeEyebrow}>
          <span>🎉</span> On est en ligne !
        </div>

        <h1>
          Réservez votre épilation laser<br />
          sans <span className={styles.hl}>galérer</span>, sans{' '}
          <span className={styles.hl2}>appeler</span>.
        </h1>

        <p className={styles.sub}>
          Kookla compare les centres laser près de vous, réserve votre séance en 2
          clics et vous fait gagner des KCoins à chaque visite. Simple comme bonjour.
        </p>

        <div className={styles.ctaRow}>
          <a
            href="https://kookla.fr"
            className={`${styles.btn} ${styles.btnPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🔍 Trouver mon centre
          </a>
          <a
            href="https://kookla.fr"
            className={`${styles.btn} ${styles.btnSecondary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🏢 Kookla Pro, pour les centres
          </a>
        </div>
        <p className={styles.microNote}>
          Gratuit pour les clientes · Aucune carte bancaire requise pour chercher
        </p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={`${styles.section} ${styles.wrap}`} id="comment">
        <h2 className={styles.sectionTitle}>
          Comment ça marche,{' '}
          <span className={styles.hl}>en vrai&nbsp;?</span>
        </h2>
        <p className={styles.sectionSub}>
          Trois étapes, zéro friction. Voilà tout ce qu&apos;il faut savoir sur
          Kookla.
        </p>

        <div className={styles.cards3}>
          <div className={styles.card}>
            <div className={styles.emojiBadge}>🗺️</div>
            <h3>1. Comparez</h3>
            <p>
              Choisissez votre zone à épiler, on vous montre tous les centres laser
              autour de vous&nbsp;: prix, avis, disponibilités. Plus besoin
              d&apos;appeler dix numéros.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.emojiBadge}>📅</div>
            <h3>2. Réservez &amp; payez</h3>
            <p>
              Vous choisissez votre créneau, vous payez en ligne en toute sécurité.
              Le centre est prévenu instantanément, vous n&apos;avez plus rien à
              faire.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.emojiBadge}>🪙</div>
            <h3>3. Cumulez des KCoins</h3>
            <p>
              Chaque séance vous rapporte des KCoins (1 KCoin = 1€). Parrainez vos
              copines, gagnez-en encore plus, et payez moins cher la prochaine fois.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className={`${styles.section} ${styles.wrap}`}>
        <div className={styles.compareWrap}>
          <div className={styles.compareGrid}>
            <div className={`${styles.compareCol} ${styles.lose}`}>
              <h4>😩 Avant Kookla</h4>
              <ul>
                <li>Appeler 5 centres pour comparer les prix</li>
                <li>Attendre une réponse par mail ou par tel</li>
                <li>Aucune visibilité sur les disponibilités réelles</li>
                <li>Aucune fidélité, on repart à zéro chaque fois</li>
              </ul>
            </div>
            <div className={`${styles.compareCol} ${styles.win}`}>
              <h4>🎉 Avec Kookla</h4>
              <ul>
                <li>Tous les centres comparés en une seule page</li>
                <li>Réservation confirmée en moins de 2 minutes</li>
                <li>Agendas réels, à jour, sans appel</li>
                <li>Des KCoins gagnés à chaque séance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRO ── */}
      <section className={`${styles.section} ${styles.wrap}`} id="pro">
        <div className={styles.proSection}>
          <span className={styles.proTag}>KOOKLA PRO</span>
          <h2>Vous gérez un centre laser&nbsp;?</h2>
          <p>
            Rejoignez la première marketplace 100&nbsp;% dédiée à l&apos;épilation
            laser en France. Visibilité gratuite, agenda en ligne, paiement
            automatisé, zéro charge fixe&nbsp;: Kookla ne prend une commission que
            quand vous encaissez.
          </p>
          <div className={styles.proStats}>
            <div className={styles.proStat}>
              <div className={styles.num}>0€</div>
              <div className={styles.lbl}>Abonnement</div>
            </div>
            <div className={styles.proStat}>
              <div className={styles.num}>25%</div>
              <div className={styles.lbl}>Commission, uniquement à la réservation</div>
            </div>
            <div className={styles.proStat}>
              <div className={styles.num}>48h</div>
              <div className={styles.lbl}>Pour être visible</div>
            </div>
          </div>
          <a
            href="https://kookla.fr"
            className={`${styles.btn} ${styles.btnWhite}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Inscrire mon centre sur Kookla
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`${styles.footer} ${styles.wrap}`}>
        <div className={styles.footerTagline}>kookla — Connecting Beauty</div>
        <div className={styles.footerLinks}>
          <a
            href="https://kookla.fr"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 kookla.fr
          </a>
          <a
            href="https://kookla.fr"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            🏢 Kookla Pro
          </a>
        </div>
        <div className={styles.footerCopy}>
          © 2026 Kookla — La marketplace de l&apos;épilation laser en France
        </div>
      </footer>
    </div>
  );
}

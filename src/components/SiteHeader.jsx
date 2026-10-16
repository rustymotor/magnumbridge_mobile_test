import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      const currentScrollY = window.scrollY;
      header.style.transform = currentScrollY > previousScrollY && currentScrollY > 80 ? "translateY(-100%)" : "translateY(0)";
      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="header home-header" ref={headerRef}>
        <div className="header-inner">
          <a href="/" className="logo" aria-label="메인 페이지로 이동" style={{ flexDirection: "row" }}>
            <img className="logo-image" src="/assets/logo-header-mo.svg" alt="Magnumbridge" />
          </a>
          {/* <nav className="desktop-nav">
            <a href="/platform-solution">Business</a>
            <a href="/#company">Company</a>
            <a href="/#footer">Recruit</a>
          </nav> */}
          <button className="menu-button" aria-label="사이트맵 열기" onClick={() => setMenuOpen(true)}>
            ≡
          </button>
        </div>
      </header>
      {menuOpen && <Sitemap onClose={() => setMenuOpen(false)} />}
    </>
  );
}

function Sitemap({ onClose }) {
  return (
    <div className="sitemap" role="dialog" aria-modal="true" aria-label="사이트맵">
      <div className="sitemap-top">
        <strong>SITEMAP</strong>
        <button type="button" aria-label="사이트맵 닫기" onClick={onClose}>
          ×
        </button>
      </div>
      <nav className="sitemap-nav">
        <section>
          <h2>Business</h2>
          <div className="sitemap-links">
            <a href="/platform-solution" onClick={onClose}>
              Platform &amp; Solution
            </a>
            <a href="/product" onClick={onClose}>
              Product
            </a>
            <a href="/it-service" onClick={onClose}>
              IT Service
            </a>
          </div>
        </section>
        <section>
          <h2>Company</h2>
          <div className="sitemap-links">
            <a href="/about-magnumbridge" onClick={onClose}>
              About Magnumbridge
            </a>
            <a href="/customer-partner" onClick={onClose}>
              Customer &amp; Partner
            </a>
            <a href="/vision-mission" onClick={onClose}>
              Vision &amp; Mission
            </a>
            <a href="/history" onClick={onClose}>
              History
            </a>
            <a href="/qa" onClick={onClose}>
              Q&amp;A
            </a>
          </div>
        </section>
        <section>
          <h2>Recruit</h2>
          <div className="sitemap-links">
            <a href="/ideal-employee" onClick={onClose}>
              Ideal employee
            </a>
            <a href="/benefit" onClick={onClose}>
              Recruitment
            </a>
            <a href="/recruitment" onClick={onClose}>
              My Application
            </a>
          </div>
        </section>
      </nav>
    </div>
  );
}

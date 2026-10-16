import { useState } from "react";
import BusinessPage from "./pages/business_1.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import Hero from "./Hero";
import React, { useEffect, useRef } from "react";
const sitemapPages = {
  "/product": ["Business", "Product"],
  "/it-service": ["Business", "IT Service"],
  "/about-magnumbridge": ["Company", "About Magnumbridge"],
  "/customer-partner": ["Company", "Customer & Partner"],
  "/vision-mission": ["Company", "Vision & Mission"],
  "/history": ["Company", "History"],
  "/qa": ["Company", "Q&A"],
  "/ideal-employee": ["Recruit", "Ideal employee"],
  "/benefit": ["Recruit", "Benefit"],
  "/recruitment": ["Recruit", "Recruitment"],
};

const companyCards = [
  ["Vision & Mission", "비전 & 미션", "/assets/vision.jpg"],
  ["Customer & Partner", "고객과 파트너", "/assets/customer.jpg"],
  ["Good employee", "인재상", "/assets/people.jpg"],
  ["History", "연혁", "/assets/history.jpg"],
];
const techItems = [
  ["Core", "고성능 분산 처리 엔진"],
  ["WebView", "웹 기반 통합 인터페이스"],
  ["AI4Frame-Rdbms BASIC", "Repository & API 연계 · SQL 지원 · 실시간 데이터 처리"],
  ["Security", "데이터 보안 및 접근 제어"],
  ["Batch", "대용량 배치 프로세싱"],
  ["adminConsole", "간편한 통합 운영 관리"],
];
const performances = [
  ["NPS 국민연금", "통합운영관리 시스템", "2024.04", "/assets/coop1.png", 42],
  ["신한은행", "AI 기반 업무 고도화", "2024.04", "/assets/coop2.png", 39],
  ["SGI서울보증", "데이터 플랫폼 구축", "2024.07", "/assets/coop3.png", 36],
  ["신한라이프", "IT 통합운영 시스템", "2023.08", "/assets/coop4.png", 46],
  ["KB손해보험", "K-Insight 시스템 고도화", "2024.06", "/assets/coop5.png", 39],
  ["NICE평가정보", "기업정보 플랫폼", "2023.06", "/assets/coop6.png", 34],
];

const itServicePerformances = [
  ["회사명1", "경영정보시스템 ITO 운영", "2024.01 ~ 2024.06", "/assets/it_coop1.svg", 40],
  ["회사명2", "차세대 One-ERP 구축", "2023.07 ~ 2023.12", "/assets/it_coop2.svg", 40],
  ["회사명3", "건설관련 품질관리 시스템", "2023.01 ~ 2023.06", "/assets/it_coop3.svg", 40],
  ["회사명3", "영업지원시스템 운영 및 구죽", "2023.01 ~ 2023.06", "/assets/it_coop4.svg", 40],
  ["회사명3", "소스코드 품질 점검 운영", "2023.01 ~ 2023.06", "/assets/it_coop5.svg", 40],
  ["회사명3", "웹페이지 구축 및 모바일 통합 운영", "2023.01 ~ 2023.06", "/assets/it_coop6.svg", 40],
];
// App 함수 바깥(위쪽)에 정의
function PerformanceCard({ name, project, date, logo, logoHeight, solution = "AI4Frame" }) {
  return (
    <article
      className="performance-card move_up"
      ref={(element) => {
        if (!element) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            const viewportTop = entry.rootBounds?.top ?? 0;
            const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;

            if (entry.isIntersecting || entry.boundingClientRect.bottom <= viewportTop) {
              entry.target.classList.add("is-visible");
            } else if (entry.boundingClientRect.top >= viewportBottom) {
              entry.target.classList.remove("is-visible");
            }
          },
          { threshold: 0.1 },
        );

        observer.observe(element);
        return () => observer.disconnect();
      }}
    >
      <div className="client">
        <img src={logo} alt={`${name} 로고`} style={{ width: "auto", maxWidth: "100%", height: `${logoHeight}px` }} />
      </div>
      <dl>
        <dt>프로젝트명</dt>
        <dd>{project}</dd>
        <dt>솔루션</dt>
        <dd>{solution}</dd>
        <dt>수행기간</dt>
        <dd>{date}</dd>
      </dl>
    </article>
  );
}
export default function App() {
  const mapElement = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const [activeFilter, setActiveFilter] = useState("solution");
  useEffect(() => {
    // 1. 이미 index.html의 스크립트가 로드되어 window.naver가 존재할 때
    if (window.naver && window.naver.maps) {
      setIsLoaded(true);
      return;
    }

    // 2. 만약 아직 로드가 안 되었다면, index.html에 추가했던 script 태그를 찾아서 감시합니다.
    const scripts = document.getElementsByTagName("script");
    for (let script of scripts) {
      if (script.src.includes("openapi.map.naver.com")) {
        script.addEventListener("load", () => setIsLoaded(true));
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapElement.current) return;

    const position = new window.naver.maps.LatLng(37.5117957, 127.0482278);

    const map = new window.naver.maps.Map(mapElement.current, {
      center: position,
      zoom: 17,
    });

    new window.naver.maps.Marker({
      position,
      map,
    });

    // 지도 크기 재계산
    requestAnimationFrame(() => {
      map.autoResize();
      map.setCenter(position);
    });
  }, [isLoaded]);

  if (window.location.pathname === "/platform-solution") {
    return <BusinessPage />;
  }

  const sitemapPage = sitemapPages[window.location.pathname];

  if (sitemapPage) {
    return <BusinessPage emptyContent heroSection={sitemapPage[0]} heroTitle={sitemapPage[1]} productContent={window.location.pathname === "/product"} />;
  }

  return (
    <main key="home-page-source-synced">
      <SiteHeader />

      <Hero />

      <section id="company" className="section company" style={{ paddingBottom: 0 }}>
        <SectionTitle title="Company Overview" style={{ fontSize: "24px" }} />
        <p className="section-copy" style={{ marginTop: "40px", color: "#000", fontSize: "18px" }}>
          지식 기반의 “AI4Frame” 기술을 바탕으로,
          <br />
          고객의 가치 기술 경쟁을 위해 함께 성장해 나가는 IT 플랫폼 기업입니다.
        </p>
        <div className="center">
          <a href="#footer" className="pill pill-red">
            About&nbsp;&nbsp;Magnumbridge
          </a>
        </div>
        <div className="company-grid">
          {companyCards.map(([title, ko, image]) => (
            <article
              className="company-card move_up"
              key={`${title}-directional-move-up`}
              ref={(element) => {
                if (!element) return;

                const observer = new IntersectionObserver(
                  ([entry]) => {
                    const viewportTop = entry.rootBounds?.top ?? 0;
                    const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;

                    if (entry.isIntersecting || entry.boundingClientRect.bottom <= viewportTop) {
                      entry.target.classList.add("is-visible");
                    } else if (entry.boundingClientRect.top >= viewportBottom) {
                      entry.target.classList.remove("is-visible");
                    }
                  },
                  { threshold: 0.1 },
                );

                observer.observe(element);
                return () => observer.disconnect();
              }}
            >
              <img src={image} alt="" />
              <div className="card-overlay">
                <h3>{title}</h3>
                <p>{ko}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingRight: "20px", paddingBottom: "60px", paddingLeft: "20px" }}>
        <SectionTitle title="Tech Overview" style={{ fontSize: "24px" }} />
        <p className="section-copy" style={{ marginTop: "40px", color: "#000", fontSize: "18px" }}>
          풍부한 경험과 전문성을 바탕으로 고객의 요구사항을 효과적으로 수행할 수 있는 프레임워크&nbsp;&nbsp;”All4Frame”을 제공합니다.
        </p>
      </section>

      <section id="tech" className="section tech center" key="tech-section-source-synced" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="section-inner center no_margin">
          <p className="tech-label" style={{ marginTop: 0, fontSize: "20px", fontWeight: 400 }}>
            All4Frame 패키지별 특징
          </p>
          <div className="tech-list center width100 margintop30" style={{ marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
            {/* 1번 */}
            <div onClick={() => setActiveTech(activeTech === 0 ? null : 0)} aria-expanded={activeTech === 0} className={`tech-item tech-item-1 ${activeTech === 0 ? "active" : ""}`}>
              <span className="tech-row">
                <div className="tech-hide">
                  <span>All4Frame-</span>
                  <strong>Core</strong>
                </div>

                <span>{activeTech === 0 ? <img src="/assets/arrow.svg" alt="닫기" draggable={false} /> : ""}</span>
              </span>
              {activeTech === 0 && (
                <ul className="tech-detail">
                  <li>DTO(DataTransferObject) 소스코드 자동생성</li>
                  <li>DTO 필드 마스킹 처리</li>
                  <li>DTO 필드 암호화 처리</li>
                  <li>Framework 표준 설정</li>
                </ul>
              )}
            </div>

            {/* 2번 */}
            <div onClick={() => setActiveTech(activeTech === 1 ? null : 1)} aria-expanded={activeTech === 1} className={`tech-item tech-item-2 ${activeTech === 1 ? "active" : ""}`}>
              <span className="tech-row">
                <div className="tech-hide">
                  <span>All4Frame-</span>
                  <strong>WebView</strong>
                </div>
                <span>{activeTech === 1 ? <img src="/assets/arrow.svg" alt="닫기" draggable={false} /> : ""}</span>
              </span>
              {activeTech === 1 && (
                <ul className="tech-detail">
                  <li>표준전문 구조에 따른 FixedLength, XML, JSON, Serial, Delimiter, gRPC 방식 서비스 통신 지원</li>
                  <li>서비스 자동 등록</li>
                  <li>서비스 단위 로깅</li>
                  <li>표준화된 트랜잭션 제어</li>
                </ul>
              )}
            </div>

            {/* 3번 */}
            <div onClick={() => setActiveTech(activeTech === 2 ? null : 2)} aria-expanded={activeTech === 2} className={`tech-item tech-item-3 ${activeTech === 2 ? "active" : ""}`}>
              <span className="tech-row">
                <div className="tech-hide">
                  <span>All4Frame-</span>
                  <strong>Rbdms</strong>
                </div>
                <span>{activeTech === 2 ? <img src="/assets/arrow.svg" alt="닫기" draggable={false} /> : ""}</span>
              </span>
              {activeTech === 2 && (
                <ul className="tech-detail">
                  <li>Repository 소스코드 자동생성</li>
                  <li>멀티 데이터 소스 지원</li>
                  <li>자동화된 SQL 로깅</li>
                  <li>자동화된 SQL 타임아웃</li>
                  <li>자동화된 최대 조회 Row 갯수 제어</li>
                  <li>자동화된 SQL 페이징 처리</li>
                  <li>자동화된 Auditing 처리 구조 (createdBy, createAt, lastModifiedBy, lastModifiedAt)</li>
                </ul>
              )}
            </div>

            {/* 4번 */}
            <div onClick={() => setActiveTech(activeTech === 3 ? null : 3)} aria-expanded={activeTech === 3} className={`tech-item tech-item-4 ${activeTech === 3 ? "active" : ""}`}>
              <span className="tech-row">
                <div className="tech-hide">
                  <span>All4Frame-</span>
                  <strong>Security</strong>
                </div>
                <span>{activeTech === 3 ? <img src="/assets/arrow.svg" alt="닫기" draggable={false} /> : ""}</span>
              </span>
              {activeTech === 3 && (
                <ul className="tech-detail">
                  <li>다양한 유저 인증 방식지원 (Ldap, OAuth, DBMS)</li>
                  <li>다양한 웹 취약점 해소 (CSRF, XSS, SSRF, SQL Injection)</li>
                </ul>
              )}
            </div>
            <div onClick={() => setActiveTech(activeTech === 4 ? null : 4)} aria-expanded={activeTech === 4} className={`tech-item tech-item-5 ${activeTech === 4 ? "active" : ""}`}>
              <span className="tech-row">
                <div className="tech-hide">
                  <span>All4Frame-</span>
                  <strong>Batch</strong>
                </div>
                <span>{activeTech === 4 ? <img src="/assets/arrow.svg" alt="닫기" draggable={false} /> : ""}</span>
              </span>
              {activeTech === 4 && (
                <ul className="tech-detail">
                  <li>Job Flow 디자인 기능</li>
                  <li>대량 데이터 처리를 위한 Job 구현기능</li>
                  <li>StandAlone 기반 Job 실행</li>
                  <li>On-demand 기반 Job 실행</li>
                </ul>
              )}
            </div>
            <div onClick={() => setActiveTech(activeTech === 5 ? null : 5)} aria-expanded={activeTech === 5} className={`tech-item tech-item-6 ${activeTech === 5 ? "active" : ""}`}>
              <span className="tech-row">
                <div className="tech-hide">
                  <span>All4Frame-</span>
                  <strong>adminConsole</strong>
                </div>
                <span>{activeTech === 5 ? <img src="/assets/arrow.svg" alt="닫기" draggable={false} /> : ""}</span>
              </span>
              {activeTech === 5 && (
                <ul className="tech-detail">
                  <li>프로젝트 멤버 권한 관리 기능</li>
                  <li>통합 용어관리 기능</li>
                  <li>전문 표준관리 기능</li>
                  <li>MQ(MessageQueue) 관리 기능</li>
                  <li>배치 제어 관리 기능(스케줄러 포함)</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingRight: "20px", paddingBottom: "60px", paddingLeft: "20px" }}>
        <SectionTitle title="Performance" style={{ fontSize: "24px" }} />
        <p className="section-copy" style={{ marginTop: "40px", color: "#000", fontSize: "18px" }}>
          다양한 프로젝트를 수행한, 경험 많은 다수의 개발자들과 함께 합니다.고객의 사업에 가장 효과적인 Solution을 제공하고, 효과적인 운영을 위한 설계를 지향합니다.
        </p>
      </section>

      <section id="performance" className="section performance" style={{ paddingTop: "40px", paddingBottom: "100px" }}>
        <div className="section-inner">
          <div className="filter-buttons">
            <button
              type="button"
              onClick={() => setActiveFilter("solution")}
              aria-pressed={activeFilter === "solution"}
              className={`pill ${activeFilter === "solution" ? "pill-black" : "pill-outline"}`}
            >
              상용 Solution
            </button>
            <button type="button" onClick={() => setActiveFilter("service")} aria-pressed={activeFilter === "service"} className={`pill ${activeFilter === "service" ? "pill-black" : "pill-outline"}`}>
              IT Service
            </button>
          </div>
          {activeFilter === "solution" && (
            <div className="performance-grid" style={{ marginTop: "30px" }} key="grid-solution">
              {performances.map(([name, project, date, logo, logoHeight]) => (
                <PerformanceCard key={`${name}-${project}`} name={name} project={project} date={date} logo={logo} logoHeight={logoHeight} />
              ))}
            </div>
          )}

          {activeFilter === "service" && (
            <div className="performance-grid" style={{ marginTop: "30px" }} key="grid-service">
              {itServicePerformances.map(([name, project, date, logo, logoHeight]) => (
                <PerformanceCard
                  key={`${name}-${project}`}
                  name={name}
                  project={project}
                  date={date}
                  logo={logo}
                  logoHeight={logoHeight}
                  solution="IT Service" // 두 번째 grid의 솔루션 문구에 맞게 수정
                />
              ))}
            </div>
          )}
          {/* <div className="performance-grid" style={{ marginTop: "30px" }}>
            {performances.map(([name, project, date, logo, logoHeight]) => (
              <article
                className="performance-card move_up"
                key={`${name}-directional-move-up`}
                ref={(element) => {
                  if (!element) return;

                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      const viewportTop = entry.rootBounds?.top ?? 0;
                      const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;

                      if (entry.isIntersecting || entry.boundingClientRect.bottom <= viewportTop) {
                        entry.target.classList.add("is-visible");
                      } else if (entry.boundingClientRect.top >= viewportBottom) {
                        entry.target.classList.remove("is-visible");
                      }
                    },
                    { threshold: 0.1 },
                  );

                  observer.observe(element);
                  return () => observer.disconnect();
                }}
              >
                <div className="client">
                  <img src={logo} alt={`${name} 로고`} style={{ width: "auto", maxWidth: "100%", height: `${logoHeight}px` }} />
                </div>
                <dl>
                  <dt>프로젝트명</dt>
                  <dd>{project}</dd>
                  <dt>솔루션</dt>
                  <dd>AI4Frame</dd>
                  <dt>수행기간</dt>
                  <dd>{date}</dd>
                </dl>
              </article>
            ))}
          </div> */}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-accordions">
            <details className="footer-menu">
              <summary>
                <span>Business</span>
                <i aria-hidden="true" />
              </summary>
              <div className="footer-submenu">
                <a href="#contact">SI 사업</a>
                <a href="#contact">Platform &amp; Solution</a>
                <a href="#contact">IT Consulting</a>
              </div>
            </details>
            <details className="footer-menu">
              <summary>
                <span>Company</span>
                <i aria-hidden="true" />
              </summary>
              <div className="footer-submenu">
                <a href="#contact">회사소개</a>
                <a href="#contact">연혁</a>
                <a href="#contact">오시는 길</a>
              </div>
            </details>
            <details className="footer-menu">
              <summary>
                <span>Recruit</span>
                <i aria-hidden="true" />
              </summary>
              <div className="footer-submenu">
                <a href="#contact">인재상</a>
                <a href="#contact">채용안내</a>
                <a href="#contact">채용공고</a>
              </div>
            </details>
          </div>

          <nav className="footer-utility" aria-label="회사 정보">
            <a href="#contact">회사소개서</a>
            <>
              <button type="button" className="footer-location-button" onClick={(event) => event.currentTarget.nextElementSibling.showModal()}>
                오시는 길
              </button>
              <dialog className="location-dialog" aria-labelledby="location-dialog-title">
                <style>{`
                  .footer-location-button {
padding: 0 18px;
    color: #858589;
    font-size: 14px;
    line-height: 1;
    text-decoration: none;
    background: transparent;
    border:none;
    font-weight:300;
                  }
                  .location-dialog {
                    width: 100%;
                    max-width: 100%;
                    height: 100dvh;
                    max-height: 100dvh;
                    margin: auto;
                    padding: 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                    border: 0;
                    color: #111;
                    background: #fff;
                    overscroll-behavior: contain;
                  }
                  .location-dialog::backdrop {
                    background: rgba(0, 0, 0, .45);
                  }
                  .location-dialog-inner {
                    width: 100%;
                    min-height: 100%;
                    padding: 46px 34px 70px;
                    box-sizing: border-box;
                  }
                  .location-dialog-header {
                    position: relative;
                    margin-bottom: 52px;
                    text-align: center;
                  }
                  .location-dialog-header h2 {
                    margin: 0;
                    color: #dc2732;
                    font-size: 40px;
                    font-weight: 800;
                  }
                  .location-dialog-close {
                    position: absolute;
                    top: -8px;
                    right: 0;
                    width: 48px;
                    height: 48px;
                    padding: 0;
                    border: 0;
                    color: #000;
                    font-size: 48px;
                    font-weight: 200;
                    line-height: 1;
                    background: transparent;
                    cursor: pointer;
                  }
                  .location-address {
                    padding: 50px 52px;
                    border-radius: 30px;
                    color: #fff;
                    background: #aa211e;
                  }
                  .location-address address {
                    font-style: normal;
                    font-size: 26px;
                    font-weight: 800;
                    line-height: 1.7;
                  }
                  .location-address p {
                    margin: 30px 0 0;
                    font-size: 21px;
                    line-height: 1.6;
                  }
                  .location-address strong {
                    font-weight: 800;
                  }
                  .location-map {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 566 / 845;
                    margin-top: 50px;
                    display: block;
                    overflow: hidden;
                    border: 0;
                    background: #eef1f5;
                  }
                  .location-map img {
                    position: absolute;
                    top: -55.976%;
                    left: -6.007%;
                    width: 114.841%;
                    max-width: none;
                    height: auto;
                    display: block;
                  }
                  .location-map-link {
                    margin-top: 14px;
                    display: inline-block;
                    color: #1672d4;
                    font-size: 15px;
                    text-decoration: underline;
                  }
                  .location-company {
                    margin-top: 42px;
                  }
                  .location-company strong {
                    display: block;
                    font-size: 25px;
                    line-height: 1.45;
                  }
                  .location-company p {
                    margin: 8px 0 0;
                    color: #777;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 1.55;
                  }
                  @media (max-width: 520px) {
                    .location-dialog-inner {
                      padding: 32px 22px 58px;
                    }
                    .location-dialog-header {
                      margin-bottom: 42px;
                    }
                    .location-dialog-header h2 {
                      font-size: 31px;
                    }
                    .location-dialog-close {
                      top: -7px;
                      width: 40px;
                      height: 40px;
                      font-size: 40px;
                    }
                    .location-address {
                      padding: 38px 32px;
                      border-radius: 24px;
                    }
                    .location-address address {
                      font-size: 20px;
                    }
                    .location-address p {
                      margin-top: 24px;
                      font-size: 17px;
                    }
                    .location-map {
                      margin-top: 38px;
                    }
                    .location-company {
                      margin-top: 32px;
                    }
                    .location-company strong {
                      font-size: 19px;
                    }
                    .location-company p {
                      font-size: 18px;
                    }
                  }
                `}</style>
                <div className="location-dialog-inner">
                  <header className="location-dialog-header">
                    <h2 id="location-dialog-title">Location</h2>
                    <button type="button" className="location-dialog-close" aria-label="오시는 길 닫기" onClick={(event) => event.currentTarget.closest("dialog").close()}>
                      ×
                    </button>
                  </header>

                  <section className="location-address">
                    <address>
                      서울특별시 강남구 봉은사로 443,
                      <br />
                      8층 (삼성동, 로얄빌딩)
                    </address>
                    <p>
                      <strong>가까운 지하철 :</strong> 9 호선 선정릉역 (도보 5분)
                    </p>
                  </section>

                  {/* <a className="location-map" href="https://naver.me/Fz8AVbij" target="_blank" rel="noreferrer" aria-label="매그넘브릿지 위치를 네이버 지도에서 보기">
                    <img src="/assets/location-reference.png" alt="서울특별시 강남구 봉은사로 443 매그넘브릿지 위치 지도" />
                  </a> */}
                  <div style={{ padding: " 20px 0" }}>
                    {/* 지도가 그려질 영역 */}
                    <div ref={mapElement} style={{ width: "100%", height: "500px", border: "1px solid #ccc", borderRadius: "8px" }} />
                  </div>
                  <a className="location-map-link" href="https://naver.me/Fz8AVbij" target="_blank" rel="noreferrer">
                    네이버 지도에서 크게 보기
                  </a>

                  <div className="location-company">
                    <strong>(주)매그넘브릿지 (MAGNUM BRIDGE Co., Ltd.)</strong>
                    <p>
                      T. 02-6941-0828
                      <br />
                      F. 02-6941-0829
                    </p>
                  </div>
                </div>
              </dialog>
            </>
            <a href="#contact">문의하기</a>
          </nav>
          <>
            <button type="button" className="footer-privacy privacy-dialog-trigger" onClick={(event) => event.currentTarget.nextElementSibling.showModal()}>
              개인정보취급방침
            </button>
            <dialog className="privacy-dialog" aria-labelledby="privacy-dialog-title">
              <style>{`
                .privacy-dialog-trigger {
                  padding: 0;
                  border: 0;
                  font: inherit;
                  text-align: left;
                  background: transparent;
                  cursor: pointer;
                }
                .privacy-dialog {
                  width: 100%;
                  max-width: 100%;
                  height: 100dvh;
                  max-height: 100dvh;
                  margin: auto;
                  padding: 0;
                  overflow-x: hidden;
                  overflow-y: auto;
                  border: 0;
                  color: #111;
                  background: #fff;
                  overscroll-behavior: contain;
                }
                .privacy-dialog::backdrop {
                  background: rgba(0, 0, 0, .45);
                }
                .privacy-dialog-inner {
                  width: min(calc(100% - 80px), 900px);
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 46px 0 110px;
                  box-sizing: border-box;
                }
                .privacy-dialog-header {
                  position: relative;
                  min-height: 120px;
                }
                .privacy-dialog-back {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 70px;
                  height: 54px;
                  padding: 0;
                  border: 0;
                  color: #000;
                  font-size: 68px;
                  font-weight: 200;
                  line-height: .65;
                  background: transparent;
                  cursor: pointer;
                }
                .privacy-dialog-logo {
                  width: 205px;
                  height: auto;
                  margin-left: auto;
                  display: block;
                }
                .privacy-dialog h2 {
                  max-width: 430px;
                  margin: 24px 0 92px;
                  font-size: 64px;
                  font-weight: 900;
                  line-height: 1.3;
                  letter-spacing: -.06em;
                  word-break: keep-all;
                }
                .privacy-dialog h2 span {
                  color: #e62935;
                }
                .privacy-policy-section + .privacy-policy-section {
                  margin-top: 112px;
                }
                .privacy-policy-section h3 {
                  margin: 0 0 30px;
                  font-size: 37px;
                  font-weight: 800;
                  letter-spacing: -.04em;
                }
                .privacy-policy-section table {
                  width: 100%;
                  border-collapse: collapse;
                  table-layout: fixed;
                  font-size: 25px;
                  line-height: 1.7;
                  text-align: center;
                }
                .privacy-policy-section th,
                .privacy-policy-section td {
                  width: 50%;
                  padding: 27px 20px;
                  border: 2px solid #d2d2d2;
                }
                .privacy-policy-section th {
                  border-color: #666;
                  color: #fff;
                  font-weight: 500;
                  background: #4a4a4a;
                }
                .privacy-policy-section ul {
                  margin: 0;
                  padding-left: 39px;
                  color: #333;
                  font-size: 25px;
                  line-height: 1.9;
                  word-break: keep-all;
                }
                @media (max-width: 600px) {
                  .privacy-dialog-inner {
                    width: calc(100% - 40px);
                    padding: 32px 0 78px;
                  }
                  .privacy-dialog-header {
                    min-height: 100px;
                  }
                  .privacy-dialog-back {
                    width: 52px;
                    height: 43px;
                    font-size: 52px;
                  }
                  .privacy-dialog-logo {
                    width: 150px;
                  }
                  .privacy-dialog h2 {
                    max-width: 270px;
                    margin: 22px 0 72px;
                    font-size: 43px;
                  }
                  .privacy-policy-section + .privacy-policy-section {
                    margin-top: 80px;
                  }
                  .privacy-policy-section h3 {
                    margin-bottom: 24px;
                    font-size: 26px;
                  }
                  .privacy-policy-section table {
                    font-size: 18px;
                  }
                  .privacy-policy-section th,
                  .privacy-policy-section td {
                    padding: 21px 12px;
                    border-width: 1px;
                  }
                  .privacy-policy-section ul {
                    padding-left: 27px;
                    font-size: 18px;
                  }
                }
              `}</style>
              <div className="privacy-dialog-inner">
                <header className="privacy-dialog-header">
                  <button type="button" className="privacy-dialog-back" aria-label="개인정보 취급방침 닫기" onClick={(event) => event.currentTarget.closest("dialog").close()}>
                    ←
                  </button>
                  <img className="privacy-dialog-logo" src="/assets/logo-header-mo.svg" alt="Magnum Bridge" />
                </header>

                <h2 id="privacy-dialog-title">
                  개인정보
                  <br />
                  취급방침 <span>.</span>
                </h2>

                <section className="privacy-policy-section">
                  <h3>수집하는 개인정보 항목</h3>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">수집항목(필수)</th>
                        <th scope="col">수집방법</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          이름, 기업/단체명,
                          <br />
                          연락처, 이메일
                        </td>
                        <td>
                          회사 홈페이지 “문의하기”를
                          <br />
                          통한 메일 문의
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <section className="privacy-policy-section">
                  <h3>개인정보 수집 및 이용 목적</h3>
                  <ul>
                    <li>영업 문의 대응 목적으로만 활용하며, 이외 목적으로 사용하지 않습니다.</li>
                  </ul>
                </section>

                <section className="privacy-policy-section">
                  <h3>개인정보 보유 및 이용기간</h3>
                  <ul>
                    <li>접수된 개인정보는 원칙적으로 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.</li>
                    <li>단, 별도 파기 요청이 없을 경우 관련 법령에 의거하여 5년간 보관합니다.</li>
                  </ul>
                </section>

                <section className="privacy-policy-section">
                  <h3>수집하는 개인정보 항목</h3>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">파기절차</th>
                        <th scope="col">수집방법</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>개인정보관리자는 파기 사유가 발생한 개인정보(또는 개인정보파일)를 선정하고, 개인정보보호책임자의 승인을 받아 개인정보(또는 개인정보파일)를 파기합니다.​</td>
                        <td>개인정보위는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            </dialog>
          </>

          <div className="footer-info">
            <img className="footer-brand" src="/assets/logo_gray.svg" alt="Magnum Bridge" />
            <p className="footer-company">(주)매그넘브릿지</p>
            <address>서울특별시 강남구 봉은사로 443, 8층 (삼성동, 로얄빌딩)</address>
            <p className="footer-contact">TEL) 02-6941-0828&nbsp;&nbsp;/&nbsp;&nbsp;FAX) 02-6941-0829</p>
            <p className="footer-copyright">
              COPYRIGHT (C) 2025 MAGNUM BRIDGE CO.,LTD.
              <br />
              ALL RIGHTS RESERVED.
            </p>
          </div>

          <nav className="footer-socials" aria-label="소셜 미디어">
            <a href="#contact" aria-label="YouTube">
              <svg viewBox="0 0 32 24" aria-hidden="true">
                <path d="M30.7 3.8a4 4 0 0 0-2.8-2.9C25.4.2 15.5.2 15.5.2S5.6.2 3.1.9A4 4 0 0 0 .3 3.8C-.4 6.3-.4 12-.4 12s0 5.7.7 8.2A4 4 0 0 0 3.1 23c2.5.7 12.4.7 12.4.7s9.9 0 12.4-.7a4 4 0 0 0 2.8-2.8c.7-2.5.7-8.2.7-8.2s0-5.7-.7-8.2ZM12.3 17V7l8.3 5-8.3 5Z" />
              </svg>
            </a>
            <a href="#contact" aria-label="Instagram">
              <svg viewBox="0 0 28 28" aria-hidden="true">
                <rect x="1.5" y="1.5" width="25" height="25" rx="7" />
                <circle cx="14" cy="14" r="6" />
                <circle className="footer-social-dot" cx="21.5" cy="6.7" r="1.5" />
              </svg>
            </a>
            <a className="footer-social-letter" href="#contact" aria-label="Facebook">
              f
            </a>
            <a className="footer-social-letter footer-social-blog" href="#contact" aria-label="Blog">
              b
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function SectionTitle({ title, style }) {
  return (
    <h2 className="section-title" style={style}>
      {title}
    </h2>
  );
}

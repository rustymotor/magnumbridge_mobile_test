import { useState } from "react";
import ProductTabs, { observeDirectionalMoveUp } from "../components/ProductTabs.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import React, { useEffect, useRef } from "react";

export default function BusinessPage({ emptyContent = false, heroSection = "Business", heroTitle = "Platform & Solution", productContent = false }) {
  const [activeCapability, setActiveCapability] = useState(null);
  const mapElement = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const capabilities = [
    ["IDE", "VSCode, Theia, Cursor 지원", ["통합 소스 편집 환경", "표준 템플릿 기반 개발", "실시간 오류 검증"]],
    ["Manage", "프로젝트 환경 중앙 관리", ["통합 운영 모니터링", "배포 및 형상 관리", "장애 이력 추적"]],
    ["Expand", "도메인 특성 및 요건 적용", ["유연한 기능 확장", "외부 시스템 연계", "비즈니스 변화 대응"]],
  ];
  const packageCards = [
    {
      title: "IOT",
      description: (
        <>
          AOS, IOS 기반 모바일 <br />
          어플리케이션 및 관리 콘솔 <br />
          <span className="fg-inline-bold">웹어플리케이션</span> 구축
        </>
      ),
      link: "아파트 홈 오토메이션",
    },
    {
      title: "QMS",
      description: (
        <>
          현장에서의 신속한 대응과 <br />
          관리 콘솔을 위한 <br />
          <span className="fg-inline-bold">웹 어플리케이션</span> 구축 사업
        </>
      ),
      link: "건설 품질관리 모바일 앱 솔루션",
    },
    {
      title: "e-commerce",
      description: (
        <>
          <span className="fg-inline-bold">Backend </span>프로세스 구축과
          <br />
          <span className="fg-inline-bold">React </span>기반의 유연한 화면개발
          <br />
          사용자 편의의 UI/UX
        </>
      ),
      link: "식품유통 플랫폼",
    },
    {
      title: "Edu",
      description: (
        <>
          교육이력관리 및 문서이력관리
          <br />
          <span className="fg-inline-bold">직원 직무교육 프로세스</span>와<br />
          <span className="fg-inline-bold">교육 문서 서고 관리 시스템</span>의 구축
        </>
      ),
      link: "직원 교육관리 솔루션, 서고/도서 관리 솔루션",
    },
    {
      title: "Automation",
      description: (
        <>
          RPA 솔루션 도입 없이 <span className="fg-inline-bold">웹자동화</span> 구성
          <br />
          <span className="fg-inline-bold">DCL</span>(Domain Specific Language)
          <br />
          기반 동적 작업구성
        </>
      ),
      link: "웹 자동화/크롤링 솔루션",
    },
  ];
  const clientLogos = [
    ["/assets/client-logo-1.png", "파트너 로고"],
    ["/assets/client-logo-grafana.png", "Grafana"],
    ["/assets/client-logo-beats.png", "Beats"],
    ["/assets/client-logo-circleci.png", "CircleCI"],
    ["/assets/client-logo-prometheus.png", "Prometheus"],
    ["/assets/client-logo-git.png", "Git"],
    ["/assets/client-logo-jenkins.png", "Jenkins"],
  ];

  return (
    <main className="platform-page" key="business-page-stable">
      <SiteHeader />

      <section className="platform-hero">
        <div
          className={`platform-hero-shade ${
            heroSection.toLowerCase() === "business" ? "business" : heroSection.toLowerCase() === "company" ? "company" : heroSection.toLowerCase() === "recruit" ? "recruit" : ""
          }`}
        />
        <div className="platform-hero-copy">
          <p>{heroSection}</p>
          <span>
            <span className="text-line">We are talking about</span>
            <span className="text-line">trust, creativity, and</span>
            <span className="text-line">innovation through technology.</span>
          </span>
        </div>
        <div className={`visual_gradient${emptyContent ? " empty-page-visual-gradient" : ""}`}>
          <h2>{heroTitle === "Recruitment" ? "My Application" : heroTitle.toLowerCase() === "benefit" ? "Recruitment" : heroTitle}</h2>
          {heroTitle === "Recruitment" ? (
            <p>
              <span className="text-line">당사의 입사지원 내역을 확인하고 수정하거나 철회 가능합니다.</span>
            </p>
          ) : (
            <p>
              <span className="text-line">
                {heroTitle === "IT Service"
                  ? "“매그넘브릿지”는 기준 레거시 시스템 운영 뿐 아니라, ESG, RPA, SAP 등 솔루션 기반의 업무,"
                  : emptyContent
                    ? "고객사의 다양한 시스템 개발에 용이한 스프링 기반 프레임워크 All4Frame / All4DevOps,"
                    : "All4Frame 도입으로 단일 개발툴을 사용하여 다양한 Front-End 기술 및 JAVA 기반"}
              </span>
              <span className="text-line">
                {heroTitle === "IT Service"
                  ? "v프레임워크 기반의 시스템 등 다양한 분야의 업무 영역에 대한 개발/운영업무를 수행하고 있습니다."
                  : emptyContent
                    ? "생성형 AI 기반 지능형 위치관제, 짧은 인증서 주기를 자동화하는 보안 솔루션 CertBear를 바탕으로"
                    : "Back-End 개발표준을 달성 가능하며,"}
              </span>
              {heroTitle !== "IT Service" && (
                <span className="text-line">
                  {emptyContent
                    ? "개발·운영·관제·보안을 아우르는 통합 디지털 플랫폼으로 진화합니다."
                    : "자사 호환 제품인 All4DevOps 연계 시 All4DevOps 방법론에 의거한 FP, SR 요구사항 구현/테스트/배포 프로세스로 안정적인 서비스 운영까지 보장합니다."}
                </span>
              )}
            </p>
          )}
        </div>
      </section>

      {emptyContent ? (
        productContent ? (
          <ProductTabs />
        ) : heroTitle === "IT Service" ? (
          <ItServiceIntro />
        ) : heroTitle === "About Magnumbridge" ? (
          <AboutOverview />
        ) : heroTitle === "Customer & Partner" ? (
          <PartnerOverview />
        ) : heroTitle === "Vision & Mission" ? (
          <VisionMission />
        ) : heroTitle === "History" ? (
          <HistoryOverview />
        ) : heroTitle === "Q&A" ? (
          <QaOverview />
        ) : heroTitle === "Ideal employee" ? (
          <IdealEmployeeOverview />
        ) : heroTitle === "Benefit" ? (
          <BenefitOverview />
        ) : heroTitle === "Recruitment" ? (
          <ApplicationLookup />
        ) : (
          <section className="product-empty" aria-label={`${heroTitle} content`} />
        )
      ) : (
        <>
          <section className="package-map">
            <h3 className="platform-kicker light">All4 Frame</h3>
            <span className="package-plus">+</span>
            <p className="section-heading">
              AlI4 DevOps <span>Package</span>
            </p>
            <p>풍부한 경험과 전문성으로 바탕으로 고객의 요구사항에 유연하게 맞춤형 솔루션을 제공합니다.</p>
            <div className="orbit-map">
              <div className="orbit orbit-top">
                플랫폼
                <br />
                공급
              </div>
              <div className="orbit orbit-left">컨설팅/구축</div>
              <div className="orbit orbit-right">유지보수</div>
            </div>
          </section>

          <section className="platform-intro platform-intro-frame compact">
            <h3 className="platform-kicker">All4 FRAME</h3>
            <p className="section-heading">
              “매그넘브릿지”의 All4Frame은 내부 뿐만 아니라 외부 ITO 사업 분야에서도 솔루션 개발 시 필요한 각종 모듈/도메인의프로젝트에 유연하게 적용되는 기능을 제공합니다.
            </p>
          </section>

          <section className="capability-section">
            <div className="capability-list">
              <div className="capability-background" aria-hidden="true" />
              {capabilities.map(([title, subtitle, items], index) => (
                <article
                  className={`capability-card capability-${index + 1} ${activeCapability === index ? "active" : ""}`}
                  key={title}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeCapability === index}
                  onClick={() => setActiveCapability(activeCapability === index ? null : index)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    setActiveCapability(activeCapability === index ? null : index);
                  }}
                >
                  <h3>{title}</h3>
                  <p className="capability-subtitle">{subtitle}</p>
                  {activeCapability === index && (
                    <div className="capability-content">
                      <div className="capability-divider" />
                      <ul>
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="platform-intro platform-intro-devops compact">
            <h3 className="platform-kicker">All4 FRAME</h3>
            <p className="section-heading">
              “매그넘브릿지”의 All4Frame은 내부 뿐만 아니라 외부 ITO 사업 분야에서도 솔루션 개발 시 필요한 각종 모듈/도메인의프로젝트에 유연하게 적용되는 기능을 제공합니다.
            </p>
            <img className="devops-graphic" src="/assets/devops.png" alt="개발과 운영의 전체 수명 주기" />
          </section>

          <section className="platform-clients">
            <h3>엔지니어가 개발과 운영을 전담하여&nbsp;&nbsp;애플리케이션의 전체 수명 주기에걸쳐 작업하여 주도적 운영을 통한 신속하고 안정적인 비즈니스 성과를 제공합니다.</h3>
            <div className="client-marquee">
              <div className="client-track">
                {[0, 1].map((group) => (
                  <div className="client-group" aria-hidden={group === 1 ? "true" : undefined} key={group}>
                    {clientLogos.map(([src, alt]) => (
                      <div className="client-logo" key={`${group}-${src}`}>
                        <img src={src} alt={group === 0 ? alt : ""} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="platform-intro platform-intro-experience compact">
            <h3 className="platform-kicker">All4 FRAME</h3>
            <p className="section-heading">금융/제조/물류/건설/유통/제약 등 핵심 Biz분야 개발 경험을 바탕으로 고객의 요구사항을 정확하게 이해한 기업솔루션을 제공합니다.</p>
          </section>

          <section className="platform-features">
            <div>
              <h3 className="platform-kicker light">AI4Frame 솔루션</h3>
              <p className="section-heading">디지털 전환을 위한 통합 플랫폼</p>
              <ul className="platform-solution-list">
                <li>프로젝트에서 표준으로 사용할 IDE 제공</li>
                <li>제공된 IDE 에서 템플릿 기반 안정되고 검증된 소스코드 자동 생성 기능 제공</li>
                <li>안정적인 트랜잭션 처리 보장 아키텍쳐 제공</li>
                <li>모의해킹 등 보안취약점 해소 아키텍쳐 제공</li>
                <li>프로젝트 구성원 별 권한제어 기능 제공</li>
                <li>온라인/배치 서비스 운영을 위한 편의 기능 제공</li>
                <li>프로젝트 일반 표준기능 또는 도메인 특화 기능 제공</li>
              </ul>
            </div>
          </section>

          <section className="package-stack">
            <h3 className="platform-kicker" style={{ color: "rgb(0, 0, 0)", lineHeight: "180%", whiteSpace: "pre-line", fontWeight: "700" }}>
              {"“솔루션 개발 시 필요한 각종 모듈이나 각각의 도메인에 맞춰 유연하게 적용 가능합니다”"}
            </h3>
            <div className="package-cards">
              {packageCards.map(({ title, description, link }, index) => (
                <article key={title}>
                  <div>
                    <span>All4</span>
                    <h3>{title}</h3>
                  </div>
                  {index === 0 ? <p style={{ lineHeight: "180%", marginBottom: "50px" }}>{description}</p> : <p>{description}</p>}
                  <a href="#contact">{link}</a>
                </article>
              ))}
              <div className="platform-laptop">
                <div className="platform-laptop-header" />
                <img src="/assets/calendar4.svg" alt="" />
                <p>Consulting</p>
              </div>
            </div>
          </section>
        </>
      )}

      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-accordions">
            <details className="footer-menu">
              <summary>
                <span>Business</span>
                <i aria-hidden="true" />
              </summary>
              <div className="footer-submenu">
                <a href="/platform-solution">Platform & Solution</a>
                <a href="/product">Product</a>
                <a href="/it-service">IT Service</a>
              </div>
            </details>
            <details className="footer-menu">
              <summary>
                <span>Company</span>
                <i aria-hidden="true" />
              </summary>
              <div className="footer-submenu">
                <a href="/about-magnumbridge">About Magnumbridge</a>
                <a href="/customer-partner">Customer & Partner</a>
                <a href="/vision-mission">Vision & Mission</a>
                <a href="/history">History</a>
                <a href="/qa">Q&A</a>
              </div>
            </details>
            <details className="footer-menu">
              <summary>
                <span>Recruit</span>
                <i aria-hidden="true" />
              </summary>
              <div className="footer-submenu">
                <a href="/ideal-employee">Ideal employee</a>
                <a href="/benefit">Recruitment</a>
                <a href="/recruitment">My Application</a>
              </div>
            </details>
          </div>

          <nav className="footer-utility" aria-label="회사 정보">
            <a href="/assets/profile_magnumbridge_202604.pdf" target="_blank" rel="noopener noreferrer">
              회사소개서
            </a>
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
            <a href="/qa">문의하기</a>
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

function ItServiceIntro() {
  return (
    <>
      <section className="it-service-intro" aria-label="IT Service 소개">
        <div className="it-service-intro-inner">
          <div className="it-service-photo">
            <img src="/assets/it-service-reference.png" alt="노트북으로 업무를 수행하는 모습" />
          </div>
          <div className="it-service-copy">
            <h2>MAGNUM BRIDGE&nbsp;&nbsp;IT Service</h2>
            <p>
              All4Frame 도입으로 단일 개발툴을 사용하여 다양한 Front-End 기술 및 JAVA 기반 Back-End 개발표준을 달성 가능하며, 자사 호환 제품인 All4DevOps 연계 시 All4DevOps 방법론에 의거한 FP, SR
              요구사항 구현/테스트/배포 프로세스로 안정적인 서비스 운영까지 보장합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="system-integration-section">
        <div className="system-integration-inner">
          <h2>System Integration</h2>
          <p>
            “매그넘브릿지”의 SI(System Integration) Service는 고객 요구사항을 정확히 이해하고, 고객에게 맞는 최적의 시스템을 설계하고 구축하며, 최신 기술을 접목한 시스템의 발전 목표를 제시하여 고객의
            가치를 높여 줍니다.
          </p>
          <p>
            당사는 각 산업군별 업무 지식과 IT 기술력을 겸비한 전문인력으로 프로젝트 팀을 구성하여 고객이 요구하는 시스템을,
            <strong> 최상의 품질과 적시의 납기로</strong> 공급해 드리고 있습니다.
          </p>
        </div>
      </section>

      <section className="application-build-section">
        <div className="application-build-inner">
          <div className="application-build-photo">
            <img src="/assets/it-service-application-reference.png" alt="노트북에서 애플리케이션을 개발하는 화면" />
          </div>
          <div className="application-build-copy">
            <h2>Application 구축</h2>
            <ul>
              <li>Smart Factory</li>
              <li>WEB Application 구축</li>
              <li>프레임워크 지원</li>
              <li>Mobile Application(iOS,aOS)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="it-service-references-section">
        <div className="it-service-references-inner">
          <div className="it-service-sectors-graphic">
            <img src="/assets/it-service-references.png" alt="금융, 공공, ICT, 제조, 건설, 서비스 분야" />
          </div>
          <h2>주요 레퍼런스</h2>
          <ul>
            <li>S사 : 레거시 시스템 운영</li>
            <li>
              S사 : IoT <strong>홈 플랫폼</strong> 구축(APP&amp;WEB / Mobile / Call Center)
            </li>
            <li>S사 : 렌터카 서비스 시스템 운영</li>
            <li>
              H사 : <strong>ESG 경영정보시스템</strong> 운영
            </li>
            <li>C사 : 모바일 업무 시스템</li>
            <li>
              C사 : 앱인앱 <strong>주문관리</strong> 시스템
            </li>
            <li>
              S사 : DevOps <strong>소스코드 검증</strong> 및 거버넌스
            </li>
          </ul>
          <div className="it-service-client-logos">
            <img src="/assets/it-service-references.png" alt="주요 고객사 로고" />
          </div>
        </div>
      </section>

      <section className="it-service-tech-section">
        <div className="it-service-tech-inner">
          <h2>(대표) 보유기술</h2>
          <div className="it-service-tech-logos">
            <img src="/assets/it-service-tech-reference.png" alt="보유 기술 파트너 로고" />
          </div>
          <div className="it-service-tech-list">
            <p>
              서버 : JAVA, <strong>Spring Boot</strong>, C, C#, C++
            </p>
            <p>
              Front : JSP, Nexacro/Miplatform, <strong>vue.js, react.js</strong>, HTML5, Typescript, IOS, AOS
            </p>
            <p>DB : MSSQL, Oracle, MariaDB, PostgreSQL, Tibero</p>
            <p>
              미들웨어 : <strong>JEUS, TOMCAT 외 OpenSource 기반</strong>
            </p>
            <p>
              플랫폼 : ESG, RPA, <strong>AWS, Mendix</strong>
            </p>
            <p>
              플랫폼 Engineering : <strong>ProFrame(ProObject), AnyLink, Middleware</strong>
            </p>
            <p>
              컨설팅 : <strong>소프트웨어 아키텍처, 클라우드, DevOps, SAP ERP</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="system-integration-section">
        <div className="system-integration-inner">
          <h2>System Integration</h2>
          <p>
            “매그넘브릿지”의 SI(System Integration) Service는 고객 요구사항을 정확히 이해하고, 고객에게 맞는 최적의 시스템을 설계하고 구축하며, 최신 기술을 접목한 시스템의 발전 목표를 제시하여 고객의
            가치를 높여 줍니다.
          </p>
          <p>
            당사는 각 산업군별 업무 지식과 IT 기술력을 겸비한 전문인력으로 프로젝트 팀을 구성하여 고객이 요구하는 시스템을,
            <strong> 최상의 품질과 적시의 납기로</strong> 공급해 드리고 있습니다.
          </p>
        </div>
      </section>

      <section className="application-build-section application-build-section-red">
        <div className="application-build-inner">
          <div className="application-build-photo">
            <img src="/assets/it-service-application-red-reference.png" alt="노트북에서 애플리케이션을 개발하는 화면" />
          </div>
          <div className="application-build-copy">
            <h2>Application 구축</h2>
            <ul>
              <li>Smart Factory</li>
              <li>WEB Application 구축</li>
              <li>프레임워크 지원</li>
              <li>Mobile Application(iOS,aOS)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="it-service-monitoring-section">
        <div className="postio-monitoring-grid">
          {[
            [
              "route-copy",
              "요구사항 정의 및 분석",
              ["관제대상의 이동경로를 실시간으로 지도상에 시각화", "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공"],
              "/assets/it-service-card-01.svg",
            ],
            [
              "route",
              "설계",
              ["관제대상의 이동경로를 실시간으로 지도상에 시각화", "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공"],
              "/assets/it-service-card-02.svg",
            ],
            [
              "alert",
              "개발 및 테스트",
              ["지오펜싱을 이용하여 관제대상이특정 권역에 In/Out하는 이벤트를 검사하여 알람", "관제대상이특정 권역에 출발/도착하는 시간과 예상 소요시간을 예측"],
              "/assets/it-service-card-03.svg",
            ],
            ["waypoint", "시스템 안정화", ["출발지, 도착지 외 다수의 경유지에 대한 경로 생성 및 관리", "시간, 거리, 복잡도를 고려한 사용자 맞춤 최적경로 추천"], "/assets/it-service-card-04.svg"],
          ].map(([type, title, items, image]) => (
            <article className="move_up" key={type} ref={observeDirectionalMoveUp}>
              <p>{title}</p>
              <div className={`postio-crop postio-monitoring-icon monitor-${type}`}>
                <img src={image} alt={`${title} 아이콘`} />
              </div>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutOverview() {
  const stats = [
    {
      title: "Founding Date",
      subtitle: "회사창립일",
      value: "21.8.27",
      className: "about-stat-founding",
    },
    {
      title: "Growth rate",
      subtitle: "FY25 Goal",
      value: (
        <>
          20<small>%</small>
        </>
      ),
      className: "about-stat-growth",
    },
    {
      title: "Capability",
      subtitle: "다양한 경험과 풍부한 인력",
      value: (
        <>
          340<small>명</small>
        </>
      ),
      className: "about-stat-capability",
    },
    {
      title: "Revenue",
      subtitle: "FY30 Goal Goal",
      value: (
        <>
          300<small>억</small>
        </>
      ),
      className: "about-stat-revenue",
    },
  ];

  return (
    <>
      <section className="about-overview-section" aria-label="회사 주요 지표">
        <div className="about-stats-grid">
          {stats.map(({ title, subtitle, value, className }) => (
            <article className={`about-stat-card ${className}`} key={title}>
              <div className="about-stat-copy">
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="about-business-section" aria-labelledby="about-business-title">
        <div className="about-business-inner">
          <h2 id="about-business-title">주요사업 및 조직구성</h2>

          <img className="about-business-diagram" src="/assets/about-business-diagram.png" alt="Platform, SI/SM, Consulting, Solution으로 구성된 주요 사업" />

          <div className="about-us-copy">
            <h3>About Us</h3>
            <p>
              <span>“매그넘브릿지”는</span>
              자체 개발 <strong>ESG 플랫폼(Let’s ESG)의 공급과 기술제공,</strong>
              개발과 운영을 통합관리하는 IT문화 솔루션인
              <strong> All4 패키지(All4Frame &amp; All4DevOps) 공급 및 기술 제공,</strong>
              제조/공공/금융/ICT/SAP 부문 <strong>시스템 개발사업(SI),</strong>
              고객의 시스템을 유지관리 하는 <strong>SM(ITO)</strong>을 주요 사업 영역으로 하고 있습니다.
            </p>
            <p>
              또한 선도기업과의 MOU 체결을 통한 <strong>상용 솔루션 공급/구축 사업</strong>을 기반으로 지속적인 성장을 추구하고 있으며, 기업부설연구소 인증을 통해 창조적이고 혁신적인 S/W 제품을
              개발하여 전문 IT 기업으로 발전해 가고자 합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="about-organization-section" aria-label="조직도">
        <div className="postio-industry-table about-organization-chart" role="region" aria-label="조직도 가로 스크롤" tabIndex={0}>
          <img
            src="/assets/about-organization-chart.png"
            alt="매그넘브릿지 조직도"
            draggable={false}
            style={{ cursor: "grab", touchAction: "pan-y", userSelect: "none" }}
            onPointerDown={(event) => {
              const image = event.currentTarget;
              const scroller = image.parentElement;
              if (!scroller) return;

              image.setPointerCapture(event.pointerId);
              image.dataset.dragStartX = String(event.clientX);
              image.dataset.dragStartScrollLeft = String(scroller.scrollLeft);
              image.style.cursor = "grabbing";
            }}
            onPointerMove={(event) => {
              const image = event.currentTarget;
              const scroller = image.parentElement;
              if (!scroller || !image.hasPointerCapture(event.pointerId)) return;

              const dragDistance = event.clientX - Number(image.dataset.dragStartX);
              scroller.scrollLeft = Number(image.dataset.dragStartScrollLeft) - dragDistance;
            }}
            onPointerUp={(event) => {
              const image = event.currentTarget;
              if (image.hasPointerCapture(event.pointerId)) {
                image.releasePointerCapture(event.pointerId);
              }
              image.style.cursor = "grab";
            }}
            onPointerCancel={(event) => {
              event.currentTarget.style.cursor = "grab";
            }}
          />
        </div>
      </section>

      <section className="about-company-profile" aria-labelledby="about-company-title">
        <div className="about-company-profile-inner">
          <h2 id="about-company-title">매그넘브릿지는</h2>

          <div className="about-company-introduction">
            <p>JAVA 기반의 제조/공공/금융/ICT 부문 시스템 개발사업(SI), 고객의 시스템을 유지보수 하는 SM 사업을 진행하고 있으며, 선도기업과의 MOU 체결을 통한 지속적인 성장을 추구하고 있습니다.</p>
            <p>
              또한 연구개발을 통해 창조적이고 혁신적인 S/W 제품을 개발하여 고객과 함께 성장해 나가는
              <strong>IT 솔루션 기업</strong>입니다.
            </p>
          </div>

          <p className="about-company-slogan">
            We are talking about trust,
            <br />
            creativity, and
            <br />
            innovation through technology.
          </p>

          <dl className="about-company-details">
            <div>
              <dt>회사명</dt>
              <dd>
                (주)매그넘브릿지 (MAGNUM
                <br />
                BRIDGE Co., Ltd.)
              </dd>
            </div>
            <div>
              <dt>대표이사</dt>
              <dd>김 경 민</dd>
            </div>
            <div>
              <dt>설립일</dt>
              <dd>2021년 08월 27일</dd>
            </div>
            <div>
              <dt>회사주소</dt>
              <dd>
                서울특별시 강남구 봉은사로
                <br />
                443, 8층 (삼성동, 로얄빌딩)
                <a href="https://naver.me/Fz8AVbij" target="_blank" rel="noreferrer">
                  지도보기
                </a>
              </dd>
            </div>
            <div>
              <dt>연락처</dt>
              <dd>
                T. 02-6941-0828
                <br />
                F. 02-6941-0829
              </dd>
            </div>
          </dl>

          <div className="about-company-signature" aria-label="Magnum Bridge">
            <span aria-hidden="true">
              <img src="/assets/logo-header-mo.svg" alt="" />
            </span>
            <strong>MAGNUM BRIDGE</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function PartnerOverview() {
  const partners = [
    {
      name: "티맥스소프트",
      url: "https://www.tmaxsoft.com",
      logo: <span className="partner-wordmark partner-wordmark-tmax">TMAXSOFT</span>,
    },
    {
      name: "위베어소프트",
      url: "https://www.tmaxsoft.com",
      logo: (
        <span className="partner-wordmark partner-wordmark-webare">
          <i>wb</i>webaresoftware
        </span>
      ),
    },
    {
      name: "사이냅소프트",
      url: "https://www.tmaxsoft.com",
      logo: <span className="partner-wordmark partner-wordmark-synap">사이냅소프트</span>,
    },
    {
      name: "어플라이드소프트",
      url: "https://www.tmaxsoft.com",
      logo: <span className="partner-wordmark partner-wordmark-applied">APPLIED SOFT</span>,
    },
  ];

  return (
    <>
      <section className="partner-overview-section">
        <div className="partner-overview-inner">
          <h2>Partner</h2>
          <div className="partner-list">
            {partners.map(({ name, url, logo }) => (
              <article className="partner-card" key={name}>
                <div className="partner-logo">{logo}</div>
                <h3>{name}</h3>
                <a href={url}>{url}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="customer-marquee-section">
        <h2>Customer</h2>
        <div className="client-marquee">
          <div className="client-track">
            {[0, 1].map((group) => (
              <div className="client-group" aria-hidden={group === 1 ? "true" : undefined} key={group}>
                <div className="customer-logo-cluster">
                  <img src="/assets/customer-logos-reference.png" alt={group === 0 ? "고객사 로고 모음" : ""} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function VisionMission() {
  return (
    <section className="vision-mission-section">
      <div className="vision-mission-inner">
        <div className="vision-hero">
          <div className="vision-circle">
            <img className="vision-brand" src="/assets/logo-header-mo.svg" alt="Magnum Bridge" />
            <p>
              “고객의 가치를 창출하고
              <br />
              기술을 선도하며
              <br />
              Major Player로 도약하는
              <br />
              인재들의 회사”
            </p>
          </div>
          <div className="vision-skyline" aria-hidden="true">
            <img src="/assets/vision-mission-reference.png" alt="" />
          </div>
        </div>

        <article className="vision-card vision-card-primary">
          <h2>VISION</h2>
          <i />
          <p>
            인성을 갖춘 전문가들이 만들어가는
            <br />
            <strong>“혁신 기업”</strong>
          </p>
        </article>

        <article className="vision-card vision-card-secondary">
          <h2>MISSION</h2>
          <p>
            혁신적인 기술과 차별화된 서비스를 통해
            <br />
            <strong>일과 삶의 균형</strong>이 보장된
            <br />
            미래 지향적인 업무 환경을 조정하고,
            <br />
            <strong>고객과 공존하는 조화로운 세상</strong>을 만든다.
          </p>
        </article>
      </div>

      <section className="certification-section" aria-labelledby="certification-title">
        <div className="certification-copy">
          <h2 id="certification-title">Certification</h2>
          <p>
            “매그넘브릿지”는 국내 주요 인증기관인 기술혁신형 기업
            <br className="certification-wide-break" />
            (Inno-Biz)인증 및 벤처기업인증/기업부설연구소 인정 등 최고의 IT기술을 보유하고 있음을 인정받고, 국내 최대 솔루션 기업 “Tmaxsoft”와의 파트너십을 통해 다양한 산업군의 기업에 기술력을
            제공하고 있습니다.
          </p>
        </div>

        <div className="certificate-scroller" aria-label="파트너 인증서 목록">
          <div
            className="certificate-track"
            style={{ cursor: "grab", touchAction: "pan-y", userSelect: "none" }}
            onDragStart={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              const track = event.currentTarget;
              track.setPointerCapture(event.pointerId);
              track.dataset.dragStartX = String(event.clientX);
              track.dataset.dragStartScroll = String(track.parentElement.scrollLeft);
              track.style.cursor = "grabbing";
            }}
            onPointerMove={(event) => {
              const track = event.currentTarget;
              if (!track.hasPointerCapture(event.pointerId)) return;

              const startX = Number(track.dataset.dragStartX);
              const startScroll = Number(track.dataset.dragStartScroll);
              track.parentElement.scrollLeft = startScroll - (event.clientX - startX);
            }}
            onPointerUp={(event) => {
              const track = event.currentTarget;
              if (track.hasPointerCapture(event.pointerId)) {
                track.releasePointerCapture(event.pointerId);
              }
              track.style.cursor = "grab";
            }}
            onPointerCancel={(event) => {
              const track = event.currentTarget;
              if (track.hasPointerCapture(event.pointerId)) {
                track.releasePointerCapture(event.pointerId);
              }
              track.style.cursor = "grab";
            }}
          >
            {[1, 2, 3, 4].map((certificate) => (
              <figure className="certificate-card" key={certificate}>
                <img src="/assets/certification-reference.png" alt={`Tmaxsoft 파트너 인증서 ${certificate}`} />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="system-integration-section">
        <div className="system-integration-inner">
          <h2>System Integration</h2>
          <p>
            “매그넘브릿지”의 SI(System Integration) Service는 고객 요구사항을 정확히 이해하고, 고객에게 맞는 최적의 시스템을 설계하고 구축하며, 최신 기술을 접목한 시스템의 발전 목표를 제시하여 고객의
            가치를 높여 줍니다.
          </p>
          <p>
            당사는 각 산업군별 업무 지식과 IT 기술력을 겸비한 전문인력으로 프로젝트 팀을 구성하여 고객이 요구하는 시스템을,
            <strong> 최상의 품질과 적시의 납기로</strong> 공급해 드리고 있습니다.
          </p>
        </div>
      </section>
      <section className="vision-values-section">
        <div>
          <img src="/assets/certbear-values.png" alt="Technology and know-how, Faith and Trust, Innovation and Creation" />
        </div>
      </section>
    </section>
  );
}

function HistoryOverview() {
  const history = [
    ["12월", ["Main-Biz 인증 (중소벤처기업부)"]],
    ["11월", ["Inno-Biz 인증 (중소벤처기업부)", "삼성물산건설 품질관리 포털 구축"]],
    ["07월", ["벤처기업인증 (벤처기업협회 )"]],
    ["06월", ["HK이노엔 교육/서고 관리 시스템 구축 사업 수주", "CJ프레시웨이 주문 플랫폼 2차 구축 수주"]],
    ["04월", ["(주)에스코어(삼성그룹) 협력사 등록", "에스코어 - 삼성전자 IT시스템 점검 및 운영 사업 수주", "삼성물산건설 레미콘 품질관리 시스템 구축"]],
    ["03월", ["매출(누적)100억 달성( 설립 2년 7개월 )", "(주)CJ올리브네트웍스 협력사 체결", "CJ프레시웨이 OK-POS 앱인앱 시스템 구축 사업 수주"]],
    ["02월", ["기업부설연구소 설립 ( 한국산업기술진흥협회 )"]],
    ["01월", ["본점 이전 – 서울특별시 강남구 봉은사로 443"]],
  ];

  return (
    <section className="history-section" aria-labelledby="history-year">
      <div className="history-inner">
        <div className="history-photo">
          <img src="/assets/history-reference.png" alt="매그넘브릿지 기업부설연구소" />
        </div>

        <h2 id="history-year">
          2024<span>.</span>
        </h2>

        <dl className="history-list" style={{ display: "flex", flexDirection: "column" }}>
          {history.map(([month, entries]) => (
            <div className="history-row" key={month}>
              <dt>{month}</dt>
              <dd>
                {entries.map((entry) => (
                  <span key={entry}>{entry}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function QaOverview() {
  const inquiries = [
    ["답변대기", "일반문의", "궁금한 사항이나 의견을 작성해 주시면 빠른 시일 내에 답변 드리겠습니다.", "2022.02.14"],
    ["답변대기", "제품문의", "궁금한 사항이나 의견을 작성해 주시면 빠른 시일 내에 답변 드리겠습니다.", "2022.02.14"],
    ["답변완료", "채용문의", "궁금한 사항이나 의견을 작성해 주시면 빠른 시일 내에 답변 드리겠습니다.", "2022.02.14"],
  ];

  return (
    <section className="qa-section" aria-label="문의 목록">
      <div className="qa-inner">
        <div className="qa-toolbar">
          <div className="qa-filters">
            <label>
              {/* <span className="blind">문의 유형</span> */}
              <select defaultValue="all">
                <option value="all">문의전체</option>
                <option value="general">일반문의</option>
                <option value="product">제품문의</option>
                <option value="recruit">채용문의</option>
              </select>
            </label>
            <label>
              {/* <span className="blind">처리 상태</span> */}
              <select defaultValue="all">
                <option value="all">처리전체</option>
                <option value="waiting">답변대기</option>
                <option value="complete">답변완료</option>
              </select>
            </label>
          </div>
          <button className="qa-write-button" type="button">
            작성하기
          </button>
        </div>

        <div className="qa-list">
          {inquiries.map(([status, category, title, date], index) => (
            <article className="qa-item" key={`${category}-${index}`}>
              <span className={`qa-status ${status === "답변완료" ? "complete" : ""}`}>{status}</span>
              <h2>{title}</h2>
              <div className="qa-meta">
                <p>
                  <span>{category}</span>
                  <span>작성자</span>
                </p>
                <time dateTime="2022-02-14">{date}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IdealEmployeeOverview() {
  const values = [
    ["goal", "목표", ["프로젝트 성공을 위한", "목표설정과 공유"]],
    ["communication", "소통", ["공유된 목표를 이루기", "위한 하나된 소통"]],
    ["growth", "성장", ["개인의 성장은", "팀과 회사의 성장"]],
  ];
  const serviceCards = [
    [
      "route-copy",
      "route-copy",
      "요구사항 정의 및 분석",
      ["관제대상의 이동경로를 실시간으로 지도상에 시각화", "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공"],
      "/assets/it-service-card-01.svg",
    ],
    [
      "route",
      "route",
      "설계",
      ["관제대상의 이동경로를 실시간으로 지도상에 시각화", "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공"],
      "/assets/it-service-card-02.svg",
    ],
    [
      "alert",
      "alert",
      "개발 및 테스트",
      ["지오펜싱을 이용하여 관제대상이특정 권역에 In/Out하는 이벤트를 검사하여 알람", "관제대상이특정 권역에 출발/도착하는 시간과 예상 소요시간을 예측"],
      "/assets/it-service-card-03.svg",
    ],
    ...[1, 2, 3].map((copy) => [
      `waypoint-${copy}`,
      "waypoint",
      "시스템 안정화",
      ["출발지, 도착지 외 다수의 경유지에 대한 경로 생성 및 관리", "시간, 거리, 복잡도를 고려한 사용자 맞춤 최적경로 추천"],
      "/assets/it-service-card-04.svg",
    ]),
  ];

  return (
    <>
      <section className="product-empty ideal-employee-section" aria-labelledby="ideal-employee-title">
        <div className="ideal-employee-content">
          <header className="ideal-employee-title-card">
            <span className="ideal-employee-logo-mark" aria-hidden="true">
              <img src="/assets/logo-header-mo.svg" alt="" />
            </span>
            <span className="ideal-employee-brand">MAGNUM BRIDGE</span>
            <h2 id="ideal-employee-title">매그넘브릿지 인재상</h2>
          </header>

          <div className="ideal-employee-values">
            {values.map(([type, title, copy], index) => (
              <div className="ideal-employee-value-item" key={type}>
                <article className={`ideal-employee-value ideal-employee-value-${type}`}>
                  <h3>{title}</h3>
                  <p>
                    {copy.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </article>
                {index < values.length - 1 && (
                  <span className="ideal-employee-plus" aria-hidden="true">
                    +
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ideal-employee-growth-section" aria-labelledby="ideal-employee-growth-title">
        <div className="ideal-employee-growth-inner">
          <p className="ideal-employee-growth-eyebrow">“매그넘브릿지”는</p>
          <h2 id="ideal-employee-growth-title">
            <span>고객의 성공을 최우선으로</span>
            <span>여기며 사람을 소중히 여기는</span>
            <span>신뢰받는 기업으로서,</span>
          </h2>
          <div className="ideal-employee-growth-copy">
            <p>혁신적이고 창의적인 제품 개발 및 다양한 솔루션 기반의 SI 개발에 이르기까지 한 번 이용한 고객이 반드시 다시 찾는 전문가 집단입니다.</p>
            <p>혁신적인 기술과 차별화된 서비스를 통해 일과 삶의 균형이 보장된 미래 지향적인 업무 환경을 조성하고, 고객과 공존하는 조화로운 세상을 만듭니다.</p>
          </div>
          <p className="ideal-employee-growth-message">
            <span>가치를 키우고 가치를 나누며 가치를</span>
            <span>공유할 인재를 기다립니다.</span>
          </p>
          <img className="ideal-employee-growth-chart" src="/assets/stock_image.png" alt="2021년 2.4억에서 2030년 매출목표 300억까지의 성장 그래프" />
        </div>
      </section>

      <section className="ideal-employee-it-service-section" aria-label="System Integration 업무 과정">
        <section className="system-integration-section">
          <div className="system-integration-inner">
            <h2>System Integration</h2>
            <p>
              “매그넘브릿지”의 SI(System Integration) Service는 고객 요구사항을 정확히 이해하고, 고객에게 맞는 최적의 시스템을 설계하고 구축하며, 최신 기술을 접목한 시스템의 발전 목표를 제시하여
              고객의 가치를 높여 줍니다.
            </p>
            <p>
              당사는 각 산업군별 업무 지식과 IT 기술력을 겸비한 전문인력으로 프로젝트 팀을 구성하여 고객이 요구하는 시스템을,
              <strong> 최상의 품질과 적시의 납기로</strong> 공급해 드리고 있습니다.
            </p>
          </div>
        </section>

        <section className="it-service-monitoring-section">
          <div className="postio-monitoring-grid">
            {serviceCards.map(([key, type, title, items, image]) => (
              <article className="move_up" key={key} ref={observeDirectionalMoveUp}>
                <p>{title}</p>
                <div className={`postio-crop postio-monitoring-icon monitor-${type}`}>
                  <img src={image} alt={`${title} 아이콘`} />
                </div>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

function BenefitOverview() {
  const [activeRecruitTab, setActiveRecruitTab] = useState("outsystems");
  const [activePosting, setActivePosting] = useState(0);

  const postings = {
    outsystems: [
      {
        title: "Front-end 개발 경력사원 모집",
        tasks: ["Front-end 컴포넌트 ECM 기반 개발", "Front-end ECM 기반 컴포넌트 기능 고도화", "고객요구사항 분석 / 설계 / 화면개발"],
        requirements: [
          "(전문)대학 관련학과 졸업 이상의 학력소지자",
          "Front-end 개발 5년 이상",
          "웹 표준규격에 대한 이해 (ECMAScript, HTML5, CSS3)",
          "순수 Javascript 기반 개발 가능자 (DOM API 활용)",
          "Cross-browsing 이슈 대응 가능자",
        ],
        preferences: ["웹 에디터 개발 경험자", "성능에 민감한 Javascript 어플리케이션 튜닝 경험자", "MS-Office 활용에 능숙하거나 문서 작성/편집 기능에 관심이 많은 분"],
      },
      {
        title: "OutSystems 개발 경력사원 모집",
        tasks: ["OutSystems 기반 업무 시스템 개발", "화면 및 서버 로직 설계", "고객 요구사항 분석과 기술 지원"],
        requirements: ["관련 개발 경력 3년 이상", "웹 서비스 및 데이터베이스에 대한 이해", "협업과 원활한 커뮤니케이션이 가능한 분"],
        preferences: ["OutSystems 프로젝트 수행 경험자", "엔터프라이즈 시스템 구축 경험자"],
      },
    ],
    sw: [
      {
        title: "SW 개발 부문 경력사원 모집",
        tasks: ["Java 기반 업무 시스템 개발", "서비스 API 및 데이터 모델 설계", "시스템 운영과 기능 고도화"],
        requirements: ["관련 개발 경력 3년 이상", "Java 및 Spring Framework 활용 가능자", "관계형 데이터베이스와 SQL에 대한 이해", "Git 기반 협업 경험자"],
        preferences: ["대규모 시스템 구축 경험자", "클라우드 환경 개발 및 운영 경험자", "문제 해결과 커뮤니케이션 역량이 우수한 분"],
      },
    ],
  };

  const activePostings = postings[activeRecruitTab];
  const posting = activePostings[activePosting % activePostings.length];
  const changePosting = (direction) => {
    setActivePosting((current) => (current + direction + activePostings.length) % activePostings.length);
  };
  const changeTab = (tab) => {
    setActiveRecruitTab(tab);
    setActivePosting(0);
  };

  return (
    <section className="benefit-recruit-section">
      <div className="benefit-tabs" role="tablist" aria-label="채용 부문">
        <button
          type="button"
          role="tab"
          aria-selected={activeRecruitTab === "outsystems"}
          aria-controls="benefit-recruit-panel"
          className={activeRecruitTab === "outsystems" ? "active" : ""}
          onClick={() => changeTab("outsystems")}
        >
          OutSystems 부문
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeRecruitTab === "sw"}
          aria-controls="benefit-recruit-panel"
          className={activeRecruitTab === "sw" ? "active" : ""}
          onClick={() => changeTab("sw")}
        >
          SW 개발 부문
        </button>
      </div>

      <div className="benefit-recruit-panel" id="benefit-recruit-panel" role="tabpanel">
        <div className="benefit-recruit-inner">
          <div className="benefit-posting-header">
            <h2>{posting.title}</h2>
            <div className="benefit-posting-arrows">
              <button type="button" aria-label="이전 채용 공고" onClick={() => changePosting(-1)}>
                ←
              </button>
              <button type="button" aria-label="다음 채용 공고" onClick={() => changePosting(1)}>
                →
              </button>
            </div>
          </div>

          <div className="benefit-posting-body">
            <RecruitDetail title="담당업무" items={posting.tasks} />
            <RecruitDetail title="자격요건" items={posting.requirements} numbered />
            <RecruitDetail title="우대사항" items={posting.preferences} />

            <div className="benefit-process">
              <h3>채용절차</h3>
              <div className="benefit-process-flow">
                <div>
                  <strong>01</strong>
                  <span>서류심사</span>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <strong>02</strong>
                  <span>인터뷰</span>
                </div>
              </div>
              <p>※ 일정조율 및 협의진행 가능</p>
            </div>
          </div>

          <div className="benefit-actions">
            <button type="button">바로 지원하기</button>
            <button type="button">문의하기</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecruitDetail({ title, items, numbered = false }) {
  return (
    <section className={`recruit-detail${numbered ? " numbered" : ""}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={item}>
            {numbered && <strong>{String(index + 1).padStart(2, "0")}</strong>}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ApplicationLookup() {
  return (
    <section className="application-lookup-section">
      <form className="application-lookup-form" onSubmit={(event) => event.preventDefault()}>
        <h2>지원 정보 확인</h2>
        <p>지원 시 작성한 기본 정보를 입력해 주세요.</p>

        <div className="application-lookup-fields">
          <label>
            <input type="email" name="email" placeholder="이메일" autoComplete="email" required />
          </label>
          <label>
            <input type="password" name="password" placeholder="비밀번호" autoComplete="current-password" required />
          </label>
        </div>

        <button type="submit">확인</button>
      </form>
    </section>
  );
}

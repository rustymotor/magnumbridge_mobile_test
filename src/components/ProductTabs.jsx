import { useRef, useState } from "react";

const tabs = [
  { id: "all4frame", label: "All4 Frame" },
  { id: "postio", label: "POSTIO" },
  { id: "certbear", label: "CertBear" },
];

export function observeDirectionalMoveUp(element) {
  if (!element) return;

  const observer = new IntersectionObserver(([entry]) => {
    const viewportTop = entry.rootBounds?.top ?? 0;
    const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;

    if (entry.isIntersecting || entry.boundingClientRect.bottom <= viewportTop) {
      entry.target.classList.add("is-visible");
    } else if (entry.boundingClientRect.top >= viewportBottom) {
      entry.target.classList.remove("is-visible");
    }
  }, { threshold: 0.1 });

  observer.observe(element);
  return () => observer.disconnect();
}

const featureRows = [
  ["표준 개발 환경", true, true, true],
  ["API 자동 생성", true, true, true],
  ["DTO / Repository 생성", true, true, true],
  ["보안 공통 모듈", true, true, true],
  ["프로젝트 템플릿", false, true, true],
  ["통합 형상 관리", false, true, true],
  ["배포 자동화", false, true, true],
  ["품질 지표 관리", false, false, true],
  ["운영 모니터링", false, false, true],
  ["DevOps 파이프라인", false, false, true],
];

const generators = [
  {
    title: "RestController Generator",
    eyebrow: "All4Frame GUI RestController Generator Plug-in",
    bullets: [
      "GUI 기반 Restful API 생성 지원",
      "API 문서 자동 생성 지원",
      "표준화된 Restful API 로직 제공",
      "Header, Body, Query Params, URL Path 입력 기능",
    ],
    mockup: "controller",
  },
  {
    title: "DTO Generator",
    eyebrow: "All4Frame GUI DTO Generator Plug-in",
    bullets: [
      "GUI 기반 DTO(DataTransferObject) 생성 지원",
      "Json, XML, FixedLength, Serializable 타입 선택 지원",
      "복합 변수와 기본 제공 속성 관리",
      "API 통신 Schema 지원",
    ],
    mockup: "dto",
  },
  {
    title: "Repository Generator",
    eyebrow: "All4Frame GUI Repository Generator Plug-in",
    bullets: [
      "GUI 기반 Repository 인터페이스 생성 지원",
      "JPA, MyBatis 프로젝트 구성 지원",
      "쿼리 메서드와 기본 CRUD 자동 생성",
      "API 통신 Schema 지원",
    ],
    mockup: "repository",
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all4frame");

  return (
    <section className="product-tabs-section" aria-label="제품 상세">
      <div className="product-tab-list" role="tablist" aria-label="제품 선택">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "active" : ""}
            id={`product-tab-${tab.id}`}
            key={tab.id}
            type="button"
            role="tab"
            aria-controls={`product-panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`product-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`product-tab-${activeTab}`}
      >
        {activeTab === "all4frame" && <All4FramePanel />}
        {activeTab === "postio" && <PostioPanel />}
        {activeTab === "certbear" && <CertBearPanel />}
      </div>
    </section>
  );
}

function All4FramePanel() {
  const dragState = useRef({ active: false, pointerX: 0, scrollLeft: 0 });

  const stopDragging = (event) => {
    const scroller = event.currentTarget;
    dragState.current.active = false;
    scroller.classList.remove("dragging");

    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <>
      <section className="product-lineup">
        <div className="product-content">
          <p className="product-overline">All4Frame Lineup</p>
          <div
            className="lineup-image-scroll"
            role="region"
            aria-label="All4Frame 라인업 이미지"
            tabIndex={0}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;

              const scroller = event.currentTarget;
              dragState.current = {
                active: true,
                pointerX: event.clientX,
                scrollLeft: scroller.scrollLeft,
              };
              scroller.setPointerCapture(event.pointerId);
              scroller.classList.add("dragging");
            }}
            onPointerMove={(event) => {
              if (!dragState.current.active) return;

              event.currentTarget.scrollLeft =
                dragState.current.scrollLeft -
                (event.clientX - dragState.current.pointerX);
            }}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <img
              src="/assets/all4frame-lineup.png"
              alt="All4Frame Basic, Standard, Enterprise 제품 라인업과 제공 기능"
              draggable="false"
            />
          </div>
        </div>
      </section>

      <section className="feature-matrix">
        <div className="product-content">
          <p className="product-overline">All4Frame 제품별 제공 기능</p>
          <div className="feature-table" role="table" aria-label="All4Frame 제품별 제공 기능">
            <div className="feature-row feature-head" role="row">
              <span role="columnheader" />
              <span role="columnheader">Basic</span>
              <span role="columnheader">Standard</span>
              <span role="columnheader">Enterprise</span>
            </div>
            {featureRows.map(([label, basic, standard, enterprise]) => (
              <div className="feature-row" role="row" key={label}>
                <span role="cell">{label}</span>
                {[basic, standard, enterprise].map((enabled, index) => (
                  <span role="cell" key={`${label}-${index}`}>
                    {enabled && <i aria-label="지원" />}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="generator-section">
        <div className="product-content">
          {generators.map((generator) => (
            <article className="generator-card" key={generator.title}>
              <p className="generator-title">{generator.title}</p>
              <p className="generator-eyebrow">{generator.eyebrow}</p>
              <div className="generator-card-body">
                <ProductMockup variant={generator.mockup} />
                <ul>
                  {generator.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            </article>
          ))}

          <article className="generator-card security-card">
            <p className="generator-title">Security</p>
            <p className="generator-eyebrow">All4Frame Security</p>
            <div className="generator-card-body">
              <img
                src="/assets/product-sample-04.png"
                alt="노트북 키보드 위의 자물쇠"
              />
              <ul>
                <li>LDAP, OAuth2 인증 처리 지원</li>
                <li>JWT 인증 처리 지원</li>
                <li>기본 보안 취약점 해소</li>
                <li>Parameter Tampering 공격 방어</li>
                <li>Cross-Site Scripting 공격 방어</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ProductMockup({ variant }) {
  const images = {
    controller: ["/assets/product-sample-01.png", "RestController Generator 화면"],
    dto: ["/assets/product-sample-02.png", "DTO Generator 화면"],
    repository: ["/assets/product-sample-03.png", "Repository Generator 화면"],
  };
  const [src, alt] = images[variant];

  return (
    <img className="product-mockup-image" src={src} alt={alt} />
  );
}

function PostioPanel() {
  const [featureSlide, setFeatureSlide] = useState(0);
  const modelItems = [
    ["vehicle", "Vehicle 이동체", "실시간 추적 및 관제가 가능한 물리적·논리적 대상체", "/assets/postio-icon-01.png"],
    ["assignment", "Assignment 할당", "Vehicle과 Asset의 관계와 업무 처리 기준을 정의", "/assets/postio-icon-02.png"],
    ["asset", "Asset 자원", "업무활동을 통해 생성되는 특정 목적의 정보 집합", "/assets/postio-icon-03.png"],
    ["thing", "Thing 아이템", "Asset 자원을 구성하는 개별적으로 식별 가능한 최소 정보", "/assets/postio-icon-04.png"],
  ];
  const monitoringItems = [
    ["location", "위치 조회", [
      "수집된위치 정보를 활용하여 주소, 상태(이동, 정지 등), 속도, 방향 등 위치에 대한 속성을 설정",
      "지도상에 관제대상 위치와 함께 속성 정보를 직관적으로 시각화",
    ], "/assets/postio-place-01.svg"],
    ["route", "수작업 관리 한계", [
      "관제대상의 이동경로를 실시간으로 지도상에 시각화",
      "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공",
    ], "/assets/postio-place-02.svg"],
    ["alert", "운영 비용 증가", [
      "지오펜싱을 이용하여 관제대상이특정 권역에 In/Out하는 이벤트를 검사하여 알람",
      "관제대상이특정 권역에 출발/도착하는 시간과 예상 소요시간을 예측",
    ], "/assets/postio-place-03.svg"],
    ["waypoint", "서비스 중단 리스크", [
      "출발지, 도착지 외 다수의 경유지에 대한 경로 생성 및 관리",
      "시간, 거리, 복잡도를 고려한 사용자 맞춤 최적경로 추천",
    ], "/assets/postio-place-04.svg"],
  ];

  return (
    <div className="postio-published">
      <section className="postio-hero-section">
        <div className="postio-inner postio-hero-inner">
          <p className="postio-kicker">지능형 위치기반 클라우드 서비스</p>
          <img className="postio-logo" src="/assets/postio-logo.svg" alt="POSTIO" />
          <img
            className="postio-hero-graphic"
            src="/assets/postio-ai-network.png"
            alt="AI 위치관제 네트워크"
          />
          <p className="postio-lead">
            고객이 필요한 위치관제 기능과 정보를, 정확하고 빠르고 안정적이며
            경제적으로 제공하는 <strong>지능형 위치관제 서비스</strong>
          </p>
        </div>
      </section>

      <section className="postio-feature-intro">
        <div className="postio-inner">
          <p className="postio-section-title light">주요기능 및 특장점</p>
          <div className="postio-feature-slider">
            <div className="postio-feature-viewport">
              <div
                className="postio-feature-track"
                style={{ transform: `translateX(-${featureSlide * 100}%)` }}
              >
                {[0, 1, 2].map((slide) => (
                  <article className="postio-feature-slide" key={slide}>
                    <img
                      className="postio-vata-graphic"
                      src="/assets/postio-vata.png"
                      alt={slide === 0 ? "VAT-A 데이터 모델 구성" : ""}
                    />
                    <div className="postio-feature-caption">
                      <strong>
                        VAT-A 데이터 모델링을 이용한 <span className="fg-inline-italic">데이터 통합</span>
                      </strong>
                      <p>파편화된 위치 데이터를 표준화된 단일 모델로 통합하여 업무 운영 현황을 한눈에 파악할 수 있는 기반을 제공합니다.</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <button
              className="postio-feature-arrow postio-feature-arrow-left"
              type="button"
              aria-label="이전 슬라이드"
              onClick={() => setFeatureSlide((featureSlide + 2) % 3)}
            >
              <img src="/assets/postio-arrow-left.svg" alt="" />
            </button>
            <button
              className="postio-feature-arrow postio-feature-arrow-right"
              type="button"
              aria-label="다음 슬라이드"
              onClick={() => setFeatureSlide((featureSlide + 1) % 3)}
            >
              <img src="/assets/postio-arrow-left.svg" alt="" />
            </button>
          </div>
        </div>
      </section>

      <section className="postio-model-section">
        <div className="postio-inner">
          <PostioHeading title="VAT-A 데이터 모델을 이용한 데이터 통합">
            VAT-A 데이터 모델은 복잡하고 다양한 운영 데이터를 Vehicle, Asset,
            Thing으로 정의하고 Assignment로 연결하여 체계적으로 관리합니다.
          </PostioHeading>
          <div className="postio-model-flow">
            {modelItems.map(([type, title, copy, image], index) => (
              <div className="postio-model-step" key={type}>
                <article className="move_up" ref={observeDirectionalMoveUp}>
                  <PostioCrop
                    className={`postio-model-icon icon-${type}`}
                    src={image}
                    alt={`${title} 아이콘`}
                  />
                  <div>
                    <p>{title}</p>
                    <span>{copy}</span>
                  </div>
                </article>
                {index < modelItems.length - 1 && (
                  <div
                    className="postio-relation move_up"
                    aria-hidden="true"
                    ref={observeDirectionalMoveUp}
                  >
                    <i />
                    <strong>{index === 1 ? "1:N 관계" : "N:1 관계"}</strong>
                    <span>데이터 간 연결 관계</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="postio-industry-table" role="table" aria-label="VAT-A 산업 분야 적용 예시">
            <div role="row">
              <strong role="columnheader">산업분야</strong>
              <strong role="columnheader">Vehicle 이동체</strong>
              <strong role="columnheader">Asset 자원</strong>
              <strong role="columnheader">Thing 아이템</strong>
              <strong role="columnheader">Assignment 할당</strong>
            </div>
            {[
              [
                "물류 및 운송",
                "택배 트럭, 지게차",
                "고객 주문 건, 화물 운송장",
                "개별 상품(스마트폰, 충전기), 포장재",
                "트럭(Vehicle)에게 주문 건(Asset) 배송 임무 할당 기록",
              ],
              [
                "필드 서비스",
                "현장 기술자, 서비스 차량",
                "장비 수리 요청 오더, 정기 점검 일정",
                "교체용 부품, 소모품",
                "기술자(Vehicle)에게 수리 오더(Asset) 수행 임무 할당 기록",
              ],
              [
                "스마트 시티",
                "순찰차, 구급차, 청소차",
                "긴급 신고 건(119/112), 도시 시설물(가로등)",
                "순찰 인력, 차량 소모품",
                "구급차(Vehicle)에게 특정 신고 건(Asset) 출동 임무 할당 기록",
              ],
              [
                "건설 및 EAM",
                "크레인, 굴삭기, 건설 인력",
                "건설 프로젝트 작업 구역, 유지보수 오더",
                "투입된 자재, 장비 센서 데이터",
                "크레인(Vehicle)에게 특정 작업 구역(Asset) 작업 임무 할당 기록",
              ],
            ].map((row) => (
              <div role="row" key={row[0]}>
                {row.map((cell) => <span role="cell" key={cell}>{cell}</span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="postio-ai-section">
        <div className="postio-inner">
          <PostioHeading title="생성형 AI 기반 지능형 업무 분석">
            다양한 모달리티 데이터와 멀티 에이전트 협업을 통해 위치 중심의
            질문을 이해하고 업무를 분석·처리합니다.
          </PostioHeading>
          <div className="postio-ai-cards">
            <img
              className="postio-user-agent-image move_up"
              src="/assets/postio-user-agent.png"
              alt="사용자 멀티모달 통합 화면"
              ref={observeDirectionalMoveUp}
            />
            <p
              className="postio-integration-label move_up"
              ref={observeDirectionalMoveUp}
            >
              멀티모달 통합(Multimodal Integration)
            </p>
            <div
              className="postio-agent-exchange move_up"
              aria-label="질의와 응답"
              ref={observeDirectionalMoveUp}
            >
              <span>질의</span>
              <img src="/assets/postio-arrow-up.svg" alt="상향 화살표" />
              <img src="/assets/postio-arrow-down.svg" alt="하향 화살표" />
              <span>응답</span>
            </div>
            <img
              className="postio-ai-agent-image move_up"
              src="/assets/postio-ai-agent.png"
              alt="AI Agent 업무 분석 구조"
              ref={observeDirectionalMoveUp}
            />
            <p className="postio-a2a-label move_up" ref={observeDirectionalMoveUp}>
              A2A(Agent to Agent)
            </p>
          </div>
        </div>
        <div className="postio-demo-grid">
          <PostioDemo
            title="위치정보 검색"
            src="/assets/postio-demo-01.png"
            alt="위치정보 검색 화면"
            caption="대상의 위치, 상태, 주소, 방향, 속도를 지도와 함께 조회"
          />
          <PostioDemo
            title="이벤트 정보 조회"
            src="/assets/postio-demo-02.png"
            alt="이벤트 정보 조회 화면"
            caption="대상의 진입과 이탈에 대한 이벤트 정보를 지도와 함께 조회"
          />
          <PostioDemo
            title="VAT-A 모델기반 업무정보 조회"
            src="/assets/postio-demo-03.png"
            alt="업무정보 조회 화면"
            caption="VAT-A 모델과 통합된 업무 목적에 따라 조회"
          />
        </div>
      </section>

      <section className="postio-monitoring-section">
        <div className="postio-inner">
          <PostioHeading title="위치관제 모니터링">
            수집된 위치 정보를 지도 기반으로 조회하고, 이동경로와 이벤트를
            분석하여 효율적인 관제 서비스를 제공합니다.
          </PostioHeading>
          <div className="postio-monitoring-grid">
            {monitoringItems.map(([type, title, items, image]) => (
              <article className="move_up" key={type} ref={observeDirectionalMoveUp}>
                <p>{title}</p>
                <PostioCrop
                  className={`postio-monitoring-icon monitor-${type}`}
                  src={image}
                  alt={`${title} 아이콘`}
                />
                <ul>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="postio-detail-section">
        <div className="postio-inner">
          <PostioDetail
            number="1"
            title="위치조회"
            copy="수집된 위치 정보를 활용해 주소, 상태, 속도, 방향 등 위치 속성을 설정하고 지도와 함께 조회합니다."
            image="/assets/postio-detail-01.png"
          />
          <PostioDetail
            number="2"
            title="이동경로 관리"
            copy="관제 대상의 이동경로를 실시간으로 지도에 시각화하고 과거 이동경로도 조회합니다."
            image="/assets/postio-detail-02.png"
          />
          <PostioDetail
            number="3"
            title="예측 및 알림"
            copy="지오펜싱을 이용해 특정 권역의 진입과 이탈을 예측하고 이벤트를 알립니다."
            image="/assets/postio-detail-03.png"
          />
          <PostioDetail
            number="4"
            title="다중 경유지 관리"
            copy="출발지와 도착지 사이의 경유지 경로를 생성하고 최적화된 이동 순서를 제공합니다."
            image="/assets/postio-detail-04.png"
          />
        </div>
      </section>

    </div>
  );
}

function PostioHeading({ title, children }) {
  return (
    <div className="postio-heading">
      <p>{title}</p>
      <span>{children}</span>
    </div>
  );
}

function PostioCrop({ className, src, alt }) {
  return (
    <div className={`postio-crop ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

function PostioDemo({ title, src, alt, caption }) {
  return (
    <article>
      <p>{title}</p>
      <PostioCrop className="postio-demo-image" src={src} alt={alt} />
      <p className="postio-demo-caption">{caption}</p>
    </article>
  );
}

function PostioDetail({ number, title, copy, image }) {
  return (
    <article className="postio-detail">
      <div>
        <span>{number}.</span>
        <p>{title}</p>
      </div>
      <p>{copy}</p>
      <div className="postio-detail-visuals">
        <PostioCrop
          className="postio-detail-image"
          src={image}
          alt={`${title} 관리 화면`}
        />
      </div>
    </article>
  );
}

function CertBearPanel() {
  const [featureSlide, setFeatureSlide] = useState(0);
  const distributedManagementTitle = "분산관리 어려움";
  const distributedManagementDescription = "복수 서버, 클라우드 등 여러 환경에 분산된 인증서를 각각 관리해야 합니다.";
  const monitoringItems = [
    ["route-copy", distributedManagementTitle, [
      distributedManagementDescription,
      "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공",
    ], "/assets/certbear-icon-01.svg"],
    ["route", "이동경로 관리", [
      "관제대상의 이동경로를 실시간으로 지도상에 시각화",
      "수집된 위치를 이력으로 관리하며 총 이동시간, 상태(이동, 정지)평균속도 등 정보제공",
    ], "/assets/certbear-icon-02.svg"],
    ["alert", "예측/알림", [
      "지오펜싱을 이용하여 관제대상이특정 권역에 In/Out하는 이벤트를 검사하여 알람",
      "관제대상이특정 권역에 출발/도착하는 시간과 예상 소요시간을 예측",
    ], "/assets/certbear-icon-03.svg"],
    ["waypoint", "다중 경유지 관리", [
      "출발지, 도착지 외 다수의 경유지에 대한 경로 생성 및 관리",
      "시간, 거리, 복잡도를 고려한 사용자 맞춤 최적경로 추천",
    ], "/assets/certbear-icon-04.svg"],
  ];
  const certbearFeatureItems = [
    ["dashboard", "대시보드 기반 실시간 모니터링", [
      "모든 인증서 현황(만료 예정, 갱신 상태)을 한눈에 파악",
      "실시간 업데이트 UI 제공으로 운영 리스크 조기 대응 가능",
    ]],
    ["discovery", "인증서 자동 탐색", [
      "복수 서버와 클라우드 환경의 인증서를 자동으로 탐색",
      "분산된 인증서 정보를 빠짐없이 한곳에 수집",
    ]],
    ["notification", "만료 사전 알림", [
      "인증서 만료 일정을 단계별로 사전 안내",
      "담당자별 알림으로 갱신 누락을 예방",
    ]],
    ["automation", "발급·갱신 자동화", [
      "인증서 발급부터 배포와 갱신까지 자동 처리",
      "반복 작업을 줄여 운영 효율성을 향상",
    ]],
    ["centralized", "중앙 통합 관리", [
      "서로 다른 환경의 인증서를 하나의 화면에서 관리",
      "표준화된 정책으로 일관된 보안 운영 가능",
    ]],
    ["risk", "운영 리스크 감소", [
      "만료로 인한 서비스 중단 위험을 선제적으로 차단",
      "인증서 관리 복잡도와 운영 비용을 절감",
    ]],
  ];

  return (
    <div className="postio-published certbear-panel">
      <section className="postio-hero-section">
        <div className="postio-inner postio-hero-inner">
          <p className="postio-kicker">지능형 위치기반 클라우드 서비스</p>
          <img className="postio-logo certbear-logo" src="/assets/certbear-logo.svg" alt="CertBear" />
          <p className="postio-lead">
            고객이 필요한 위치관제 기능과 정보를, 정확하고 빠르고 안정적이며
            경제적으로 제공하는 <strong>지능형 위치관제 서비스</strong>
          </p>
          <img
            className="postio-hero-graphic certbear-hero-graphic"
            src="/assets/certbear-hero.png"
            alt="CertBear SSL 인증서 관리 화면"
          />
        </div>
      </section>

      <section className="postio-feature-intro">
        <div className="postio-inner">
          <p className="postio-section-title light">주요기능 및 특장점</p>
          <div className="postio-feature-slider">
            <div className="postio-feature-viewport">
              <div
                className="postio-feature-track"
                style={{ transform: `translateX(-${featureSlide * 100}%)` }}
              >
                {[0, 1, 2].map((slide) => (
                  <article className="postio-feature-slide" key={slide}>
                    <img
                      className="postio-vata-graphic certbear-feature-graphic"
                      src="/assets/certbear-feature-01.svg"
                      alt={slide === 0 ? "CertBear 주요 기능" : ""}
                    />
                  </article>
                ))}
              </div>
            </div>
            <button
              className="postio-feature-arrow postio-feature-arrow-left"
              type="button"
              aria-label="이전 슬라이드"
              onClick={() => setFeatureSlide((featureSlide + 2) % 3)}
            >
              <img src="/assets/postio-arrow-left.svg" alt="" />
            </button>
            <button
              className="postio-feature-arrow postio-feature-arrow-right"
              type="button"
              aria-label="다음 슬라이드"
              onClick={() => setFeatureSlide((featureSlide + 1) % 3)}
            >
              <img src="/assets/postio-arrow-left.svg" alt="" />
            </button>
          </div>
        </div>
      </section>

      <section className="postio-monitoring-section">
        <div className="postio-inner">
          <PostioHeading title="CertBear의 필요성">
            서비스 중단의 80%, 인증서 만료에서 시작됩니다. 짧아진 인증서
            유효기간만큼 더 자주 인증서를 발급·갱신해야 합니다.
          </PostioHeading>
          <div className="certbear-validity">
            <p>인증서 유효기간은 계속 줄어듭니다.</p>
            <div className="certbear-validity-row">
              <span>2026년 3월 15일부터</span>
              <div><i className="certbear-validity-200" /><strong>200일</strong></div>
            </div>
            <div className="certbear-validity-row">
              <span>2027년 3월 15일부터</span>
              <div><i className="certbear-validity-100" /><strong>100일</strong></div>
            </div>
            <div className="certbear-validity-row certbear-validity-row-accent">
              <span>2029년 3월 15일부터</span>
              <div><i className="certbear-validity-47" /><strong>47일</strong></div>
            </div>
          </div>
          <p className="certbear-validity-copy">
            짧아진 유효기간만큼 더 자주 인증서를 발급·갱신해야 하고 관리
            복잡도와 비용은 커집니다.
          </p>
          <div className="postio-monitoring-grid">
            {monitoringItems.map(([type, title, items, image]) => (
              <article className="move_up" key={type} ref={observeDirectionalMoveUp}>
                <p>{title}</p>
                <PostioCrop
                  className={`postio-monitoring-icon monitor-${type}`}
                  src={image}
                  alt={`${title} 아이콘`}
                />
                <ul>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          
          <section className="certbear-feature-overview">
            <p className="certbear-feature-overview-title">CertBear 특징</p>
            <div className="certbear-feature-overview-body">
              <p className="certbear-feature-overview-lead">
                수동관리의 어려움,<br />
                CertBear가 해결할 수 있습니다.
              </p>
              <PostioCrop
                className="certbear-dashboard-crop"
                src="/assets/certbear-features-reference.png"
                alt="CertBear 대시보드"
              />
              <div className="certbear-feature-overview-copy">
                <p>
                  Agent와 중앙 서버, Web 기반 대시보드를 통해
                  <strong> 설치된 인증서를 실시간으로 탐지 및 모니터링하고, 만료 전 사전 알림과 ACME 연동 자동 갱신 기능을 제공합니다.</strong>
                </p>
                <p>
                  이를 통해 수작업 누락이나 지연으로 인한 서비스 중단 위험을
                  최소화할 수 있으며, 기업 보안 리스크를 사전에 예방하고,
                  <strong> 인증서 운영의 효율성과 안정성을 크게 향상</strong>시킵니다.
                </p>
              </div>
            </div>
          </section>

          <div className="postio-monitoring-grid certbear-feature-grid">
            {certbearFeatureItems.map(([type, title, items], index) => (
              <article className="move_up" key={type} ref={observeDirectionalMoveUp}>
                
                <PostioCrop
                  className={`postio-monitoring-icon monitor-${type}`}
                  src={`/assets/certbear-function-0${index + 1}.svg`}
                  alt={`${title} 아이콘`}
                />
                <p>{title}</p>
                <ul>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="certbear-cta">
        <div className="certbear-cta-content">
          <h2>SSL 인증서 자동 수집·통합 관리·자동 갱신 솔루션</h2>
          <p>CertBear</p>
          <a href="#contact">컨설팅 요청하기</a>
        </div>
        <PostioCrop
          className="certbear-cta-graphic"
          src="/assets/certbear-cta-reference.png"
          alt="CertBear SSL 인증서 자동 관리"
        />
      </section>
    </div>
  );
}

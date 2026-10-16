// src/Hero.jsx
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import mainImage1 from "/assets/main_slide_1.jpg";
import mainImage2 from "/assets/main_slide_2.jpg";
import mainImage3 from "/assets/main_slide_3.jpg";
import mainImage4 from "/assets/main_slide_4.jpg";

const SLIDES = [
  {
    className: "hero-slide-1",
    image: mainImage1,
    copy: ["We are talking", "about trust,", "creativity,", "and innovation", "through technology."],
  },
  {
    className: "hero-slide-2",
    image: mainImage2,
    copy: [
      "고객과 함께",
      "성장하는 혁신기업",
      {
        text: "Human & Compay of Technology, 사람과 기업, 기술을 바탕으로 신뢰와 사업의 성공을 통해, 회사/직원/협력사간 동반 성장 하고자 목표하고 있습니다.",
        style: { fontSize: "16px", marginTop: "100px" },
      },
      { text: "", style: { fontSize: "16px" } },
    ], // 실제 문구로 교체
  },
  {
    className: "hero-slide-3",
    image: mainImage3,
    copy: ["We are talking", "about trust,", "creativity,", "and innovation", "through technology."], // 실제 문구로 교체
  },
  {
    className: "hero-slide-4",
    image: mainImage4,
    copy: [
      "고객과 함께",
      "성장하는 혁신기업",
      { text: "Human & Compay of Technology, 사람과 기업, 기술을 바탕으로 신뢰와 사업의 성공을 통해, 회사/직원/협력사간 동반 성장 하고자 목표하고 있습니다.", style: { fontSize: "16px" } },
      { text: "", style: { fontSize: "16px" } },
    ], // 실제 문구로 교체
  },
];

function CopyLine({ line }) {
  if (typeof line === "string") return line;
  return (
    <span className={line.className} style={line.style}>
      {line.text}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <Swiper modules={[Autoplay, Pagination]} loop speed={600} grabCursor autoplay={{ delay: 4000, disableOnInteraction: false }} pagination={{ clickable: true }}>
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.className}>
            <div className={`hero-inner ${slide.className}`}>
              <img className="hero-image" src={slide.image} alt="" draggable={false} />
              <div className="hero-slide-content">
                <p className="hero-copy" style={{ fontSize: "32px" }}>
                  {slide.copy.map((line, i) => (
                    <Fragment key={i}>
                      <CopyLine line={line} />
                      {i < slide.copy.length - 1 && <br />}
                    </Fragment>
                  ))}
                </p>
                <a href="#company" className="view-more" draggable={false}>
                  view more
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

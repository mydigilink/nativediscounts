"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BannerSlider({
  heroImages = [],
  heroHeadline,
  heroSubheadline,
}) {
  const slides = heroImages.filter((item) => item?.image);

  if (slides.length === 0) return null;

  return (
    <div className="banner-slider my-4">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        navigation={slides.length > 1}
        pagination={slides.length > 1 ? { clickable: true } : false}
        loop={false}
        rewind={slides.length > 1}
        slidesPerView={1}
        spaceBetween={20}
        observer={true}
        observeParents={true}
        autoplay={
          slides.length > 1
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        className="custom-swiper"
      >
        {slides.map((hero, idx) => (
          <SwiperSlide key={`${hero.image}-${idx}`}>
            <div className="banner-slide-box">
              {hero.link ? (
                <a
                  href={hero.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-link"
                >
                  <Image
                    src={hero.image}
                    alt={hero.alt || hero.name || `Hero Slide ${idx + 1}`}
                    fill
                    sizes="100vw"
                    className="banner-img"
                    priority={idx === 0}
                  />
                </a>
              ) : (
                <Image
                  src={hero.image}
                  alt={hero.alt || hero.name || `Hero Slide ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="banner-img"
                  priority={idx === 0}
                />
              )}

              {(heroHeadline || heroSubheadline) && (
                <div className="banner-overlay">
                  {heroHeadline && <h2>{heroHeadline}</h2>}
                  {heroSubheadline && <p>{heroSubheadline}</p>}
                </div>
              )}

              {/* {hero.name && <div className="banner-name">{hero.name}</div>} */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .banner-slider {
          width: 100%;
          overflow: hidden;
        }

        .custom-swiper {
          width: 100%;
          height: 350px;
        }

        .banner-slide-box {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
          border-radius: 20px;
          background: #f5f5f5;
        }

        .banner-link {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .banner-img {
          object-fit: cover;
          border-radius: 20px;
        }

        .banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          background: rgba(0, 0, 0, 0.3);
          padding: 16px;
        }

        .banner-overlay h2 {
          font-size: 36px;
          font-weight: 700;
          margin: 0;
        }

        .banner-overlay p {
          font-size: 18px;
          margin-top: 8px;
        }

        .banner-name {
          position: absolute;
          left: 50%;
          bottom: 16px;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 14px;
          z-index: 3;
        }

        @media (max-width: 768px) {
          .custom-swiper,
          .banner-slide-box {
            height: 220px;
          }

          .banner-overlay h2 {
            font-size: 24px;
          }

          .banner-overlay p {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
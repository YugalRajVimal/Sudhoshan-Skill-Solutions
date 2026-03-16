import { FaStar, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Color palette based on provided hex values
const COLORS = {
  brandBlue: "#0B3D91",      // Primary Brand
  orange: "#FF7A00",         // Accent
  gradStart: "#1FA2FF",      // Gradient Start
  gradEnd: "#0072FF",        // Gradient End
  bgGray: "#F6F8FC",         // Light Gray Background
  textDark: "#1F2937",       // Dark Gray (Text)
  textLight: "#6B7280",      // Gray (Secondary text)
  white: "#FFFFFF",
};

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Ajeet Patel",
      rating: 5,
      feedback:
        "I had a very positive experience with Sudhosan Skill Solutions. The training programs and HR-related support services were highly practical, well-structured, and aligned with current industry requirements."
    },
    {
      name: "Anjali Kumari",
      rating: 5,
      feedback:
        "The counselling session helped me identify my strengths and gave me a clear direction for my career. I now feel confident about the decisions I need to make for my future."
    },
    {
      name: "Ranjan Yadav",
      rating: 4,
      feedback:
        "I engaged with Sudhosan Skill Solutions for remote work opportunities and was impressed by their professionalism and clear communication."
    },
    {
      name: "Muskan Gupta",
      rating: 4,
      feedback:
        "Their guidance and understanding of my career goals made all the difference. I highly recommend Sudhosan Skill Solutions to anyone searching for job opportunities."
    },
    {
      name: "Varsha Kumari",
      rating: 5,
      feedback:
        "Extremely satisfied with the career guidance at Sudhosan Skill Solutions. They provided a clear roadmap to kickstart my career after graduation."
    },
    {
      name: "Vinit",
      rating: 5,
      feedback:
        "Fantastic experience! Very supportive team, clear communication, and great opportunities for career advancement."
    },
    {
      name: "Sanjay Prasad",
      rating: 5,
      feedback:
        "Excellent experience. The skills I learned here directly helped me secure a job."
    }
  ];

  return (
    <section
      className="py-24"
    
    >
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold font-serif mb-4"
            style={{ color: COLORS.brandBlue }}
          >
            Testimonials
          </h2>
          <p
            className="max-w-xl mx-auto text-lg"
            style={{ color: COLORS.textLight }}
          >
            Hear from students and professionals who transformed their careers
            through Sudhosan Skill Solutions.
          </p>
        </div>

        {/* Carousel Testimonials using Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-full flex">
              <div
                className="rounded-xl p-8 shadow-lg hover:shadow-xl transition h-full flex flex-col min-h-[370px] md:min-h-[320px] flex-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
                style={{
                  border: `1.5px solid ${COLORS.bgGray}`,
                }}
              >
                {/* Rating */}
                <div className="flex items-center mb-4 text-orange-400">
                  <FaStar className="mr-2" />
                  <span className="font-semibold">{item.rating}/5</span>
                </div>

                {/* Feedback */}
                <p
                  className="mb-6 leading-relaxed flex-1 text-white"
                >
                  “{item.feedback}”
                </p>

                {/* User */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border" style={{ borderColor: COLORS.gradStart }}>
                    <FaUser className="w-7 h-7 text-gray-400" />
                  </div>

                  <div>
                    <h4
                      className="font-semibold text-white"
                    >
                      {item.name}
                    </h4>
                    <p
                      className="text-sm text-blue-100"
                    >
                      Sudhosan Skill Solutions
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
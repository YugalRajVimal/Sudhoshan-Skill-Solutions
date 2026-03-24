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

function getFirstName(fullName) {
  if (!fullName) return "";
  return fullName.split(" ")[0].toLowerCase();
}

export default function TestimonialSection({ allData }) {
  // Fetch testimonials from prop allData, fallback to empty array
  const testimonials = Array.isArray(allData?.testimonials) ? allData.testimonials : [];

  // Helper to build image path using first name
  function getProfileImage(name) {
    const firstName = getFirstName(name);
    return `/testimonials/${firstName}.jpg`;
  }

  // Set a fixed card height for all testimonial cards (responsive optimized)
  // You can tune this value as needed for your design
  const CARD_HEIGHT = {
    base: 430,  // px for mobile
    md: 350,    // px for md and up
  };

  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16 text-blue-900 ">
          <h2
            className="text-4xl font-bold font-serif mb-4"
          >
            Why are we the&nbsp;
            <span className="text-orange-500 font-bold">most trusted</span>
            &nbsp;brand?
          </h2>
          <p
            className="max-w-xl mx-auto text-lg"
          >
            Here's what our students, candidates, and partners say about us.
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
          {(testimonials.length
            ? testimonials
            : [
                // Fallback to show a message if no testimonials available
                {
                  name: "No testimonials yet",
                  rating: 0,
                  feedback: "We're gathering feedback from our happy clients. Check back soon!"
                }
              ]
          ).map((item, index) => (
            <SwiperSlide key={index} className="flex h-full">
              <div
                className="rounded-xl p-8 shadow-lg hover:shadow-xl transition flex flex-col flex-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
                style={{
                  border: `1.5px solid ${COLORS.bgGray}`,
                  height: `clamp(${CARD_HEIGHT.md}px, 30vw, ${CARD_HEIGHT.base}px)`,
                  minHeight: `${CARD_HEIGHT.md}px`,
                  maxHeight: `${CARD_HEIGHT.base}px`,
                }}
              >
                {/* Rating (show only if present) */}
                {item.rating > 0 && (
                  <div className="flex items-center mb-4 text-orange-400">
                    <FaStar className="mr-2" />
                    <span className="font-semibold">{item.rating}/5</span>
                  </div>
                )}

                {/* Feedback */}
                <div className="flex-1 flex items-center">
                  <p
                    className="mb-6 leading-relaxed text-white w-full"
                    style={{ marginBottom: 0 }}
                  >
                    “{item.feedback}”
                  </p>
                </div>

                {/* User */}
                <div className="flex items-center gap-4 mt-auto pt-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border overflow-hidden" style={{ borderColor: COLORS.gradStart }}>
                    {/* Profile image with fallback icon */}
                    <img
                      src={
                        item.image && typeof item.image === "string" && item.image.startsWith("Uploads")
                          ? `${process.env.REACT_APP_API_URL}/${item.image}`
                          : getProfileImage(item.name)
                      }
                      alt={item.name}
                      className="object-cover w-12 h-12 rounded-full"
                      style={{ display: "block" }}
                    />
                    <FaUser className="w-7 h-7 text-gray-400" style={{ display: "none" }} />
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
                      {item.companyName}
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
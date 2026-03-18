import React from "react";

const partners = [
  {
    name: "Future Sparks",
    logo: "/client/fs.png",
    link: null,
    alt: "Future Sparks Logo",
  },
  {
    name: "Kiza Textiles",
    logo: "/client/kiza.avif",
    link: null,
    alt: "Kiza Textiles Logo",
  },
  {
    name: "Takniki Shiksha Vidhaan Council",
    logo: "/client/takniki-shiksha.jpeg",
    link: "https://www.taknikishiksha.org.in/",
    alt: "Takniki Shiksha Vidhaan Council Logo",
  },
  {
    name: "Awign",
    logo: "/client/awign.svg",
    link: "https://www.awign.com/",
    alt: "Awign Logo",
  },
  {
    name: "NIT Research Centre",
    logo: "/client/NIT.png",
    link: "https://www.hrnextgeninfohub.com/",
    alt: "NIT Research Centre Logo",
  },
  {
    name: "Zomato",
    logo: "/client/zomato.avif",
    link: null,
    alt: "Zomato Logo",
  }
];

export default function PartnersPage() {
  return (
    <section className="bg-gray-50 py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}

        <h1 className="text-4xl font-bold font-serif text-blue-900 mb-4">
          Our Partners
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Sudhosan Skill Solutions collaborates with industry leaders,
          institutions, and organizations to create better education,
          skill development, and employment opportunities for India's youth.
        </p>

        {/* Partner Logos */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 items-center">

          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 p-8 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 object-contain"
              />
            </a>
          ))}

        </div>

        {/* Bottom Text */}

        <p className="text-gray-500 mt-16 max-w-xl mx-auto">
          We continue to expand our network of partners to empower
          students, professionals, and businesses across Tier-2 and Tier-3
          cities in India.
        </p>

      </div>

    </section>
  );
}
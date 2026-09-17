import React from "react";



const colors = {
  bg: "#FFF7E5",
  heading: "#4B3621",
  body: "#5D4A37",
  accent: "#ea580c",
  white: "#FFFFFF",
  muted: "#EDEBE9",
};

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  imageFirst: boolean;
}

const processSteps: ProcessStep[] = [
  {
    step: "Step 1",
    title: "Initial Consultation",
    description:
      "Connect with our safari experts to discuss your travel goals, preferences, and budget. We'll guide you through the best destinations and tailor an itinerary just for you.",
    image:
      "https://ik.imagekit.io/c0x52ylk1/pexels-jessie-crettenden-2084198-3714900.jpg",
    icon: "https://framerusercontent.com/images/phhhqGT20o18mEmRi1nMHFgWsOk.svg",
    imageFirst: true,
  },
  {
    step: "Step 2",
    title: "Get Ready for Your Adventure",
    description:
      "We handle all the details from accommodations to permits so you can focus on preparing for an unforgettable trip. Receive expert tips on packing, safety, and cultural insights.",
    image:
      "https://ik.imagekit.io/c0x52ylk1/pexels-chrisjohn-33767739.jpg",
    icon: "https://framerusercontent.com/images/izr3hoiwqNcNKiUtLPwJDZqCqk.svg",
    imageFirst: false,
  },
  {
    step: "Step 3",
    title: "Experience the Journey of a Lifetime",
    description:
      "Embark on your African safari with confidence! Enjoy breathtaking landscapes, incredible wildlife, and immersive cultural experiences while we ensure a seamless adventure.",
    image:
      "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/5a4abd79c567c43d9d90fe2c973b591755e22eb9.jpg?updatedAt=1778156381207",
    icon: "https://framerusercontent.com/images/aMOdaNgdzm729szz1BgHYSUi5J4.svg",
    imageFirst: true,
  },
];

const valueCards = [
  {
    title: "Tailored Tours",
    description:
      "Each journey is uniquely crafted, ensuring personalized experiences that match your travel dreams.",
    icon: "https://framerusercontent.com/images/CKwWIQd9HtBFA6B84JVEjRSbI.svg",
  },
  {
    title: "Value for Money",
    description:
      "Safari adventures at competitive prices, offering the best wildlife experiences without compromise.",
    icon: "https://framerusercontent.com/images/Pc4aNRZDoN6j0zc4pzqjzVp0A.svg",
  },
  {
    title: "Experienced Team",
    description:
      "A team of expert guides, conservationists, & travel planners ensuring a seamless journey.",
    icon: "https://framerusercontent.com/images/LletGynDMngpc0EVFXqg3DofSS4.svg",
  },
];

const Eyebrow: React.FC<{ children: React.ReactNode; align?: "left" | "center" }> = ({
  children,
  align = "left",
}) => (
  <p
    className={`uppercase font-semibold tracking-wide text-sm md:text-base ${
      align === "center" ? "text-center" : "text-left"
    }`}
    style={{ color: colors.accent }}
  >
    {children}
  </p>
);

const AboutPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: colors.bg }} className="w-full">
      {/* ---------------- About Section ---------------- */}
      <section className="w-full px-5 pt-16 md:pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col gap-9 md:gap-14 pb-8 md:pb-12 lg:pb-16">
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[30px]">
              {/* Left content: title + text, then oryx image + stacked balloon/jeep images */}
              <div className="flex flex-col gap-9 w-full lg:flex-1">
                <div className="flex flex-col gap-4 max-w-[813px]">
                  <Eyebrow>about us</Eyebrow>
                  <h1
                    className="font-bold text-[36px] leading-[1.1em] md:text-[54px] lg:text-[64px] capitalize tracking-tight w-full"
                    style={{ color: colors.heading }}
                  >
                    The Story of African Memories
                  </h1>
                  <p
                    className="text-base md:text-lg leading-[1.8em] max-w-[648px]"
                    style={{ color: colors.body }}
                  >
                      At African Memories Safaris, every journey is designed to create
              meaningful memories while showcasing Zimbabwe&apos;s remarkable
              landscapes, wildlife, and cultures. We believe travel should be
              authentic, responsible, and unforgettable
                  </p>
                </div>

                {/* Image row: single tall image (left) + a STACKED pair (right) */}
                <div className="flex flex-col md:flex-row gap-4 items-start mt-8 md:mt-16">
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[280px] lg:h-[420px] md:mt-[180px]">
                    <img
                      src="https://framerusercontent.com/images/ZLQcCChFIpET9LwCLaXC077grY.jpg"
                      alt="Safari guests"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Stacked column: image on top, image below (was side-by-side, now vertical) */}
                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden h-[312px] md:h-[336px] lg:h-[361px]">
                      <img
                        src="https://ik.imagekit.io/c0x52ylk1/Resource/WhatsApp%20Image%202026-06-22%20at%2021.03.01.jpeg?updatedAt=1782214506546"
                        alt="Safari lodge"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden h-[312px] md:h-[336px] lg:h-[455px]">
                      <img
                        src="https://ik.imagekit.io/c0x52ylk1/New%20folder/pal2.jpg?updatedAt=1780424950594"
                        alt="Wildlife"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content: single tall image + stacked pair, then Mission/Vision text below */}
              <div className="flex flex-col gap-16 md:gap-10 w-full lg:flex-1">
                {/* Image row: single tall image (left) + stacked pair (right), full width */}
                <div className="flex flex-col md:flex-row gap-4 items-start mt-8 md:mt-16 lg:mt-24">
                   <div className="flex-1 rounded-xl overflow-hidden h-[336px] md:h-[324px] lg:h-[428px] md:mt-[180px]">
                    <img
                      src="https://ik.imagekit.io/c0x52ylk1/Resource/WhatsApp%20Image%202026-06-22%20at%2020.01.15%20(3).jpeg?updatedAt=1782214505428"
                      alt="Savanna landscape"
                      className="w-full h-full object-cover"
                    />
                  </div>
                   <div className="flex flex-col gap-4 flex-1 md:-mt-20 lg:-mt-28">
                    <div className="rounded-xl overflow-hidden h-[324px] md:h-[312px] lg:h-[456px]">
                      <img
                        src="https://framerusercontent.com/images/UGbd2eIwmdLqz5ooqIAhL14ipf0.png"
                        alt="Safari vehicle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden h-[233px] md:h-[224px] lg:h-[329px]">
                      <img
                        src="https://framerusercontent.com/images/BvOZXEghgxqlQP9e1fAsemgU9bI.png"
                        alt="Wildlife close up"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 md:gap-8 max-w-[560px]">
                  <div className="flex flex-col gap-3">
                    <h4
                      className="font-bold text-2xl md:text-[32px] leading-[1.3em]"
                      style={{ color: colors.heading }}
                    >
                      Our Mission
                    </h4>
                    <p
                      className="text-base md:text-lg leading-[1.8em]"
                      style={{ color: colors.body }}
                    >
                      At African Memories Safaris, we create immersive and sustainable
              safari experiences that connect travelers with Zimbabwe&apos;s beauty
              while supporting conservation and empowering local communities.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4
                      className="font-bold text-2xl md:text-[32px] leading-[1.3em]"
                      style={{ color: colors.heading }}
                    >
                      Our Vision
                    </h4>
                    <p
                      className="text-base md:text-lg leading-[1.8em]"
                      style={{ color: colors.body }}
                    >
                       To inspire unforgettable adventures that celebrate Africa&apos;s
              wildlife, people, and landscapes while promoting responsible
              tourism for future generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Process Section ---------------- */}
      <section className="w-full px-5 py-16 md:py-20">
        <div className="mx-auto max-w-[1360px] flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col items-start md:items-center gap-3 text-left md:text-center">
            <Eyebrow align="center">Our Processes</Eyebrow>
            <h2
              className="font-bold text-[28px] md:text-[42px] lg:text-[52px] leading-[1.15em] tracking-tight"
              style={{ color: colors.heading }}
            >
              Traveling with African Memories
            </h2>
          </div>

          <div className="flex flex-col gap-6 md:gap-14">
            {processSteps.map((s) => (
              <div
                key={s.title}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-6 ${
                  s.imageFirst ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden aspect-[3/2] md:aspect-auto md:h-[360px] lg:h-[480px]">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-5">
                  <div
                    className="w-fit rounded-full p-2.5"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <img src={s.icon} alt="" className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3
                      className="font-bold text-2xl md:text-[36px] lg:text-[44px] leading-[1.3em] tracking-tight"
                      style={{ color: colors.heading }}
                    >
                      {s.step}: {s.title}
                    </h3>
                    <p
                      className="text-base md:text-lg leading-[1.8em]"
                      style={{ color: colors.body }}
                    >
                      {s.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Values Section ---------------- */}
      <section
        className="w-full px-5 py-16 md:py-24"
        style={{ backgroundColor: colors.heading }}
      >
        <div className="mx-auto max-w-[1360px] flex flex-col gap-12">
          <div className="flex flex-col items-start md:items-center gap-3 text-left md:text-center">
            <Eyebrow align="center">our values</Eyebrow>
            <h2
              className="font-bold text-[28px] md:text-[42px] lg:text-[52px] leading-[1.15em] tracking-tight text-center"
              style={{ color: colors.white }}
            >
              Traveling with African Memories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden h-[336px] md:h-[360px] lg:h-[368px]">
              <img
                src="https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/889b14e7d15c7599674fb48762f5da7c07a47c6d.jpg?updatedAt=1778156382658"
                alt="Safari values"
                className="w-full h-full object-cover"
              />
            </div>
            <ValueCard {...valueCards[0]} />
            <div className="rounded-2xl overflow-hidden h-[336px] md:h-[360px] lg:h-[368px]">
              <img
                src="https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/caption.jpg?updatedAt=1778971937767"
                alt="Local community"
                className="w-full h-full object-cover"
              />
            </div>

            <ValueCard {...valueCards[2]} />
            <div className="rounded-2xl overflow-hidden h-[306px] md:h-[336px] lg:h-[317px]">
              <video
                src="https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Vids/WhatsApp%20Video%202026-07-15%20at%2012.47.26.mp4?updatedAt=1784210757884"
                loop
                muted
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            <ValueCard {...valueCards[1]} />
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  large?: boolean;
}> = ({ title, description, icon, large }) => (
  <div
    className={`h-full w-full flex flex-col justify-between rounded-2xl ${
      large ? "p-8" : "p-5"
    }`}
    style={{ backgroundColor: colors.body }}
  >
    <div className="w-12 h-12 md:w-14 md:h-14">
      <img src={icon} alt="" className="w-full h-full object-contain" />
    </div>
    <div className="flex flex-col gap-2 pt-4">
      <h5
        className="font-bold text-xl md:text-2xl leading-[1.4em]"
        style={{ color: colors.white }}
      >
        {title}
      </h5>
      <p
        className="text-sm md:text-base leading-[1.8em]"
        style={{ color: colors.muted }}
      >
        {description}
      </p>
    </div>
  </div>
);

export default AboutPage;
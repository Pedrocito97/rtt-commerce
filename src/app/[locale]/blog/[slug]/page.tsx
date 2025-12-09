"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Section, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const blogPosts: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string[];
    image: string;
    author: string;
    date: string;
    category: string;
  }
> = {
  "waarom-direct-sales-carriere": {
    title: "5 Redenen Waarom Direct Sales Jouw Carrière Kan Lanceren",
    excerpt:
      "Ontdek waarom steeds meer young professionals kiezen voor een carrière in direct sales.",
    content: [
      "Ben je op zoek naar een carrière met onbeperkte mogelijkheden? Direct sales biedt precies dat. Bij RTT Commerce zien we dagelijks hoe jonge professionals uitgroeien tot succesvolle ondernemers. Dit zijn de vijf redenen waarom direct sales jouw perfecte startpunt kan zijn.",
      "## 1. Flexibiliteit en Vrijheid",
      "In tegenstelling tot een traditionele 9-tot-5 baan, biedt direct sales de vrijheid om je eigen schema te bepalen. Je bent je eigen baas en bepaalt zelf hoeveel uren je werkt. Deze flexibiliteit maakt het mogelijk om werk en privé perfect in balans te houden.",
      "## 2. Onbeperkt Verdienpotentieel",
      "Bij RTT Commerce is je inkomen niet beperkt door een vast salaris. Hoe meer je inzet, hoe meer je verdient. Onze top performers bewijzen elke maand dat hard werken en slimme strategieën leiden tot een inkomen dat ver boven het gemiddelde ligt.",
      "## 3. Persoonlijke Ontwikkeling",
      "Sales is de ultieme school voor persoonlijke groei. Je leert communiceren, onderhandelen, omgaan met afwijzing en doorzetten. Deze vaardigheden zijn waardevol in elk aspect van je leven, niet alleen in je carrière.",
      "## 4. Ondernemerservaring",
      "Als Brand Ambassador bij RTT Commerce leer je de basisprincipes van ondernemen. Van klantacquisitie tot relatiebeheer - je bouwt een complete skillset die je kan gebruiken om later je eigen bedrijf te starten.",
      "## 5. Een Hecht Team en Netwerk",
      "Bij RTT Commerce word je onderdeel van een dynamisch team. Onze regelmatige events, trainingen en teambuilding-activiteiten zorgen voor een sterk netwerk dat je carrière lang zal ondersteunen. Je collega's worden je vrienden en mentors.",
      "## Klaar om te starten?",
      "Of je nu net afgestudeerd bent of op zoek bent naar een carrièreswitch, direct sales biedt de mogelijkheden die je zoekt. Bij RTT Commerce krijg je alle ondersteuning en training die je nodig hebt om te slagen. Neem vandaag nog contact met ons op en ontdek wat we voor jou kunnen betekenen.",
    ],
    image: "/images/team-conference.webp",
    author: "RTT Commerce Team",
    date: "9 December 2024",
    category: "Career",
  },
  "kunst-b2b-netwerken-belgie": {
    title: "De Kunst van B2B Netwerken in België",
    excerpt:
      "Effectief netwerken in de Belgische zakelijke wereld vereist een unieke aanpak.",
    content: [
      "België is een unieke markt met zijn eigen zakelijke cultuur. Succesvol netwerken in dit land vereist inzicht in regionale verschillen en een authentieke aanpak. Hier delen we de geheimen van effectief B2B netwerken in de Belgische context.",
      "## Begrijp de Belgische Zakencultuur",
      "Belgen waarderen authenticiteit boven agressieve verkooptechnieken. Of je nu in Vlaanderen, Wallonië of Brussel werkt, persoonlijke relaties zijn de basis van zakelijk succes. Neem de tijd om je contacten echt te leren kennen voordat je zaken doet.",
      "## Taal Maakt het Verschil",
      "In een meertalig land als België kan het spreken van de juiste taal deuren openen. In Vlaanderen wordt Nederlands gewaardeerd, in Wallonië Frans. In Brussel is flexibiliteit key. Bij RTT Commerce trainen we onze teams om moeiteloos te schakelen.",
      "## Kies de Juiste Events",
      "Van netwerk-lunches in Antwerpen tot zakelijke bijeenkomsten in Brussel - België biedt talloze mogelijkheden om te netwerken. Focus op kwaliteit boven kwantiteit. Eén waardevolle connectie is meer waard dan tien oppervlakkige contacten.",
      "## LinkedIn: Jouw Digitale Netwerkpartner",
      "LinkedIn is essentieel voor B2B netwerken in België. Deel relevante content, reageer op posts van anderen en bouw je online aanwezigheid op. Belgische professionals zijn actief op dit platform en verwachten professionaliteit.",
      "## De Kunst van Follow-Up",
      "Na een eerste ontmoeting begint het echte werk. Stuur binnen 24 uur een persoonlijk bericht. Refereer aan jullie gesprek en bied waarde aan. Consistente, niet-opdringerige follow-up bouwt langdurige relaties.",
      "## Geduld Loont",
      "In België worden zakelijke beslissingen zelden impulsief genomen. Respecteer het tempo van je prospects en focus op het bouwen van vertrouwen. De investering in geduld betaalt zich uit in loyale, langdurige klantrelaties.",
    ],
    image: "/images/events/rooftop-event.jpg",
    author: "RTT Commerce Team",
    date: "2 December 2024",
    category: "Sales Tips",
  },
  "groeipad-rtt-commerce": {
    title: "Van Starter tot Team Leader: Jouw Groeipad bij RTT Commerce",
    excerpt:
      "Ontdek hoe onze Brand Ambassadors uitgroeien tot succesvolle Team Leaders.",
    content: [
      "Bij RTT Commerce geloven we in talent ontwikkelen. Sinds onze oprichting in 2017 hebben we tientallen young professionals zien uitgroeien van startersposities tot leiderschapsrollen. Dit is hoe jouw groeipad eruit kan zien.",
      "## Stap 1: Brand Ambassador",
      "Als Brand Ambassador leer je de fundamenten van sales en klantrelaties. Je werkt direct met klanten, ontwikkelt je communicatievaardigheden en leert de producten en diensten door en door kennen. Deze fase duurt gemiddeld 3-6 maanden.",
      "## Stap 2: Senior Brand Ambassador",
      "Na het bewijzen van je vaardigheden en het behalen van consistent resultaat, word je Senior Brand Ambassador. Je krijgt meer verantwoordelijkheid, begeleidt nieuwe teamleden en ontwikkelt je leiderschapskwaliteiten.",
      "## Stap 3: Team Coordinator",
      "Als Team Coordinator leid je een klein team van Brand Ambassadors. Je bent verantwoordelijk voor hun ontwikkeling, motivatie en resultaten. Dit is waar je echt leert wat het betekent om een team naar succes te leiden.",
      "## Stap 4: Team Leader",
      "De ultieme stap in onze organisatie. Als Team Leader ben je verantwoordelijk voor een groter team, strategie en bedrijfsontwikkeling. Je hebt een direct impact op de groei van RTT Commerce.",
      "## Onze Training en Ondersteuning",
      "Elke stap wordt ondersteund door uitgebreide training. Van wekelijkse coaching sessions tot maandelijkse conferenties in het buitenland - we investeren in jouw ontwikkeling. Onze succesvolle teamleden zoals Lou, Quentin en Yaren bewijzen dat deze aanpak werkt.",
      "## Jouw Traject Begint Hier",
      "Of je nu net begint of al ervaring hebt, bij RTT Commerce is er altijd ruimte om te groeien. We kijken niet naar je CV, maar naar je potentieel en drive. Ben je klaar voor de uitdaging?",
    ],
    image: "/images/conference-room.jpg",
    author: "RTT Commerce Team",
    date: "25 November 2024",
    category: "Career",
  },
  "klantrelaties-bouwen": {
    title: "Hoe Je Klantrelaties Bouwt Die Blijven",
    excerpt:
      "Duurzame klantrelaties zijn de sleutel tot langdurig succes in sales.",
    content: [
      "In sales draait alles om relaties. Een tevreden klant komt terug en verwijst anderen door. Maar hoe bouw je relaties die echt blijven? Dit zijn de technieken die onze top performers gebruiken.",
      "## Luister Meer Dan Je Praat",
      "De beste verkopers zijn uitstekende luisteraars. Voordat je een oplossing presenteert, moet je eerst de situatie van je klant echt begrijpen. Stel open vragen en luister actief naar de antwoorden.",
      "## Wees Authentiek",
      "Klanten voelen het wanneer je niet oprecht bent. Wees jezelf, geef eerlijk advies - zelfs als dat betekent dat je korte termijn een deal mist. Dit bouwt het vertrouwen dat leidt tot langdurige relaties.",
      "## Lever Meer Dan Je Belooft",
      "Onder-beloven en over-leveren is een klassieke maar effectieve strategie. Verras je klanten met extra waarde, snellere service of onverwachte aandacht. Deze kleine extra's maken het verschil.",
      "## Blijf in Contact",
      "Relaties verwelken zonder onderhoud. Neem regelmatig contact op met je klanten - niet alleen wanneer je iets wilt verkopen. Een check-in om te vragen hoe het gaat toont dat je om hen geeft als persoon, niet alleen als inkomensbron.",
      "## Los Problemen Snel Op",
      "Problemen ontstaan onvermijdelijk. Hoe je ermee omgaat definieert je relatie. Reageer snel, neem verantwoordelijkheid en focus op oplossingen. Een goed opgelost probleem kan de relatie zelfs versterken.",
      "## Vraag om Feedback",
      "Vraag actief om feedback van je klanten. Dit toont dat je hun mening waardeert en geeft je waardevolle inzichten om je service te verbeteren. Plus, klanten die feedback geven voelen zich meer betrokken.",
    ],
    image: "/images/events/event5.jpg",
    author: "RTT Commerce Team",
    date: "18 November 2024",
    category: "Business",
  },
  "sales-tips-young-professionals-2024": {
    title: "Sales Tips voor Young Professionals in 2024",
    excerpt:
      "De saleswereld evolueert snel. Dit zijn de moderne technieken die elke jonge professional moet beheersen.",
    content: [
      "De saleswereld van 2024 ziet er anders uit dan tien jaar geleden. Social media, AI en veranderende klanterwachtingen hebben het speelveld volledig getransformeerd. Dit zijn de tips die elke moderne salesprofessional moet kennen.",
      "## Omarm Social Selling",
      "LinkedIn, Instagram en zelfs TikTok zijn krachtige tools voor sales. Bouw je personal brand, deel waardevolle content en connect met potentiële klanten op platforms waar zij actief zijn. Bij RTT Commerce zien we dagelijks hoe social media leads genereert.",
      "## Investeer in Personal Branding",
      "In 2024 kopen mensen van mensen, niet van bedrijven. Werk aan je persoonlijke merk. Wat maakt jou uniek? Waarom zou een klant met jou willen werken? Een sterke personal brand opent deuren die anders gesloten zouden blijven.",
      "## Master Video Communicatie",
      "Video calls zijn standaard geworden. Zorg dat je setup professioneel is - goede verlichting, rustige achtergrond, stabiele internetverbinding. Oefen je camera-presence tot het natuurlijk aanvoelt.",
      "## Data-Driven Werken",
      "Moderne sales draait om data. Gebruik CRM-systemen, analyseer je resultaten en pas je aanpak aan op basis van wat de cijfers je vertellen. Intuïtie is waardevol, maar data maakt je objectief beter.",
      "## Ontwikkel Emotionele Intelligentie",
      "In een wereld vol automatisering wordt menselijke connectie belangrijker dan ooit. Werk aan je EQ - het vermogen om emoties te herkennen, begrijpen en beïnvloeden. Dit is wat topsellers onderscheidt van gemiddelde performers.",
      "## Blijf Leren",
      "De saleswereld staat niet stil en jij ook niet. Lees boeken, volg podcasts, bezoek trainingen. Bij RTT Commerce bieden we continue educatie aan onze teams, omdat we weten dat stilstand achteruitgang betekent.",
      "## Bouw aan Veerkracht",
      "Afwijzing hoort bij sales. De beste verkopers laten zich niet ontmoedigen door een 'nee'. Ze leren ervan en gaan door. Werk aan je mentale veerkracht - het is misschien wel de belangrijkste skill van allemaal.",
    ],
    image: "/images/hero-bg.jpg",
    author: "RTT Commerce Team",
    date: "10 November 2024",
    category: "Sales Tips",
  },
  "werken-als-brand-ambassador": {
    title: "Werken als Brand Ambassador: Wat Kun Je Verwachten?",
    excerpt:
      "Een kijkje achter de schermen bij RTT Commerce.",
    content: [
      "Overweeg je een carrière als Brand Ambassador bij RTT Commerce? Dan ben je vast benieuwd wat een typische werkdag inhoudt en wat je kunt verwachten. Hier geven we je een eerlijk kijkje achter de schermen.",
      "## Een Typische Dag",
      "Geen dag is hetzelfde als Brand Ambassador. Je begint meestal met een teammeeting waar doelen worden besproken en successen gevierd. Daarna ga je het veld in om klanten te ontmoeten en relaties te bouwen. De middag vliegt voorbij met klantgesprekken en follow-ups.",
      "## Training en Ontwikkeling",
      "Vanaf dag één word je ondersteund door ervaren mentors. Wekelijkse trainingen helpen je om je vaardigheden te verbeteren, van communicatietechnieken tot onderhandelingsstrategieën. Je leert niet alleen verkopen, maar ook ondernemen.",
      "## Teamcultuur",
      "Bij RTT Commerce zijn we meer dan collega's - we zijn een team. Regelmatige teamevents, van rooftop networking in Brussel tot internationale conferenties, zorgen voor een hechte band. Successen worden samen gevierd.",
      "## Flexibiliteit",
      "Als Brand Ambassador heb je de vrijheid om je eigen aanpak te ontwikkelen. Natuurlijk zijn er doelen te halen, maar hoe je dat doet is aan jou. Deze autonomie maakt het werk afwisselend en uitdagend.",
      "## Uitdagingen",
      "Laten we eerlijk zijn - sales is niet altijd makkelijk. Je zult 'nee' horen, deals verliezen en tegenslagen ervaren. Maar met de juiste mindset en ondersteuning van je team, worden deze uitdagingen groeikansen.",
      "## De Beloningen",
      "Naast een competitief inkomen biedt het werk als Brand Ambassador immateriële beloningen: persoonlijke groei, een sterk netwerk, en de voldoening van je eigen succes bouwen. Onze mensen kiezen voor deze carrière en blijven omdat het leven verandert.",
      "## Is Het Iets voor Jou?",
      "Als je ambitieus bent, graag met mensen werkt en niet bang bent voor uitdagingen, dan past deze rol waarschijnlijk bij je. We zoeken niet naar perfecte CV's, maar naar gedreven mensen met potentieel. Misschien ben jij onze volgende succesvolle Brand Ambassador?",
    ],
    image: "/images/about-image.jpg",
    author: "RTT Commerce Team",
    date: "1 November 2024",
    category: "Lifestyle",
  },
};

const relatedPosts = [
  {
    title: "Van Starter tot Team Leader: Jouw Groeipad",
    slug: "groeipad-rtt-commerce",
    image: "/images/conference-room.jpg",
  },
  {
    title: "Sales Tips voor Young Professionals",
    slug: "sales-tips-young-professionals-2024",
    image: "/images/hero-bg.jpg",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <Section className="pt-40">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--dark)] mb-4">
            Article Not Found
          </h1>
          <p className="text-[var(--gray-600)] mb-8">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] mt-20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-[var(--dark)]/40 to-transparent" />
      </section>

      {/* Content */}
      <Section className="-mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.article
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-[var(--primary-blue)] font-medium mb-6 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-blue-light)] text-[var(--primary-blue)] text-sm font-medium mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--dark)] mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--gray-500)] mb-8 pb-8 border-b border-[var(--gray-100)]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-[var(--dark)] mt-8 mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-[var(--gray-600)] leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-[var(--gray-100)]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="flex items-center gap-2 text-[var(--gray-600)]">
                  <Share2 className="w-5 h-5" />
                  Share this article
                </span>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full bg-[var(--gray-100)] flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--primary-blue)] hover:text-white transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </Section>

      {/* Related Posts */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--dark)] mb-8">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((related, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Link
                  href={`/blog/${related.slug}`}
                  className="group flex items-center gap-4 bg-white rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--dark)] group-hover:text-[var(--primary-blue)] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <span className="text-sm text-[var(--primary-blue)] flex items-center mt-2">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="gradient">
        <div className="text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Ready to start your sales career?
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href="/soliciteer-nu">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[var(--primary-blue)] hover:bg-white/90"
              >
                Solliciteer nu!
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}

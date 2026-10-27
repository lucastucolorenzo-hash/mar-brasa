import { createFileRoute } from "@tanstack/react-router";
import { Hero, AboutSection, HighlightsSection, ExperienceSection, GallerySection, ReviewsSection, LocationSection } from "@/components/restaurant-sections";
import { OrderSection } from "@/components/order-section";
export const Route = createFileRoute("/")({head:()=>({meta:[{title:"Mar & Brasa | Restaurante em Caraguatatuba"},{name:"description",content:"Sushi, carnes, frutos do mar, drinks e música ao vivo em Caraguatatuba. Conheça o Mar & Brasa."},{property:"og:title",content:"Mar & Brasa | Restaurante em Caraguatatuba"},{property:"og:description",content:"Sabores do mar à brasa, drinks e bons momentos em Caraguatatuba."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});
 function Index(){return <main><Hero/><OrderSection/><AboutSection compact/><HighlightsSection/><ExperienceSection/><GallerySection/><ReviewsSection/><LocationSection/></main>}

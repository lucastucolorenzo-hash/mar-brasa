import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/lib/restaurant";
import { recommendMenu } from "@/lib/menu-recommendations.functions";

type Recommendation = Awaited<ReturnType<typeof recommendMenu>>;

export function MenuAdvisor() {
  const recommend = useServerFn(recommendMenu);
  const [dietaryNeeds, setDietaryNeeds] = useState("");
  const [preferences, setPreferences] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dietaryNeeds.trim() && !preferences.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      setResult(await recommend({ data: { dietaryNeeds: dietaryNeeds.trim(), preferences: preferences.trim() } }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível recomendar pratos agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return <section className="menu-advisor" aria-labelledby="advisor-title">
    <div className="advisor-intro"><span className="advisor-kicker"><Sparkles size={15} /> ESCOLHA COM AJUDA DA IA</span><h2 id="advisor-title">O que combina com você?</h2><p>Conte o que procura e receba sugestões entre os pratos disponíveis neste cardápio.</p></div>
    <form onSubmit={submit} className="advisor-form">
      <label>Necessidades alimentares <span>(opcional)</span><textarea rows={2} maxLength={300} value={dietaryNeeds} onChange={(event) => setDietaryNeeds(event.target.value)} placeholder="Ex.: evito carne vermelha" /></label>
      <label>Sabores e preferências <span>(opcional)</span><textarea rows={2} maxLength={300} value={preferences} onChange={(event) => setPreferences(event.target.value)} placeholder="Ex.: gosto de frutos do mar, até R$ 60" /></label>
      <Button type="submit" disabled={loading || (!dietaryNeeds.trim() && !preferences.trim())}>{loading ? "Buscando sugestões..." : "Encontrar pratos"}<ArrowRight size={16}/></Button>
    </form>
    <p className="advisor-small">Suas respostas são usadas apenas para esta sugestão. Para alergias ou restrições médicas, consulte o restaurante antes de pedir.</p>
    {error && <p className="advisor-error" role="alert">{error}</p>}
    {result && <div className="advisor-results" aria-live="polite"><h3>{result.picks.length ? "Sugestões para você" : "Sem indicação segura"}</h3>{result.picks.length ? <div className="advisor-picks">{result.picks.map((pick) => { const dish = menuItems.find((item) => item.name === pick.name); return dish ? <article key={dish.name} className="advisor-pick"><div><h4>{dish.name}</h4><p>{pick.reason}</p></div><strong>{dish.price}</strong></article> : null; })}</div> : <p>Com as informações disponíveis, não encontramos uma opção para indicar com confiança.</p>}<p className="advisor-notice">{result.notice}</p></div>}
  </section>;
}
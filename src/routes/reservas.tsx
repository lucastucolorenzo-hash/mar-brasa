import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/restaurant-sections";
import { bookingSchema } from "@/lib/whatsapp.schemas";
import { prepareBooking } from "@/lib/whatsapp.functions";

export const Route = createFileRoute("/reservas")({
  head: () => ({ meta: [
    { title: "Reservas | Mar & Brasa" },
    { name: "description", content: "Solicite sua reserva no Mar & Brasa em Caraguatatuba. Escolha dia, horário e número de pessoas e confirme pelo WhatsApp." },
    { property: "og:title", content: "Reservas | Mar & Brasa" },
    { property: "og:description", content: "Escolha dia e horário e solicite sua reserva pelo WhatsApp do Mar & Brasa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReservationsPage,
});

function ReservationsPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const prepare = useServerFn(prepareBooking);
  const change = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setter(event.target.value); setUrl(""); setError(""); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setUrl(""); setError("");
    const parsed = bookingSchema.safeParse({ name, date, time, guests, notes });
    if (!parsed.success) { setError("Confira nome, data, horário e número de pessoas."); return; }
    setPending(true);
    try { const result = await prepare({ data: parsed.data }); setUrl(result.url); }
    catch { setError("Escolha uma data e horário futuros e tente novamente."); }
    finally { setPending(false); }
  };
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <main><PageIntro kicker="MAR & BRASA · CARAGUATATUBA" title="Reserve sua mesa." description="Escolha a data e o horário desejados e envie sua solicitação ao restaurante."/><section className="section section-alt reservations-section"><div className="container-site reservations-inner"><div className="reservations-intro"><CalendarDays size={28}/><h2>Um bom momento começa aqui.</h2><p>Preencha os dados da sua visita. O restaurante confirma a disponibilidade diretamente pelo WhatsApp.</p></div><form className="request-form reservation-form" onSubmit={submit}><label>Seu nome<input required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={change(setName)} placeholder="Seu nome" /></label><div className="reservation-fields"><label>Dia<input type="date" required min={today} value={date} onChange={change(setDate)} /></label><label>Horário<input type="time" required value={time} onChange={change(setTime)} /></label></div><label>Número de pessoas<input type="number" min={1} max={30} required value={guests} onChange={event => { setGuests(Number(event.target.value)); setUrl(""); setError(""); }} /></label><label>Observações (opcional)<textarea maxLength={300} value={notes} onChange={change(setNotes)} placeholder="Alguma informação para sua reserva?" /></label>{error && <p role="alert" className="form-error">{error}</p>}<Button type="submit" size="lg" disabled={pending} className="request-submit"><MessageCircle/> {pending ? "Preparando..." : "Preparar reserva"}</Button>{url && <Button asChild size="lg" variant="outline" className="request-submit"><a href={url} target="_blank" rel="noopener noreferrer"><MessageCircle/> Enviar no WhatsApp</a></Button>}<p className="request-note">Sua reserva não está confirmada até o restaurante responder pelo WhatsApp. Não há consulta de horários disponíveis em tempo real.</p></form></div></section></main>;
}

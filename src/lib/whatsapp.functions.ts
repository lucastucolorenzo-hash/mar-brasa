import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "@/lib/whatsapp.schemas";

const RESERVATIONS_NUMBER = "5512988551710";
const link = (number: string, message: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const prepareBooking = createServerFn({ method: "POST" })
  .validator((input) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const now = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()).replace(" ", "T");
    if (`${data.date}T${data.time}` <= now) throw new Error("Escolha uma data e horário futuros.");
    const [year, month, day] = data.date.split("-");
    const message = ["Olá, Mar & Brasa! Gostaria de solicitar uma reserva:", "", `Nome: ${data.name}`, `Data: ${day}/${month}/${year}`, `Horário: ${data.time}`, `Pessoas: ${data.guests}`, data.notes ? `Observações: ${data.notes}` : "", "Por favor, confirmem a disponibilidade da reserva."].filter(Boolean).join("\n");
    return { url: link(RESERVATIONS_NUMBER, message) };
  });

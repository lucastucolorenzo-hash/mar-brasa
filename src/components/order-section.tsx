import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mesmo link de pedidos usado na página do cardápio.
const ORDER_URL = "https://app.anota.ai/m/iyBQVuyEw";

export function OrderSection() {
  return (
    <section aria-label="Faça seu pedido" style={{ paddingBlock: "40px" }}>
      <div className="container-site">
        <div className="order-cta" style={{ marginBottom: 0 }}>
          <div>
            <h2>Peça pelo app do restaurante.</h2>
            <p>Escolha seus pratos no nosso app de pedidos e finalize com entrega ou retirada. O pedido é confirmado pelo restaurante.</p>
          </div>
          <Button asChild size="lg" className="order-cta-button">
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
              Peça aqui <ExternalLink size={17} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

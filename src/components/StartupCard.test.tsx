import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Startup } from "@/types";
import { StartupCard } from "./StartupCard";

const baseStartup: Startup = {
  id: "stp_test",
  name: "Testco",
  stage: "Seed",
  sector: ["FinTech", "B2B SaaS"],
  country: "MX",
  convictionScore: 82,
  trend: "up",
  fundingAmount: 3_500_000,
  foundedYear: 2022,
  description: "Infra fintech cross-border para PyMEs.",
  signals: [
    { type: "team", label: "Founders ex-Kavak", weight: 0.9 },
    { type: "market", label: "TAM 30B USD", weight: 0.8 },
    { type: "traction", label: "ARR 4x YoY", weight: 0.85 },
    { type: "product", label: "NPS 72", weight: 0.75 },
  ],
};

describe("StartupCard — colapsado", () => {
  it("renderiza los campos clave de escaneo", () => {
    render(<StartupCard startup={baseStartup} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Testco" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Seed")).toBeInTheDocument();

    const meter = screen.getByRole("meter", { name: /conviction score/i });
    expect(meter).toHaveAttribute("aria-valuenow", "82");
    expect(screen.getByLabelText("Trending up")).toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: /ver señales/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("oculta la CTA cuando no hay señales", () => {
    render(
      <StartupCard
        startup={{ ...baseStartup, fundingAmount: undefined, signals: [] }}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /ver señales/i }),
    ).not.toBeInTheDocument();
  });
});

describe("StartupCard — expandido", () => {
  it("al expandir muestra metadata estructurada y signals por categoría", async () => {
    const user = userEvent.setup();
    render(<StartupCard startup={baseStartup} />);

    const toggle = screen.getByRole("button", { name: /ver señales/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveTextContent(/ocultar señales/i);

    expect(screen.getByText(/^Funding$/)).toBeInTheDocument();
    expect(screen.getByText(/^Fundada$/)).toBeInTheDocument();
    expect(screen.getByText(/^Ubicación$/)).toBeInTheDocument();
    expect(screen.getByText("México")).toBeInTheDocument();

    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Market")).toBeInTheDocument();
    expect(screen.getByText("Traction")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();

    expect(screen.getByText("Founders ex-Kavak")).toBeInTheDocument();
    expect(screen.getByText("NPS 72")).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

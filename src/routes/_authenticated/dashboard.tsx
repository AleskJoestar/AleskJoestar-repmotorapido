import { createFileRoute } from "@tanstack/react-router";
import { Users, Package, AlertTriangle, FileBarChart } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Motorápido PLUS" }],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Funcionários", value: "—", icon: Users, hint: "em breve" },
  { label: "Peças no estoque", value: "—", icon: Package, hint: "em breve" },
  {
    label: "Alertas de mínimo",
    value: "—",
    icon: AlertTriangle,
    hint: "em breve",
  },
  { label: "Relatórios", value: "—", icon: FileBarChart, hint: "em breve" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão geral da sua oficina. Os módulos serão habilitados nas próximas
          etapas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
        <h2 className="text-base font-semibold">
          Bem-vindo ao Motorápido PLUS
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Esta é a estrutura base do sistema (Etapa 1). Nas próximas etapas
          vamos liberar os módulos de Funcionários, Estoque e Relatórios.
        </p>
      </div>
    </div>
  );
}

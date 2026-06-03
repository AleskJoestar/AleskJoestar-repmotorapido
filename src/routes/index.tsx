import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, Package, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Motorápido PLUS — Gestão de Oficina de Motocicletas" },
      {
        name: "description",
        content:
          "Sistema de gerenciamento de estoque, peças e serviços para oficinas de motocicletas.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Motorápido <span className="text-primary">PLUS</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              search={{ mode: "login" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Entrar
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Gestão de oficinas de motocicletas
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Controle total da sua oficina,
            <br />
            <span className="text-primary">do estoque ao serviço.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Cadastre funcionários, gerencie peças, acompanhe baixas de estoque e
            emita relatórios — tudo em um único sistema simples e rápido.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/auth"
              search={{ mode: "login" }}
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-muted"
            >
              Já tenho conta
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Funcionários",
              desc: "Cadastro completo com dados pessoais, profissionais e contato.",
            },
            {
              icon: Package,
              title: "Estoque de Peças",
              desc: "Controle de quantidade, alertas de mínimo e baixas automáticas.",
            },
            {
              icon: Wrench,
              title: "Relatórios",
              desc: "Filtros por cargo, status e exportação rápida dos dados.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Motorápido PLUS
      </footer>
    </div>
  );
}

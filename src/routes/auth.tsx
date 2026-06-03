import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Wrench, Loader2 } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  mode: z.enum(["login", "signup"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Acessar — Motorápido PLUS" },
      { name: "description", content: "Entre ou cadastre-se no Motorápido PLUS." },
    ],
  }),
  component: AuthPage,
});

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Informe seu nome completo")
      .max(100, "Máximo de 100 caracteres"),
    email: z.string().trim().email("E-mail inválido").max(255),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .max(72, "Máximo de 72 caracteres"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(1, "Informe sua senha").max(72),
});

function AuthPage() {
  const { mode } = Route.useSearch();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden bg-sidebar text-sidebar-foreground lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">
            Motorápido <span className="text-primary">PLUS</span>
          </span>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            Sua oficina, organizada do guidão ao escapamento.
          </h2>
          <p className="mt-3 text-sm text-sidebar-foreground/70">
            Controle peças, funcionários e serviços com a velocidade que sua
            oficina precisa.
          </p>
        </div>

        <p className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} Motorápido PLUS
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">
              Motorápido <span className="text-primary">PLUS</span>
            </span>
          </div>

          <div className="mb-6 inline-flex rounded-md border border-border bg-card p-1">
            <Link
              to="/auth"
              search={{ mode: "login" }}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Entrar
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cadastrar
            </Link>
          </div>

          {mode === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function LoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // Visual only — autenticação real será integrada na fase de backend
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/dashboard", replace: true });
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesse o painel da sua oficina.
        </p>
      </div>

      <Field label="E-mail" error={errors.email}>
        <input
          type="email"
          autoComplete="email"
          className={inputCls}
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="voce@oficina.com"
        />
      </Field>

      <Field label="Senha" error={errors.password}>
        <input
          type="password"
          autoComplete="current-password"
          className={inputCls}
          value={values.password}
          onChange={(e) =>
            setValues((v) => ({ ...v, password: e.target.value }))
          }
          placeholder="••••••••"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Entrar
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Não tem conta?{" "}
        <Link
          to="/auth"
          search={{ mode: "signup" }}
          className="font-medium text-primary hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateField = (next: typeof values) => {
    const parsed = signupSchema.safeParse(next);
    if (parsed.success) {
      setErrors({});
      return;
    }
    const errs: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (!errs[key]) errs[key] = issue.message;
    }
    setErrors(errs);
  };

  const update = (key: keyof typeof values, val: string) => {
    const next = { ...values, [key]: val };
    setValues(next);
    validateField(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      validateField(values);
      return;
    }
    setLoading(true);
    // Visual only — cadastro real será integrado na fase de backend
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/dashboard", replace: true });
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <h1 className="text-2xl font-bold">Criar conta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Comece a gerenciar sua oficina em minutos.
        </p>
      </div>

      <Field label="Nome completo" error={errors.name}>
        <input
          type="text"
          autoComplete="name"
          className={inputCls}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="João Mecânico"
        />
      </Field>

      <Field label="E-mail" error={errors.email}>
        <input
          type="email"
          autoComplete="email"
          className={inputCls}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="voce@oficina.com"
        />
      </Field>

      <Field label="Senha" error={errors.password}>
        <input
          type="password"
          autoComplete="new-password"
          className={inputCls}
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          placeholder="Mínimo de 8 caracteres"
        />
      </Field>

      <Field label="Confirmar senha" error={errors.confirm}>
        <input
          type="password"
          autoComplete="new-password"
          className={inputCls}
          value={values.confirm}
          onChange={(e) => update("confirm", e.target.value)}
          placeholder="Repita a senha"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Criar conta
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link
          to="/auth"
          search={{ mode: "login" }}
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}

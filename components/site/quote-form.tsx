"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { dict } from "@/lib/site"
import { cn } from "@/lib/utils"

const field =
  "h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-[16px] text-ink placeholder:text-ink/35 transition-[border-color,box-shadow] focus:border-ink focus:outline-none focus:ring-4 focus:ring-red/10"
const label = "mb-2 block text-[14px] font-semibold text-ink/80"

function Field({ name, text, type = "text", required, className, ...rest }: { name: string; text: string; type?: string; required?: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("block", className)}>
      <span className={label}>
        {text}
        {required && <span className="text-red"> *</span>}
      </span>
      <input name={name} type={type} required={required} className={field} {...rest} />
    </label>
  )
}

function Choice({ name, text, opts }: { name: string; text: string; opts: string[] }) {
  return (
    <fieldset>
      <legend className={label}>{text}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} className="peer sr-only" />
            <span className="inline-flex h-11 items-center rounded-full border border-ink/15 bg-cream px-4 text-[15px] text-ink/80 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-red">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function Address({ prefix, title, f }: { prefix: string; title: string; f: (typeof dict)["fr"]["form"] }) {
  return (
    <fieldset className="grid gap-5 rounded-[20px] bg-paper-2/70 p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <h3 className="display text-[22px] text-ink">{title}</h3>
      <div className="grid gap-5 sm:grid-cols-[1fr_120px]">
        <Field name={`${prefix}_rue`} text={f.street} autoComplete="address-line1" />
        <Field name={`${prefix}_numero`} text={f.number} />
      </div>
      <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
        <Field name={`${prefix}_cp`} text={f.zip} inputMode="numeric" autoComplete="postal-code" />
        <Field name={`${prefix}_localite`} text={f.city} autoComplete="address-level2" />
      </div>
      <Choice name={`${prefix}_batiment`} text={f.building} opts={f.buildingOpts} />
      <div className="grid gap-5 sm:grid-cols-3">
        <Choice name={`${prefix}_ascenseur`} text={f.elevator} opts={[f.yes, f.no]} />
        <Field name={`${prefix}_etage`} text={f.floor} type="number" min={0} inputMode="numeric" />
        <Field name={`${prefix}_superficie`} text={f.area} type="number" min={0} inputMode="numeric" />
      </div>
    </fieldset>
  )
}

/** Quote request, same fields as the current site. Static-host friendly (Netlify Forms). */
export function QuoteForm({ locale }: { locale: Locale }) {
  const f = dict[locale].form
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("sending")
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      setState(res.ok ? "sent" : "error")
    } catch {
      setState("error")
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "sent" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-[26px] bg-red p-8 text-cream sm:p-12"
          role="status"
        >
          <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_0%_0%,#d9434b_0%,#c8323a_45%,#a8262d_100%)]" />
          {/* The man from the logo seals the deal with a handshake. */}
          <motion.div
            aria-hidden
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute -bottom-6 -right-10 -z-10 aspect-[720/900] h-[115%] opacity-30 sm:right-0 sm:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/homme-main-body.png" alt="" className="absolute inset-0 size-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/homme-main-hand.png" alt="" className="gf-handshake absolute inset-0 size-full" />
          </motion.div>
          <div className="max-w-[24rem]">
            <p className="display text-[clamp(40px,5vw,64px)] leading-[0.95]">
              {f.deal.split(" ").slice(0, -1).join(" ")} <span className="font-serif font-normal">{f.deal.split(" ").slice(-1)}</span>
            </p>
            <p className="mt-5 text-[19px] font-semibold">{f.sent}</p>
            <p className="mt-2 text-[17px] leading-relaxed text-cream/85">{f.sentText}</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          name="devis"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="grid gap-8"
          exit={{ opacity: 0 }}
        >
          <input type="hidden" name="form-name" value="devis" />
          <input type="hidden" name="langue" value={locale} />
          <p className="hidden">
            <label>
              Ne pas remplir <input name="bot-field" />
            </label>
          </p>

          <fieldset className="grid gap-5">
            <legend className="display mb-1 text-[28px] text-ink">{f.contact}</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="prenom" text={f.firstName} autoComplete="given-name" />
              <Field name="nom" text={f.lastName} autoComplete="family-name" />
              <Field name="email" text={f.email} type="email" required autoComplete="email" />
              <Field name="telephone" text={f.phone} type="tel" autoComplete="tel" />
            </div>
          </fieldset>

          <div className="grid gap-5 xl:grid-cols-2">
            <Address prefix="depart" title={f.from} f={f} />
            <Address prefix="arrivee" title={f.to} f={f} />
          </div>

          <fieldset className="grid gap-6">
            <legend className="display mb-1 text-[28px] text-ink">{f.details}</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="date" text={f.date} type="date" />
              <Field name="volume" text={f.volume} type="number" min={0} step="0.5" inputMode="decimal" />
            </div>
            <fieldset>
              <legend className={label}>{f.options}</legend>
              <div className="flex flex-wrap gap-2">
                {f.optionList.map((o) => (
                  <label key={o} className="cursor-pointer">
                    <input type="checkbox" name="options" value={o} className="peer sr-only" />
                    <span className="inline-flex h-11 items-center rounded-full border border-ink/15 bg-cream px-4 text-[15px] text-ink/80 transition-colors peer-checked:border-red peer-checked:bg-red peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-red">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-3">
              <Choice name="acces_lift" text={f.liftAccess} opts={f.liftOpts} />
              <Choice name="aide_client" text={f.help} opts={[f.yes, f.no]} />
              <Field name="nombre_personnes" text={f.people} type="number" min={0} inputMode="numeric" />
            </div>
            <label className="block">
              <span className={label}>{f.remarks}</span>
              <textarea name="remarques" rows={5} className={cn(field, "h-auto py-3 leading-relaxed")} />
            </label>
          </fieldset>

          <div className="flex flex-col gap-4 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-muted">{f.privacy}</p>
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex h-13 min-h-12 items-center justify-center gap-2 rounded-full bg-red px-8 text-[16px] font-semibold text-cream transition-[background-color,transform] hover:bg-[#b02a31] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {state === "sending" ? f.sending : f.send}
            </button>
          </div>
          {state === "error" && (
            <p role="alert" className="rounded-xl bg-red/10 px-4 py-3 text-[15px] text-red">
              {f.error}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )
}

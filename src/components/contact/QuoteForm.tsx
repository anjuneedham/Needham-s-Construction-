"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  AlertIcon,
  CheckIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import {
  contactMethods,
  emptyQuoteRequest,
  formatQuoteRequest,
  serviceOptions,
  validateQuoteRequest,
  type QuoteErrors,
  type QuoteRequest,
} from "@/lib/quote";
import {
  hasEmail,
  hasWhatsApp,
  mailtoHref,
  quoteEmailSubject,
  whatsappHref,
} from "@/lib/contact";

type Status = "idle" | "submitting" | "sent" | "handoff" | "error";

const fieldBase =
  "block w-full rounded-sm border bg-white px-4 text-base text-iron-900 placeholder:text-concrete-600 transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400/40";

export function QuoteForm({
  /** Pre-selects a service, e.g. when linked from the tiling page. */
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const formId = useId();
  const [values, setValues] = useState<QuoteRequest>({
    ...emptyQuoteRequest,
    service: defaultService,
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  function update<K extends keyof QuoteRequest>(name: K, value: QuoteRequest[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateQuoteRequest(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        status: string;
        errors?: QuoteErrors;
      };

      if (result.status === "invalid" && result.errors) {
        setErrors(result.errors);
        setStatus("idle");
        return;
      }

      if (result.status === "sent") {
        setStatus("sent");
        return;
      }

      // No delivery provider connected yet — hand the request off to a
      // direct channel instead of pretending it was sent.
      setStatus("handoff");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't send that just now. Please check your connection and try again.",
      );
    }
  }

  /* ------------------------------------------------------ sent / handoff */

  if (status === "sent") {
    return (
      <ConfirmationPanel
        title="Thanks — your request is in."
        message="We've received the details and will be in touch to arrange a look at the job. If it's urgent, reach out directly and we'll pick it up straight away."
      />
    );
  }

  if (status === "handoff") {
    const body = formatQuoteRequest(values);
    return (
      <ConfirmationPanel
        title="Your request is ready to send."
        message={
          hasWhatsApp || hasEmail
            ? "Send it through to us with one tap — the details you entered are already filled in."
            : "Our direct contact channels are being published shortly. Copy the summary below and keep it to hand — it has everything we need to quote the job."
        }
      >
        {hasWhatsApp || hasEmail ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {hasWhatsApp ? (
              <ButtonLink href={whatsappHref(body)} size="lg" variant="primary">
                <WhatsAppIcon className="h-5 w-5" />
                Send on WhatsApp
              </ButtonLink>
            ) : null}
            {hasEmail ? (
              <ButtonLink
                href={mailtoHref(quoteEmailSubject, body)}
                size="lg"
                variant={hasWhatsApp ? "outline" : "primary"}
              >
                <MailIcon className="h-5 w-5" />
                Send by email
              </ButtonLink>
            ) : null}
          </div>
        ) : null}

        <details className="mt-6 border-t border-concrete-300 pt-5">
          <summary className="cursor-pointer text-sm font-semibold text-iron-800">
            Show the details you entered
          </summary>
          <pre className="mt-3 overflow-x-auto rounded-sm bg-concrete-100 p-4 text-sm whitespace-pre-wrap text-iron-700">
            {body}
          </pre>
        </details>
      </ConfirmationPanel>
    );
  }

  /* ------------------------------------------------------------ the form */

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertIcon className="mt-0.5 h-5 w-5 shrink-0" />
          {errorMessage}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          error={errors.name}
          fieldId={fieldId}
          errorId={errorId}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={cn(fieldBase, "h-12", inputBorder(errors.name))}
            placeholder="Your full name"
          />
        </Field>

        <Field
          label="Phone number"
          name="phone"
          required
          error={errors.phone}
          fieldId={fieldId}
          errorId={errorId}
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className={cn(fieldBase, "h-12", inputBorder(errors.phone))}
            placeholder="e.g. 876 000 0000"
          />
        </Field>

        <Field
          label="Email"
          name="email"
          hint="Optional"
          error={errors.email}
          fieldId={fieldId}
          errorId={errorId}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={cn(fieldBase, "h-12", inputBorder(errors.email))}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Service needed"
          name="service"
          required
          error={errors.service}
          fieldId={fieldId}
          errorId={errorId}
        >
          <select
            id={fieldId("service")}
            name="service"
            required
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? errorId("service") : undefined}
            className={cn(fieldBase, "h-12", inputBorder(errors.service))}
          >
            <option value="">Choose a service…</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Project location"
          name="location"
          required
          hint="Town or parish"
          error={errors.location}
          fieldId={fieldId}
          errorId={errorId}
          className="sm:col-span-2"
        >
          <input
            id={fieldId("location")}
            name="location"
            type="text"
            autoComplete="address-level2"
            required
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? errorId("location") : undefined}
            className={cn(fieldBase, "h-12", inputBorder(errors.location))}
            placeholder="e.g. Kingston"
          />
        </Field>

        <Field
          label="Project description"
          name="details"
          required
          hint="What needs doing, and roughly how big is the job?"
          error={errors.details}
          fieldId={fieldId}
          errorId={errorId}
          className="sm:col-span-2"
        >
          <textarea
            id={fieldId("details")}
            name="details"
            rows={5}
            required
            value={values.details}
            onChange={(event) => update("details", event.target.value)}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? errorId("details") : undefined}
            className={cn(fieldBase, "resize-y py-3", inputBorder(errors.details))}
            placeholder="Tell us about the work — the rooms or areas involved, any materials you have in mind, and when you'd like it done."
          />
        </Field>
      </div>

      {/* --------------------------------------------- preferred contact */}
      <fieldset
        aria-describedby={
          errors.preferredContact ? errorId("preferredContact") : undefined
        }
      >
        <legend className="text-sm font-semibold text-iron-900">
          Preferred contact method{" "}
          <span className="text-amber-700" aria-hidden>
            *
          </span>
          <span className="sr-only">(required)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {contactMethods.map((method) => {
            const selected = values.preferredContact === method;
            return (
              <label
                key={method}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2.5 rounded-sm border px-4 py-3 text-sm font-medium transition-colors",
                  selected
                    ? "border-amber-600 bg-amber-500/10 text-iron-900"
                    : "border-concrete-300 bg-white text-iron-700 hover:border-concrete-400",
                )}
              >
                <input
                  type="radio"
                  name="preferredContact"
                  id={
                    method === contactMethods[0]
                      ? fieldId("preferredContact")
                      : undefined
                  }
                  value={method}
                  checked={selected}
                  onChange={() => update("preferredContact", method)}
                  className="h-4 w-4 accent-amber-600"
                />
                {method}
              </label>
            );
          })}
        </div>
        {errors.preferredContact ? (
          <p
            id={errorId("preferredContact")}
            className="mt-2 text-sm font-medium text-red-700"
          >
            {errors.preferredContact}
          </p>
        ) : null}
      </fieldset>

      {/* Honeypot — hidden from people, catches automated submissions. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={fieldId("company")}>Company (leave blank)</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-concrete-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-iron-500">
          We use your details only to reply about your project.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? "Sending…" : "Request a Quote"}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your request." : ""}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------- internals */

function inputBorder(error?: string) {
  return error ? "border-red-400" : "border-concrete-300";
}

function Field({
  label,
  name,
  hint,
  required,
  error,
  fieldId,
  errorId,
  className,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  error?: string;
  fieldId: (name: string) => string;
  errorId: (name: string) => string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={fieldId(name)}
        className="flex flex-wrap items-baseline gap-x-2 text-sm font-semibold text-iron-900"
      >
        {label}
        {required ? (
          <>
            <span className="text-amber-700" aria-hidden>
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        ) : null}
        {hint ? (
          <span className="text-xs font-normal text-iron-500">{hint}</span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={errorId(name)} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ConfirmationPanel({
  title,
  message,
  children,
}: {
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-concrete-300 bg-white p-7 sm:p-9"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-iron-950">
        <CheckIcon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-2xl font-bold text-iron-900">{title}</h3>
      <p className="mt-3 max-w-xl leading-relaxed text-iron-600">{message}</p>
      {children}
    </div>
  );
}

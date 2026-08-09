# Yojana Sathi
### Find the government scheme you already qualify for — in under 30 seconds.
Name:-Pandurang

**🔗 Live app:** https://yojanasathi.lovable.app
**🏆 Built for:** Hack Devengers 1.0 — Open Innovation Track (9 August 2026)

---

## The Problem

India runs hundreds of central and state welfare schemes — for farmers, new mothers,
students, street vendors, senior citizens, and more. But most eligible citizens never
find out which ones apply to them. Eligibility rules are scattered across dozens of
government websites, written in dense official language, and there's no single place
to check "do I qualify?" in plain English.

The people this hurts most are often the least equipped to dig through it themselves —
which is also exactly who CSC operators, NGO field workers, and Anganwadi staff spend
their day trying to help.

## The Solution

Yojana Sathi is a citizen-first scheme-matching tool. Answer eight simple questions
about your situation — age, state, occupation, income, category, land, bank account,
ration card — and get back a ranked, explained shortlist of schemes you may qualify
for, with zero login and zero data stored.

It's built for two users at once:
- **Citizens**, checking for themselves on their own phone.
- **CSC operators, NGO workers, and Anganwadi staff**, using the same flow to help
  someone else via an "I'm filling this in for someone else" mode — no separate
  admin tool required.

## Key Features

- **8-question guided flow** — one question per screen, progress bar, back/edit at
  any point, large mobile-friendly tap targets
- **Assisted mode** — a single toggle reframes the flow for a helper completing it on
  someone else's behalf
- **Deterministic, explainable matching** — every scheme carries structured
  eligibility rules; results are classified as **Strong Match** or **Possible Match**,
  never a guess
- **Plain-language reasoning** — each result says *why* it appeared, generated from
  the scheme's own rule metadata, not a black box
- **Full scheme detail** — benefits, required documents, availability, last-verified
  date, and a direct link to the official government portal for every result
- **Share the results, not just view them** — copy summary, print-friendly view, and
  a one-tap WhatsApp share, so a field worker can hand someone a usable answer
- **Responsible by design** — every result is framed as "you may qualify," never a
  guarantee, with a standing reminder to confirm on the official portal
- **No accounts, no OTP, no stored profiles** — the questionnaire runs, matches, and
  forgets

## Why It's Different

Most "AI scheme finder" projects lean on an LLM to guess eligibility from a prompt —
which means the answer can't be fully explained or trusted. Yojana Sathi does the
opposite: eligibility is a structured, rule-based decision, and the "why" shown to the
user is generated directly from that same rule set. It's a tool people can actually
rely on, not a chatbot with a plausible-sounding answer.

## Tech Stack

- **Frontend:** React + TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Matching engine:** Deterministic rule-based evaluation — no black-box AI in the
  eligibility decision itself
- **Design system:** Custom "civic-utility" visual language — warm paper background,
  high-contrast red/blue/green signal colors for strong match / possible match /
  trust cues, IBM Plex Sans + Figtree typography — built to feel like a trustworthy
  government-service tool, not a generic SaaS dashboard
- **Sharing:** Native clipboard API, `window.print()`, and a backend-free WhatsApp
  `wa.me` share link

*(Fill in/confirm your actual backend & data layer here if one was generated —
e.g. Supabase, a serverless function, or client-side data — before submitting.)*

## Scheme Coverage

The initial dataset covers 17 major central government schemes across agriculture,
health, housing, women & child welfare, financial inclusion, employment, education,
and social security — including PM-KISAN, Ayushman Bharat (PM-JAY), PM Awas Yojana,
PM Ujjwala Yojana, Jan Dhan Yojana, Atal Pension Yojana, PM SVANidhi, Stand-Up India,
and more. Every scheme entry is versioned with a source URL and last-verified date so
it can be kept current.

## How It Works

1. **Start checking** — from the landing page, or "Start assisted check" if you're
   helping someone else
2. **Answer 8 quick questions** about the person's situation
3. **Get your shortlist** — strong and possible matches, each with a plain-language
   reason, benefits, documents needed, and the official application link
4. **Act on it** — copy the summary, print it, share it on WhatsApp, or head straight
   to the official portal

## Getting Started Locally

```bash
git clone <this-repository-url>
cd yojana-sathi
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Roadmap

- Hindi and regional-language scheme names (data model already supports it)
- State-level scheme coverage, beyond the current central-scheme set
- Admin interface for scheme data updates (intentionally deferred for MVP stability)
- Offline-friendly mode for low-connectivity field use

## Responsible Design Note

Yojana Sathi never states or implies guaranteed approval for any scheme. Every result
is framed as a possible match based on the information provided, and the app
consistently directs users to the relevant official government portal to confirm
final eligibility before applying.

---

Built with care for Hack Devengers 1.0. *[Add your team/participant name here.]*

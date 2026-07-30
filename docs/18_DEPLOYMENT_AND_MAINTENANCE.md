# 18 — Deployment and Maintenance

*Getting it live, keeping it live, and keeping it true.*

---

## 1. The maintenance problem, stated honestly

WUFPA has no IT staff, no evidenced hosting budget, and an unknown amount of editorial
capacity (constraints C3, C4). The most likely failure mode for this project is not a bad
launch — it is a good launch followed by eighteen months of silence, after which the site
says "upcoming: December 2025" and does more harm than good.

**Everything in this document is designed around that risk.** The technical choices minimise
what can break; the content architecture minimises what goes stale; and the maintenance ask is
deliberately small enough that a volunteer officer can actually carry it.

---

## 2. Hosting

### 2.1 Recommendation

**Cloudflare Pages**, with **Netlify** as an equally acceptable alternative.

| Requirement | Why these meet it |
|---|---|
| Free tier genuinely sufficient | A static site with modest traffic sits well inside both free tiers. No cost is a real feature for an organisation seeking seed capital `[P3]` |
| Global CDN with African presence | Constraint C1. Cloudflare has edge locations in Africa; latency to a Ugandan mobile user is materially better than a single-region origin |
| Built-in form handling | No backend needed (FR-52) |
| Scheduled builds | Required for date-derived event states (FR-31, FR-112) |
| Atomic deploys and instant rollback | A bad deploy is one click from reversed |
| Automatic HTTPS with renewal | Nothing expires unnoticed |
| Headers and redirects as config files | Version-controlled, reviewable |
| Deploy previews per pull request | WUFPA can review changes before they are live |

**Not recommended:** shared cPanel hosting (manual deploys, no CI, no previews, and someone has
to remember to renew), a VPS (a server to patch — constraint C3), or GitHub Pages (no form
handling, no scheduled builds without extra machinery).

### 2.2 Configuration

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | Pinned in `.nvmrc`, matched in the build environment |
| Production branch | `main` |
| Deploy previews | Every pull request |
| Scheduled build | Daily, 02:00 EAT (UTC+3) — before Ugandan working hours |
| Environment variables | Set in the host dashboard, never committed |

---

## 3. Domain

`⚠ GAP` Q5 — no domain has been supplied.

### 3.1 Recommendation

**A `.org` or `.ug` domain matching the organisation's name or its abbreviation.** Both signal
a non-profit body; `.ug` additionally signals national rootedness, which suits an organisation
whose identity is regional.

Whichever is chosen, register the obvious variants and redirect them to the canonical host, so
that a link written from memory in a grant application still works.

### 3.2 Domain hygiene — the part that actually loses websites

| Rule | Reason |
|---|---|
| **Registered in WUFPA's name**, with WUFPA's own email as the registrant contact | Domains registered to a departed volunteer or an agency are the single most common way small organisations permanently lose their web address |
| **At least two people have registrar access**, one of them a WUFPA office-holder | Same |
| **Auto-renew enabled, and payment card details kept current** | An expired domain takes the site down and can be bought by anyone |
| **Expiry date recorded** in this documentation and in WUFPA's own records, with a calendar reminder 60 days ahead | Renewal notices go to an inbox nobody watches |
| **Registrar lock enabled** | Prevents unauthorised transfer |
| **One canonical host** (`www` or apex), the other 301-redirected | Duplicate-content and analytics hygiene |

> This is the least interesting section in this documentation and one of the most important.
> A website that cannot be reached because a renewal notice went to a Gmail account nobody
> checks is a total loss of everything else described here.

---

## 4. Deployment pipeline

```
  local change
      │
      ▼
  feature branch ──→ pull request
                          │
                          ▼
                   CI gates (14 § 13)
                   type check · build · schema validation · links ·
                   axe · Lighthouse · budgets · upscale check ·
                   phone-number scan · consent check
                          │
                     all pass?
                     │        │
                    yes       no ──→ blocked
                     │
                     ▼
              deploy preview URL ──→ review / WUFPA sign-off
                     │
                     ▼
              merge to main ──→ production deploy (atomic)
                     │
                     ▼
              post-deploy smoke check
```

**Nothing reaches production without passing CI.** The three project-specific gates — image
upscale, personal-number scan, photo consent — exist because those are the rules most likely
to be broken by someone who has not read this documentation
([14 § 13](14_TECHNICAL_ARCHITECTURE.md#13-testing-and-ci)).

**Post-deploy smoke check** (two minutes, every production deploy): homepage loads · one
interior page loads · membership form submits · no console errors · analytics recording.

---

## 5. Analytics

### 5.1 Recommendation

**Plausible** or **Cloudflare Web Analytics** — cookieless, lightweight, no personal data.

| Reason | Detail |
|---|---|
| No cookie banner needed | Cookieless analytics do not require consent under GDPR-style regimes, and there is no reason to impose a banner on this audience |
| No personal data | Aligns with the privacy posture throughout this project ([10 § 7](10_MEMBERSHIP.md#7-data-protection-and-consent)) |
| Small payload | Constraint C1. Google Analytics 4 is roughly an order of magnitude heavier |
| Sufficient for the metrics that matter | The Tier 1 metrics in [01 § 6](01_PROJECT_FOUNDATION.md#6-success-metrics) are enquiries and their origin — neither needs behavioural tracking |

**If WUFPA requires Google Analytics** — for instance because a funder asks for it — then a
compliant consent banner becomes mandatory (FR-99), and the performance and privacy costs
should be stated plainly before that decision is made.

### 5.2 What to measure

| Metric | Why |
|---|---|
| Membership enquiries submitted | Tier 1. The most important number on the site |
| Partnership/support enquiries | Tier 1 |
| **Sessions and enquiries by region** | Tests goal W5 — whether the site reaches beyond Mbarara |
| Organic search sessions and queries | Goal W7 |
| Top entry pages | Where visitors actually arrive |
| Homepage → second page rate | Whether the homepage is answering "is this real?" |
| Scroll depth on `/membership/` | Whether the offer holds attention |
| Mobile share | Constraint check |
| 404s and internal search queries | Content gaps, stated by users |

### 5.3 What not to measure

No individual-level tracking, no session recording, no heatmaps, no cross-site tracking, no
advertising pixels. None of it is needed for the decisions WUFPA has to make, and all of it
carries privacy cost.

---

## 6. Monitoring

| What | Tool | Alert to |
|---|---|---|
| Uptime | UptimeRobot or the host's own monitoring, 5-minute interval | Agency + WUFPA |
| SSL expiry | Host-managed, with a monitor as backstop | Agency |
| Domain expiry | Registrar auto-renew + calendar reminder 60 days ahead | **WUFPA** |
| Build failures | Host notifications | Agency |
| Form delivery | **Monthly manual test submission** | WUFPA |
| Core Web Vitals | Search Console | Agency |
| Broken links | Monthly automated crawl | Agency |
| Search Console errors | Weekly digest | Agency |

> **Form delivery deserves the manual test.** Silent form failure is the worst outcome
> available to this site: WUFPA sees no enquiries and assumes nobody is interested, when in
> fact the primary business goal has been failing quietly for months. One test submission a
> month prevents it.

---

## 7. Backups

Static sites are unusually easy to protect, but "easy" is not "automatic".

| Asset | Backup | Recovery |
|---|---|---|
| Source and content | Git, on the primary remote | Clone |
| **Off-platform git mirror** | A second remote (e.g. GitLab) synced weekly | Protects against loss of the primary account |
| Built output | Host retains prior deployments | One-click rollback |
| **Original client assets** | `client-archive/originals/`, in git, plus an offline copy held by WUFPA. **Outside `public/` so it is never published** — see [14 § 4](14_TECHNICAL_ARCHITECTURE.md#4-folder-structure) | Re-clone |
| Form submissions | Delivered to WUFPA's email; **WUFPA's own retention** | WUFPA |
| DNS configuration | Exported and stored with the documentation | Manual restore |
| Analytics history | Exported annually | — |

**The off-platform mirror matters more than it looks.** If access to the primary git host is
lost — an account dispute, a departed volunteer, a policy change — a weekly mirror is the
difference between an inconvenience and rebuilding from scratch.

---

## 8. Maintenance schedule

Deliberately minimal. An unrealistic schedule is the same as no schedule.

### 8.1 WUFPA's tasks

| Frequency | Task | Time |
|---|---|---|
| **When something happens** | Publish a news item | 20 min |
| **When something is scheduled** | Add an event | 10 min |
| **After each activity** | Add photographs with captions and dates | 15 min |
| Monthly | Send a test message through the contact form; confirm it arrives | 2 min |
| Annually | Review leadership and roster after any election | 1 hour |
| Annually | Confirm domain auto-renew and registrar access | 10 min |

**That is the entire ask.** If WUFPA does none of it, the site remains accurate — because
nothing on it expires without being handled automatically (§ 9).

### 8.2 Technical maintenance

| Frequency | Task |
|---|---|
| Automatic, daily | Scheduled rebuild — updates date-derived states |
| Monthly | Dependency updates; review build logs |
| Monthly | Broken-link crawl |
| Quarterly | Lighthouse and axe audit on all page types |
| Quarterly | Review analytics against the Tier 1 metrics |
| Every 6 months | Full documentation re-read ([README § 8](README.md#8-versioning-strategy)) |
| Annually | Accessibility statement review; content accuracy audit; verify statistics are still current |
| Annually | Confirm two people hold every credential |

---

## 9. Designing against decay

The specific mechanisms that keep the site true without anyone tending it. These are the
project's answer to constraint C4 and they are worth stating together.

| Mechanism | What it prevents |
|---|---|
| **Event status derived from date at build** ([09 § 9.2](09_PROGRAMMES_AND_EVENTS.md#92-status-handling--the-part-that-matters)) | The Awards Gala problem — a past date shown as upcoming |
| **Daily scheduled rebuild** | The above, but actually applied |
| **Homepage band falls back to news, then hides** ([09 § 9.3](09_PROGRAMMES_AND_EVENTS.md#93-homepage-behaviour)) | An empty "upcoming events" panel announcing dormancy |
| **Statistics carry an as-of date** | "300+ members" silently becoming a claim about 2026 |
| **Copyright year generated at build** | "© 2025" in 2028 (X16) |
| **No section that requires regular updating to look alive** | The whole site aging at the pace of its least-maintained part |
| **Evergreen content is the majority** | History, governance, legal status and programmes stay true for years |
| **`⚠ GAP` items documented, not filled** | Invented content decaying into contradiction |

**The design goal: the site is still accurate and still credible after twenty-four months
without a single edit.** Anything that fails that test should be reconsidered before launch.

---

## 10. Content workflow

### 10.1 Phase 1 — supported publishing

WUFPA sends material (text, photographs, dates) by email or WhatsApp; the agency publishes.
Realistic at launch and removes training as a launch dependency.

**What WUFPA sends with a photograph:** the photograph itself (original, not a WhatsApp
forward), the date, the district, what was happening, who is in it, and whether permission
exists to publish.

### 10.2 Phase 2 — WUFPA publishes directly

A git-based CMS at `/admin/` ([14 § 7](14_TECHNICAL_ARCHITECTURE.md#7-content-editing)).
Editing is limited initially to news, events and albums.

**Guardrails built into the editor:** alt text is a required field; required frontmatter
cannot be omitted; sub-region is a fixed list; there is no telephone field; and every image
requires a consent flag before it will render.

### 10.3 The editorial rule that survives handover

> **If you are about to publish a fact about WUFPA that is not already on the website, check
> it. If you cannot check it, do not publish it.**

This is the rule that matters most after the agency steps back
([20_WUFPA_QUALITY_MANIFESTO.md](20_WUFPA_QUALITY_MANIFESTO.md)). It should be the first line
of the maintenance guide.

---

## 11. Handover package

Delivered at Phase 9.

- [ ] **Maintenance guide** — plain-language, screenshot-led, covering: publishing a news item,
      adding an event, adding photographs, what to do if something breaks, and who to contact
- [ ] **Live training session** with the Publicity and Communications Officer, recorded
- [ ] **Credentials handover** — registrar, hosting, repository, analytics, Search Console —
      to two named holders, one at WUFPA
- [ ] **This documentation set**, updated to reflect every Phase 0 answer
- [ ] **Asset archive** — original client files, processed images, logo pack, and the source
      files for the SVG redraw
- [ ] **Outstanding content requests** — the remaining `⚠ GAP` items as a plain list WUFPA can
      work through
- [ ] **A one-page "what to do when" card** for the office wall

---

## 12. Support after launch

| Level | Response | Covers |
|---|---|---|
| **Critical** — site down, forms failing, security issue | Same day | Availability and data |
| **High** — a page broken, a link dead, an accessibility regression | 3 working days | Function |
| **Normal** — content updates, new pages | 10 working days | Editorial |
| **Enhancement** — new features | Scoped separately | [19_FUTURE_ROADMAP.md](19_FUTURE_ROADMAP.md) |

`⚠ GAP` — no support arrangement or budget has been agreed. This table is a proposed structure,
not a commitment. **Agree something before launch**, even if it is only "best effort, no
retainer" — the failure mode is an unclear arrangement where nobody believes they are
responsible.

---

## 13. Deprecation and change

When something has to change after launch:

| Change | Procedure |
|---|---|
| A page moves | 301 redirect, added to the redirects file. **Never removed** — links in grant applications and printed material must keep working (goal W4) |
| A page is retired | Prefer redirecting to the nearest equivalent over deleting. Deletion only when the content is actively wrong |
| A person withdraws consent | Delete their content file. Every reference resolves automatically ([14 § 5.2](14_TECHNICAL_ARCHITECTURE.md#52-why-model-this-thoroughly-for-four-members-and-six-programmes)) |
| A fact turns out to be wrong | Correct it, and record the correction in [02 § 12](02_ORGANISATION_PROFILE.md#12-conflicts-gaps-and-corrections-register) |
| A documented decision is reversed | Update the document, bump the version, record what changed and why ([README § 8](README.md#8-versioning-strategy)) |
| An event is cancelled | Mark `cancelled`. **Keep the page** — deleting it breaks inbound links and looks like concealment |

---

*Document 18 of 20 · Version 1.0 · 25 July 2026 · Initial release.*

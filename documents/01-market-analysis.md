# AutonAI — Market Analysis

> **Evidence base.** This document was researched on 2026-09-29 from vendor pricing pages,
> published analyst figures and the owner's market-review work (2026-09-26). No number
> here is invented. Where a figure could not be independently verified it is marked
> **[TO BE VALIDATED]**; verify it before the document is used in an investor or
> grant setting. Sources are listed in §8.

## 1. Product in one sentence

> AutonAI — a Gemini-powered autonomous-agent demo.

## 2. Problem statement

- **Who feels the problem:** Developers, marketers, and consumers exploring agents.
- **What they do today instead:** manual processes, spreadsheets, rented SaaS — see §4.
- **Cost of the status quo:** measurable in lost revenue / manual labor overhead
  **[TO BE VALIDATED for this specific segment]**.

## 3. Market definition

| Field | Value |
| --- | --- |
| Category | Generative-AI agent/demo |
| Geographic scope | Global |
| Target segment / persona | Developers, marketers, and consumers exploring agents |
| Estimated total addressable market | Commodity layer — LLM APIs + agent frameworks from many vendors **[TO BE VALIDATED — cite a specific figure]** |
| Serviceable addressable market | Depends on distribution reach; **[TO BE VALIDATED]** |
| Beachhead segment | Developers, marketers, and consumers exploring agents |

## 4. Demand signals

> High interest; undifferentiated supply

| Signal | Evidence | Status |
| --- | --- | --- |
| Category demand | Mature/validated category with well-funded entrants | Confirmed |
| Competitive floor | Incumbent pricing and free tiers are public and low | Confirmed (see §5) |
| Own sales/usage data | Not instrumented in this repo | **[TO BE MEASURED]** |

## 5. Competitive landscape

| Competitor | Entry price (2026) | Positioning | Weakness we can exploit |
| --- | --- | --- | --- |
| **OpenAI GPTs/Gemini Gems** | Per-token/platform | Vanilla agent builders | No moat |
| **LangChain/CrewAI stack** | OSS | Agent frameworks | Developer skill |
| **Claude/Cursor agents** | Per-token | Coding assistants | Focus |

## 6. Differentiation

Grounded in what this build actually does (see `06-architecture.md`):

- **Distinctive capability in code:** Showcases a specific workflow demo. Not a defensible market position — positioned as a prototype/marketing artifact or portfolio specimen.
- **Capability a competitor would need to replicate:** proxy of the build's core path.
- **Why defensible:** depth of vertical fit and delivery ownership, not a generic dashboard.

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Category commoditized / incumbent floor falling | Medium–High | Medium | Position on differentiation above, not price |
| Unverified market figures | High | High | Keep `[TO BE VALIDATED]` markers until sourced |
| Claims ahead of code (demo vs. shipped) | Medium | High | Keep README/copy aligned with the source tree |

## 8. Sources

Accessed 2026-09-29; vendor pricing changes — re-verify before any pricing decision.

- https://openai.com/chatgpt/gpts/
- https://gemini.google.com
- https://www.langchain.com

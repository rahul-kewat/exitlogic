import type { Component } from 'vue'
import {
  Activity,
  BookOpen,
  Bot,
  Brain,
  Cable,
  Cpu,
  FileCode2,
  MessageSquare,
  Scan,
  Shield,
  Waypoints,
  Wrench,
} from 'lucide-vue-next'

export type StackTopic = {
  id: string
  /** Full title in detail panel */
  label: string
  /** Scrolling strip (short) */
  chip: string
  icon: Component
  blurb: string
  learnPoints: readonly string[]
  vectorId: string
}

/**
 * Market-facing AI delivery topics (language-agnostic). Each has learn outcomes + a vector id for art.
 */
export const stackTopics: StackTopic[] = [
  {
    id: 'prompt-engineering',
    label: 'Prompt engineering',
    chip: 'Prompt engineering',
    icon: MessageSquare,
    blurb: 'How you talk to models is a billable skill: clarity, structure, and iteration under constraints.',
    learnPoints: [
      'Decompose a client ask into system vs user messages and few-shot examples.',
      'Version prompts like code: A/B, regressions, and when to change temperature.',
      'Handle refusal, format enforcement (JSON, tables), and long-context cutovers.',
    ],
    vectorId: 'layers',
  },
  {
    id: 'ai-agents',
    label: 'AI agents',
    chip: 'AI agents',
    icon: Bot,
    blurb: 'Autonomous steps with guardrails—plan, act, and recover without losing the thread.',
    learnPoints: [
      'Map agent loop: plan → tool calls → observe → continue or hand off to you.',
      'Set boundaries: max steps, allowed tools, and human approval gates.',
      'Debug traces: what the agent saw, what it did, and how to fix bad loops.',
    ],
    vectorId: 'nodes',
  },
  {
    id: 'rag',
    label: 'RAG & retrieval',
    chip: 'RAG & context',
    icon: BookOpen,
    blurb: 'Ground models in *your* data: chunking, embeddings, and keeping answers on-source.',
    learnPoints: [
      'Ingestion pipelines: chunk size, overlap, and metadata for filters.',
      'When retrieval fails: re-rank, hybrid search, and “I don’t know” behavior.',
      'Evaluating answer faithfulness and citation so clients trust the output.',
    ],
    vectorId: 'mesh',
  },
  {
    id: 'llm-ops',
    label: 'LLM operations',
    chip: 'LLM ops',
    icon: Cpu,
    blurb: 'Treat models as infrastructure: keys, fallbacks, observability, and release hygiene.',
    learnPoints: [
      'Routing traffic across model tiers, latency SLOs, and graceful degradation.',
      'Logging prompts/responses safely (redaction, retention) for audits.',
      'Cost dashboards: token budgets per feature and customer-facing caps.',
    ],
    vectorId: 'stack',
  },
  {
    id: 'mcp',
    label: 'MCP & tool layers',
    chip: 'MCP',
    icon: Cable,
    blurb: 'The protocol moment: one standard surface for tools, data, and IDE surfaces.',
    learnPoints: [
      'Model Context Protocol: how tools register and expose context to the model.',
      'Composing internal APIs and third-party services behind one tool contract.',
      'Security: scope, least privilege, and what never leaves the boundary.',
    ],
    vectorId: 'plug',
  },
  {
    id: 'evals',
    label: 'Evals & safety',
    chip: 'Evals & safety',
    icon: Shield,
    blurb: 'Ship with confidence: automated checks before the customer sees a bad answer.',
    learnPoints: [
      'Golden sets, edge-case suites, and regression on each model or prompt change.',
      'Jailbreak resistance, PII patterns, and policy-as-config.',
      'Sign-off workflow: who approves a change that touches customer data.',
    ],
    vectorId: 'shield',
  },
  {
    id: 'ai-workflow',
    label: 'AI-native workflow',
    chip: 'AI workflow',
    icon: Waypoints,
    blurb: 'From ticket to diff: editor, reviews, and AI as a teammate—not a black box.',
    learnPoints: [
      'When to use inline assist vs batch generation in your delivery pipeline.',
      'Review flows: who accepts AI output, and how diffs are attributed.',
      'Integrating with issue trackers, design docs, and client portals.',
    ],
    vectorId: 'flow',
  },
  {
    id: 'spec-driven',
    label: 'Spec-driven delivery',
    chip: 'Spec-driven',
    icon: FileCode2,
    blurb: 'Specs, contracts, and acceptance criteria that both humans and models can follow.',
    learnPoints: [
      'Write specs that are testable: invariants, APIs, and error semantics.',
      'Map specs to checklists the model (and QA) can verify against.',
      'Change control: what updates when the client moves the goal.',
    ],
    vectorId: 'doc',
  },
  {
    id: 'human-loop',
    label: 'Human-in-the-loop',
    chip: 'Human-in-loop',
    icon: Brain,
    blurb: 'The right handoff points: when automation stops and judgment starts.',
    learnPoints: [
      'Design review queues for high-stakes or regulated outputs.',
      'Capture feedback that improves prompts and data—not one-off fixes.',
      'SLAs: how fast a human must respond when the model defers.',
    ],
    vectorId: 'loop',
  },
  {
    id: 'cost-latency',
    label: 'Cost & latency aware',
    chip: 'Cost & latency',
    icon: Activity,
    blurb: 'Engineering that respects tokens, time, and margin on every call.',
    learnPoints: [
      'Caching, summarization, and prompt trimming to protect gross margin.',
      'Streaming vs batch UX and how to set user expectations on wait time.',
      'Per-tenant and per-feature budgets with kill switches.',
    ],
    vectorId: 'gauge',
  },
  {
    id: 'function-calling',
    label: 'Function calling',
    chip: 'Function calling',
    icon: Wrench,
    blurb: 'Reliable tool use: schemas, idempotency, and failure modes your users never feel.',
    learnPoints: [
      'OpenAPI-style tool definitions the model can actually satisfy.',
      'Retries, partial results, and user-visible error copy.',
      'Testing tools in isolation before they enter the agent graph.',
    ],
    vectorId: 'fn',
  },
  {
    id: 'multimodal',
    label: 'Multimodal AI',
    chip: 'Multimodal',
    icon: Scan,
    blurb: 'Text plus images, audio, or files—one pipeline, consistent quality bar.',
    learnPoints: [
      'When to transcribe, OCR, or describe assets before the main model run.',
      'Size limits, preprocessing, and consent for user-uploaded media.',
      'Output formats clients can drop into slides, tickets, or reports.',
    ],
    vectorId: 'multi',
  },
]

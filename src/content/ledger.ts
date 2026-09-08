/**
 * SYSTEM 03 — A LEDGER THAT REMEMBERS EVERYTHING
 * Demo transfer values are explicitly marked DEMO DATA.
 * Project technologies come from the résumé.
 */

export const TRANSFER_DEMO = {
  accountA: { name: "Account A", before: "$8,240", delta: "−$750" },
  accountB: { name: "Account B", before: "$1,120", delta: "+$750" },
  amount: "$750.00",
  txn: "TXN 44C19E",
};

export const LEDGER_STEPS = [
  {
    id: "account-a",
    label: "ACCOUNT A",
    detail: "Opening balance read inside a single transaction boundary.",
    entry: "DEBIT −$750.00",
  },
  {
    id: "transfer",
    label: "TRANSFER",
    detail: "One command, one deterministic state change — no partial writes.",
    entry: "INITIATED",
  },
  {
    id: "ledger-entry",
    label: "LEDGER ENTRY",
    detail: "An immutable, append-only record of the movement.",
    entry: "APPENDED ✓",
  },
  {
    id: "balance-update",
    label: "BALANCE UPDATE",
    detail: "Both sides updated atomically or not at all.",
    entry: "COMMITTED",
  },
  {
    id: "audit",
    label: "AUDIT HISTORY",
    detail: "Every mutation traceable — who, what, when, in order, forever.",
    entry: "RECORDED",
  },
];

export const LEDGER_STACK = [
  "REST APIs",
  "Database Design",
  "React",
  "TypeScript",
  "Docker",
  "Cloud Deployment",
];

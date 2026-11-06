import type { ReactNode } from 'react';
import { AlertTriangle, CalendarCheck, Check, Download, Inbox, Lock, Plus } from 'lucide-react';
import { LOGOS } from '../data';
import { Logo } from './primitives';

/* ---------- Frames ---------- */

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
      <div className="flex items-center gap-3 border-b border-line bg-mist px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff6159]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c941]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-1 font-mono text-[11px] text-muted">
          <Lock size={10} />
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Pill({ tone, children }: { tone: 'amber' | 'green' | 'rose' | 'blue' | 'brand'; children: ReactNode }) {
  const t = {
    amber: 'bg-[#fff4d6] text-[#9a6700]',
    green: 'bg-[#dcf7ea] text-[#0f7a55]',
    rose: 'bg-[#ffe3ea] text-[#c01d4f]',
    blue: 'bg-[#e3ebff] text-[#2b4fd8]',
    brand: 'bg-lav text-brand',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${t}`}>{children}</span>;
}

/* ---------- 1. Leave requests ---------- */

export function ChatBefore() {
  const msgs = [
    { who: 'Faiz', text: 'Boss, saya nak apply cuti 12–14 Nov boleh?', me: false },
    { who: 'Admin', text: 'Siapa lagi cuti minggu depan? 🙏', me: true },
    { who: 'Mei Ling', text: 'Saya dah hantar form semalam, dah approve ke?', me: false },
    { who: 'Ravi', text: 'Excel cuti tu siapa pegang sekarang?', me: false },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#efeae2]">
      <div className="flex items-center justify-between bg-[#1f2c34] px-3.5 py-2.5 text-white">
        <div>
          <p className="text-xs font-semibold">Unit Admin 📋</p>
          <p className="text-[10px] text-white/60">48 members</p>
        </div>
        <span className="rounded-full bg-[#25d366] px-1.5 text-[10px] font-bold text-[#1f2c34]">23</span>
      </div>
      <div className="space-y-2 p-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.me ? 'justify-end' : ''}`}>
            <div className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-[11px] leading-snug shadow-sm ${m.me ? 'bg-[#d9fdd3]' : 'bg-white'}`}>
              {!m.me && <p className="text-[10px] font-semibold text-[#c2185b]">{m.who}</p>}
              <p className="text-[#111b21]">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LeaveAfter() {
  const rows = [
    { n: 'Faiz Hakimi', d: '12–14 Nov', t: 'Annual', s: 'pending' },
    { n: 'Mei Ling Tan', d: '20 Nov', t: 'Medical', s: 'approved' },
    { n: 'Ravi Kumar', d: '24–25 Nov', t: 'Annual', s: 'approved' },
    { n: 'Nurul Aina', d: '2 Dec', t: 'Emergency', s: 'pending' },
  ] as const;
  return (
    <BrowserFrame url="cutiku.unit-anda.app">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">CutiKu</p>
        <span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[10px] font-semibold text-white">
          <Plus size={11} /> Mohon cuti
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ['Menunggu', '4', 'text-[#9a6700]'],
          ['Lulus', '18', 'text-[#0f7a55]'],
          ['Cuti hari ini', '2', 'text-brand'],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-lg bg-mist p-2.5">
            <p className="text-[10px] text-muted">{l}</p>
            <p className={`font-display text-lg font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 divide-y divide-line rounded-lg border border-line">
        {rows.map((r) => (
          <div key={r.n} className="flex items-center gap-2 px-2.5 py-2 text-[11px]">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lav text-[9px] font-bold text-brand">
              {r.n.split(' ').map((p) => p[0]).join('')}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium text-ink">{r.n}</span>
            <span className="hidden text-muted sm:inline">{r.d}</span>
            <span className="hidden text-muted md:inline">{r.t}</span>
            {r.s === 'pending' ? (
              <span className="flex gap-1">
                <span className="grid size-5 place-items-center rounded bg-[#dcf7ea] text-[#0f7a55]"><Check size={11} /></span>
                <Pill tone="amber">Menunggu</Pill>
              </span>
            ) : (
              <Pill tone="green">Lulus</Pill>
            )}
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

/* ---------- 2. Monthly report ---------- */

export function SheetBefore() {
  const cells = [
    ['Bil', 'Daerah', 'Permohonan', 'Selesai', '%'],
    ['1', 'Klang', '214', '198', '92.5'],
    ['2', 'Petaling', '#REF!', '301', '#DIV/0!'],
    ['3', 'Gombak', '173', '??', ''],
    ['4', 'Hulu Langat', '196', '188', '95.9'],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center gap-2 bg-[#1e7145] px-3 py-2 text-[11px] font-semibold text-white">
        Laporan_Bulanan_FINAL_v7(2).xlsx
      </div>
      <div className="grid grid-cols-[24px_repeat(5,minmax(0,1fr))] text-[10px]">
        <span className="border-b border-r border-[#e2e2e2] bg-[#f3f3f3]" />
        {['A', 'B', 'C', 'D', 'E'].map((c) => (
          <span key={c} className="border-b border-r border-[#e2e2e2] bg-[#f3f3f3] py-0.5 text-center text-[#666]">{c}</span>
        ))}
        {cells.map((row, ri) => (
          <div key={ri} className="contents">
            <span className="border-b border-r border-[#e2e2e2] bg-[#f3f3f3] py-1 text-center text-[#666]">{ri + 1}</span>
            {row.map((v, ci) => (
              <span
                key={ci}
                className={`truncate border-b border-r border-[#e2e2e2] px-1 py-1 ${ri === 0 ? 'font-semibold' : ''} ${
                  v.startsWith('#') ? 'bg-[#ffe3ea] font-semibold text-[#c01d4f]' : v === '??' ? 'bg-[#fff4d6]' : ''
                }`}
              >
                {v}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-1 overflow-hidden bg-[#f3f3f3] px-2 py-1.5 text-[9px] text-[#555]">
        {['Jan_final', 'Feb (copy)', 'MAC-LATEST', 'Apr_v2_betul', '+8 more'].map((t, i) => (
          <span key={t} className={`whitespace-nowrap rounded-sm px-1.5 py-0.5 ${i === 2 ? 'bg-white font-semibold text-[#1e7145]' : ''}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function ReportAfter() {
  const bars = [52, 61, 58, 70, 66, 74, 81, 77, 85, 90, 88, 96];
  const months = 'JFMAMJJASOND'.split('');
  return (
    <BrowserFrame url="laporan.unit-anda.app">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-sm font-bold text-ink">Laporan Bulanan</p>
          <p className="text-[10px] text-muted">Auto-compiled from 12 district files</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-ink px-2 py-1 text-[10px] font-semibold text-white">
          <Download size={11} /> Export PDF
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ['Permohonan', '1,284', '+12%'],
          ['Selesai', '1,102', '+8%'],
          ['Purata hari', '3.4', '−0.6'],
        ].map(([l, v, d]) => (
          <div key={l} className="rounded-lg bg-mist p-2.5">
            <p className="text-[10px] text-muted">{l}</p>
            <p className="font-display text-base font-bold text-ink">{v}</p>
            <p className="text-[10px] font-semibold text-[#0f7a55]">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-line p-3">
        <div className="flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col justify-end">
              <div
                className={`w-full rounded-t-[3px] ${i === bars.length - 1 ? 'bg-brand-gradient' : 'bg-lav-2'}`}
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex gap-1.5">
          {months.map((m, i) => (
            <span key={i} className="flex-1 text-center text-[9px] text-muted">{m}</span>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ---------- 3. Room booking ---------- */

export function PaperBefore() {
  const lines = [
    ['Isnin 10am', 'Bilik A', 'En. Hakim'],
    ['Isnin 10am', 'Bilik A', 'Pn. Zura ← ???'],
    ['Selasa 2pm', 'Bilik B', 'Unit IT'],
    ['Rabu', 'Projektor', 'siapa ambik?'],
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e8dcb8] bg-[#fffbea] p-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a6d1d]">Buku Tempahan Bilik</p>
      <div className="mt-2 space-y-0">
        {lines.map((l, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_0.8fr_1.2fr] border-b border-[#a8c5e8]/60 py-1.5 font-[cursive] text-[12px] italic text-[#1f3a8a]"
          >
            {l.map((c, j) => (
              <span key={j} className={i === 1 && j === 2 ? 'text-[#c01d4f]' : ''}>{c}</span>
            ))}
          </div>
        ))}
      </div>
      <span className="absolute right-3 top-9 rotate-[-12deg] rounded-md border-2 border-[#c01d4f] px-2 py-0.5 text-[11px] font-black tracking-widest text-[#c01d4f]">
        CLASH!
      </span>
    </div>
  );
}

export function BookingAfter() {
  const days = ['Isn', 'Sel', 'Rab', 'Kha', 'Jum'];
  const hours = ['9', '10', '11', '12', '2', '3'];
  const blocks: Record<string, { label: string; tone: string }> = {
    '0-1': { label: 'Bilik A · Hakim', tone: 'bg-brand text-white' },
    '1-4': { label: 'Bilik B · IT', tone: 'bg-blue text-white' },
    '2-0': { label: 'Projektor', tone: 'bg-sky text-white' },
    '3-2': { label: 'Bilik A · HR', tone: 'bg-brand text-white' },
    '4-3': { label: 'Bilik B', tone: 'bg-blue text-white' },
  };
  return (
    <BrowserFrame url="tempah.unit-anda.app">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">TempahBilik</p>
        <Pill tone="brand">Minggu 47</Pill>
      </div>
      <div className="mt-3 grid grid-cols-[22px_repeat(5,minmax(0,1fr))] gap-1 text-[9px]">
        <span />
        {days.map((d) => (
          <span key={d} className="text-center font-semibold text-muted">{d}</span>
        ))}
        {hours.map((h, hi) => (
          <div key={h} className="contents">
            <span className="pt-1 text-right text-muted">{h}</span>
            {days.map((_, di) => {
              const b = blocks[`${di}-${hi}`];
              return (
                <span
                  key={di}
                  className={`h-6 truncate rounded-[5px] px-1 pt-1 font-medium leading-none ${b ? b.tone : 'bg-mist'}`}
                >
                  {b?.label}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#ffd27a] bg-[#fff8e6] px-2.5 py-2 text-[10px] text-[#7a5300]">
        <AlertTriangle size={12} className="shrink-0" />
        Bilik A is taken Mon 10:00. Try 11:00 instead?
      </div>
    </BrowserFrame>
  );
}

/* ---------- 4. Public enquiries ---------- */

export function InboxBefore() {
  const mails = [
    ['Re: Re: Fwd: aduan', 'Saya dah email 3 kali...'],
    ['URGENT!!!', 'Permohonan saya bila siap?'],
    ['(no subject)', 'Salam tuan, nak tanya...'],
    ['Fwd: status permohonan', 'No IC saya 9001xx-xx-...'],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-mist px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-ink">
          <Inbox size={13} /> Inbox · aduan@
        </span>
        <span className="rounded-full bg-rose px-2 text-[10px] font-bold text-white">238 unread</span>
      </div>
      <ul className="divide-y divide-line">
        {mails.map(([s, p]) => (
          <li key={s} className="flex items-center gap-2 px-3.5 py-2">
            <span className="size-1.5 shrink-0 rounded-full bg-blue" />
            <span className="w-32 shrink-0 truncate text-[11px] font-bold text-ink">{s}</span>
            <span className="truncate text-[11px] text-muted">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TriageAfter() {
  const cols = [
    {
      title: 'Urgent',
      tone: 'rose' as const,
      cards: [{ s: 'Application #A-1029 overdue by 9 days. Asking for status.', ic: '••••••-••-4417' }],
    },
    {
      title: 'Status',
      tone: 'blue' as const,
      cards: [
        { s: 'Wants an update on a permit submitted 3 Oct.', ic: '' },
        { s: 'Asks which documents are still missing.', ic: '••••••-••-0932' },
      ],
    },
    {
      title: 'General',
      tone: 'green' as const,
      cards: [{ s: 'Asks for office hours during the school holidays.', ic: '' }],
    },
  ];
  return (
    <BrowserFrame url="aduan.unit-anda.app">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">Triage Aduan</p>
        <span className="inline-flex items-center gap-1 rounded-md bg-lav px-2 py-1 font-mono text-[10px] font-semibold text-brand">
          <Logo logo={LOGOS.ilmuMark} className="size-3" /> ILMUchat summary
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {cols.map((c) => (
          <div key={c.title} className="rounded-lg bg-mist p-2">
            <Pill tone={c.tone}>{c.title}</Pill>
            <div className="mt-2 space-y-1.5">
              {c.cards.map((card) => (
                <div key={card.s} className="rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <p className="text-[10px] leading-snug text-body">{card.s}</p>
                  {card.ic && <p className="mt-1 font-mono text-[9px] text-muted">IC {card.ic}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-[#0f7a55]">
        <Lock size={11} /> PDPA-safe: personal data masked before AI sees it
      </p>
    </BrowserFrame>
  );
}

/* ---------- Certificate ---------- */

export function CertificateMock() {
  return (
    <div className="relative rounded-[24px] bg-brand-gradient p-[2px] shadow-lift">
      <div className="relative overflow-hidden rounded-[22px] bg-white px-6 py-8 text-center sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(45deg,#8c00ff_0_1px,transparent_1px_14px)]"
          aria-hidden
        />
        <span className="absolute right-4 top-4 rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">
          Sample
        </span>
        <div className="mb-5 flex items-center justify-center gap-3">
          <Logo logo={LOGOS.mydigital} className="h-6" />
          <span className="text-xs text-muted" aria-hidden>
            ×
          </span>
          <Logo logo={LOGOS.krackeddevs} className="h-6" />
        </div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">MyDigital Build-a-thon 2026</p>
        <p className="mt-3 font-display text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
          Certificate of Shipping
        </p>
        <p className="mt-5 text-xs text-muted">This certifies that</p>
        <p className="mt-1 font-display text-xl font-bold text-ink">Nur Aisyah binti Rahman</p>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate">
          built, shipped and submitted <strong className="text-ink">CutiKu</strong>, a leave-request tracker for a
          25-person unit.
        </p>
        <div className="mt-7 flex items-center justify-between border-t border-line pt-4 text-[10px] text-muted">
          <span className="text-left">
            MITEC, Kuala Lumpur
            <br />
            17–19 Nov 2026
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#dcf7ea] px-2 py-1 font-semibold text-[#0f7a55]">
            <CalendarCheck size={11} /> Verified on KD platform
          </span>
        </div>
      </div>
    </div>
  );
}

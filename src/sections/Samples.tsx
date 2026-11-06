import { useState, type ComponentType } from 'react';
import { ArrowDown, CalendarRange, CheckCircle2, ClipboardList, FileSpreadsheet, MessagesSquare } from 'lucide-react';
import { Container, SectionTitle, ToolTag } from '../ui/primitives';
import {
  BookingAfter,
  ChatBefore,
  InboxBefore,
  LeaveAfter,
  PaperBefore,
  ReportAfter,
  SheetBefore,
  TriageAfter,
} from '../ui/mockups';

type Sample = {
  key: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  tab: string;
  title: string;
  problem: string;
  solution: string;
  features: string[];
  tools: string[];
  Before: ComponentType;
  After: ComponentType;
};

const SAMPLES: Sample[] = [
  {
    key: 'leave',
    icon: ClipboardList,
    tab: 'Leave requests',
    title: 'Leave requests lost in a WhatsApp group',
    problem:
      'Staff apply for leave in a 48-person chat. The admin scrolls back every Friday to copy requests into Excel, and approvals get missed.',
    solution:
      'CutiKu: a mobile-friendly leave tracker. Staff submit a form, managers approve with one tap, and everyone can see who is away.',
    features: ['Request form with dates & type', 'Manager-only approve / reject', 'Live "on leave today" count'],
    tools: ['ILMUchat', 'ILMUcode'],
    Before: ChatBefore,
    After: LeaveAfter,
  },
  {
    key: 'report',
    icon: FileSpreadsheet,
    tab: 'Monthly report',
    title: 'Compiling 12 spreadsheets into one report',
    problem:
      'Every month, 12 districts email their own Excel file. Someone spends two days merging them, fixing #REF! errors and rebuilding charts.',
    solution:
      'A report dashboard that merges uploaded files, flags missing numbers and exports a ready-to-send PDF in one click.',
    features: ['Upload & merge district files', 'Highlights missing or broken cells', 'One-click PDF export'],
    tools: ['ILMUcode', 'Web app'],
    Before: SheetBefore,
    After: ReportAfter,
  },
  {
    key: 'booking',
    icon: CalendarRange,
    tab: 'Room booking',
    title: 'Double-booked meeting rooms',
    problem:
      'Rooms and projectors are booked in a paper logbook at the front desk. Two meetings show up for the same room at 10am, again.',
    solution:
      'TempahBilik: a weekly booking calendar that blocks clashes and suggests the next free slot.',
    features: ['Week view of rooms & equipment', 'Clash detection before saving', 'Suggests the next free slot'],
    tools: ['ILMUchat', 'ILMUcode'],
    Before: PaperBefore,
    After: BookingAfter,
  },
  {
    key: 'enquiry',
    icon: MessagesSquare,
    tab: 'Public enquiries',
    title: '238 unread public enquiries',
    problem:
      'A shared inbox fills with complaints and status questions, some containing IC numbers. Urgent cases sink under "Re: Re: Fwd:".',
    solution:
      'A triage board that masks personal data first, then uses AI to summarise and sort each enquiry into Urgent, Status or General.',
    features: ['Masks IC numbers before AI (PDPA)', 'One-line AI summary per enquiry', 'Auto-sorted into lanes'],
    tools: ['ILMUchat', 'PDPA-safe'],
    Before: InboxBefore,
    After: TriageAfter,
  },
];

export default function Samples() {
  const [active, setActive] = useState(0);
  const s = SAMPLES[active];
  const { Before, After } = s;

  return (
    <section id="samples" className="py-24 lg:py-32">
      <Container>
        <SectionTitle
          eyebrow="Sample problems & solutions"
          title={
            <>
              Your daily headache is <span className="text-gradient">your project.</span>
            </>
          }
          lead="Not sure what to build? These are the kinds of internal tools participants ship in a single session. Pick one, or bring your own."
        />

        <div
          className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap"
          role="tablist"
          aria-label="Sample problems"
        >
          {SAMPLES.map((x, i) => {
            const Icon = x.icon;
            return (
              <button
                key={x.key}
                role="tab"
                aria-selected={active === i}
                aria-controls="sample-panel"
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                  active === i
                    ? 'border-transparent bg-ink text-white shadow-soft'
                    : 'border-line bg-white text-ink hover:border-brand/40'
                }`}
              >
                <Icon size={16} className={active === i ? 'text-[#c9a8ff]' : 'text-brand'} />
                {x.tab}
              </button>
            );
          })}
        </div>

        <div
          id="sample-panel"
          role="tabpanel"
          key={s.key}
          className="mt-8 grid gap-10 rounded-[32px] bg-mist p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-12"
        >
          <div className="rise-in">
            <p className="font-mono text-xs text-muted">Sample 0{active + 1} / 0{SAMPLES.length}</p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">{s.title}</h3>

            <div className="mt-6 rounded-2xl border border-rose/15 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-rose">The problem</p>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{s.problem}</p>
            </div>
            <div className="mx-auto my-2 grid size-8 place-items-center rounded-full bg-white text-brand shadow-soft">
              <ArrowDown size={16} />
            </div>
            <div className="rounded-2xl border border-brand/15 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">What you ship</p>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{s.solution}</p>
              <ul className="mt-4 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#16a37a]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <ToolTag key={t} name={t} />
                ))}
              </div>
            </div>
          </div>

          <div className="rise-in relative" style={{ animationDelay: '0.1s' }}>
            <div className="relative z-0 max-w-[78%] -rotate-2 opacity-95 sm:max-w-[62%]">
              <span className="mb-2 inline-block rounded-full bg-rose px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Before
              </span>
              <Before />
            </div>
            <div className="relative z-10 -mt-6 ml-auto sm:-mt-14 sm:w-[86%]">
              <span className="mb-2 inline-block rounded-full bg-[#16a37a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                After · built in one session
              </span>
              <After />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Lead funnel event tracking via localStorage

export type FunnelStep = 'page_view' | 'form_start' | 'step_1_credit_score' | 'step_2_credit_limits' | 'step_3_capital_needed' | 'step_4_contact_info' | 'submitted';

export interface LeadEvent {
  id: string;
  step: FunnelStep;
  value?: string;
  timestamp: string;
  sessionId: string;
}

const STORAGE_KEY = 'ascend_lead_events';

function getSessionId(): string {
  let sid = sessionStorage.getItem('ascend_session');
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem('ascend_session', sid);
  }
  return sid;
}

export function trackEvent(step: FunnelStep, value?: string) {
  const event: LeadEvent = {
    id: crypto.randomUUID(),
    step,
    value,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };
  const events = getEvents();
  events.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getEvents(): LeadEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearEvents() {
  localStorage.removeItem(STORAGE_KEY);
}

// Seed demo data for the dashboard
export function seedDemoData() {
  const existing = getEvents();
  if (existing.length > 50) return; // already seeded

  const steps: FunnelStep[] = ['page_view', 'form_start', 'step_1_credit_score', 'step_2_credit_limits', 'step_3_capital_needed', 'step_4_contact_info', 'submitted'];
  const dropRates = [1, 0.72, 0.58, 0.41, 0.30, 0.22, 0.15];

  const events: LeadEvent[] = [];
  const now = new Date();

  // Generate 6 months of data
  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const baseDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const daysInMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dailyVisitors = Math.floor(Math.random() * 30) + 15;

      for (let v = 0; v < dailyVisitors; v++) {
        const sessionId = crypto.randomUUID();
        const hour = Math.floor(Math.random() * 14) + 8;
        const minute = Math.floor(Math.random() * 60);

        // Each visitor progresses through funnel with drop-off
        for (let s = 0; s < steps.length; s++) {
          if (Math.random() > dropRates[s]) break;

          events.push({
            id: crypto.randomUUID(),
            step: steps[s],
            timestamp: new Date(baseDate.getFullYear(), baseDate.getMonth(), day, hour, minute + s).toISOString(),
            sessionId,
          });
        }
      }
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, ...events]));
}

// Analytics helpers
export interface FunnelMetrics {
  step: FunnelStep;
  label: string;
  count: number;
  dropOff: number;
  dropOffPercent: number;
  conversionFromPrev: number;
}

const STEP_LABELS: Record<FunnelStep, string> = {
  page_view: 'Page Visit',
  form_start: 'Started Form',
  step_1_credit_score: 'Credit Score',
  step_2_credit_limits: 'Credit Limits',
  step_3_capital_needed: 'Capital Needed',
  step_4_contact_info: 'Contact Info',
  submitted: 'Submitted',
};

export function getFunnelMetrics(events: LeadEvent[]): FunnelMetrics[] {
  const steps: FunnelStep[] = ['page_view', 'form_start', 'step_1_credit_score', 'step_2_credit_limits', 'step_3_capital_needed', 'step_4_contact_info', 'submitted'];

  // Count unique sessions per step
  const sessionsByStep = new Map<FunnelStep, Set<string>>();
  steps.forEach(s => sessionsByStep.set(s, new Set()));

  events.forEach(e => {
    sessionsByStep.get(e.step)?.add(e.sessionId);
  });

  return steps.map((step, i) => {
    const count = sessionsByStep.get(step)?.size || 0;
    const prevCount = i > 0 ? (sessionsByStep.get(steps[i - 1])?.size || 0) : count;
    const dropOff = prevCount - count;
    const dropOffPercent = prevCount > 0 ? (dropOff / prevCount) * 100 : 0;
    const conversionFromPrev = prevCount > 0 ? (count / prevCount) * 100 : 100;

    return {
      step,
      label: STEP_LABELS[step],
      count,
      dropOff: i === 0 ? 0 : dropOff,
      dropOffPercent: i === 0 ? 0 : dropOffPercent,
      conversionFromPrev: i === 0 ? 100 : conversionFromPrev,
    };
  });
}

export function filterEventsByDate(events: LeadEvent[], start: Date, end: Date): LeadEvent[] {
  return events.filter(e => {
    const d = new Date(e.timestamp);
    return d >= start && d <= end;
  });
}

export function getDailyTrend(events: LeadEvent[]): { date: string; leads: number; submissions: number }[] {
  const dayMap = new Map<string, { leads: Set<string>; submissions: Set<string> }>();

  events.forEach(e => {
    const day = e.timestamp.slice(0, 10);
    if (!dayMap.has(day)) dayMap.set(day, { leads: new Set(), submissions: new Set() });
    const entry = dayMap.get(day)!;
    if (e.step === 'page_view') entry.leads.add(e.sessionId);
    if (e.step === 'submitted') entry.submissions.add(e.sessionId);
  });

  return Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      leads: data.leads.size,
      submissions: data.submissions.size,
    }));
}

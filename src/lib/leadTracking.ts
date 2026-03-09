// Lead funnel event tracking via localStorage

export type FunnelStep = 'page_view' | 'form_start' | 'step_1_credit_score' | 'step_2_credit_limits' | 'step_3_capital_needed' | 'step_4_contact_info' | 'submitted';

export interface LeadEvent {
  id: string;
  step: FunnelStep;
  value?: string;
  page?: string;
  timestamp: string;
  sessionId: string;
}

const STORAGE_KEY = 'ascend_lead_events';
const PAGE_VIEWS_KEY = 'ascend_page_views';

export interface PageView {
  id: string;
  page: string;
  timestamp: string;
  sessionId: string;
}

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
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };
  const events = getEvents();
  events.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function trackPageView(page?: string) {
  const pv: PageView = {
    id: crypto.randomUUID(),
    page: page || window.location.pathname,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };
  const views = getPageViews();
  views.push(pv);
  localStorage.setItem(PAGE_VIEWS_KEY, JSON.stringify(views));
}

export function getPageViews(): PageView[] {
  try {
    return JSON.parse(localStorage.getItem(PAGE_VIEWS_KEY) || '[]');
  } catch {
    return [];
  }
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
  localStorage.removeItem(PAGE_VIEWS_KEY);
}

// Page labels for display
const PAGE_LABELS: Record<string, string> = {
  '/': 'Home Page',
  '/book': 'Qualification Form',
  '/book-call': 'Book a Call',
  '/thank-you': 'Thank You',
};

export function getPageLabel(path: string): string {
  return PAGE_LABELS[path] || path;
}

// Seed demo data for the dashboard
export function seedDemoData() {
  const existing = getEvents();
  if (existing.length > 50) return; // already seeded

  const steps: FunnelStep[] = ['page_view', 'form_start', 'step_1_credit_score', 'step_2_credit_limits', 'step_3_capital_needed', 'step_4_contact_info', 'submitted'];
  const dropRates = [1, 0.72, 0.58, 0.41, 0.30, 0.22, 0.15];
  const pages = ['/', '/book', '/book-call', '/thank-you'];
  const pageWeights = [1, 0.65, 0.35, 0.15]; // relative traffic

  const events: LeadEvent[] = [];
  const pageViews: PageView[] = [];
  const now = new Date();

  // Generate 6 months of data
  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const baseDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const daysInMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new Date(baseDate.getFullYear(), baseDate.getMonth(), day).getDay();
      // More traffic on weekdays
      const weekdayMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1;
      const dailyVisitors = Math.floor((Math.random() * 30 + 15) * weekdayMultiplier);

      for (let v = 0; v < dailyVisitors; v++) {
        const sessionId = crypto.randomUUID();
        // Concentrate hours in business hours with some evening traffic
        const hourWeights = [0,0,0,0,0,0.02,0.03,0.05,0.08,0.12,0.14,0.12,0.10,0.08,0.07,0.05,0.04,0.03,0.03,0.02,0.01,0.01,0,0];
        let hour = 9;
        const r = Math.random();
        let cum = 0;
        for (let h = 0; h < 24; h++) {
          cum += hourWeights[h];
          if (r <= cum) { hour = h; break; }
        }
        const minute = Math.floor(Math.random() * 60);

        // Track page views - each visitor views some pages
        for (let p = 0; p < pages.length; p++) {
          if (Math.random() <= pageWeights[p]) {
            pageViews.push({
              id: crypto.randomUUID(),
              page: pages[p],
              timestamp: new Date(baseDate.getFullYear(), baseDate.getMonth(), day, hour, minute + p).toISOString(),
              sessionId,
            });
          }
        }

        // Each visitor progresses through funnel with drop-off
        for (let s = 0; s < steps.length; s++) {
          if (Math.random() > dropRates[s]) break;

          events.push({
            id: crypto.randomUUID(),
            step: steps[s],
            page: s === 0 ? '/' : s < 5 ? '/book' : s === 5 ? '/book-call' : '/thank-you',
            timestamp: new Date(baseDate.getFullYear(), baseDate.getMonth(), day, hour, minute + s).toISOString(),
            sessionId,
          });
        }
      }
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, ...events]));
  
  const existingPV = getPageViews();
  if (existingPV.length < 50) {
    localStorage.setItem(PAGE_VIEWS_KEY, JSON.stringify([...existingPV, ...pageViews]));
  }
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

export function filterPageViewsByDate(views: PageView[], start: Date, end: Date): PageView[] {
  return views.filter(v => {
    const d = new Date(v.timestamp);
    return d >= start && d <= end;
  });
}

export interface PageMetrics {
  page: string;
  label: string;
  uniqueVisitors: number;
  totalViews: number;
}

export function getPageMetrics(views: PageView[]): PageMetrics[] {
  const pageMap = new Map<string, { sessions: Set<string>; total: number }>();

  views.forEach(v => {
    if (!pageMap.has(v.page)) pageMap.set(v.page, { sessions: new Set(), total: 0 });
    const entry = pageMap.get(v.page)!;
    entry.sessions.add(v.sessionId);
    entry.total++;
  });

  return Array.from(pageMap.entries())
    .map(([page, data]) => ({
      page,
      label: getPageLabel(page),
      uniqueVisitors: data.sessions.size,
      totalViews: data.total,
    }))
    .sort((a, b) => b.uniqueVisitors - a.uniqueVisitors);
}

export interface HeatmapCell {
  day: number; // 0=Sun, 6=Sat
  hour: number; // 0-23
  count: number;
}

export function getHeatmapData(views: PageView[]): HeatmapCell[] {
  const grid = new Map<string, number>();

  // Initialize all cells
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      grid.set(`${d}-${h}`, 0);
    }
  }

  views.forEach(v => {
    const date = new Date(v.timestamp);
    const key = `${date.getDay()}-${date.getHours()}`;
    grid.set(key, (grid.get(key) || 0) + 1);
  });

  return Array.from(grid.entries()).map(([key, count]) => {
    const [day, hour] = key.split('-').map(Number);
    return { day, hour, count };
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

export type FunnelGrouping = 'day' | 'week' | 'month';

export interface FunnelTimeSeries {
  period: string;
  page_view: number;
  form_start: number;
  step_1_credit_score: number;
  step_2_credit_limits: number;
  step_3_capital_needed: number;
  step_4_contact_info: number;
  submitted: number;
}

function getWeekKey(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // start of week (Sunday)
  return d.toISOString().slice(0, 10);
}

export function getFunnelTimeSeries(events: LeadEvent[], grouping: FunnelGrouping): FunnelTimeSeries[] {
  const steps: FunnelStep[] = ['page_view', 'form_start', 'step_1_credit_score', 'step_2_credit_limits', 'step_3_capital_needed', 'step_4_contact_info', 'submitted'];

  // Group events by period, then count unique sessions per step
  const periodMap = new Map<string, Map<FunnelStep, Set<string>>>();

  events.forEach(e => {
    const date = new Date(e.timestamp);
    let key: string;
    if (grouping === 'day') {
      key = e.timestamp.slice(0, 10);
    } else if (grouping === 'week') {
      key = getWeekKey(date);
    } else {
      key = e.timestamp.slice(0, 7); // YYYY-MM
    }

    if (!periodMap.has(key)) {
      const stepMap = new Map<FunnelStep, Set<string>>();
      steps.forEach(s => stepMap.set(s, new Set()));
      periodMap.set(key, stepMap);
    }
    periodMap.get(key)!.get(e.step)?.add(e.sessionId);
  });

  return Array.from(periodMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([period, stepMap]) => ({
      period,
      page_view: stepMap.get('page_view')?.size || 0,
      form_start: stepMap.get('form_start')?.size || 0,
      step_1_credit_score: stepMap.get('step_1_credit_score')?.size || 0,
      step_2_credit_limits: stepMap.get('step_2_credit_limits')?.size || 0,
      step_3_capital_needed: stepMap.get('step_3_capital_needed')?.size || 0,
      step_4_contact_info: stepMap.get('step_4_contact_info')?.size || 0,
      submitted: stepMap.get('submitted')?.size || 0,
    }));
}

import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, Legend, LineChart, Line
} from "recharts";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfDay, endOfDay, startOfWeek, endOfWeek, subDays, subWeeks, subMonths as subMonthsFn } from "date-fns";
import { ArrowLeft, Printer, TrendingDown, Users, Target, AlertTriangle, Calendar, BarChart3, LogOut, Eye, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  getEvents, getFunnelMetrics, filterEventsByDate, getDailyTrend,
  seedDemoData, getPageViews, filterPageViewsByDate, getPageMetrics, getHeatmapData,
  getFunnelTimeSeries, clearEvents,
  type LeadEvent, type FunnelMetrics, type PageView, type FunnelGrouping
} from "@/lib/leadTracking";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";

type DateRange = 'today' | 'last7' | 'last30' | 'month' | 'year' | 'all';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getHeatmapColor(value: number, max: number): string {
  if (max === 0 || value === 0) return 'hsl(var(--muted) / 0.3)';
  const ratio = value / max;
  // Green (120) → Yellow (60) → Red (0)
  const hue = 120 - (ratio * 120);
  const saturation = 50 + ratio * 30;
  const lightness = 45 - ratio * 10;
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

const Dashboard = () => {
  const [allEvents, setAllEvents] = useState<LeadEvent[]>([]);
  const [allPageViews, setAllPageViews] = useState<PageView[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>('last30');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [funnelGrouping, setFunnelGrouping] = useState<FunnelGrouping>('day');
  const [funnelViewMode, setFunnelViewMode] = useState<'all' | 'day' | 'week' | 'month'>('all');
  const [funnelPeriodIndex, setFunnelPeriodIndex] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  useEffect(() => {
    seedDemoData();
    setAllEvents(getEvents());
    setAllPageViews(getPageViews());
  }, []);

  const getDateRange = useMemo(() => {
    const now = new Date();
    switch (dateRange) {
      case 'today':
        return { start: startOfDay(now), end: endOfDay(now) };
      case 'last7':
        return { start: startOfDay(new Date(now.getTime() - 7 * 86400000)), end: endOfDay(now) };
      case 'last30':
        return { start: startOfDay(new Date(now.getTime() - 30 * 86400000)), end: endOfDay(now) };
      case 'month': {
        const monthIdx = selectedMonth ? MONTHS.indexOf(selectedMonth) : now.getMonth();
        const yr = parseInt(selectedYear) || now.getFullYear();
        const d = new Date(yr, monthIdx, 1);
        return { start: startOfMonth(d), end: endOfMonth(d) };
      }
      case 'year': {
        const y = parseInt(selectedYear) || now.getFullYear();
        return { start: startOfYear(new Date(y, 0, 1)), end: endOfYear(new Date(y, 0, 1)) };
      }
      case 'all':
      default:
        return null;
    }
  }, [dateRange, selectedMonth, selectedYear]);

  const filteredEvents = useMemo(() => {
    if (!getDateRange) return allEvents;
    return filterEventsByDate(allEvents, getDateRange.start, getDateRange.end);
  }, [allEvents, getDateRange]);

  const filteredPageViews = useMemo(() => {
    if (!getDateRange) return allPageViews;
    return filterPageViewsByDate(allPageViews, getDateRange.start, getDateRange.end);
  }, [allPageViews, getDateRange]);

  // Available periods for funnel sub-filtering
  const funnelPeriods = useMemo(() => {
    if (funnelViewMode === 'all') return [];
    const periods: { label: string; start: Date; end: Date }[] = [];
    const now = new Date();
    if (funnelViewMode === 'day') {
      for (let i = 0; i < 30; i++) {
        const d = subDays(now, i);
        periods.push({ label: format(d, 'MMM d, yyyy'), start: startOfDay(d), end: endOfDay(d) });
      }
    } else if (funnelViewMode === 'week') {
      for (let i = 0; i < 12; i++) {
        const d = subWeeks(now, i);
        const ws = startOfWeek(d);
        const we = endOfWeek(d);
        periods.push({ label: `${format(ws, 'MMM d')} – ${format(we, 'MMM d')}`, start: ws, end: we });
      }
    } else if (funnelViewMode === 'month') {
      for (let i = 0; i < 12; i++) {
        const d = subMonthsFn(now, i);
        periods.push({ label: format(d, 'MMMM yyyy'), start: startOfMonth(d), end: endOfMonth(d) });
      }
    }
    return periods;
  }, [funnelViewMode]);

  // Reset period index when mode changes
  useEffect(() => { setFunnelPeriodIndex(0); }, [funnelViewMode]);

  const funnelEvents = useMemo(() => {
    if (funnelViewMode === 'all') return filteredEvents;
    const period = funnelPeriods[funnelPeriodIndex];
    if (!period) return filteredEvents;
    return filterEventsByDate(allEvents, period.start, period.end);
  }, [filteredEvents, allEvents, funnelViewMode, funnelPeriods, funnelPeriodIndex]);

  const funnel = useMemo(() => getFunnelMetrics(funnelEvents), [funnelEvents]);
  const trend = useMemo(() => getDailyTrend(filteredEvents), [filteredEvents]);
  const pageMetrics = useMemo(() => getPageMetrics(filteredPageViews), [filteredPageViews]);
  const heatmapData = useMemo(() => getHeatmapData(filteredPageViews), [filteredPageViews]);
  const funnelTimeSeries = useMemo(() => getFunnelTimeSeries(filteredEvents, funnelGrouping), [filteredEvents, funnelGrouping]);

  const heatmapMax = useMemo(() => Math.max(...heatmapData.map(c => c.count), 1), [heatmapData]);

  const worstDropOff = useMemo(() => {
    const droppable = funnel.filter(f => f.dropOffPercent > 0);
    return droppable.sort((a, b) => b.dropOffPercent - a.dropOffPercent)[0];
  }, [funnel]);

  const totalVisitors = funnel[0]?.count || 0;
  const totalSubmissions = funnel[funnel.length - 1]?.count || 0;
  const overallConversion = totalVisitors > 0 ? ((totalSubmissions / totalVisitors) * 100).toFixed(1) : '0';

  const handlePrint = () => {
    window.print();
  };

  const funnelBarData = funnel.map((f, i) => ({
    name: f.label,
    visitors: f.count,
    fill: i === 0 ? 'hsl(45 100% 44%)' :
          f.dropOffPercent > 30 ? 'hsl(0 70% 55%)' :
          f.dropOffPercent > 15 ? 'hsl(35 90% 50%)' :
          'hsl(45 100% 44%)',
  }));

  const rangeLabel = useMemo(() => {
    switch (dateRange) {
      case 'today': return 'Today';
      case 'last7': return 'Last 7 Days';
      case 'last30': return 'Last 30 Days';
      case 'month': return `${selectedMonth || MONTHS[new Date().getMonth()]} ${selectedYear}`;
      case 'year': return `Year ${selectedYear}`;
      case 'all': return 'All Time';
      default: return '';
    }
  }, [dateRange, selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 print:static print:border-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Ascend Solutions" className="h-8 w-8" />
              <span className="font-bold text-lg hidden sm:block" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Ascend Solutions
              </span>
            </Link>
            <span className="text-muted-foreground text-sm hidden sm:block">/ Lead Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground print:hidden">
                <ArrowLeft size={16} className="mr-1" /> Back to Site
              </Button>
            </Link>
            <Button onClick={handlePrint} variant="outline" size="sm" className="print:hidden">
              <Printer size={16} className="mr-1" /> Print Report
            </Button>
            <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-muted-foreground print:hidden">
              <LogOut size={16} className="mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div ref={printRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Title + Date Filters */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Lead Funnel <span className="gold-text">Analytics</span>
            </h1>
            <p className="text-muted-foreground mt-1">Track where leads drop off to optimize conversions</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <Tabs value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="today" className="text-xs">Today</TabsTrigger>
                <TabsTrigger value="last7" className="text-xs">7D</TabsTrigger>
                <TabsTrigger value="last30" className="text-xs">30D</TabsTrigger>
                <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              </TabsList>
            </Tabs>

            {dateRange === 'month' && (
              <Select value={selectedMonth || MONTHS[new Date().getMonth()]} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-36 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {(dateRange === 'month' || dateRange === 'year') && (
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026].map(y => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Print header */}
        <div className="hidden print:block mb-6">
          <p className="text-sm text-muted-foreground">
            Report Period: {rangeLabel} · Generated: {format(new Date(), 'PPP p')}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            icon={<Users size={20} />}
            label="Total Visitors"
            value={totalVisitors.toLocaleString()}
            color="hsl(45 100% 44%)"
          />
          <KPICard
            icon={<Target size={20} />}
            label="Submissions"
            value={totalSubmissions.toLocaleString()}
            color="hsl(142 70% 45%)"
          />
          <KPICard
            icon={<BarChart3 size={20} />}
            label="Conversion Rate"
            value={`${overallConversion}%`}
            color="hsl(210 80% 55%)"
          />
          <KPICard
            icon={<AlertTriangle size={20} />}
            label="Biggest Drop-off"
            value={worstDropOff ? `${worstDropOff.dropOffPercent.toFixed(0)}%` : '—'}
            subtitle={worstDropOff?.label}
            color="hsl(0 70% 55%)"
          />
        </div>

        {/* Page-Level Unique Visitors */}
        <Card className="mb-8 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              Unique Visitors by Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {pageMetrics.map((pm, i) => {
                const maxVisitors = pageMetrics[0]?.uniqueVisitors || 1;
                const widthPercent = Math.max((pm.uniqueVisitors / maxVisitors) * 100, 8);
                return (
                  <motion.div
                    key={pm.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-36 sm:w-44 text-right text-xs sm:text-sm text-muted-foreground shrink-0 truncate">
                      {pm.label}
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="h-10 rounded-md flex items-center justify-between px-3 text-xs font-bold transition-all"
                        style={{
                          width: `${widthPercent}%`,
                          background: `linear-gradient(90deg, hsl(45 100% 44% / ${1 - i * 0.15}), hsl(38 90% 50% / ${1 - i * 0.15}))`,
                          color: 'hsl(0 0% 100%)',
                          minWidth: '120px',
                        }}
                      >
                        <span>{pm.uniqueVisitors.toLocaleString()} unique</span>
                        <span className="opacity-70 text-[10px]">{pm.totalViews.toLocaleString()} total</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {pageMetrics.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">No page view data for this period</p>
            )}
          </CardContent>
        </Card>

        {/* Heatmap: Page Views by Day & Hour */}
        <Card className="mb-8 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye size={18} className="text-primary" />
              Traffic Heatmap — Day of Week & Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Hour labels */}
                <div className="flex items-center mb-1">
                  <div className="w-12 shrink-0" />
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="flex-1 text-center text-[10px] text-muted-foreground font-medium">
                      {h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`}
                    </div>
                  ))}
                </div>

                {/* Heatmap grid */}
                {DAYS_SHORT.map((dayLabel, dayIdx) => (
                  <div key={dayIdx} className="flex items-center gap-0 mb-[2px]">
                    <div className="w-12 shrink-0 text-xs text-muted-foreground font-medium text-right pr-2">
                      {dayLabel}
                    </div>
                    {Array.from({ length: 24 }, (_, h) => {
                      const cell = heatmapData.find(c => c.day === dayIdx && c.hour === h);
                      const count = cell?.count || 0;
                      return (
                        <div
                          key={h}
                          className="flex-1 aspect-square rounded-[3px] mx-[1px] cursor-default transition-transform hover:scale-125 hover:z-10 relative group"
                          style={{
                            backgroundColor: getHeatmapColor(count, heatmapMax),
                            minHeight: '20px',
                          }}
                        >
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                            <div className="bg-card border border-border rounded-md px-2 py-1 shadow-lg text-xs whitespace-nowrap">
                              <span className="font-semibold">{count}</span>
                              <span className="text-muted-foreground"> views</span>
                              <div className="text-muted-foreground text-[10px]">
                                {dayLabel} {h === 0 ? '12:00 AM' : h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h - 12}:00 PM`}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-xs text-muted-foreground">Less</span>
                  <div className="flex gap-[2px]">
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio) => (
                      <div
                        key={ratio}
                        className="w-4 h-4 rounded-[2px]"
                        style={{ backgroundColor: ratio === 0 ? 'hsl(var(--muted) / 0.3)' : getHeatmapColor(ratio * heatmapMax, heatmapMax) }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">More</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Visualization */}
        <Card className="mb-8 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown size={18} className="text-primary" />
                Funnel Drop-off Analysis
              </CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Tabs value={funnelViewMode} onValueChange={(v) => setFunnelViewMode(v as 'all' | 'day' | 'week' | 'month')}>
                  <TabsList className="bg-secondary/50 h-8">
                    <TabsTrigger value="all" className="text-xs px-3 h-6">All</TabsTrigger>
                    <TabsTrigger value="day" className="text-xs px-3 h-6">Day</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-3 h-6">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-3 h-6">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
                {funnelViewMode !== 'all' && funnelPeriods.length > 0 && (
                  <Select value={funnelPeriodIndex.toString()} onValueChange={(v) => setFunnelPeriodIndex(parseInt(v))}>
                    <SelectTrigger className="w-48 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {funnelPeriods.map((p, i) => (
                        <SelectItem key={i} value={i.toString()}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Visual funnel */}
            <div className="grid gap-2 mb-8">
              {funnel.map((f, i) => {
                const widthPercent = totalVisitors > 0
                  ? Math.max((f.count / totalVisitors) * 100, 8)
                  : 100;
                const isWorst = worstDropOff?.step === f.step;

                return (
                  <motion.div
                    key={f.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-28 sm:w-36 text-right text-xs sm:text-sm text-muted-foreground shrink-0 truncate">
                      {f.label}
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="h-9 rounded-md flex items-center px-3 text-xs font-bold transition-all"
                        style={{
                          width: `${widthPercent}%`,
                          background: isWorst
                            ? 'linear-gradient(90deg, hsl(0 70% 55%), hsl(0 60% 45%))'
                            : `linear-gradient(90deg, hsl(45 100% 44% / ${1 - i * 0.1}), hsl(38 90% 50% / ${1 - i * 0.1}))`,
                          color: 'hsl(0 0% 100%)',
                        }}
                      >
                        {f.count.toLocaleString()}
                      </div>
                      {i > 0 && f.dropOffPercent > 0 && (
                        <span className={`absolute right-0 top-1/2 -translate-y-1/2 text-xs font-medium ${
                          isWorst ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          -{f.dropOffPercent.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bar chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelBarData} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    angle={-35}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="visitors" radius={[6, 6, 0, 0]}>
                    {funnelBarData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Over Time */}
        <Card className="mb-8 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown size={18} className="text-primary" />
                Funnel Over Time
              </CardTitle>
              <Tabs value={funnelGrouping} onValueChange={(v) => setFunnelGrouping(v as FunnelGrouping)}>
                <TabsList className="bg-secondary/50 h-8">
                  <TabsTrigger value="day" className="text-xs px-3 h-6">Day</TabsTrigger>
                  <TabsTrigger value="week" className="text-xs px-3 h-6">Week</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs px-3 h-6">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={funnelTimeSeries} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(v) => {
                      try {
                        if (funnelGrouping === 'month') return format(new Date(v + '-01'), 'MMM yy');
                        return format(new Date(v), 'MMM d');
                      } catch { return v; }
                    }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    labelFormatter={(v) => {
                      try {
                        if (funnelGrouping === 'month') return format(new Date(v + '-01'), 'MMMM yyyy');
                        if (funnelGrouping === 'week') return `Week of ${format(new Date(v), 'MMM d, yyyy')}`;
                        return format(new Date(v), 'PPP');
                      } catch { return v; }
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="page_view" stroke="hsl(45 100% 44%)" strokeWidth={2} dot={false} name="Page Visits" />
                  <Line type="monotone" dataKey="form_start" stroke="hsl(210 80% 55%)" strokeWidth={2} dot={false} name="Started Form" />
                  <Line type="monotone" dataKey="step_1_credit_score" stroke="hsl(280 70% 55%)" strokeWidth={1.5} dot={false} name="Credit Score" />
                  <Line type="monotone" dataKey="step_2_credit_limits" stroke="hsl(330 70% 55%)" strokeWidth={1.5} dot={false} name="Credit Limits" />
                  <Line type="monotone" dataKey="step_3_capital_needed" stroke="hsl(20 80% 55%)" strokeWidth={1.5} dot={false} name="Capital Needed" />
                  <Line type="monotone" dataKey="step_4_contact_info" stroke="hsl(180 60% 45%)" strokeWidth={1.5} dot={false} name="Contact Info" />
                  <Line type="monotone" dataKey="submitted" stroke="hsl(142 70% 45%)" strokeWidth={2} dot={false} name="Submitted" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              Daily Lead Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(45 100% 44%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(45 100% 44%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(142 70% 45%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(142 70% 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(v) => {
                      try { return format(new Date(v), 'MMM d'); } catch { return v; }
                    }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '13px',
                    }}
                    labelFormatter={(v) => {
                      try { return format(new Date(v), 'PPP'); } catch { return v; }
                    }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="hsl(45 100% 44%)" fill="url(#goldGradient)" strokeWidth={2} name="Page Visits" />
                  <Area type="monotone" dataKey="submissions" stroke="hsl(142 70% 45%)" fill="url(#greenGradient)" strokeWidth={2} name="Submissions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card className="border-border/50 shadow-sm mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Step-by-Step Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Step</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Visitors</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Drop-off</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Drop %</th>
                    <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {funnel.map((f, i) => {
                    const isWorst = worstDropOff?.step === f.step;
                    return (
                      <tr
                        key={f.step}
                        className={`border-b border-border/50 ${isWorst ? 'bg-destructive/5' : ''}`}
                      >
                        <td className="py-3 px-2 font-medium flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: isWorst ? 'hsl(0 70% 55%)' : 'hsl(45 100% 44%)',
                              color: 'white'
                            }}
                          >
                            {i + 1}
                          </span>
                          {f.label}
                          {isWorst && <AlertTriangle size={14} className="text-destructive" />}
                        </td>
                        <td className="py-3 px-2 text-right font-mono">{f.count.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right font-mono text-muted-foreground">
                          {i === 0 ? '—' : `-${f.dropOff.toLocaleString()}`}
                        </td>
                        <td className={`py-3 px-2 text-right font-mono font-semibold ${
                          isWorst ? 'text-destructive' : f.dropOffPercent > 20 ? 'text-orange-500' : 'text-muted-foreground'
                        }`}>
                          {i === 0 ? '—' : `${f.dropOffPercent.toFixed(1)}%`}
                        </td>
                        <td className="py-3 px-2 text-right font-mono">
                          {i === 0 ? '100%' : `${f.conversionFromPrev.toFixed(1)}%`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground py-4 print:mt-8">
          <p>Ascend Solutions Lead Analytics · {rangeLabel} · Generated {format(new Date(), 'PPP')}</p>
        </div>
      </div>
    </div>
  );
};

function KPICard({ icon, label, value, subtitle, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</span>
            <div className="p-1.5 rounded-md" style={{ background: `${color}20`, color }}>
              {icon}
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Dashboard;

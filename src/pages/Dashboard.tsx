import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell
} from "recharts";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, startOfDay, endOfDay } from "date-fns";
import { ArrowLeft, Printer, TrendingDown, Users, Target, AlertTriangle, Calendar, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  getEvents, getFunnelMetrics, filterEventsByDate, getDailyTrend,
  seedDemoData, type LeadEvent, type FunnelMetrics
} from "@/lib/leadTracking";
import logo from "@/assets/logo.png";

type DateRange = 'today' | 'last7' | 'last30' | 'month' | 'year' | 'all';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Dashboard = () => {
  const [allEvents, setAllEvents] = useState<LeadEvent[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>('last30');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    seedDemoData();
    setAllEvents(getEvents());
  }, []);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    let start: Date, end: Date;

    switch (dateRange) {
      case 'today':
        start = startOfDay(now);
        end = endOfDay(now);
        break;
      case 'last7':
        start = startOfDay(new Date(now.getTime() - 7 * 86400000));
        end = endOfDay(now);
        break;
      case 'last30':
        start = startOfDay(new Date(now.getTime() - 30 * 86400000));
        end = endOfDay(now);
        break;
      case 'month':
        const monthIdx = selectedMonth ? MONTHS.indexOf(selectedMonth) : now.getMonth();
        const yr = parseInt(selectedYear) || now.getFullYear();
        const d = new Date(yr, monthIdx, 1);
        start = startOfMonth(d);
        end = endOfMonth(d);
        break;
      case 'year':
        const y = parseInt(selectedYear) || now.getFullYear();
        start = startOfYear(new Date(y, 0, 1));
        end = endOfYear(new Date(y, 0, 1));
        break;
      case 'all':
      default:
        return allEvents;
    }

    return filterEventsByDate(allEvents, start, end);
  }, [allEvents, dateRange, selectedMonth, selectedYear]);

  const funnel = useMemo(() => getFunnelMetrics(filteredEvents), [filteredEvents]);
  const trend = useMemo(() => getDailyTrend(filteredEvents), [filteredEvents]);

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

        {/* Funnel Visualization */}
        <Card className="mb-8 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown size={18} className="text-primary" />
              Funnel Drop-off Analysis
            </CardTitle>
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

        {/* Trend Chart */}
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

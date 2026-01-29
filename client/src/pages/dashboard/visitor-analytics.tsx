import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Globe, MapPin, Download, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const VISITOR_DATA = [
  { month: "Jan", lokal: 185000, mancanegara: 12000, total: 197000 },
  { month: "Feb", lokal: 192000, mancanegara: 14500, total: 206500 },
  { month: "Mar", lokal: 178000, mancanegara: 11000, total: 189000 },
  { month: "Apr", lokal: 210000, mancanegara: 18000, total: 228000 },
  { month: "Mei", lokal: 245000, mancanegara: 22000, total: 267000 },
  { month: "Jun", lokal: 280000, mancanegara: 35000, total: 315000 },
  { month: "Jul", lokal: 320000, mancanegara: 42000, total: 362000 },
  { month: "Ags", lokal: 295000, mancanegara: 38000, total: 333000 },
  { month: "Sep", lokal: 210000, mancanegara: 15000, total: 225000 },
  { month: "Okt", lokal: 195000, mancanegara: 13000, total: 208000 },
  { month: "Nov", lokal: 205000, mancanegara: 14000, total: 219000 },
  { month: "Des", lokal: 350000, mancanegara: 55000, total: 405000 },
];

const CATEGORY_DATA = [
  { name: "Wisata Alam", value: 45 },
  { name: "Wisata Buatan", value: 25 },
  { name: "Wisata Budaya", value: 15 },
  { name: "Kuliner", value: 10 },
  { name: "Lainnya", value: 5 },
];

const COLORS = ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function VisitorAnalyticsPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Mengekspor Laporan",
      description: "Laporan analisis kunjungan sedang diunduh.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Analitik Kunjungan Wisata</h1>
          <p className="text-muted-foreground">Dashboard statistik kunjungan wisatawan Kabupaten Bogor.</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Wisatawan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8M</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +15.2% vs 2024
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wisatawan Lokal</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.45M</div>
            <p className="text-xs text-muted-foreground mt-1">87.5% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wisatawan Mancanegara</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350K</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +22.4% peningkatan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Kunjungan/Bln</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">233K</div>
            <p className="text-xs text-muted-foreground mt-1">Wisatawan per bulan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tren Kunjungan Bulanan</CardTitle>
            <CardDescription>Perbandingan wisatawan lokal dan mancanegara selama 1 tahun.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VISITOR_DATA}>
                  <defs>
                    <linearGradient id="colorLokal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorManca" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}K`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="lokal" name="Wisatawan Lokal" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorLokal)" strokeWidth={2} />
                  <Area type="monotone" dataKey="mancanegara" name="Mancanegara" stroke="#22c55e" fillOpacity={1} fill="url(#colorManca)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribusi Kunjungan</CardTitle>
            <CardDescription>Berdasarkan kategori daya tarik wisata.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Destinasi Utama:</span>
                <span className="font-medium text-primary">Wisata Alam (45%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabel Rekapitulasi Kunjungan</CardTitle>
          <CardDescription>Data detail bulanan tahun 2025.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bulan</TableHead>
                <TableHead className="text-right">Wisatawan Lokal</TableHead>
                <TableHead className="text-right">Mancanegara</TableHead>
                <TableHead className="text-right">Total Kunjungan</TableHead>
                <TableHead className="text-right">Pertumbuhan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VISITOR_DATA.map((row, i) => (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right">{row.lokal.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.mancanegara.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-bold">{row.total.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {i === 0 ? "-" : `${(((row.total - VISITOR_DATA[i-1].total) / VISITOR_DATA[i-1].total) * 100).toFixed(1)}%`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

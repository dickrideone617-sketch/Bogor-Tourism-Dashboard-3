import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { name: "Jan", visitors: 4000, income: 2400 },
  { name: "Feb", visitors: 3000, income: 1398 },
  { name: "Mar", visitors: 2000, income: 9800 },
  { name: "Apr", visitors: 2780, income: 3908 },
  { name: "May", visitors: 1890, income: 4800 },
  { name: "Jun", visitors: 2390, income: 3800 },
  { name: "Jul", visitors: 3490, income: 4300 },
  { name: "Aug", visitors: 4200, income: 5400 },
  { name: "Sep", visitors: 3100, income: 3200 },
  { name: "Oct", visitors: 2800, income: 2900 },
  { name: "Nov", visitors: 3600, income: 4100 },
  { name: "Dec", visitors: 5100, income: 6200 },
];

export function VisitorChart() {
  return (
    <Card className="col-span-4 border-none shadow-sm">
      <CardHeader>
        <CardTitle>Statistik Kunjungan</CardTitle>
        <CardDescription>
          Data kunjungan wisatawan tahun 2025
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <Tabs defaultValue="visitors" className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <TabsList>
              <TabsTrigger value="visitors">Pengunjung</TabsTrigger>
              <TabsTrigger value="income">Pendapatan</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="visitors" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="hsl(155 45% 35%)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="income" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(155 45% 35%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(155 45% 35%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `Rp${value}k`} 
                />
                <Tooltip 
                  cursor={{ stroke: 'hsl(155 45% 35%)', strokeWidth: 1 }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(155 45% 35%)" 
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

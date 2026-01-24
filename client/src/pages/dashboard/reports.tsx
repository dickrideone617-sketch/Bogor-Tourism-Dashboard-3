import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const DATA_BY_KECAMATAN = [
  { name: 'Cibinong', kafe: 12, restoran: 8, warung: 20 },
  { name: 'Cisarua', kafe: 15, restoran: 25, warung: 10 },
  { name: 'Megamendung', kafe: 10, restoran: 18, warung: 15 },
  { name: 'Babakan Madang', kafe: 20, restoran: 10, warung: 5 },
  { name: 'Gunung Putri', kafe: 8, restoran: 12, warung: 30 },
  { name: 'Sukaraja', kafe: 14, restoran: 9, warung: 12 },
];

const DATA_STATUS = [
  { name: 'Aktif', value: 185 },
  { name: 'Tutup', value: 15 },
  { name: 'Musiman', value: 42 },
];

const DATA_SCALE = [
  { name: 'UMKM', value: 120 },
  { name: 'Menengah', value: 80 },
  { name: 'Besar', value: 42 },
];

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'];

export default function ReportsPage() {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Mengunduh Laporan",
      description: "Laporan rekapitulasi sedang diunduh dalam format PDF.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laporan & Statistik</h1>
          <p className="text-muted-foreground">
            Rekapitulasi data pariwisata dan ekonomi kreatif Kabupaten Bogor.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={handlePrint} className="gap-2">
             <Printer className="h-4 w-4" /> Cetak
           </Button>
           <Button onClick={handleDownloadPDF} className="gap-2">
             <Download className="h-4 w-4" /> Unduh PDF
           </Button>
        </div>
      </div>

      <Tabs defaultValue="culinary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="culinary">Cafe & Resto</TabsTrigger>
          <TabsTrigger value="spots">Objek Wisata</TabsTrigger>
          <TabsTrigger value="accommodations">Akomodasi</TabsTrigger>
        </TabsList>

        <TabsContent value="culinary" className="space-y-4">
          {/* Top Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usaha</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">242</div>
                <p className="text-xs text-muted-foreground">+20 bulan ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Kafe</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#0ea5e9]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">79</div>
                <p className="text-xs text-muted-foreground">32.6% dari total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Restoran</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#22c55e]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82</div>
                <p className="text-xs text-muted-foreground">33.8% dari total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Warung</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#f59e0b]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">81</div>
                <p className="text-xs text-muted-foreground">33.4% dari total</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Bar Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sebaran Usaha per Kecamatan</CardTitle>
                <CardDescription>
                  Jumlah Kafe, Restoran, dan Warung di 6 kecamatan terpadat.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_BY_KECAMATAN}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Legend />
                      <Bar dataKey="kafe" name="Kafe" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="restoran" name="Restoran" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="warung" name="Warung" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pie Charts Side Column */}
            <div className="col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Berdasarkan Status Usaha</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={DATA_STATUS}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {DATA_STATUS.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Berdasarkan Skala Usaha</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={DATA_SCALE}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {DATA_SCALE.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="spots">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Objek Wisata</CardTitle>
              <CardDescription>
                Statistik pengunjung dan okupansi objek wisata (Coming Soon).
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              Grafik Objek Wisata akan ditampilkan di sini.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accommodations">
           <Card>
            <CardHeader>
              <CardTitle>Laporan Akomodasi</CardTitle>
              <CardDescription>
                Statistik hunian hotel dan penginapan (Coming Soon).
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              Grafik Akomodasi akan ditampilkan di sini.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

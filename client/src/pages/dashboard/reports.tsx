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
import { Download, FileText, Printer, Mountain, Bed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock Data - Cafe & Resto
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

// Mock Data - Obyek Wisata (Spots)
const SPOTS_BY_KECAMATAN = [
  { name: 'Cisarua', alam: 15, buatan: 10, budaya: 2 },
  { name: 'Megamendung', alam: 12, buatan: 5, budaya: 1 },
  { name: 'Babakan Madang', alam: 8, buatan: 15, budaya: 0 },
  { name: 'Pamijahan', alam: 20, buatan: 2, budaya: 5 },
  { name: 'Tamansari', alam: 10, buatan: 5, budaya: 8 },
  { name: 'Cijeruk', alam: 14, buatan: 3, budaya: 2 },
];

const SPOTS_STATUS = [
  { name: 'Buka', value: 145 },
  { name: 'Tutup Sementara', value: 25 },
  { name: 'Renovasi', value: 10 },
];

const SPOTS_TYPE = [
  { name: 'Wisata Alam', value: 95 },
  { name: 'Wisata Buatan', value: 60 },
  { name: 'Wisata Budaya', value: 25 },
];

// Mock Data - Accommodations
const ACCOM_BY_KECAMATAN = [
  { name: 'Cisarua', hotel: 45, villa: 120, homestay: 30 },
  { name: 'Megamendung', hotel: 25, villa: 80, homestay: 15 },
  { name: 'Babakan Madang', hotel: 15, villa: 20, homestay: 5 },
  { name: 'Sukaraja', hotel: 10, villa: 5, homestay: 2 },
  { name: 'Ciawi', hotel: 12, villa: 15, homestay: 8 },
  { name: 'Cijeruk', hotel: 5, villa: 25, homestay: 10 },
];

const ACCOM_STATUS = [
  { name: 'Beroperasi', value: 380 },
  { name: 'Tutup', value: 45 },
  { name: 'Penuh', value: 120 },
];

const ACCOM_TYPE = [
  { name: 'Hotel & Resort', value: 112 },
  { name: 'Villa', value: 265 },
  { name: 'Homestay', value: 168 },
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

        <TabsContent value="spots" className="space-y-4">
          {/* Top Summary Cards - Spots */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Objek Wisata</CardTitle>
                <Mountain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">180</div>
                <p className="text-xs text-muted-foreground">+5 bulan ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wisata Alam</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#0ea5e9]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95</div>
                <p className="text-xs text-muted-foreground">52.7% dari total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wisata Buatan</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#22c55e]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">60</div>
                <p className="text-xs text-muted-foreground">33.3% dari total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wisata Budaya</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#f59e0b]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">13.8% dari total</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Bar Chart - Spots */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sebaran Wisata per Kecamatan</CardTitle>
                <CardDescription>
                  Jumlah Wisata Alam, Buatan, dan Budaya di kecamatan wisata utama.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SPOTS_BY_KECAMATAN}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Legend />
                      <Bar dataKey="alam" name="Wisata Alam" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="buatan" name="Wisata Buatan" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="budaya" name="Wisata Budaya" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pie Charts Side Column - Spots */}
            <div className="col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Berdasarkan Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={SPOTS_STATUS}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {SPOTS_STATUS.map((entry, index) => (
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
                  <CardTitle>Berdasarkan Jenis Wisata</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={SPOTS_TYPE}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {SPOTS_TYPE.map((entry, index) => (
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

        <TabsContent value="accommodations" className="space-y-4">
          {/* Top Summary Cards - Accommodations */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Akomodasi</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">545</div>
                <p className="text-xs text-muted-foreground">+12 bulan ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hotel & Resort</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#0ea5e9]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">112</div>
                <p className="text-xs text-muted-foreground">20.5% dari total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Villa</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#22c55e]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">265</div>
                <p className="text-xs text-muted-foreground">48.6% dari total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Homestay</CardTitle>
                <div className="h-4 w-4 rounded-full bg-[#f59e0b]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">168</div>
                <p className="text-xs text-muted-foreground">30.8% dari total</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Bar Chart - Accommodations */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sebaran Akomodasi per Kecamatan</CardTitle>
                <CardDescription>
                  Jumlah Hotel, Villa, dan Homestay di kawasan wisata.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ACCOM_BY_KECAMATAN}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Legend />
                      <Bar dataKey="hotel" name="Hotel & Resort" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="villa" name="Villa" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="homestay" name="Homestay" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pie Charts Side Column - Accommodations */}
            <div className="col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Berdasarkan Status Operasional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ACCOM_STATUS}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {ACCOM_STATUS.map((entry, index) => (
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
                  <CardTitle>Berdasarkan Jenis Akomodasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ACCOM_TYPE}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {ACCOM_TYPE.map((entry, index) => (
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
      </Tabs>
    </div>
  );
}

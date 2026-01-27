import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  MoreHorizontal, 
  Filter, 
  Lightbulb,
  TrendingUp,
  BarChart3
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const SECTORS = [
  "Fashion", "Kriya", "Kuliner", "Fotografi", "Musik", "Film & Animasi", "Aplikasi", "Desain Interior"
];

const INITIAL_DATA = [
  { id: "1", name: "Batik Bogor Tradisiku", sector: "Fashion", kecamatan: "Tanah Sareal", owner: "Siti Fatimah", employees: 15, revenue: "Rp 50jt/bln" },
  { id: "2", name: "Bogor Raincake", sector: "Kuliner", kecamatan: "Bogor Tengah", owner: "Syahrini", employees: 40, revenue: "Rp 250jt/bln" },
  { id: "3", name: "Kerajinan Bambu Kreatif", sector: "Kriya", kecamatan: "Ciampea", owner: "Ahmad", employees: 8, revenue: "Rp 15jt/bln" },
  { id: "4", name: "Studio Animasi Bogor", sector: "Film & Animasi", kecamatan: "Cibinong", owner: "Budi", employees: 25, revenue: "Rp 120jt/bln" },
];

const MONTHLY_VISITS = [
  { month: "Jan", visits: 1200 },
  { month: "Feb", visits: 1500 },
  { month: "Mar", visits: 1100 },
  { month: "Apr", visits: 1800 },
  { month: "May", visits: 2200 },
  { month: "Jun", visits: 2500 },
];

export default function CreativeEconomyPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = filterSector ? item.sector === filterSector : true;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ekonomi Kreatif</h1>
          <p className="text-muted-foreground">Data pelaku usaha ekonomi kreatif Kabupaten Bogor.</p>
        </div>
        <Button variant="outline" onClick={() => setShowReport(!showReport)} className="gap-2">
          <BarChart3 className="h-4 w-4" />
          {showReport ? "Tutup Laporan" : "Lihat Laporan Kunjungan"}
        </Button>
      </div>

      {showReport && (
        <Card className="animate-in fade-in slide-in-from-top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Laporan Kunjungan Gerai Ekraf (Bulanan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_VISITS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama usaha/pemilik..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter Sektor
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {SECTORS.map(s => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={filterSector === s}
                  onCheckedChange={(checked) => setFilterSector(checked ? s : null)}
                >
                  {s}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Pelaku Ekraf
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Usaha</TableHead>
              <TableHead>Sektor</TableHead>
              <TableHead>Pemilik</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Karyawan</TableHead>
              <TableHead>Omzet</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell><Badge variant="outline">{row.sector}</Badge></TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.kecamatan}</TableCell>
                <TableCell>{row.employees}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

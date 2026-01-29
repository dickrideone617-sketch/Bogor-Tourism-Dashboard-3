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
  Download,
  MapPin,
  Mountain,
  BarChart3,
  TrendingUp,
  Users
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const VISIT_DATA = [
  { month: "Jan", lokal: 4500, manca: 320 },
  { month: "Feb", lokal: 5200, manca: 450 },
  { month: "Mar", lokal: 4800, manca: 280 },
  { month: "Apr", lokal: 6100, manca: 600 },
  { month: "Mei", lokal: 7500, manca: 850 },
  { month: "Jun", lokal: 8200, manca: 1200 },
];

const KECAMATAN_LIST = [
  "Babakan Madang", "Bojong Gede", "Caringin", "Cariu", "Ciampea", "Ciawi", 
  "Cibinong", "Cibungbulang", "Cigombong", "Cigudeg", "Cijeruk", "Cileungsi", 
  "Ciomas", "Cisarua", "Ciseeng", "Citeureup", "Dramaga", "Gunung Putri", 
  "Gunung Sindur", "Jasinga", "Jonggol", "Kemang", "Klapanunggal", "Leuwiliang", 
  "Leuwisadeng", "Megamendung", "Nanggung", "Pamijahan", "Parung", "Parung Panjang", 
  "Rancabungur", "Rumpin", "Sukajaya", "Sukamakmur", "Sukaraja", "Tajurhalang", 
  "Tamansari", "Tanjungsari", "Tenjo", "Tenjolaya"
];

const INITIAL_DATA = [
  { id: "1", name: "Kebun Raya Bogor", category: "Alam & Budaya", kecamatan: "Bogor Tengah", ticket: "Rp 15.000", visitors: "15.000+", status: "Buka" },
  { id: "2", name: "Taman Safari Indonesia", category: "Konservasi", kecamatan: "Cisarua", ticket: "Rp 150.000+", visitors: "25.000+", status: "Buka" },
  { id: "3", name: "Taman Nasional Gunung Halimun Salak", category: "Alam", kecamatan: "Pamijahan", ticket: "Rp 10.000", visitors: "5.000+", status: "Buka" },
  { id: "4", name: "JungleLand Adventure Theme Park", category: "Buatan", kecamatan: "Babakan Madang", ticket: "Rp 100.000+", visitors: "12.000+", status: "Buka" },
  { id: "5", name: "Gunung Mas Tea Plantation", category: "Agrowisata", kecamatan: "Cisarua", ticket: "Rp 15.000", visitors: "10.000+", status: "Buka" },
  { id: "6", name: "Curug Cikuluwung", category: "Alam", kecamatan: "Pamijahan", ticket: "Rp 20.000", visitors: "3.000+", status: "Buka" },
  { id: "7", name: "Little Venice Puncak", category: "Buatan", kecamatan: "Cisarua", ticket: "Rp 25.000", visitors: "8.000+", status: "Buka" },
];

export default function SpotsPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKecamatan = filterKecamatan ? item.kecamatan === filterKecamatan : true;
    return matchesSearch && matchesKecamatan;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      kecamatan: formData.get("kecamatan") as string,
      ticket: formData.get("ticket") as string,
      visitors: "0",
      status: "Buka",
    };
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Objek wisata berhasil ditambahkan" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Objek Wisata</h1>
        <p className="text-muted-foreground">Data destinasi wisata Kabupaten Bogor.</p>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setShowReport(!showReport)} className="gap-2">
          <BarChart3 className="h-4 w-4" /> {showReport ? "Sembunyikan Grafik" : "Lihat Tren Kunjungan"}
        </Button>
      </div>

      {showReport && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Statistik Kunjungan Bulanan</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VISIT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="lokal" name="Lokal" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} />
                  <Area type="monotone" dataKey="manca" name="Mancanegara" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Wisatawan Bulan Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,400</div>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +12% dari bulan lalu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Destinasi Terpopuler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold">Taman Safari</div>
                <p className="text-xs text-muted-foreground">Cisarua, Bogor</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari destinasi..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Kecamatan
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto">
              {KECAMATAN_LIST.map(k => (
                <DropdownMenuCheckboxItem
                  key={k}
                  checked={filterKecamatan === k}
                  onCheckedChange={(checked) => setFilterKecamatan(checked ? k : null)}
                >
                  {k}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Tambah Destinasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Objek Wisata</DialogTitle>
              <DialogDescription>Masukkan detail destinasi wisata baru.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Destinasi</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Input name="category" required placeholder="Alam/Buatan/Dll" />
                </div>
                <div className="space-y-2">
                  <Label>Kecamatan</Label>
                  <Select name="kecamatan" required>
                    <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent className="max-h-40">
                      {KECAMATAN_LIST.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket">Harga Tiket</Label>
                <Input id="ticket" name="ticket" required placeholder="Rp 0" />
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead>Nama Destinasi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Tiket</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell><Badge variant="outline">{row.category}</Badge></TableCell>
                <TableCell>{row.kecamatan}</TableCell>
                <TableCell>{row.ticket}</TableCell>
                <TableCell><Badge className="bg-emerald-500">{row.status}</Badge></TableCell>
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

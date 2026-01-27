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
  Mountain,
  MapPin,
  BarChart3,
  TrendingUp
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
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Data Constants
const KECAMATAN_LIST = [
  "Babakan Madang", "Bojong Gede", "Caringin", "Cariu", "Ciampea", "Ciawi", 
  "Cibinong", "Cibungbulang", "Cigombong", "Cigudeg", "Cijeruk", "Cileungsi", 
  "Ciomas", "Cisarua", "Ciseeng", "Citeureup", "Dramaga", "Gunung Putri", 
  "Gunung Sindur", "Jasinga", "Jonggol", "Kemang", "Klapanunggal", "Leuwiliang", 
  "Leuwisadeng", "Megamendung", "Nanggung", "Pamijahan", "Parung", "Parung Panjang", 
  "Rancabungur", "Rumpin", "Sukajaya", "Sukamakmur", "Sukaraja", "Tajurhalang", 
  "Tamansari", "Tanjungsari", "Tenjo", "Tenjolaya"
];

const SPOT_CATEGORIES = [
  "Alam", "Budaya", "Buatan", "Religi", "Edukasi"
];

const STATUS_LIST = ["Active", "Maintenance", "Closed"];

const MONTHLY_REPORTS = [
  { month: "Jan", visitors: 45000 },
  { month: "Feb", visitors: 52000 },
  { month: "Mar", visitors: 48000 },
  { month: "Apr", visitors: 61000 },
  { month: "May", visitors: 75000 },
  { month: "Jun", visitors: 89000 },
];

// Mock Data
const INITIAL_SPOTS = [
  { id: "1", name: "Kebun Raya Bogor", category: "Alam", kecamatan: "Bogor Tengah", address: "Jl. Ir. H. Juanda No.13", visitors: "150,000", status: "Active" },
  { id: "2", name: "Taman Safari Indonesia", category: "Fauna", kecamatan: "Cisarua", address: "Jl. Kapten Harun Kabir No.724", visitors: "200,000", status: "Active" },
  { id: "3", name: "Curug Cilember", category: "Alam", kecamatan: "Megamendung", address: "Jl. Raya Puncak Gadog", visitors: "45,000", status: "Active" },
  { id: "4", name: "Little Venice", category: "Buatan", kecamatan: "Cipanas", address: "Kota Bunga Estate", visitors: "80,000", status: "Maintenance" },
  { id: "5", name: "Gunung Pancar", category: "Alam", kecamatan: "Babakan Madang", address: "Kp. Ciburial", visitors: "30,000", status: "Active" },
];

export default function SpotsPage() {
  const [data, setData] = useState(INITIAL_SPOTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.address || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKecamatan = filterKecamatan ? item.kecamatan === filterKecamatan : true;
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    
    return matchesSearch && matchesKecamatan && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Terhapus",
      description: "Data objek wisata berhasil dihapus.",
      variant: "destructive"
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      kecamatan: formData.get("kecamatan") as string,
      address: formData.get("address") as string,
      visitors: "0",
      status: formData.get("status") as string,
    };
    
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Objek wisata baru berhasil ditambahkan" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Objek Wisata</h1>
          <p className="text-muted-foreground">
            Kelola data tempat wisata, rekreasi, dan destinasi unggulan.
          </p>
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
              Laporan Kunjungan Objek Wisata (Bulanan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_REPORTS}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari objek wisata..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {(filterKecamatan || filterCategory) && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                    {(filterKecamatan ? 1 : 0) + (filterCategory ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Kategori</DropdownMenuLabel>
              {SPOT_CATEGORIES.map((cat) => (
                <DropdownMenuCheckboxItem
                  key={cat}
                  checked={filterCategory === cat}
                  onCheckedChange={(checked) => setFilterCategory(checked ? cat : null)}
                >
                  {cat}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Kecamatan</DropdownMenuLabel>
              <div className="max-h-48 overflow-y-auto">
                {KECAMATAN_LIST.map((kec) => (
                  <DropdownMenuCheckboxItem
                    key={kec}
                    checked={filterKecamatan === kec}
                    onCheckedChange={(checked) => setFilterKecamatan(checked ? kec : null)}
                  >
                    {kec}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              {(filterKecamatan || filterCategory) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="justify-center text-primary font-medium"
                    onClick={() => {
                      setFilterKecamatan(null);
                      setFilterCategory(null);
                    }}
                  >
                    Reset Filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Tambah Wisata
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Objek Wisata</DialogTitle>
              <DialogDescription>
                Masukkan data objek wisata baru secara lengkap.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Objek Wisata</Label>
                <Input id="name" name="name" placeholder="Contoh: Curug Bidadari" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPOT_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kecamatan">Lokasi (Kecamatan)</Label>
                <Select name="kecamatan" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {KECAMATAN_LIST.map((k) => (
                      <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Detail</Label>
                <Input id="address" name="address" placeholder="Jalan, Desa, RT/RW..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status Operasional</Label>
                <Select name="status" required defaultValue="Active">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_LIST.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit">Simpan Data</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead>Nama Objek Wisata</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Pengunjung/Bln</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">
                    <div>{row.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{row.address}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.category}</Badge>
                  </TableCell>
                  <TableCell>{row.kecamatan}</TableCell>
                  <TableCell>{row.visitors}</TableCell>
                  <TableCell>
                    <Badge className={row.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-amber-500 hover:bg-amber-600"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(row.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

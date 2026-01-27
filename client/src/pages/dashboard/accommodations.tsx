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
  Hotel,
  Star,
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
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

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

const ACCOMMODATION_TYPES = [
  "Hotel", "Villa", "Resort", "Homestay", "Glamping", "Camping Ground", "Guest House"
];

const MONTHLY_OCCUPANCY = [
  { month: "Jan", occupancy: 65 },
  { month: "Feb", occupancy: 72 },
  { month: "Mar", occupancy: 58 },
  { month: "Apr", occupancy: 80 },
  { month: "May", occupancy: 85 },
  { month: "Jun", occupancy: 92 },
];

// Mock Data
const INITIAL_ACCOMMODATIONS = [
  { id: "1", name: "Royal Safari Garden", type: "Hotel", rating: 4.5, kecamatan: "Cisarua", address: "Jl. Raya Puncak No. 601", rooms: 150 },
  { id: "2", name: "Pullman Ciawi", type: "Resort", rating: 5.0, kecamatan: "Megamendung", address: "Jl. Raya Puncak Gadog", rooms: 200 },
  { id: "3", name: "Novotel Bogor", type: "Hotel", rating: 4.0, kecamatan: "Sukaraja", address: "Golf Estate Bogor Raya", rooms: 120 },
  { id: "4", name: "Aston Sentul", type: "Hotel", rating: 4.5, kecamatan: "Babakan Madang", address: "Sentul City", rooms: 180 },
  { id: "5", name: "Villa Puncak Pass", type: "Villa", rating: 3.5, kecamatan: "Cisarua", address: "Jl. Raya Puncak", rooms: 20 },
];

export default function AccommodationsPage() {
  const [data, setData] = useState(INITIAL_ACCOMMODATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.address || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKecamatan = filterKecamatan ? item.kecamatan === filterKecamatan : true;
    const matchesType = filterType ? item.type === filterType : true;
    
    return matchesSearch && matchesKecamatan && matchesType;
  });

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Terhapus",
      description: "Data akomodasi berhasil dihapus.",
      variant: "destructive"
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      kecamatan: formData.get("kecamatan") as string,
      address: formData.get("address") as string,
      rooms: parseInt(formData.get("rooms") as string) || 0,
      rating: 0, // Default new
    };
    
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Akomodasi baru berhasil ditambahkan" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Akomodasi</h1>
          <p className="text-muted-foreground">
            Data hotel, villa, resort, dan penginapan di Kabupaten Bogor.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Mengunduh", description: "Data Akomodasi sedang diunduh." })} className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" onClick={() => setShowReport(!showReport)} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            {showReport ? "Tutup Laporan" : "Lihat Laporan Okupansi"}
          </Button>
        </div>
      </div>

      {showReport && (
        <Card className="animate-in fade-in slide-in-from-top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Laporan Okupansi Hotel & Resort (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_OCCUPANCY}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="occupancy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
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
              placeholder="Cari hotel/villa..."
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
                {(filterKecamatan || filterType) && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                    {(filterKecamatan ? 1 : 0) + (filterType ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Tipe Akomodasi</DropdownMenuLabel>
              {ACCOMMODATION_TYPES.map((t) => (
                <DropdownMenuCheckboxItem
                  key={t}
                  checked={filterType === t}
                  onCheckedChange={(checked) => setFilterType(checked ? t : null)}
                >
                  {t}
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
              {(filterKecamatan || filterType) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="justify-center text-primary font-medium"
                    onClick={() => {
                      setFilterKecamatan(null);
                      setFilterType(null);
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
              <Plus className="h-4 w-4" /> Tambah Akomodasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Akomodasi</DialogTitle>
              <DialogDescription>
                Masukkan data akomodasi baru secara lengkap.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Akomodasi</Label>
                <Input id="name" name="name" placeholder="Contoh: Hotel Salak The Heritage" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Akomodasi</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOMMODATION_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
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
                <Label htmlFor="rooms">Jumlah Kamar/Unit</Label>
                <Input id="rooms" name="rooms" type="number" placeholder="0" />
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
              <TableHead>Nama Akomodasi</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Jml. Kamar</TableHead>
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
                    <Badge variant="secondary">{row.type}</Badge>
                  </TableCell>
                  <TableCell>{row.kecamatan}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-1 text-amber-500 font-medium">
                      <Star className="h-3 w-3 fill-current" /> {row.rating}
                    </div>
                  </TableCell>
                  <TableCell>{row.rooms}</TableCell>
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

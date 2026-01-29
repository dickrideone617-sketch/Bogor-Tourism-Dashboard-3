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
  Upload, 
  Coffee, 
  Utensils, 
  Store,
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

const KECAMATAN_LIST = [
  "Babakan Madang", "Bojong Gede", "Caringin", "Cariu", "Ciampea", "Ciawi", 
  "Cibinong", "Cibungbulang", "Cigombong", "Cigudeg", "Cijeruk", "Cileungsi", 
  "Ciomas", "Cisarua", "Ciseeng", "Citeureup", "Dramaga", "Gunung Putri", 
  "Gunung Sindur", "Jasinga", "Jonggol", "Kemang", "Klapanunggal", "Leuwiliang", 
  "Leuwisadeng", "Megamendung", "Nanggung", "Pamijahan", "Parung", "Parung Panjang", 
  "Rancabungur", "Rumpin", "Sukajaya", "Sukamakmur", "Sukaraja", "Tajurhalang", 
  "Tamansari", "Tanjungsari", "Tenjo", "Tenjolaya"
];

const KATEGORI_LIST = [
  { id: "kafe", label: "Kafe", icon: Coffee },
  { id: "restoran", label: "Restoran", icon: Utensils },
  { id: "warung", label: "Warung", icon: Store },
];

const INITIAL_DATA = [
  { id: "1", name: "Barcelona The Glass House", category: "Kafe", kecamatan: "Bogor Tengah", address: "Jl. Pajajaran Indah Raya No.2", status: "Aktif", scale: "Besar", source: "Internet", rating: 4.8 },
  { id: "2", name: "Kopi Daong", category: "Kafe", kecamatan: "Ciawi", address: "Pancawati", status: "Aktif", scale: "Besar", source: "Internet", rating: 4.7 },
  { id: "3", name: "Bumi Aki Signature", category: "Restoran", kecamatan: "Babakan Madang", address: "Sentul City", status: "Aktif", scale: "Besar", source: "Internet", rating: 4.9 },
  { id: "4", name: "Santorini by dSawah", category: "Kafe", kecamatan: "Dramaga", address: "Jl. Cilubang Mekar No.2", status: "Aktif", scale: "Menengah", source: "Internet", rating: 4.6 },
  { id: "5", name: "Anthology Coffee & Tea", category: "Kafe", kecamatan: "Babakan Madang", address: "Sentul City", status: "Aktif", scale: "Menengah", source: "Internet", rating: 4.5 },
  { id: "6", name: "Cimory Riverside", category: "Restoran", kecamatan: "Cisarua", address: "Jl. Raya Puncak", status: "Aktif", scale: "Besar", source: "Internet", rating: 4.7 },
  { id: "7", name: "Roofpark Bogor", category: "Restoran", kecamatan: "Bogor Tengah", address: "Jl. Raya Pajajaran No.3", status: "Aktif", scale: "Besar", source: "Internet", rating: 4.6 },
];

export default function CulinaryPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [filterKategori, setFilterKategori] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKecamatan = filterKecamatan ? item.kecamatan === filterKecamatan : true;
    const matchesKategori = filterKategori ? item.category === filterKategori : true;
    return matchesSearch && matchesKecamatan && matchesKategori;
  });

  const handleExport = (type: 'excel' | 'pdf') => {
    toast({ title: "Ekspor Berhasil", description: `Data telah diekspor ke format ${type.toUpperCase()}.` });
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
      status: "Aktif",
      scale: "UMKM",
      source: "Manual",
      rating: 0,
    };
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Data usaha baru berhasil ditambahkan" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Data Cafe & Resto</h1>
        <p className="text-muted-foreground">Kelola data kuliner Kabupaten Bogor.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau alamat..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Kategori</DropdownMenuLabel>
              {KATEGORI_LIST.map((kat) => (
                <DropdownMenuCheckboxItem
                  key={kat.id}
                  checked={filterKategori === kat.label}
                  onCheckedChange={(checked) => setFilterKategori(checked ? kat.label : null)}
                >
                  {kat.label}
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Ekspor
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('excel')}>Excel (.xlsx)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Tambah Data
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Data Usaha</DialogTitle>
                <DialogDescription>Lengkapi data usaha kuliner di bawah ini.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Usaha</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select name="category" required>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>
                        {KATEGORI_LIST.map(k => <SelectItem key={k.id} value={k.label}>{k.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
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
                  <Label htmlFor="address">Alamat</Label>
                  <Input id="address" name="address" required />
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead>Nama Usaha</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">
                  <div>{row.name}</div>
                  <div className="text-xs text-muted-foreground">{row.address}</div>
                </TableCell>
                <TableCell><Badge variant="outline">{row.category}</Badge></TableCell>
                <TableCell>{row.kecamatan}</TableCell>
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

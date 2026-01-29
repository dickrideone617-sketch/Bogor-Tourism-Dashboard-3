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
  MoreHorizontal, 
  Filter, 
  Hotel,
  Bed
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
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

const INITIAL_DATA = [
  { id: "1", name: "Pullman Ciawi Vimala Hills", type: "Resort", kecamatan: "Ciawi", rooms: 227, price: "Rp 1.5jt+", status: "Aktif" },
  { id: "2", name: "The Botanica Sanctuary", type: "Hotel Luxury", kecamatan: "Cisarua", rooms: 160, price: "Rp 1.2jt+", status: "Aktif" },
  { id: "3", name: "Royal Tulip Gunung Geulis", type: "Golf Resort", kecamatan: "Sukaraja", rooms: 173, price: "Rp 1.8jt+", status: "Aktif" },
  { id: "4", name: "Aston Bogor Hotel", type: "Hotel & Resort", kecamatan: "Bogor Selatan", rooms: 223, price: "Rp 800rb+", status: "Aktif" },
  { id: "5", name: "Royal Safari Garden", type: "Resort", kecamatan: "Cisarua", rooms: 300, price: "Rp 900rb+", status: "Aktif" },
  { id: "6", name: "Plataran Puncak Villas", type: "Luxury Villa", kecamatan: "Cisarua", rooms: 10, price: "Rp 5jt+", status: "Aktif" },
  { id: "7", name: "Damar Langit Resort", type: "Glamping & Villa", kecamatan: "Cisarua", rooms: 25, price: "Rp 1.1jt+", status: "Aktif" },
];

export default function AccommodationsPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
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
      type: formData.get("type") as string,
      kecamatan: formData.get("kecamatan") as string,
      rooms: parseInt(formData.get("rooms") as string) || 0,
      price: formData.get("price") as string,
      status: "Aktif",
    };
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Data akomodasi berhasil ditambahkan" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Akomodasi</h1>
        <p className="text-muted-foreground">Data hotel, villa, dan penginapan Kabupaten Bogor.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari akomodasi..."
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
              <Plus className="h-4 w-4" /> Tambah Akomodasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Data Penginapan</DialogTitle>
              <DialogDescription>Masukkan detail akomodasi baru.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Akomodasi</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipe</Label>
                  <Input name="type" required placeholder="Hotel/Villa/Resort" />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kamar</Label>
                  <Input name="rooms" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label>Harga Mulai</Label>
                  <Input name="price" required placeholder="Rp 0" />
                </div>
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
              <TableHead>Nama Akomodasi</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Kamar</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell><Badge variant="outline">{row.type}</Badge></TableCell>
                <TableCell>{row.kecamatan}</TableCell>
                <TableCell>{row.rooms}</TableCell>
                <TableCell>{row.price}</TableCell>
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

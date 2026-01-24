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
  Store 
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

const KATEGORI_LIST = [
  { id: "kafe", label: "Kafe", icon: Coffee },
  { id: "restoran", label: "Restoran", icon: Utensils },
  { id: "warung", label: "Warung", icon: Store },
];

const STATUS_USAHA = ["Aktif", "Tutup", "Musiman"];
const SKALA_USAHA = ["UMKM", "Menengah", "Besar"];
const SUMBER_DATA = ["Lapangan", "OSS", "Asosiasi", "Desa"];

// Mock Data
const INITIAL_DATA = [
  { id: "1", name: "Kopi Nako", category: "Kafe", kecamatan: "Cibinong", address: "Jl. Mayor Oking", status: "Aktif", scale: "Menengah", source: "Lapangan", rating: 4.5 },
  { id: "2", name: "RM Bumi Aki", category: "Restoran", kecamatan: "Cisarua", address: "Jl. Raya Puncak", status: "Aktif", scale: "Besar", source: "Asosiasi", rating: 4.8 },
  { id: "3", name: "Warung Sate Shinta", category: "Warung", kecamatan: "Megamendung", address: "Jl. Raya Cipanas", status: "Aktif", scale: "UMKM", source: "Lapangan", rating: 4.3 },
  { id: "4", name: "Starbucks Sentul", category: "Kafe", kecamatan: "Babakan Madang", address: "Sentul City", status: "Aktif", scale: "Besar", source: "OSS", rating: 4.6 },
  { id: "5", name: "Cimory Riverside", category: "Restoran", kecamatan: "Megamendung", address: "Jl. Raya Puncak", status: "Aktif", scale: "Besar", source: "OSS", rating: 4.7 },
  { id: "6", name: "Bakso Boedjangan", category: "Restoran", kecamatan: "Cibinong", address: "Cibinong City Mall", status: "Tutup", scale: "Menengah", source: "Desa", rating: 4.0 },
];

export default function CulinaryPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [filterKategori, setFilterKategori] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  // Filter Logic
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKecamatan = filterKecamatan ? item.kecamatan === filterKecamatan : true;
    const matchesKategori = filterKategori ? item.category === filterKategori : true;
    
    return matchesSearch && matchesKecamatan && matchesKategori;
  });

  const handleExport = (type: 'excel' | 'pdf') => {
    toast({
      title: "Ekspor Berhasil",
      description: `Data telah diekspor ke format ${type.toUpperCase()}. (Simulasi)`,
    });
  };

  const handleImport = () => {
    toast({
      title: "Impor Berhasil",
      description: "Data dari Excel berhasil diimpor. (Simulasi)",
    });
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Data Dihapus",
      description: "Data usaha berhasil dihapus dari sistem.",
      variant: "destructive"
    });
  };

  // Mock Form Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      kecamatan: formData.get("kecamatan") as string,
      address: formData.get("address") as string,
      status: formData.get("status") as string,
      scale: formData.get("scale") as string,
      source: formData.get("source") as string,
      rating: 0, // Default
    };
    
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Data usaha baru berhasil ditambahkan" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Data Cafe & Resto</h1>
        <p className="text-muted-foreground">
          Kelola data kuliner Kabupaten Bogor: Kafe, Restoran, dan Warung.
        </p>
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
                <Filter className="h-4 w-4" />
                Filter
                {(filterKecamatan || filterKategori) && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                    {(filterKecamatan ? 1 : 0) + (filterKategori ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter Kategori</DropdownMenuLabel>
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
              <DropdownMenuLabel>Filter Kecamatan</DropdownMenuLabel>
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
              {(filterKecamatan || filterKategori) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="justify-center text-primary font-medium"
                    onClick={() => {
                      setFilterKecamatan(null);
                      setFilterKategori(null);
                    }}
                  >
                    Reset Filter
                  </DropdownMenuItem>
                </>
              )}
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
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                Ekspor ke Excel (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Ekspor ke PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="gap-2" onClick={handleImport}>
            <Upload className="h-4 w-4" /> Impor Excel
          </Button>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Tambah Data
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tambah Data Usaha Baru</DialogTitle>
                <DialogDescription>
                  Lengkapi data usaha kuliner di bawah ini. Semua field wajib diisi.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name">Nama Usaha</Label>
                  <Input id="name" name="name" placeholder="Contoh: Kopi Nako Cibinong" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori Usaha</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {KATEGORI_LIST.map((k) => (
                        <SelectItem key={k.id} value={k.label}>{k.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kecamatan">Kecamatan</Label>
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

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Input id="address" name="address" placeholder="Jl. Raya..." required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status Usaha</Label>
                  <Select name="status" required defaultValue="Aktif">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_USAHA.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scale">Skala Usaha</Label>
                  <Select name="scale" required defaultValue="UMKM">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Skala" />
                    </SelectTrigger>
                    <SelectContent>
                      {SKALA_USAHA.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Sumber Data</Label>
                  <Select name="source" required defaultValue="Lapangan">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Sumber" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUMBER_DATA.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                   <Label htmlFor="coord">Titik Koordinat (Opsional)</Label>
                   <div className="flex gap-2">
                     <Input placeholder="Latitude" name="lat" />
                     <Input placeholder="Longitude" name="lng" />
                   </div>
                </div>

                <DialogFooter className="col-span-2 mt-4">
                  <Button type="submit">Simpan Data</Button>
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
              <TableHead>Skala</TableHead>
              <TableHead>Sumber</TableHead>
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
                  <TableCell>
                    <Badge 
                      className={
                        row.status === "Aktif" ? "bg-emerald-500 hover:bg-emerald-600" : 
                        row.status === "Tutup" ? "bg-red-500 hover:bg-red-600" : 
                        "bg-amber-500 hover:bg-amber-600"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.scale}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.source}</TableCell>
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
                <TableCell colSpan={7} className="h-24 text-center">
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

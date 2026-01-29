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
  Settings,
  ShieldAlert,
  Save,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INITIAL_LOGS = [
  { id: "1", admin: "Admin Pariwisata", action: "Update Data Objek Wisata", target: "Kebun Raya Bogor", timestamp: "2024-05-20 10:30" },
  { id: "2", admin: "Admin Ekraf", action: "Tambah Pelaku Ekraf", target: "Batik Bogor Tradisiku", timestamp: "2024-05-20 11:15" },
  { id: "3", admin: "Admin Akomodasi", action: "Hapus Data Akomodasi", target: "Villa Puncak Pass", timestamp: "2024-05-20 12:00" },
];

export default function SuperAdminPage() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const { toast } = useToast();

  const handleCorrect = (id: string) => {
    toast({
      title: "Koreksi Berhasil",
      description: "Data telah dikoreksi oleh Super Admin.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-primary">
          <ShieldAlert className="h-8 w-8" />
          Super Admin Console
        </h1>
        <p className="text-muted-foreground">
          Panel khusus untuk koreksi data, monitoring aktivitas admin, dan pengaturan sistem tingkat tinggi.
        </p>
      </div>

      <Tabs defaultValue="audit" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="correction">Pusat Koreksi Data</TabsTrigger>
          <TabsTrigger value="settings">Sistem</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Log Aktivitas Admin</CardTitle>
              <CardDescription>Daftar perubahan data terbaru yang dilakukan oleh semua admin.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Administrator</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.admin}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>{log.target}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleCorrect(log.id)}>Koreksi</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correction">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Koreksi Parameter Global</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Daftar Kecamatan</Label>
                  <Input defaultValue="40 Kecamatan Terdaftar" />
                </div>
                <div className="space-y-2">
                  <Label>Sektor Ekonomi Kreatif</Label>
                  <Input defaultValue="17 Subsektor Aktif" />
                </div>
                <Button className="w-full gap-2"><Save className="h-4 w-4" /> Simpan Perubahan</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Sistem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">Sinkronisasi Data OSS</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">Penyimpanan Cloud</span>
                  <Badge variant="secondary">82% Free</Badge>
                </div>
                <Button variant="outline" className="w-full">Maintenance Mode</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

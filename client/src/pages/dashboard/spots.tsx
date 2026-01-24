import { ManagementTable } from "@/components/dashboard/management-table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const initialSpots = [
  { id: "1", name: "Kebun Raya Bogor", category: "Alam", location: "Bogor Tengah", visitors: "150,000", status: "Active" },
  { id: "2", name: "Taman Safari Indonesia", category: "Fauna", location: "Cisarua", visitors: "200,000", status: "Active" },
  { id: "3", name: "Curug Cilember", category: "Alam", location: "Megamendung", visitors: "45,000", status: "Active" },
  { id: "4", name: "Little Venice", category: "Buatan", location: "Cipanas", visitors: "80,000", status: "Maintenance" },
  { id: "5", name: "Gunung Pancar", category: "Alam", location: "Babakan Madang", visitors: "30,000", status: "Active" },
];

export default function SpotsPage() {
  const [spots, setSpots] = useState(initialSpots);

  const columns = [
    { key: "name", label: "Nama Objek Wisata" },
    { key: "category", label: "Kategori", render: (val: string) => <Badge variant="outline">{val}</Badge> },
    { key: "location", label: "Lokasi" },
    { key: "visitors", label: "Avg. Pengunjung/Bln" },
    { 
      key: "status", 
      label: "Status", 
      render: (val: string) => (
        <Badge className={val === "Active" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-amber-500 hover:bg-amber-600"}>
          {val}
        </Badge>
      ) 
    },
  ];

  return (
    <ManagementTable
      title="Manajemen Objek Wisata"
      description="Kelola data tempat wisata di Kabupaten Bogor"
      columns={columns}
      data={spots}
      onAdd={() => {}}
      onEdit={() => {}}
      onDelete={(id) => setSpots(spots.filter(s => s.id !== id))}
      searchPlaceholder="Cari objek wisata..."
    />
  );
}

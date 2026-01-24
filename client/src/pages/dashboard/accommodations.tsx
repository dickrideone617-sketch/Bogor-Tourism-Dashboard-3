import { ManagementTable } from "@/components/dashboard/management-table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Star } from "lucide-react";

const initialAccommodations = [
  { id: "1", name: "Royal Safari Garden", type: "Hotel", rating: 4.5, location: "Cisarua", rooms: 150 },
  { id: "2", name: "Pullman Ciawi", type: "Resort", rating: 5.0, location: "Megamendung", rooms: 200 },
  { id: "3", name: "Novotel Bogor", type: "Hotel", rating: 4.0, location: "Sukaraja", rooms: 120 },
  { id: "4", name: "Aston Sentul", type: "Hotel", rating: 4.5, location: "Sentul", rooms: 180 },
  { id: "5", name: "Villa Puncak Pass", type: "Villa", rating: 3.5, location: "Cisarua", rooms: 20 },
];

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState(initialAccommodations);

  const columns = [
    { key: "name", label: "Nama Akomodasi" },
    { key: "type", label: "Tipe", render: (val: string) => <Badge variant="secondary">{val}</Badge> },
    { 
      key: "rating", 
      label: "Rating", 
      render: (val: number) => (
        <div className="flex items-center gap-1 text-amber-500 font-medium">
          <Star className="h-3 w-3 fill-current" /> {val}
        </div>
      ) 
    },
    { key: "location", label: "Lokasi" },
    { key: "rooms", label: "Jml. Kamar" },
  ];

  return (
    <ManagementTable
      title="Manajemen Akomodasi"
      description="Data hotel, villa, dan penginapan terdaftar"
      columns={columns}
      data={accommodations}
      onAdd={() => {}}
      onEdit={() => {}}
      onDelete={(id) => setAccommodations(accommodations.filter(a => a.id !== id))}
      searchPlaceholder="Cari hotel/villa..."
    />
  );
}

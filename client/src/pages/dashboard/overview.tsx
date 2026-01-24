import { StatCard } from "@/components/dashboard/stat-card";
import { VisitorChart } from "@/components/dashboard/visitor-chart";
import { HeatmapGrid } from "@/components/dashboard/heatmap-grid";
import { Users, MapPin, Hotel, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Overview</h2>
          <p className="text-muted-foreground">Ringkasan statistik pariwisata Kabupaten Bogor</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Kunjungan" 
          value="2,350,112" 
          trend="+12.5%" 
          trendUp={true} 
          description="dari bulan lalu"
          icon={Users} 
        />
        <StatCard 
          title="Objek Wisata Aktif" 
          value="142" 
          trend="+4" 
          trendUp={true} 
          description="lokasi baru"
          icon={MapPin} 
        />
        <StatCard 
          title="Akomodasi Terdaftar" 
          value="89" 
          trend="0%" 
          trendUp={true} 
          description="tidak ada perubahan"
          icon={Hotel} 
        />
        <StatCard 
          title="Total Pendapatan" 
          value="Rp 4.2M" 
          trend="+8.2%" 
          trendUp={true} 
          description="estimasi daerah"
          icon={TrendingUp} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <div className="col-span-4 lg:col-span-5">
          <VisitorChart />
        </div>
        <div className="col-span-3 lg:col-span-2">
          <HeatmapGrid />
        </div>
      </div>
    </div>
  );
}

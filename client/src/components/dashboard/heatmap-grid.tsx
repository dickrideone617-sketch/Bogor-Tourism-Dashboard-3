import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Simulated grid data for Bogor regions
// Density: 0 (low) to 4 (high)
const regions = [
  { id: "R1", name: "Cibinong", density: 4 },
  { id: "R2", name: "Citeureup", density: 3 },
  { id: "R3", name: "Sentul", density: 4 },
  { id: "R4", name: "Babakan Madang", density: 3 },
  { id: "R5", name: "Sukaraja", density: 2 },
  { id: "R6", name: "Bogor Timur", density: 1 },
  { id: "R7", name: "Ciawi", density: 3 },
  { id: "R8", name: "Megamendung", density: 4 }, // Puncak area
  { id: "R9", name: "Cisarua", density: 4 }, // Puncak area
  { id: "R10", name: "Caringin", density: 2 },
  { id: "R11", name: "Cijeruk", density: 1 },
  { id: "R12", name: "Tamansari", density: 2 },
  { id: "R13", name: "Dramaga", density: 3 },
  { id: "R14", name: "Ciomas", density: 2 },
  { id: "R15", name: "Bogor Barat", density: 1 },
  { id: "R16", name: "Kemang", density: 2 },
  { id: "R17", name: "Rancabungur", density: 1 },
  { id: "R18", name: "Ciseeng", density: 2 },
  { id: "R19", name: "Parung", density: 3 },
  { id: "R20", name: "Gunung Sindur", density: 2 },
];

// Color scale based on density
const getColor = (density: number) => {
  switch (density) {
    case 4: return "bg-emerald-600";
    case 3: return "bg-emerald-400";
    case 2: return "bg-emerald-200";
    default: return "bg-emerald-50";
  }
};

export function HeatmapGrid() {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle>Peta Sebaran (Simulasi)</CardTitle>
        <CardDescription>
          Kepadatan kunjungan per wilayah
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 h-[250px]">
          {regions.map((region) => (
            <TooltipProvider key={region.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`${getColor(region.density)} rounded-md cursor-pointer hover:opacity-80 transition-all flex items-center justify-center text-[10px] font-medium text-emerald-950/50 hover:text-emerald-950`}
                  >
                    {region.name.slice(0, 3).toUpperCase()}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{region.name}</p>
                  <p className="text-xs">Tingkat Kunjungan: {region.density === 4 ? "Sangat Tinggi" : region.density === 3 ? "Tinggi" : region.density === 2 ? "Sedang" : "Rendah"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-50 border"></div> Rendah</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-200"></div> Sedang</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-400"></div> Tinggi</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-600"></div> Padat</div>
        </div>
      </CardContent>
    </Card>
  );
}

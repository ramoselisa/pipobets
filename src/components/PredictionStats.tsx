
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPredictionStats } from "@/data/mockPredictions";
import { CalendarDays, ChartBar, Heart, Star, UserCheck, Users, Eye } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Utility to shuffle array
function shuffle<T>(array: T[]): T[] {
  let a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Word cloud color palette (mostly red/pink/purple shades)
const wordCloudColors = [
  "#ea384c",
  "#D946EF",
  "#FFDEE2",
  "#FB7185",
  "#f472b6", // pink-400
  "#e879f9", // fuchsia-400
  "#fda4af", // rose-400
  "#be185d", // rose-800
  "#f43f5e"  // red-500
];

// Random font sizes for word cloud
function getFontSize(idx: number, min: number = 1.1, max: number = 2.1) {
  return `${min + (max - min) * (0.3 + Math.random() * 0.7)}rem`;
}

export function PredictionStats() {
  const stats = getPredictionStats();

  // For date distribution chart
  const dateData = Object.entries(stats.dateCount)
    .sort((a, b) => {
      // Try to parse and compare dates 
      const dateA = a[0].replace(/\./g, '/');
      const dateB = b[0].replace(/\./g, '/');
      return dateA.localeCompare(dateB);
    })
    .map(([date, count]) => ({
      name: date,
      value: count
    }));

  // For resemblance chart
  const resemblanceData = Object.entries(stats.resemblanceCount)
    .map(([key, value]) => ({
      name: key,
      value
    }));

  // For hair color chart
  const hairColorData = Object.entries(stats.hairColorCount)
    .sort((a, b) => b[1] - a[1])
    .map(([color, count]) => ({
      name: color,
      value: count
    }));

  // For eye color chart
  const eyeColorData = Object.entries(stats.eyeColorCount)
    .sort((a, b) => b[1] - a[1])
    .map(([color, count]) => ({
      name: color,
      value: count
    }));

  // Most common traits
  const momTraits = Object.entries(stats.traits.mom)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8); // More for word cloud!

  const dadTraits = Object.entries(stats.traits.dad)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  // *** WORD CLOUD SECTION for Mom/Dad traits ***
  // Shuffle & map so each render is a little visually different.
  const wordCloudMom = shuffle(momTraits);
  const wordCloudDad = shuffle(dadTraits);

  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <ChartBar className="h-6 w-6 mr-2 text-primary" />
        <span>Prediction Statistics</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-primary" />
              Date Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dateData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 15 + 200}, 70%, 60%)`} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2 text-sm text-muted-foreground">
              {stats.lostCount > 0 && (
                <p className="font-medium">
                  <span className="text-red-500">{stats.lostCount}</span> people have already lost their bet!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-primary" />
              Baby Resemblance Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={resemblanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell key="cell-0" fill="#D6BCFA" />
                    <Cell key="cell-1" fill="#8B5CF6" />
                    <Cell key="cell-2" fill="#9b87f5" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hair Color Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 mr-2 text-primary" />
              Hair Color Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={hairColorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {hairColorData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.name.toLowerCase().includes("black") ? "#333" :
                          entry.name.toLowerCase().includes("brown") ? "#8B4513" :
                          entry.name.toLowerCase().includes("blonde") ? "#FFD700" :
                          entry.name.toLowerCase().includes("red") ? "#FF6347" :
                          entry.name.toLowerCase().includes("preto") ? "#333" :
                          entry.name.toLowerCase().includes("castanho") ? "#8B4513" :
                          `hsl(${index * 40}, 70%, 60%)`
                        } 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Eye Color Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              Eye Color Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={eyeColorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {eyeColorData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.name.toLowerCase().includes("blue") ? "#1E40AF" :
                          entry.name.toLowerCase().includes("brown") ? "#8B4513" :
                          entry.name.toLowerCase().includes("green") ? "#10B981" :
                          entry.name.toLowerCase().includes("hazel") ? "#92400E" :
                          entry.name.toLowerCase().includes("black") ? "#1F2937" :
                          entry.name.toLowerCase().includes("castanho") ? "#8B4513" :
                          entry.name.toLowerCase().includes("escuro") ? "#1F2937" :
                          `hsl(${index * 40}, 70%, 55%)`
                        } 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 mr-2 text-primary" />
              Most Wished Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2 text-center flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-1 text-pink-400" />
                  <span>From Mom</span>
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trait</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {momTraits.length > 0 ? (
                      momTraits.map(([trait, count]) => (
                        <TableRow key={trait}>
                          <TableCell>{trait}</TableCell>
                          <TableCell className="text-right">{count}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-center flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-1 text-blue-400" />
                  <span>From Dad</span>
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trait</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadTraits.length > 0 ? (
                      dadTraits.map(([trait, count]) => (
                        <TableRow key={trait}>
                          <TableCell>{trait}</TableCell>
                          <TableCell className="text-right">{count}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* WORD CLOUD section */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-center font-medium mb-2 text-pink-700">Wishes from Mom</h4>
                <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                  {wordCloudMom.map(([trait, count], i) => (
                    <span
                      key={trait}
                      className="font-bold inline-block"
                      style={{
                        color: wordCloudColors[i % wordCloudColors.length],
                        fontSize: getFontSize(i, 1.1, 2.2),
                        opacity: 0.82 + (count / (momTraits[0]?.[1] ?? 1)) * 0.18,
                        lineHeight: 1
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-center font-medium mb-2 text-fuchsia-700">Wishes from Dad</h4>
                <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                  {wordCloudDad.map(([trait, count], i) => (
                    <span
                      key={trait}
                      className="font-bold inline-block"
                      style={{
                        color: wordCloudColors[(i * 2) % wordCloudColors.length],
                        fontSize: getFontSize(i, 1.1, 2.2),
                        opacity: 0.82 + (count / (dadTraits[0]?.[1] ?? 1)) * 0.18,
                        lineHeight: 1
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-primary" />
                <span>Total Predictions: <strong>{stats.total}</strong></span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1 text-primary" />
                <span>Unique Dates: <strong>{Object.keys(stats.dateCount).length}</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

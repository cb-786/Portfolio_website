import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Trophy, TrendingUp, Target, GithubIcon, Medal } from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Sector } from "recharts";

// --- Types ---
interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints: number;
  ContestRating: number;
}

interface ContributionDay {
  date: string;
  count: number;
}

const CodingDashboard = () => {
  // 1. HARDCODED STATS (From your Screenshots)
  const [leetcodeStats] = useState<LeetCodeStats>({
    totalSolved: 562,    // From Image 1
    easySolved: 100,     // From Image 1
    mediumSolved: 196,   // From Image 1
    hardSolved: 30,      // From Image 1
    ranking: 375485,
    contributionPoints: 0,
    ContestRating: 1607, // Kept as requested
  });

  const [gfgCount] = useState<number>(236); // From Image 2

  // 2. HARDCODED GRAPH DATA
  const [ratingData] = useState<any[]>([
    { date: 'Jan', rating: 1500 },
    { date: 'Feb', rating: 1536 },
    { date: 'Mar', rating: 1571 },
    { date: 'Apr', rating: 1607 }
  ]);

  // Placeholder for GitHub (API removed)
  const [contributions] = useState<ContributionDay[]>([]);
  
  // --- Configuration ---
  // (Usernames kept for links only)
  const LEETCODE_USER = 'Chirag_bansal192005';
  const GITHUB_USER = 'cb-786';
  const GFG_USER = 'chiragbansv1qd';
  const CODECHEF_USER = 'c_bansal';
  const CODEFORCES_USER = 'cbansal';

  // --- Chart Logic ---
  const _leetEasy = leetcodeStats.easySolved;
  const _leetMed = leetcodeStats.mediumSolved;
  const _leetHard = leetcodeStats.hardSolved;
  
  // Custom GFG Breakdown based on your screenshot:
  // Image 2: School(2) + Basic(48) + Easy(94) = 144
  // Image 2: Medium(88)
  // Image 2: Hard(4)
  const gfgEasy = 144; 
  const gfgMed = 88;
  const gfgHard = 4;

  const problemData = [
    { name: 'Easy', value: _leetEasy + gfgEasy, color: 'hsl(var(--chart-1))' },
    { name: 'Medium', value: _leetMed + gfgMed, color: 'hsl(var(--chart-2))' },
    { name: 'Hard', value: _leetHard + gfgHard, color: 'hsl(var(--chart-3))' },
  ];

  const sliceColors = ['#28a745', '#f59e0b', '#ef4444'];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // --- Components ---
  const PlatformLink = ({ name, url, user, logo }: { name: string; url: string; user?: string; logo?: string }) => {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={`${name}${user ? ` — ${user}` : ''}`}
        className="group inline-flex items-center gap-3 bg-card border border-border/60 hover:border-primary/60 hover:shadow-xl transition transform hover:-translate-y-1 px-3 py-2 rounded-lg"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-muted/40 to-muted/10 ring-1 ring-transparent group-hover:ring-primary/30">
            {name === 'GitHub' ? <GithubIcon className="w-5 h-5"/> : 
             logo ? <img src={`/icons/${logo}`} alt={name} className="w-5 h-5 object-contain" onError={(e) => e.currentTarget.style.display='none'} /> :
             <Code2 className="w-5 h-5"/>
            }
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium">{name}</span>
          {user && <span className="text-xs text-muted-foreground">{user}</span>}
        </div>
      </a>
    );
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius - 4} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} stroke="rgba(0,0,0,0.08)" />
      </g>
    );
  };

  // Total calculation
  const totalSolvedDisplayed = leetcodeStats.totalSolved; // Only showing LeetCode total in the main card per previous logic

  const statCards = [
    {
      title: "Total Questions Solved",
      value: totalSolvedDisplayed,
      icon: Code2,
      color: "text-blue-500",
    },
    {
      title: "LeetCode Rank",
      value: leetcodeStats.ranking.toLocaleString(),
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Latest Achievement",
      value: "100 Days Badge 2025",
      img: "https://assets.leetcode.com/static_assets/marketing/2025-100-days-badge.png", 
      icon: Medal,
      color: "text-orange-500",
      link: "https://leetcode.com/u/Chirag_bansal192005/"
    },
    {
      title: "Contest Rating",
      value: leetcodeStats.ContestRating,
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20" id="coding-dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Coding Journey
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Consistent improvement across platforms.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <PlatformLink name="LeetCode" url={`https://leetcode.com/u/${LEETCODE_USER}`} user={LEETCODE_USER} logo="LeetCode_logo_black.png" />
            <PlatformLink name="GeeksforGeeks" url={`https://www.geeksforgeeks.org/profile/${GFG_USER}`} user={GFG_USER} logo="GeeksForGeeks_logo.png" />
            {CODECHEF_USER && <PlatformLink name="CodeChef" url={`https://www.codechef.com/users/${CODECHEF_USER}`} user={CODECHEF_USER} logo={"codechef.png"} />}
            {CODEFORCES_USER && <PlatformLink name="CodeForces" url={`https://codeforces.com/profile/${CODEFORCES_USER}`} user={CODEFORCES_USER} logo={"codeforces.webp"} />}
            <PlatformLink name="GitHub" url={`https://github.com/${GITHUB_USER}`} user={GITHUB_USER} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <a key={index} href={stat.link || '#'} className={`block ${!stat.link && 'cursor-default'}`}>
                <Card className="border-muted/40 hover:border-primary/50 transition-transform duration-300 hover:shadow-2xl transform hover:-translate-y-2 h-full">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold truncate">{stat.value}</h3>
                    </div>
                    {stat.img ? (
                        <img 
                            src={stat.img} 
                            alt={stat.title} 
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                            className="w-12 h-12 object-contain" 
                        />
                    ) : null}
                    <stat.icon className={`w-8 h-8 ${stat.color} ${stat.img ? 'hidden' : ''}`} />
                    </div>
                </CardContent>
                </Card>
            </a>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Problem Breakdown */}
          <Card className="border-muted/40 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Problem Breakdown (LeetCode + GFG)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="w-full md:w-2/3 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={problemData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        cornerRadius={5}
                        activeIndex={activeIndex ?? undefined}
                        activeShape={renderActiveShape}
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        {problemData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={sliceColors[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
                  {problemData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sliceColors[index] }} />
                      <span className="text-sm text-muted-foreground">
                        {item.name}: <strong className="text-foreground">{item.value}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Progress */}
          <Card className="border-muted/40 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                LeetCode Rating History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingData}>
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Line type="monotone" dataKey="rating" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Contributions */}
        <Card className="border-muted/40 hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-primary" />
              GitHub Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <CalendarHeatmap
                  startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                  endDate={new Date()}
                  values={contributions}
                  classForValue={(value) => {
                    if (!value || value.count === 0) return 'color-empty';
                    return `color-scale-${Math.min(Math.ceil(value.count / 2), 4)}`;
                  }}
                  titleForValue={(value) => value ? `${value.date}: ${value.count} contributions` : ''}
                  showWeekdayLabels
                />
              </div>
            </div>
            
            <style>{`
              .react-calendar-heatmap .color-empty { fill: hsl(var(--muted) / 0.3); }
              .react-calendar-heatmap .color-scale-1 { fill: hsl(var(--primary) / 0.3); }
              .react-calendar-heatmap .color-scale-2 { fill: hsl(var(--primary) / 0.5); }
              .react-calendar-heatmap .color-scale-3 { fill: hsl(var(--primary) / 0.7); }
              .react-calendar-heatmap .color-scale-4 { fill: hsl(var(--primary)); }
              .react-calendar-heatmap text { fill: hsl(var(--muted-foreground)); font-size: 10px; }
            `}</style>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CodingDashboard;
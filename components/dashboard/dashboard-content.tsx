
import {
  LayoutDashboard,
  FolderKanban,
  HandCoins,
  Wallet,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CircleDollarSign,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Projects", icon: FolderKanban },
  { name: "Donors", icon: HandCoins },
  { name: "Budgets", icon: Wallet },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Reports", icon: ChartNoAxesCombined },
];

const stats = [
  {
    title: "Total Funding",
    value: "$2,500,000.00",
    change: "+12.5%",
    icon: CircleDollarSign,
    trend: "up",
  },
  {
    title: "Total Expenses",
    value: "$875,000.00",
    change: "+8.2%",
    icon: TrendingDown,
    trend: "up",
  },
  {
    title: "Remaining Budget",
    value: "$1,625,000.00",
    change: "65% available",
    icon: Wallet,
    trend: "neutral",
  },
  {
    title: "Active Projects",
    value: "8",
    change: "3 donors",
    icon: FolderKanban,
    trend: "neutral",
  },
];

const projects = [
  {
    name: "Community Health Program",
    budget: 500000,
    spent: 325000,
  },
  {
    name: "Education Support Initiative",
    budget: 750000,
    spent: 240000,
  },
  {
    name: "Clean Water Project",
    budget: 400000,
    spent: 180000,
  },
  {
    name: "Emergency Relief Program",
    budget: 850000,
    spent: 130000,
  },
];

const transactions = [
  {
    id: "TRX-1001",
    description: "Medical Equipment",
    project: "Community Health",
    date: "Nov 08, 2026",
    amount: -12500,
    status: "Posted",
  },
  {
    id: "TRX-1002",
    description: "Donor Contribution",
    project: "Education Support",
    date: "Nov 07, 2026",
    amount: 50000,
    status: "Posted",
  },
  {
    id: "TRX-1003",
    description: "Training Materials",
    project: "Community Health",
    date: "Nov 06, 2026",
    amount: -3200,
    status: "Draft",
  },
  {
    id: "TRX-1004",
    description: "Water Supply Equipment",
    project: "Clean Water",
    date: "Nov 05, 2026",
    amount: -18000,
    status: "Posted",
  },
];

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      {/* Sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-slate-100 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <HandCoins size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                FundTrack
              </h1>
              <p className="text-xs text-slate-500">
                Financial Management
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600"
                }`}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600">
            <Settings size={19} />
            Settings
          </div>

          <div className="mt-4 rounded-xl bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">
              FundTrack
            </p>
            <p className="mt-1 text-xs text-blue-700">
              Your financial overview in one place.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Dashboard
            </h2>
            <p className="text-sm text-slate-500">
              Financial overview and project activity
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <Search size={20} />
            <Bell size={20} />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              FT
            </div>
          </div>
        </header>

        <main className="space-y-8 p-5 lg:p-8">
          {/* Welcome */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Financial Overview
              </h1>
              <Badge variant="secondary">
                Demo Data
              </Badge>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Monitor funding, expenses, and project budgets.
            </p>
          </div>

          {/* Statistics */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.title} className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <Icon size={20} />
                      </div>
                    </div>

                    <p className="mt-4 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs">
                      {stat.trend === "up" && (
                        <TrendingUp
                          size={15}
                          className="text-emerald-600"
                        />
                      )}

                      <span className="font-medium text-slate-600">
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          {/* Budget Overview */}
          <section className="grid gap-6 xl:grid-cols-3">
            <Card className="border-slate-200 xl:col-span-2">
              <CardHeader>
                <CardTitle>Project Budget Utilization</CardTitle>
                <p className="text-sm text-slate-500">
                  Budget allocation and expenditure by project
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {projects.map((project) => {
                  const percentage =
                    (project.spent / project.budget) * 100;

                  return (
                    <div key={project.name}>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-medium">
                          {project.name}
                        </span>

                        <span className="text-xs text-slate-500">
                          {formatUSD(project.spent)} /{" "}
                          {formatUSD(project.budget)}
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                          }}
                        />
                      </div>

                      <p className="mt-1 text-right text-xs text-slate-500">
                        {percentage.toFixed(1)}% utilized
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Funding Summary</CardTitle>
                <p className="text-sm text-slate-500">
                  Overall financial allocation
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex justify-center py-7">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border-[18px] border-blue-600 bg-white">
                    <div className="text-center">
                      <p className="text-3xl font-bold">35%</p>
                      <p className="text-xs text-slate-500">
                        Budget Used
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <DollarSign size={16} />
                      Total Funding
                    </span>
                    <strong>$2,500,000</strong>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <ArrowUpRight size={16} />
                      Total Spent
                    </span>
                    <strong>$875,000</strong>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Activity size={16} />
                      Available
                    </span>
                    <strong>$1,625,000</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recent Transactions */}
          <section>
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <p className="mt-1 text-sm text-slate-500">
                      Latest financial activities
                    </p>
                  </div>

                  <Badge variant="outline">
                    <ArrowLeftRight className="mr-1 h-3 w-3" />
                    USD
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b text-slate-500">
                        <th className="pb-4 font-medium">Reference</th>
                        <th className="pb-4 font-medium">Description</th>
                        <th className="pb-4 font-medium">Project</th>
                        <th className="pb-4 font-medium">Date</th>
                        <th className="pb-4 font-medium">Status</th>
                        <th className="pb-4 text-right font-medium">
                          Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b last:border-0"
                        >
                          <td className="py-4 font-medium">
                            {transaction.id}
                          </td>

                          <td className="py-4">
                            {transaction.description}
                          </td>

                          <td className="py-4 text-slate-500">
                            {transaction.project}
                          </td>

                          <td className="py-4 text-slate-500">
                            {transaction.date}
                          </td>

                          <td className="py-4">
                            <Badge
                              variant={
                                transaction.status === "Posted"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </td>

                          <td
                            className={`py-4 text-right font-semibold ${
                              transaction.amount >= 0
                                ? "text-emerald-600"
                                : "text-slate-900"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : "-"}
                            {formatUSD(
                              Math.abs(transaction.amount)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <footer className="text-center text-xs text-slate-400">
            FundTrack — Financial Management Platform
          </footer>
        </main>
      </div>
    </div>
  );
}



import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Users, UserCheck, DollarSign, TrendingUp, Dumbbell, Utensils, Wind, Layers } from "lucide-react"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useAdminStore } from "../../store/admin-store"
import { Chart, ChartContainer, ChartTooltip } from "../../components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { stats, fetchStats, isLoading } = useAdminStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const pieColors = ["#00A8FF", "#0096E6", "#0084CC", "#0072B3", "#00609A"]

  const {
    totalUsers = 0,
    totalTrainers = 0,
    newUsersThisMonth = 0,
    revenue = 0,
    totalWorkouts = 0,
    totalMeals = 0,
    totalMeditations = 0,
    totalPrograms = 0,
    userGrowth = [],
    revenueByMonth = [],
    usersByPlan = [],
    contentCreation = [],
  } = stats || {}

  if (isLoading) {
    return(
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#ECECEE] border-t-[#00A8FF] mx-auto"></div>
            <p className="text-[#0E0E2C]">Loading dashboard data...</p>
          </div>
        </div>
    )    
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-3">
            <Button onClick={() => navigate("/admin/users")} className="bg-[#00A8FF] hover:bg-[#0096E6]">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button onClick={() => navigate("/admin/trainers")} className="bg-[#00A8FF] hover:bg-[#0096E6]">
              <UserCheck className="mr-2 h-4 w-4" />
              Manage Trainers
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <UserCheck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Trainers</p>
                <p className="text-2xl font-bold">{totalTrainers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">New Users (Month)</p>
                <p className="text-2xl font-bold">{newUsersThisMonth}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(revenue)}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3 text-red-600">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Workouts</p>
                <p className="text-2xl font-bold">{totalWorkouts}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                <Utensils className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Meals</p>
                <p className="text-2xl font-bold">{totalMeals}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                <Wind className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Meditations</p>
                <p className="text-2xl font-bold">{totalMeditations}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                <Layers className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Programs</p>
                <p className="text-2xl font-bold">{totalPrograms}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">User Growth</h2>
            <div className="h-80">
              <ChartContainer>
                <Chart>
                  <AreaChart data={userGrowth} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00A8FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#00A8FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="users" stroke="#00A8FF" fillOpacity={1} fill="url(#userGrowthGradient)" />
                  </AreaChart>
                </Chart>
              </ChartContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Revenue</h2>
            <div className="h-80">
              <ChartContainer>
                <Chart>
                  <BarChart data={revenueByMonth} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`${formatCurrency(value)}`, "Revenue"]} labelFormatter={(label) => `Month: ${label}`} />
                    <Bar dataKey="revenue" fill="#00A8FF" />
                  </BarChart>
                </Chart>
              </ChartContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Users by Plan</h2>
            <div className="h-80">
              <ChartContainer>
                <Chart>
                  <PieChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <Pie data={usersByPlan} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                      {(usersByPlan || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Chart>
              </ChartContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Content Creation</h2>
            <div className="h-80">
              <ChartContainer>
                <Chart>
                  <BarChart data={contentCreation} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="workouts" name="Workouts" fill="#FF5A5F" />
                    <Bar dataKey="meals" name="Meals" fill="#FFB400" />
                    <Bar dataKey="meditations" name="Meditations" fill="#6B66FF" />
                  </BarChart>
                </Chart>
              </ChartContainer>
            </div>
          </Card>
        </div>
      </div>
  )
}
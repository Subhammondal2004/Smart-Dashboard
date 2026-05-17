import { useEffect, useMemo, useState } from 'react';

import {
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  PhoneCall,
} from 'lucide-react';

import { motion } from 'framer-motion';

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import api from '../api/axios';

import StatCard from '../components/common/StatCard';

import Card, {
  CardHeader,
  CardTitle,
  CardBody,
} from '../components/ui/Card';

import {
  SkeletonCard,
  SkeletonTable,
} from '../components/ui/Skeleton';

import toast from 'react-hot-toast';

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt?: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);

  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    contactedLeads: 0,
    lostLeads: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const res = await api.get('/leads?limit=200');

      const fetchedLeads =
        res.data.leads ||
        res.data.data ||
        [];

      setLeads(fetchedLeads);

      const total = fetchedLeads.length;

      const qualified = fetchedLeads.filter(
        (lead: Lead) =>
          lead.status === 'Qualified'
      ).length;

      const contacted = fetchedLeads.filter(
        (lead: Lead) =>
          lead.status === 'Contacted'
      ).length;

      const lost = fetchedLeads.filter(
        (lead: Lead) =>
          lead.status === 'Lost'
      ).length;

      setStats({
        totalLeads: total,
        qualifiedLeads: qualified,
        contactedLeads: contacted,
        lostLeads: lost,
        conversionRate:
          total > 0
            ? Math.round(
                (qualified / total) * 100
              )
            : 0,
      });
    } catch (error) {
      toast.error(
        'Failed to load dashboard data'
      );
    } finally {
      setLoading(false);
    }
  };

  const recentLeads = useMemo(() => {
    return [...leads]
      .reverse()
      .slice(0, 5);
  }, [leads]);

  const monthlyData = [
    {
      name: 'Jan',
      leads: 45,
      qualified: 20,
    },
    {
      name: 'Feb',
      leads: 60,
      qualified: 28,
    },
    {
      name: 'Mar',
      leads: 80,
      qualified: 40,
    },
    {
      name: 'Apr',
      leads: 75,
      qualified: 38,
    },
    {
      name: 'May',
      leads: 95,
      qualified: 52,
    },
    {
      name: 'Jun',
      leads: 110,
      qualified: 60,
    },
  ];

  const sourceStats = [
    {
      name: 'Website',
      value: leads.filter(
        (l) => l.source === 'Website'
      ).length,
    },
    {
      name: 'Instagram',
      value: leads.filter(
        (l) => l.source === 'Instagram'
      ).length,
    },
    {
      name: 'Referral',
      value: leads.filter(
        (l) => l.source === 'Referral'
      ).length,
    },
  ];

  const COLORS = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
  ];

  return (
    <div className='space-y-8'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className='mb-2 text-4xl font-bold text-gray-900 dark:text-white'>
          Dashboard
        </h1>

        <p className='text-gray-500 dark:text-gray-400'>
          Monitor lead performance and
          business growth
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.3,
        }}
        className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5'
      >
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              icon={Users}
              label='Total Leads'
              value={stats.totalLeads}
              change={12}
              changeLabel='vs last month'
            />

            <StatCard
              icon={CheckCircle}
              label='Qualified'
              value={stats.qualifiedLeads}
              change={8}
              changeLabel='vs last month'
            />

            <StatCard
              icon={PhoneCall}
              label='Contacted'
              value={stats.contactedLeads}
              change={4}
              changeLabel='vs last month'
            />

            <StatCard
              icon={XCircle}
              label='Lost Leads'
              value={stats.lostLeads}
              change={-5}
              changeLabel='vs last month'
            />

            <StatCard
              icon={TrendingUp}
              label='Conversion Rate'
              value={`${stats.conversionRate}%`}
              change={2}
              changeLabel='vs last month'
            />
          </>
        )}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.3,
        }}
        className='grid grid-cols-1 gap-6 xl:grid-cols-3'
      >
        {/* Line Chart */}
        <Card className='xl:col-span-2'>
          <CardHeader>
            <CardTitle>
              Lead Growth Analytics
            </CardTitle>
          </CardHeader>

          <CardBody>
            <ResponsiveContainer
              width='100%'
              height={350}
            >
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray='3 3' />

                <XAxis dataKey='name' />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type='monotone'
                  dataKey='leads'
                  stroke='#3B82F6'
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

                <Line
                  type='monotone'
                  dataKey='qualified'
                  stroke='#10B981'
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              Leads by Source
            </CardTitle>
          </CardHeader>

          <CardBody>
            <ResponsiveContainer
              width='100%'
              height={350}
            >
              <PieChart>
                <Pie
                  data={sourceStats}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  label
                >
                  {sourceStats.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </motion.div>

      {/* Recent Leads */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.3,
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Recent Leads
            </CardTitle>
          </CardHeader>

          <CardBody>
            {loading ? (
              <SkeletonTable rows={5} />
            ) : recentLeads.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-16'>
                <Users className='mb-4 h-14 w-14 text-gray-400' />

                <p className='text-gray-500'>
                  No leads found
                </p>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-200 dark:border-gray-800'>
                      <th className='px-4 py-4 text-left text-sm font-semibold'>
                        Name
                      </th>

                      <th className='px-4 py-4 text-left text-sm font-semibold'>
                        Email
                      </th>

                      <th className='px-4 py-4 text-left text-sm font-semibold'>
                        Status
                      </th>

                      <th className='px-4 py-4 text-left text-sm font-semibold'>
                        Source
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentLeads.map(
                      (lead, index) => (
                        <motion.tr
                          key={lead._id}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              index * 0.05,
                          }}
                          className='border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900'
                        >
                          <td className='px-4 py-4 font-medium text-gray-900 dark:text-white'>
                            {lead.name}
                          </td>

                          <td className='px-4 py-4 text-gray-500'>
                            {lead.email}
                          </td>

                          <td className='px-4 py-4'>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                lead.status ===
                                'Qualified'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                  : lead.status ===
                                      'Lost'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                    : lead.status ===
                                        'Contacted'
                                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>

                          <td className='px-4 py-4 text-gray-500'>
                            {lead.source}
                          </td>
                        </motion.tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
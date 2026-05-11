import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShoppingCart, DollarSign, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrdersCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Get all orders for stats
      const { data: allOrders } = await supabase
        .from('orders')
        .select('total, status, created_at');

      if (allOrders) {
        const revenue = allOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const pendingCount = allOrders.filter(o => o.status === 'pending').length;
        
        setStats({
          totalOrders: allOrders.length,
          totalRevenue: revenue,
          pendingOrdersCount: pendingCount
        });
      }

      // Get recent pending orders
      const { data: recent } = await supabase
        .from('orders')
        .select('id, total, status, created_at, user_id, phone')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recent) {
        setRecentOrders(recent);
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-blue-50 p-4 rounded-lg mr-4">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-green-50 p-4 rounded-lg mr-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-yellow-50 p-4 rounded-lg mr-4">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingOrdersCount}</p>
          </div>
        </div>
      </div>

      {/* Recent Pending Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Pending Orders</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentOrders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No pending orders.</div>
          ) : (
            recentOrders.map(order => (
              <div key={order.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

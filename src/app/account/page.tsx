'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Settings, 
  ChevronRight,
  Edit2,
  LogOut,
  Bell,
  Shield,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const accountTabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const recentOrders = [
  { id: 'TGD-12345', date: 'Mar 1, 2024', status: 'Delivered', total: 89.99 },
  { id: 'TGD-12234', date: 'Feb 22, 2024', status: 'In Transit', total: 156.00 },
  { id: 'TGD-12123', date: 'Feb 15, 2024', status: 'Delivered', total: 45.50 },
];

const savedAddresses = [
  { id: 1, type: 'Home', name: 'John Doe', address: '123 Main Street, Apt 4B', city: 'Toronto, ON M5V 1A1', phone: '+1 (416) 555-0123', default: true },
  { id: 2, type: 'Work', name: 'John Doe', address: '456 Bay Street, Floor 12', city: 'Toronto, ON M5J 2R6', phone: '+1 (416) 555-0456', default: false },
];

const wishlistItems = [
  { id: 1, name: 'Handcrafted Maple Candle', artisan: 'GreenLeaf Candles', price: 32.00, image: 'https://images.unsplash.com/photo-1602607753392-89d8c3e5e3c7?w=200&h=200&fit=crop' },
  { id: 2, name: 'Ceramic Pour Over Set', artisan: 'Clay & Co.', price: 68.00, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop' },
  { id: 3, name: 'Organic Honey Gift Box', artisan: 'Urban Beekeepers', price: 45.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">Welcome back, John!</h1>
                <p className="opacity-80">Manage your account and orders</p>
              </div>
            </div>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tabs List */}
            <TabsList className="bg-white rounded-xl p-1 flex flex-wrap gap-1">
              {accountTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">Total Orders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-muted-foreground">Wishlist Items</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-maple/10 rounded-full flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-maple" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">$248</p>
                        <p className="text-sm text-muted-foreground">Saved This Year</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 rounded-lg gap-4">
                        <div className="flex-1">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date} • 3 items</p>
                        </div>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <Button size="sm" variant="outline">Track</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button size="sm">Add New Address</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {savedAddresses.map((addr) => (
                      <div key={addr.id} className={cn(
                        "p-4 border rounded-lg",
                        addr.default ? "border-primary bg-primary/5" : "border-border"
                      )}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{addr.type}</span>
                            {addr.default && <Badge variant="secondary" className="text-xs">Default</Badge>}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm">{addr.name}</p>
                        <p className="text-sm text-muted-foreground">{addr.address}</p>
                        <p className="text-sm text-muted-foreground">{addr.city}</p>
                        <p className="text-sm text-muted-foreground mt-1">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="group border rounded-lg overflow-hidden">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground">{item.artisan}</p>
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                            <Button size="sm">Add to Cart</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <Input defaultValue="John" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <Input defaultValue="Doe" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="john@example.com" type="email" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input defaultValue="+1 (416) 555-0123" type="tel" className="mt-1" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified about your order status</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-muted-foreground">Receive offers and updates</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Artisan Updates</p>
                        <p className="text-sm text-muted-foreground">News from your favorite makers</p>
                      </div>
                      <input type="checkbox" className="h-5 w-5 accent-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Password & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <Input type="password" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <Input type="password" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input type="password" className="mt-1" />
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

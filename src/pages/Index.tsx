import React, { useState } from 'react';
import { Car, Search, Filter, Plus, LogOut, User, Settings, CheckCircle, AlertCircle, Clock, Eye, Trash2, MessageSquare, Star, MapPin, Calendar, Gauge } from 'lucide-react';

type UserRole = 'buyer' | 'seller' | 'admin' | null;

interface Vehicle {
  id: string;
  model: string;
  year: number;
  price: number;
  condition: 'excellent' | 'good' | 'fair';
  mileage: number;
  seller: string;
  image: string;
  status?: 'approved' | 'pending' | 'rejected';
  views?: number;
  likes?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  verified?: boolean;
}

const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: '1',
    model: 'Toyota Corolla',
    year: 2022,
    price: 850000,
    condition: 'excellent',
    mileage: 45000,
    seller: 'Ahmed Motors',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
    status: 'approved',
    views: 234,
    likes: 45,
  },
  {
    id: '2',
    model: 'Honda Civic',
    year: 2021,
    price: 720000,
    condition: 'good',
    mileage: 62000,
    seller: 'Capital Auto',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
    status: 'approved',
    views: 189,
    likes: 32,
  },
  {
    id: '3',
    model: 'Hyundai Accent',
    year: 2020,
    price: 580000,
    condition: 'good',
    mileage: 78000,
    seller: 'Addis Auto Sales',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    status: 'pending',
    views: 45,
    likes: 8,
  },
  {
    id: '4',
    model: 'Volkswagen Golf',
    year: 2019,
    price: 650000,
    condition: 'fair',
    mileage: 95000,
    seller: 'Premium Motors',
    image: 'https://images.unsplash.com/photo-1609708536965-52294c3a2e0f?w=400&h=300&fit=crop',
    status: 'approved',
    views: 156,
    likes: 28,
  },
];

export default function Index() {
  const [currentUser, setCurrentUser] = useState<UserRole>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [vehicles, setVehicles] = useState<Vehicle[]>(SAMPLE_VEHICLES);
  const [sellerListings, setSellerListings] = useState<Vehicle[]>(SAMPLE_VEHICLES.slice(0, 2));

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = v.model.toLowerCase().includes(searchQuery.toLowerCase()) || v.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = !selectedCondition || v.condition === selectedCondition;
    const matchesPrice = v.price >= priceRange[0] && v.price <= priceRange[1];
    return matchesSearch && matchesCondition && matchesPrice;
  });

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
  };

  // LOGIN SCREEN
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-primary p-3 rounded-lg">
                <Car className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-foreground mb-2">Welteji</h1>
            <p className="text-center text-muted-foreground mb-8">Car Marketplace for Ethiopia</p>

            <div className="space-y-3">
              <button onClick={() => handleLogin('buyer')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition">
                Sign in as Buyer
              </button>
              <button onClick={() => handleLogin('seller')} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-3 px-4 rounded-lg transition">
                Sign in as Seller
              </button>
              <button onClick={() => handleLogin('admin')} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-4 rounded-lg transition">
                Sign in as Admin
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">Demo: Click any role to explore the dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  // BUYER DASHBOARD
  if (currentUser === 'buyer') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Car className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Welteji</h1>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="bg-card rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Find Your Perfect Car</h2>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input type="text" placeholder="Search by model or seller..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground" />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Condition</label>
                <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground">
                  <option value="">All Conditions</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Max Price: {priceRange[1].toLocaleString()} Br</label>
                <input type="range" min="0" max="1000000" step="50000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full" />
              </div>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Available Vehicles ({filteredVehicles.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="relative">
                    <img src={vehicle.image} alt={vehicle.model} className="w-full h-40 object-cover" />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">{vehicle.price.toLocaleString()} Br</div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-2">{vehicle.model}</h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{vehicle.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${vehicle.condition === 'excellent' ? 'bg-green-100 text-green-800' : vehicle.condition === 'good' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {vehicle.condition}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {vehicle.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {vehicle.likes}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">By: {vehicle.seller}</p>

                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // SELLER DASHBOARD
  if (currentUser === 'seller') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Car className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Welteji Seller</h1>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-primary">
              <p className="text-muted-foreground text-sm mb-1">Active Listings</p>
              <p className="text-3xl font-bold text-foreground">2</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-accent">
              <p className="text-muted-foreground text-sm mb-1">Pending Approval</p>
              <p className="text-3xl font-bold text-foreground">1</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-success">
              <p className="text-muted-foreground text-sm mb-1">Total Views</p>
              <p className="text-3xl font-bold text-foreground">423</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-primary">
              <p className="text-muted-foreground text-sm mb-1">Inquiries</p>
              <p className="text-3xl font-bold text-foreground">12</p>
            </div>
          </div>

          {/* Add Listing Button */}
          <button className="mb-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Listing
          </button>

          {/* Listings */}
          <h2 className="text-xl font-bold text-foreground mb-4">Your Listings</h2>
          <div className="space-y-4">
            {sellerListings.map((vehicle) => (
              <div key={vehicle.id} className="bg-card rounded-lg shadow-md p-6 border border-border">
                <div className="flex gap-6">
                  <img src={vehicle.image} alt={vehicle.model} className="w-32 h-32 object-cover rounded-lg" />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{vehicle.model}</h3>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.year} • {vehicle.mileage.toLocaleString()} km • {vehicle.condition}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${vehicle.status === 'approved' ? 'bg-green-100 text-green-800' : vehicle.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {vehicle.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                        {vehicle.status === 'pending' && <Clock className="w-4 h-4" />}
                        {vehicle.status === 'rejected' && <AlertCircle className="w-4 h-4" />}
                        <span className="capitalize">{vehicle.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-bold text-foreground">{vehicle.price.toLocaleString()} Br</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-bold text-foreground">{vehicle.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Inquiries</p>
                        <p className="font-bold text-foreground">5</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition text-sm">
                        Edit
                      </button>
                      <button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 px-4 rounded-lg transition text-sm">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Inquiries
                      </button>
                      <button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-2 px-4 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (currentUser === 'admin') {
    const pendingListings = vehicles.filter((v) => v.status === 'pending');
    const totalUsers = 156;
    const totalListings = vehicles.length;
    const totalViews = vehicles.reduce((sum, v) => sum + (v.views || 0), 0);

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-accent p-2 rounded-lg">
                  <Car className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Welteji Admin</h1>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-primary">
              <p className="text-muted-foreground text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-foreground">{totalUsers}</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-success">
              <p className="text-muted-foreground text-sm mb-1">Total Listings</p>
              <p className="text-3xl font-bold text-foreground">{totalListings}</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-accent">
              <p className="text-muted-foreground text-sm mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-foreground">{pendingListings.length}</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-warning">
              <p className="text-muted-foreground text-sm mb-1">Total Views</p>
              <p className="text-3xl font-bold text-foreground">{totalViews}</p>
            </div>
          </div>

          {/* Pending Listings for Moderation */}
          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Pending Listings ({pendingListings.length})
            </h2>

            <div className="space-y-4">
              {pendingListings.length > 0 ? (
                pendingListings.map((vehicle) => (
                  <div key={vehicle.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition">
                    <div className="flex gap-4">
                      <img src={vehicle.image} alt={vehicle.model} className="w-24 h-24 object-cover rounded" />

                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{vehicle.model}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {vehicle.year} • {vehicle.mileage.toLocaleString()} km • {vehicle.price.toLocaleString()} Br
                        </p>
                        <p className="text-sm text-muted-foreground">Seller: {vehicle.seller}</p>
                      </div>

                      <div className="flex gap-2">
                        <button className="bg-success hover:bg-success/90 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No pending listings</p>
              )}
            </div>
          </div>

          {/* All Listings Overview */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">All Listings</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Model</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Seller</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Views</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-3 px-4 text-foreground font-medium">{vehicle.model}</td>
                      <td className="py-3 px-4 text-muted-foreground">{vehicle.seller}</td>
                      <td className="py-3 px-4 text-foreground font-semibold">{vehicle.price.toLocaleString()} Br</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${vehicle.status === 'approved' ? 'bg-green-100 text-green-800' : vehicle.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-foreground">{vehicle.views}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:text-primary/80 font-semibold text-xs">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

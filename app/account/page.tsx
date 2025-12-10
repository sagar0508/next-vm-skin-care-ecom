import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, MapPin, Edit2 } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 2499,
    items: ["Vitamin C Brightening Serum", "Retinol Night Cream"],
  },
  {
    id: "ORD-002",
    date: "2024-01-28",
    status: "In Transit",
    total: 1299,
    items: ["Hyaluronic Acid Moisturizer"],
  },
];

const mockAddresses = [
  {
    id: 1,
    type: "Home",
    name: "Priya Sharma",
    address: "42, Sunshine Apartments, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: 2,
    type: "Office",
    name: "Priya Sharma",
    address: "Tech Park, Building C, Floor 5",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400076",
    phone: "+91 98765 43210",
    isDefault: false,
  },
];

export default function Account() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          My Account
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      Priya Sharma
                    </h3>
                    <p className="text-muted-foreground">
                      priya.sharma@email.com
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Priya" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="priya.sharma@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-semibold">
                            {order.id}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Ordered on{" "}
                          {new Date(order.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-lg font-semibold text-primary">
                          ₹{order.total.toLocaleString()}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="grid md:grid-cols-2 gap-4">
              {mockAddresses.map((address) => (
                <Card
                  key={address.id}
                  className={address.isDefault ? "border-primary" : ""}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                            Default
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-display font-semibold mb-1">
                      {address.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {address.address}
                      <br />
                      {address.city}, {address.state} - {address.pincode}
                      <br />
                      {address.phone}
                    </p>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed flex items-center justify-center min-h-[200px]">
                <Button variant="outline" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Add New Address
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

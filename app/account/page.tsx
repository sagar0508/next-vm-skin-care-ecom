"use client";

import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, MapPin, Edit2, LogOut, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(logout());
      if (logout.fulfilled.match(response)) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            My Account
          </h1>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                disabled={isLoading}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will end your current session and you will need to login
                  again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4 mr-2" />
                  )}
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

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
                      {userDetails?.name || "User Name"}
                    </h3>
                    <p className="text-muted-foreground">
                      {userDetails?.email || "user@email.com"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue={userDetails?.name || ""}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userDetails?.email || ""}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                </div>
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

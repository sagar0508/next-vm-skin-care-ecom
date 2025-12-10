"use client";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Droplets,
  Sparkles,
  Star,
  Phone,
  MapPin,
  MessageCircle,
  Shield,
  Zap,
  Sun,
  Heart,
  CheckCircle,
  ChevronRight,
  Instagram,
  Facebook,
  Clock,
  Users,
  Award,
} from "lucide-react";
import heroImage from "@/assets/korean-glass-hero.jpg";

const treatmentSteps = [
  {
    step: 1,
    title: "Deep Cleansing",
    desc: "Remove impurities & prep skin",
    icon: Droplets,
  },
  {
    step: 2,
    title: "Gentle Exfoliation",
    desc: "Smooth & refine texture",
    icon: Sparkles,
  },
  {
    step: 3,
    title: "Hydration Mask",
    desc: "Intense moisture infusion",
    icon: Heart,
  },
  {
    step: 4,
    title: "Glass Skin Serum",
    desc: "Korean glass serum infusion",
    icon: Zap,
  },
  { step: 5, title: "LED Therapy", desc: "Collagen stimulation", icon: Sun },
  { step: 6, title: "Moisture Lock", desc: "Seal in hydration", icon: Shield },
  { step: 7, title: "Glow Finish", desc: "SPF & radiant glow", icon: Star },
];

const benefits = [
  {
    icon: Droplets,
    title: "Hydration Boost",
    desc: "Deep moisture penetration",
  },
  { icon: Sparkles, title: "Skin Brightening", desc: "Luminous, even tone" },
  { icon: Heart, title: "Wrinkle Reduction", desc: "Smooth fine lines" },
  { icon: Shield, title: "Collagen Support", desc: "Firm & plump skin" },
  { icon: Zap, title: "Deep Pore Cleansing", desc: "Refined pores" },
];

const skinConcerns = [
  { title: "Dull Skin", desc: "Restore natural radiance" },
  { title: "Pigmentation", desc: "Even out skin tone" },
  { title: "Uneven Tone", desc: "Achieve uniform complexion" },
  { title: "Dry Skin", desc: "Deep hydration therapy" },
  { title: "Large Pores", desc: "Minimize & tighten" },
  { title: "Pre-Event Glow", desc: "Wedding & party ready" },
];

const testimonials = [
  {
    name: "Priya M.",
    rating: 5,
    text: "My skin has never looked this glowing! The Korean Glass Skin treatment at VM Skin Care is absolutely worth it. Everyone asks about my skincare routine now!",
    date: "2 weeks ago",
  },
  {
    name: "Anjali S.",
    rating: 5,
    text: "Got this done before my wedding and the results were stunning! My skin looked flawless in all photos. Highly recommend VM Skin Care!",
    date: "1 month ago",
  },
  {
    name: "Ritu K.",
    rating: 5,
    text: "The 7-step process is so relaxing and the results are visible immediately. My skin feels so soft and looks so healthy. Love it!",
    date: "3 weeks ago",
  },
  {
    name: "Sneha P.",
    rating: 5,
    text: "Best skincare experience in Deesa! The staff is professional and the treatment gave me that K-beauty glow I always wanted.",
    date: "1 week ago",
  },
];

export default function KoreanGlassTreatment() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I am interested in the Korean Glass Skin Treatment at VM Skin Care. Please share more details."
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.open("tel:+919876543210", "_self");
  };

  const handleDirections = () => {
    window.open(
      "https://maps.google.com/?q=Shree+Ram+Complex+Deesa+385535",
      "_blank"
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `New Appointment Request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPreferred Date: ${formData.date}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
    setBookingOpen(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 " />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${heroImage.src})` }}
        />

        <div className="container mx-auto px-4 relative z-20 mx-auto max-w-7xl">
          <div className="max-w-2xl">
            {/* Floating Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <Zap className="h-4 w-4" /> Instant Glow
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                <Shield className="h-4 w-4" /> No Side Effects
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                <Award className="h-4 w-4" /> Dermat Approved
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Get the <span className="text-primary">Korean Glass Skin</span>{" "}
              Glow
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Advanced 7-Step Glass Skin Treatment by{" "}
              <span className="text-primary font-semibold">VM Skin Care</span>.
              Experience the secret to flawless, luminous skin that Korean
              celebrities swear by.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Book Appointment
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-center">
                      Book Your Appointment
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Any specific concerns or questions?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Send Booking Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsApp}
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-full"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Inquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Korean Glass Skin */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4  max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              What is <span className="text-primary">Korean Glass Skin</span>{" "}
              Treatment?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Korean Glass Skin is the epitome of skincare perfection – a
              complexion so luminous, hydrated, and poreless that it resembles
              glass. Our advanced 7-step treatment combines{" "}
              <span className="text-primary font-medium">
                ultra-hydration, pore tightening, and brightening techniques
              </span>{" "}
              to give you that coveted K-beauty glow that looks naturally
              flawless and radiantly healthy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Step Treatment Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The <span className="text-primary">7-Step</span> Korean Glass Skin
              Method
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our signature treatment protocol designed to transform
              your skin
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              {treatmentSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg mb-4">
                    <step.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <span className="text-xs text-primary font-medium mb-1">
                    Step {step.step}
                  </span>
                  <h3 className="font-display font-semibold text-foreground text-center text-sm md:text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center mt-1 hidden md:block">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real <span className="text-primary">Results</span>
            </h2>
            <p className="text-muted-foreground">
              Real Results from VM Skin Care Clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="overflow-hidden border-primary/10 hover:shadow-xl transition-all"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 bg-muted/50 flex items-center justify-center border-r border-white/50">
                        <span className="text-muted-foreground text-sm">
                          Before
                        </span>
                      </div>
                      <div className="w-1/2 bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-medium">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm text-center">
                        Glass Skin Transformation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who Is This <span className="text-primary">Treatment For</span>?
            </h2>
            <p className="text-muted-foreground">
              Perfect for anyone looking to achieve flawless, glowing skin
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {skinConcerns.map((concern, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-secondary/50 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                    <CheckCircle className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {concern.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {concern.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Treatment <span className="text-primary">Pricing</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Single Session */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Single Session
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Perfect for first-time experience
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-primary">
                    ₹2,499
                  </span>
                  <span className="text-muted-foreground">/session</span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Complete 7-Step Treatment</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>60-90 Minutes Session</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Instant Glow Results</span>
                  </li>
                </ul>
                <Button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            {/* 3 Sessions */}
            <Card className="border-2 border-primary relative overflow-hidden shadow-xl scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                Most Popular
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  3 Sessions Pack
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Recommended for best results
                </p>
                <div className="mb-2">
                  <span className="text-4xl font-display font-bold text-primary">
                    ₹6,499
                  </span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-6">
                  Save ₹998 (13% OFF)
                </p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>3 Complete Treatments</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Free Skin Analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Home Care Kit Included</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Long-lasting Results</span>
                  </li>
                </ul>
                <Button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            {/* 6 Sessions */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  6 Sessions Pack
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Ultimate transformation package
                </p>
                <div className="mb-2">
                  <span className="text-4xl font-display font-bold text-primary">
                    ₹11,999
                  </span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-6">
                  Save ₹2,995 (20% OFF)
                </p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>6 Complete Treatments</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Premium Skin Analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Deluxe Home Care Kit</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Priority Booking</span>
                  </li>
                </ul>
                <Button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <p className="text-muted-foreground">
              Real experiences from VM Skin Care clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-secondary/30 border-primary/10 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {testimonial.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visit <span className="text-primary">VM Skin Care</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-primary mb-4">
                      VM Skin Care
                    </h3>
                    <div className="flex items-start gap-3 mb-6">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-foreground">
                          1st Floor, Shree Ram Complex,
                        </p>
                        <p className="text-foreground">
                          Near Shubham Party Plot,
                        </p>
                        <p className="text-foreground font-medium">
                          Deesa – 385535
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <p className="text-muted-foreground">
                        Open: 10:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={handleWhatsApp}
                      className="bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp Now
                    </Button>
                    <Button
                      onClick={handleCall}
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-6 text-lg"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                    <Button
                      onClick={handleDirections}
                      variant="outline"
                      className="border-2 border-muted-foreground/30 py-6 text-lg"
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      {/* <footer className="py-8 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/70">
              © 2024 VM Skin Care. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-background/70 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/70 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/70 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer> */}

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary/20 p-3 md:hidden z-50 shadow-lg">
        <div className="flex gap-3">
          <Button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button
            onClick={() => setBookingOpen(true)}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-16 md:hidden" />
    </Layout>
  );
}

"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully!", {
      description: "We will get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary to-background py-16">
        <div className="container text-center max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Get in Touch
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products? We'd love to hear from you. Send
            us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="container sm:py-16 py-8 mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                    <p className="text-muted-foreground mt-1">
                      line no .3, B-47,
                      <br />
                      virenpark-2, Deesa - Tharad Hwy,
                      <br />
                      Gujarat 385565, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <a
                      href="tel:+919928821756"
                      className="text-muted-foreground mt-1 hover:text-primary transition-colors"
                    >
                      +91 99288 21756
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <a
                      href="mailto:info@vmskincare.com"
                      className="text-muted-foreground mt-1 hover:text-primary transition-colors"
                    >
                      info@vmskincare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Monday - Saturday: 10:00 AM - 8:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-muted rounded-xl aspect-video overflow-hidden">
              {/* <iframe
                src="https://maps.app.goo.gl/RqnHpediujWyXcWP9"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d620372.8325047906!2d71.30915255927212!3d24.476997204589562!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395b5b9a6dd62375%3A0x903336241432c061!2sVm%20Korean%20treatment!5e1!3m2!1sen!2sus!4v1765339617682!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="order">Order Related</option>
                      <option value="feedback">Feedback</option>
                      <option value="wholesale">Wholesale/Bulk Order</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

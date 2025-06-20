"use client";
import { HomePageHeader } from "@/components/home-page-header";
import { GetStartedButton } from "@/components/pricing-buttons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { scrollToSection } = useSmoothScroll();
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <HomePageHeader />

      {/* Hero Section */}
      <section className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              <span>Documents Made Simple</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Chat With Your
            <span className="block text-primary">Documents</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-muted-foreground">
            Transform how you interact with your documents. Ask questions, get
            instant answers, and discover insights from your docs with our
            intelligent chat interface.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <GetStartedButton />
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-3"
              onClick={() => scrollToSection("features")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Insight Doc?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Our platform combines powerful AI with intuitive design to
            revolutionize how you access and understand your documents.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Intelligent Chat
            </h3>
            <p className="text-muted-foreground">
              Ask questions in natural language and get precise answers from
              your documents.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Lightning Fast
            </h3>
            <p className="text-muted-foreground">
              Get instant responses with our optimized search and AI-powered
              understanding.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Secure & Private
            </h3>
            <p className="text-muted-foreground">
              Your documents stay private and secure with enterprise-grade
              security.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Team Collaboration
            </h3>
            <p className="text-muted-foreground">
              Share insights and collaborate with your team on document
              discoveries.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Multiple Formats
            </h3>
            <p className="text-muted-foreground">
              Support for various document formats including Markdown, PDF, and
              more.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Easy Integration
            </h3>
            <p className="text-muted-foreground">
              Seamlessly integrate with your existing document workflows and
              tools.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by leading developers and enterprises
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Join thousands of teams who trust Insight Doc to transform their
            document workflows
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 items-center justify-items-center opacity-60">
          <div className="text-2xl font-bold text-muted-foreground">
            Microsoft
          </div>
          <div className="text-2xl font-bold text-muted-foreground">Google</div>
          <div className="text-2xl font-bold text-muted-foreground">
            Netflix
          </div>
          <div className="text-2xl font-bold text-muted-foreground">
            Spotify
          </div>
          <div className="text-2xl font-bold text-muted-foreground">Uber</div>
          <div className="text-2xl font-bold text-muted-foreground">Airbnb</div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10M+</div>
            <div className="text-muted-foreground">Documents Processed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Get started with Insight Doc in just three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              Upload Your Documents
            </h3>
            <p className="text-muted-foreground">
              Simply upload your documents in any format - PDF, Markdown, Word,
              or plain text.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              Ask Questions
            </h3>
            <p className="text-muted-foreground">
              Use natural language to ask questions about your documents and get
              instant answers.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              Get Insights
            </h3>
            <p className="text-muted-foreground">
              Discover new insights, find information quickly, and collaborate
              with your team.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Hear from developers and teams who have transformed their document
            workflows
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold">JD</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">John Doe</div>
                <div className="text-sm text-muted-foreground">
                  Senior Developer, TechCorp
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "Insight Doc has completely changed how our team interacts with
              documentation. Finding information is now instant and intuitive."
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold">AS</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Alice Smith</div>
                <div className="text-sm text-muted-foreground">
                  Product Manager, StartupXYZ
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "The AI-powered chat interface makes our technical documentation
              accessible to everyone on the team, not just developers."
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-semibold">MJ</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  Mike Johnson
                </div>
                <div className="text-sm text-muted-foreground">
                  CTO, Innovation Labs
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "Security and privacy were our top concerns. Insight Doc's
              enterprise-grade security gives us complete peace of mind."
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        id="use-cases"
        className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perfect for Every Team
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Whether you're a developer, product manager, or business analyst,
            Insight Doc adapts to your needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Development Teams
            </h3>
            <p className="text-muted-foreground">
              Quickly find API documentation, code examples, and technical
              specifications. Onboard new developers faster with intelligent
              Q&A.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Product Teams
            </h3>
            <p className="text-muted-foreground">
              Access product requirements, user stories, and feature
              specifications. Get instant answers about product capabilities and
              limitations.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Business Analysts
            </h3>
            <p className="text-muted-foreground">
              Analyze business requirements, process documentation, and
              compliance guidelines. Extract insights from complex business
              documents.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Research Teams
            </h3>
            <p className="text-muted-foreground">
              Search through research papers, technical reports, and academic
              documentation. Find relevant information across large document
              collections.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Customer Support
            </h3>
            <p className="text-muted-foreground">
              Access knowledge bases, FAQs, and troubleshooting guides. Provide
              accurate answers to customer questions instantly.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Legal & Compliance
            </h3>
            <p className="text-muted-foreground">
              Search through contracts, policies, and regulatory documents.
              Ensure compliance with instant access to legal requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-8 text-center bg-primary/5 rounded-2xl border border-primary/10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Join thousands of users who are already transforming their document
            experience with Insight Doc.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="text-base px-8 py-3">
              <Link href="/chats">
                Start Exploring Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  Insight Doc
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform how you interact with your documents through
                intelligent chat and AI-powered insights.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/chats"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
Chats                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 mt-8 border-t border-border">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>&copy; 2024 Insight Doc. All rights reserved.</span>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                Built with ❤️ for developers who love great documents.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

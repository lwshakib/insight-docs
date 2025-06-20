import { HomePageHeader } from "@/components/home-page-header";
import {
  GetStartedFreeButton,
  StartUsingCreditsButton,
} from "@/components/pricing-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Star, Zap } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HomePageHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with free credits and scale as you grow. No hidden fees, no
            surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              FREE
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Free Starter
              </CardTitle>
              <p className="text-muted-foreground">
                Perfect for getting started
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">$0</span>
                  <span className="text-muted-foreground ml-2">forever</span>
                </div>
                <p className="text-lg text-muted-foreground mt-2">
                  First 10,000 credits included
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  10,000 free credits
                </li>
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  No credit card required
                </li>
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Full access to all features
                </li>
              </ul>

              <GetStartedFreeButton />
            </CardContent>
          </Card>

          {/* Paid Tier */}
          <Card className="relative overflow-hidden border-2 border-blue-500">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              POPULAR
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Pay As You Go
              </CardTitle>
              <p className="text-muted-foreground">Scale with your needs</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">$5</span>
                  <span className="text-muted-foreground ml-2">
                    per 10,000 credits
                  </span>
                </div>
                <p className="text-lg text-muted-foreground mt-2">
                  After your free credits
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-blue-500 mr-3" />
                  $5 for every 10,000 credits
                </li>
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-blue-500 mr-3" />
                  No monthly commitments
                </li>
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-blue-500 mr-3" />
                  Pay only for what you use
                </li>
                <li className="flex items-center text-foreground">
                  <Check className="w-5 h-5 text-blue-500 mr-3" />
                  Instant credit top-up
                </li>
              </ul>

              <StartUsingCreditsButton />
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                How Credits Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Start Free
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Get 10,000 credits instantly when you sign up
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Use Credits
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Use our services and consume credits as needed
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Top Up</h4>
                  <p className="text-muted-foreground text-sm">
                    Buy more credits at $5 per 10,000 when you run out
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Do I need a credit card to start?
                </h4>
                <p className="text-muted-foreground text-sm">
                  No! You can start using our service immediately with your free
                  10,000 credits without providing any payment information.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  When do I get charged?
                </h4>
                <p className="text-muted-foreground text-sm">
                  You'll only be charged when you purchase additional credits
                  after using up your free 10,000 credits.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Can I cancel anytime?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes! There are no monthly subscriptions or commitments. You
                  only pay for the credits you buy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Do credits expire?
                </h4>
                <p className="text-muted-foreground text-sm">
                  No, your credits never expire. Use them whenever you need
                  them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

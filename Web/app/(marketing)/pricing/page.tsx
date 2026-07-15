import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Placeholder de pricing (Stripe entra depois).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-3">
          <div className="text-sm font-medium">Free</div>
          <div className="text-3xl font-semibold">$0</div>
          <Button variant="secondary">Start</Button>
        </Card>

        <Card className="space-y-3 border-blue-400/20 bg-blue-400/5">
          <div className="text-sm font-medium">Pro</div>
          <div className="text-3xl font-semibold">$19</div>
          <Button variant="primary">Upgrade</Button>
        </Card>

        <Card className="space-y-3">
          <div className="text-sm font-medium">Business</div>
          <div className="text-3xl font-semibold">$99</div>
          <Button variant="secondary">Contact</Button>
        </Card>
      </div>
    </div>
  );
}
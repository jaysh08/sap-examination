import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Trophy, Target, Clock, Users, Zap, ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">Trusted by 10,000+ SAP professionals</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Ace Your SAP SuccessFactors<br />
              <span className="text-primary">Certification</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master C_HRHPC/C_HRHCP with 300+ realistic practice questions, timed mock exams, and AI-powered learning recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><Button size="lg" className="gap-2">Start Free Trial <ChevronRight className="h-4 w-4" /></Button></Link>
              <Link href="/topics"><Button variant="outline" size="lg">Browse Topics</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Pass</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "300+ Realistic MCQs", desc: "Questions mirror the actual exam format with detailed explanations." },
              { icon: Clock, title: "Timed Mock Exams", desc: "Simulate real exam conditions with customizable timed tests." },
              { icon: Target, title: "Smart Recommendations", desc: "AI identifies your weak areas and creates personalized study plans." },
              { icon: Trophy, title: "Progress Tracking", desc: "Track your XP, level, and streak while monitoring topic-wise progress." },
              { icon: Zap, title: "Instant Feedback", desc: "Get immediate explanations with 'why others are wrong' analysis." },
              { icon: Users, title: "ERP vs SF Notes", desc: "Understand key differences between SAP ERP HCM and SuccessFactors EC." },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-muted-foreground">{feature.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Certification Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of professionals who have successfully passed their SAP SuccessFactors certification.</p>
          <Link href="/signup"><Button size="lg" className="gap-2">Get Started for Free <ChevronRight className="h-4 w-4" /></Button></Link>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /><span className="font-bold">SAP CertPrep</span></div>
          <p className="text-sm text-muted-foreground">© 2024 SAP CertPrep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
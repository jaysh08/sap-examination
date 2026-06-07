"use client";
import { useState } from "react";
import Link from "next/link";
import { TopicProgressCard } from "@/components/dashboard/TopicProgressCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { mockTopics, mockProgress } from "@/data/mockData";
import { Search, BookOpen } from "lucide-react";

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTopics = mockTopics.filter((topic) => topic.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Study Topics</h1>
          <p className="text-muted-foreground">Explore all {mockTopics.length} certification topics</p>
        </div>
        <Link href="/quiz?mode=random"><Button className="gap-2"><BookOpen className="h-4 w-4" />Start Random Quiz</Button></Link>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 max-w-md" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((topic, index) => (
          <TopicProgressCard key={topic.id} topic={topic} progress={mockProgress[index]} variant={index < 2 ? "weak" : index < 4 ? "strong" : "neutral"} />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No topics found</h3>
          <p className="text-muted-foreground">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
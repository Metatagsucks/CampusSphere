import { getOpportunityById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ReviewCard } from '@/components/review-card';
import { ReviewForm } from '@/components/review-form';
import { summarizeReviews } from '@/ai/flows/summarize-reviews';
import { Briefcase, BookOpen, MapPin, CheckCircle, Bot, MessageCircle } from 'lucide-react';
import { ChatDialog } from '@/components/chat-dialog';
import { Button } from '@/components/ui/button';
import type { OpportunityType } from '@/lib/types';

interface OpportunityPageProps {
  params: { id: string };
}

export default async function OpportunityDetailPage({ params }: OpportunityPageProps) {
  const opportunity = await getOpportunityById(params.id); // ✅ await added

  if (!opportunity) {
    notFound();
  }

  const reviewSummary =
    opportunity.reviews.length > 0
      ? await summarizeReviews({
          reviews: opportunity.reviews.map(r => ({ text: r.text, rating: r.rating })),
          itemType: opportunity.type.toLowerCase() as Lowercase<OpportunityType>,
          itemName: opportunity.title,
        })
      : null;

  const iconProps = { className: "w-5 h-5 mr-2 text-primary" };
  const typeIcons = {
    Internship: <Briefcase {...iconProps} />,
    Course: <BookOpen {...iconProps} />,
    Placement: <Briefcase {...iconProps} />,
  };

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <div className="relative h-64 w-full rounded-t-lg overflow-hidden">

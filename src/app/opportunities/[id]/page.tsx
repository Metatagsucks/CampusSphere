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

type PageProps = {
  params: {
    id: string;
  };
};

export default async function OpportunityDetailPage({ params }: PageProps) {
  const opportunity = getOpportunityById(params.id);

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
    Course: <BookOpen {...icon_props} />,
    Placement: <Briefcase {...iconProps} />,
  };
  
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <div className="relative h-64 w-full rounded-t-lg overflow-hidden">
                    <Image
                        src={opportunity.image}
                        alt={opportunity.title}
                        fill
                        className="object-cover"
                        data-ai-hint={opportunity.dataAiHint}
                    />
                </div>
                <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">{opportunity.category}</Badge>
                    <CardTitle className="text-3xl font-bold">{opportunity.title}</CardTitle>
                    <CardDescription className="text-xl text-muted-foreground">{opportunity.company}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-base">{opportunity.description}</p>
                </CardContent>
            </Card>

          {reviewSummary && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="text-primary"/> AI-Powered Review Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{reviewSummary.summary}</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Community Reviews ({opportunity.reviews.length})</h2>
            {opportunity.reviews.length > 0 ? (
              opportunity.reviews.map(review => <ReviewCard key={review.id} review={review} />)
            ) : (
              <p className="text-muted-foreground">No reviews yet. Be the first to add one!</p>
            )}
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <ReviewForm />
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <ChatDialog
                opportunityTitle={opportunity.title}
                opportunityCompany={opportunity.company}
                opportunityDescription={opportunity.description}
              >
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with an Alumnus
                </Button>
              </ChatDialog>
              <Separator />
              <div className="flex items-center">
                {typeIcons[opportunity.type]}
                <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{opportunity.type}</p>
                </div>
              </div>
              <Separator/>
              <div className="flex items-center">
                <MapPin {...iconProps} />
                 <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{opportunity.location}</p>
                </div>
              </div>
               <Separator/>
               <div className="flex items-center">
                <CheckCircle {...iconProps} className={opportunity.verified ? 'text-accent' : 'text-muted-foreground'} />
                 <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{opportunity.verified ? 'Verified' : 'Not Verified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
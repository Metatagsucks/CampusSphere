import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Opportunity } from '@/lib/types';
import { Briefcase, BookOpen, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const iconProps = { className: "w-4 h-4 mr-1.5 text-muted-foreground" };
  const typeIcons = {
    Internship: <Briefcase {...iconProps} />,
    Course: <BookOpen {...iconProps} />,
    Placement: <Briefcase {...iconProps} />,
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/opportunities/${opportunity.id}`} className="block">
            <div className="relative h-48 w-full">
              <Image
                src={opportunity.image}
                alt={opportunity.title}
                fill
                className="object-cover"
                data-ai-hint={opportunity.dataAiHint}
              />
              {opportunity.verified && (
                <Badge variant="secondary" className="absolute top-3 right-3 bg-accent text-accent-foreground">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                  Verified
                </Badge>
              )}
            </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <Badge variant="outline">{opportunity.category}</Badge>
        </div>
        <CardTitle className="text-lg font-semibold leading-snug">
          <Link href={`/opportunities/${opportunity.id}`}>{opportunity.title}</Link>
        </CardTitle>
        <CardDescription className="mt-1 text-base">{opportunity.company}</CardDescription>
        
        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
                {typeIcons[opportunity.type]}
                <span>{opportunity.type}</span>
            </div>
            <div className="flex items-center">
                <MapPin {...iconProps} />
                <span>{opportunity.location}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 bg-secondary/20">
        <Button asChild variant="link" className="p-0 h-auto text-primary">
          <Link href={`/opportunities/${opportunity.id}`}>
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

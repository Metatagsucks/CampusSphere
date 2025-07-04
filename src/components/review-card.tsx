import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Review } from '@/lib/types';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint="person avatar" />
            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{review.author}</p>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{review.text}</p>
      </CardContent>
    </Card>
  );
}

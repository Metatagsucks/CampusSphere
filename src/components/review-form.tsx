'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ReviewForm() {
    const { toast } = useToast();
    const [rating, setRating] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Review Submitted!",
            description: "Thank you for your feedback.",
        });
        (e.target as HTMLFormElement).reset();
        setRating(0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label id="rating-label" className="mb-2 block">Rating</Label>
                <div role="radiogroup" aria-labelledby="rating-label" className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                         <Star
                            key={i}
                            role="radio"
                            aria-checked={rating === i + 1}
                            aria-label={`${i + 1} star`}
                            tabIndex={0}
                            className={`w-7 h-7 cursor-pointer transition-colors ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/30 hover:text-accent/70'}`}
                            onClick={() => setRating(i + 1)}
                            onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                    e.preventDefault();
                                    setRating(i + 1);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <Label htmlFor="review-text">Your Review</Label>
                <Textarea id="review-text" placeholder="Share your experience..." className="mt-2 min-h-[120px]" required/>
            </div>
            <Button type="submit">Submit Review</Button>
        </form>
    );
}

'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { flagScamInternship, FlagScamInternshipOutput } from '@/ai/flows/flag-scam-internship';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle2, AlertCircle, Loader, Percent } from 'lucide-react';

type ScamDetectorState = {
  data: FlagScamInternshipOutput | null;
  error: string | null;
};

const initialState: ScamDetectorState = {
  data: null,
  error: null,
};

async function checkScamAction(
  prevState: ScamDetectorState,
  formData: FormData
): Promise<ScamDetectorState> {
  const internshipDescription = formData.get('description') as string;
  if (!internshipDescription || internshipDescription.length < 50) {
    return { data: null, error: 'Please provide a description of at least 50 characters.' };
  }
  try {
    const result = await flagScamInternship({ internshipDescription });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred. Please try again.' };
  }
}

export function ScamDetectorClient() {
  const [state, formAction] = useFormState(checkScamAction, initialState);
  const [pending, setPending] = useState(false);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form
          action={async (formData) => {
            setPending(true);
            await formAction(formData);
            setPending(false);
          }}
        >
          <div className="grid w-full gap-2">
            <Textarea
              name="description"
              placeholder="Paste the full internship description here..."
              className="min-h-[200px] text-base"
              required
              minLength={50}
            />
            <Button type="submit" disabled={pending} className="w-full sm:w-auto self-end">
              {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? 'Analyzing...' : 'Check for Scam'}
            </Button>
          </div>
        </form>

        {state.error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.data && (
          <div className="mt-6">
            <Card className={state.data.isScam ? 'border-destructive bg-destructive/5' : 'border-green-500 bg-green-500/5'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {state.data.isScam ? (
                    <>
                      <AlertCircle className="h-8 w-8 text-destructive" />
                      Potential Scam Detected
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                      Looks Legitimate
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <span className="text-sm font-bold flex items-center">
                        {(state.data.confidenceScore * 100).toFixed(0)} <Percent className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                  <Progress value={state.data.confidenceScore * 100} className={state.data.isScam ? '[&>div]:bg-destructive' : '[&>div]:bg-green-600'} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Reasoning:</h4>
                  <p className="text-muted-foreground text-sm">{state.data.reason}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

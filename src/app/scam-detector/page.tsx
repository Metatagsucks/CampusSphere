import { ScamDetectorClient } from "@/components/scam-detector-client";
import { ShieldCheck } from "lucide-react";

export default function ScamDetectorPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
            <ShieldCheck className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Internship Scam Detector</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Paste an internship description below to check if it's potentially a scam using AI.
        </p>
      </div>
      
      <ScamDetectorClient />

      <div className="mt-12 p-6 border rounded-lg bg-card text-card-foreground">
        <h3 className="font-semibold text-lg mb-2">Common Red Flags in Internship Postings:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Vague job descriptions with generic duties.</li>
            <li>Requests for personal financial information or payment for training/materials.</li>
            <li>Unprofessional communication with grammar/spelling errors.</li>
            <li>Guaranteed job offers without a proper interview process.</li>
            <li>Use of personal email addresses (e.g., @gmail.com) instead of a company domain.</li>
        </ul>
      </div>
    </div>
  );
}

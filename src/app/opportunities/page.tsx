'use client';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OpportunityCard } from '@/components/opportunity-card';
import { getOpportunities } from '@/lib/data';
import type { Opportunity, OpportunityCategory, OpportunityType } from '@/lib/types';
import { Search } from 'lucide-react';

export default function DashboardPage() {
  const allOpportunities = useMemo(() => getOpportunities(), []);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(allOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<OpportunityType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<OpportunityCategory | 'all'>('all');

  useEffect(() => {
    let filtered = allOpportunities;

    if (searchTerm) {
      filtered = filtered.filter(op => 
        op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(op => op.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(op => op.category === categoryFilter);
    }

    setOpportunities(filtered);
  }, [searchTerm, typeFilter, categoryFilter, allOpportunities]);


  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Opportunities Feed
        </h1>
        <p className="mt-1 text-muted-foreground">
          Discover verified internships, courses, and placement opportunities.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by title or company..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as OpportunityType | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Course">Course</SelectItem>
            <SelectItem value="Placement">Placement</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as OpportunityCategory | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.length > 0 ? (
          opportunities.map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No Opportunities Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

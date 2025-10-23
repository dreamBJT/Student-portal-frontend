// src/app/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Vote,
  TrendingUp,
  Clock,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

// Robust ImageWithFallback using state and proper wrapper
const ImageWithFallback = ({
  src,
  alt,
  fill = false,
}: {
  src: string;
  alt: string;
  fill?: boolean;
}) => {
  const [imgSrc, setImgSrc] = useState(src.trim() || '');
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('https://placehold.co/600x400?text=No+Image');
    }
  };

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={600}
      height={400}
      onError={handleError}
    />
  );
};

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (page: 'login' | 'results' | 'news') => {
    switch (page) {
      case 'login':
        router.push('/auth/login');
        break;
      case 'results':
        router.push('/elections/results');
        break;
      case 'news':
        router.push('/news');
        break;
    }
  };

  const newsItems = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBldmVudHxlbnwxfHx8fDE3NjAzNzE0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: 'Oct 10, 2025',
      title: 'Presidential Election 2025 Begins',
      description:
        "Student presidential elections are now open. Cast your vote and make your voice heard in shaping our university's future.",
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1643061754988-d8198b7a4c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjAzNDkxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: 'Oct 8, 2025',
      title: 'Meet the Candidates - Town Hall Event',
      description:
        'Join us for a live Q&A session with all presidential candidates. Learn about their visions and plans for our university.',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwMzczMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: 'Oct 5, 2025',
      title: "Last Year's Student Council Achievements",
      description:
        "A look back at the incredible accomplishments of our 2024 student leadership team and their impact on campus life.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002B7F]/95 to-[#002B7F]/80 z-10" />
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1719342399567-4b31027198b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBjYW1wdXN8ZW58MXx8fHwxNzYwNDI1Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="University Campus"
            fill
          />
        </div>
        <div className="container mx-auto px-4 z-20 text-center">
          <Badge className="mb-4 bg-[#FFB400] text-[#002B7F]">
            🗳️ Elections Open Now
          </Badge>
          <h1 className="text-5xl md:text-6xl mb-6 font-bold">
            Your Voice, Your Leader
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Participate in Injibara University's democratic process. Vote for student leaders who will represent you and shape our campus future.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-[#FFB400] text-[#002B7F] hover:bg-[#e6a200]"
              onClick={() => handleNavigate('login')}
            >
              Vote Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-[#002B7F]"
              onClick={() => handleNavigate('results')}
            >
              View Results
            </Button>
          </div>
        </div>
      </section>

      {/* Live Election Summary */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Live Election Summary</h2>
            <p className="text-muted-foreground">
              Real-time updates from the 2025 Student President Election
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Votes Cast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#002B7F] rounded-lg flex items-center justify-center">
                    <Vote className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">2,847</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp size={14} />
                      +234 today
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Voter Turnout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FFB400] rounded-lg flex items-center justify-center">
                    <Users className="text-[#002B7F]" size={24} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">68.5%</div>
                    <div className="text-sm text-muted-foreground">of 4,156 students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#002B7F] rounded-lg flex items-center justify-center">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">2d 14h</div>
                    <div className="text-sm text-muted-foreground">until voting ends</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#002B7F] to-[#003ba5] text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white/80">Leading Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 font-semibold">Ahmed Hassan</div>
                <Progress value={42} className="mb-2 h-2 bg-white/20" />
                <div className="text-sm text-white/80">42% of votes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Latest News</h2>
              <p className="text-muted-foreground">
                Stay updated with election news and campus events
              </p>
            </div>
            <Button variant="outline" onClick={() => handleNavigate('news')}>
              View All News
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <Card
                key={news.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleNavigate('news')}
              >
                <div className="aspect-video relative w-full">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    fill
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{news.date}</span>
                  </div>
                  <CardTitle className="text-xl">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {news.description}
                  </CardDescription>
                  <Button variant="link" className="p-0 text-[#002B7F]">
                    Read More <ArrowRight className="ml-1" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#002B7F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
          <p className="text-xl mb-8 opacity-90">
            Every vote counts. Be part of the democratic process at Injibara University.
          </p>
          <Button
            size="lg"
            className="bg-[#FFB400] text-[#002B7F] hover:bg-[#e6a200]"
            onClick={() => handleNavigate('login')}
          >
            Login to Vote
          </Button>
        </div>
      </section>
    </div>
  );
}
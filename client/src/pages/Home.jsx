import { lazy, Suspense } from 'react';
import HeroSlider     from '../components/home/HeroSlider';
import ServiceSection from '../components/home/ServiceSection';
import { TestimonialsSection, FeaturesSection, EventsSection } from '../components/home/HomeSections';
import { PopularSection, RecommendedSection, RecentlyViewedSection } from '../components/home/RecommendationSections';

var AboutSection = lazy(function() { return import('../components/home/AboutSection'); });
var SpecialDish  = lazy(function() { return import('../components/home/SpecialDish'); });
var MenuPreview  = lazy(function() { return import('../components/home/MenuPreview'); });

function Fallback() {
  return <div className="py-20 bg-eerie-1" style={{ minHeight: 240 }} />;
}

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ServiceSection />
      <PopularSection />
      <Suspense fallback={<Fallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <SpecialDish />
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <MenuPreview />
      </Suspense>
      <RecommendedSection />
      <RecentlyViewedSection />
      <TestimonialsSection />
      <FeaturesSection />
      <EventsSection />
    </>
  );
}

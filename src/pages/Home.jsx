import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import Departments from '@/components/home/Departments';
import Featured from '@/components/home/Featured';
import Address from '@/components/home/Address';
import Services from '@/components/home/Services';
import Ambience from '@/components/home/Ambience';
import VisitBlock from '@/components/home/VisitBlock';

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Departments />
      <Featured />
      <Address />
      <Services />
      <Ambience />
      <VisitBlock />
    </>
  );
}
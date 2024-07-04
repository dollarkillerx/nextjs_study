import Navigation from "@/components/home/Navigation";
import Main from "@/components/home/Main";

export default function Home() {
  return (
      <div className='flex h-full'>
        <Navigation />
        <Main />
      </div>
  );
}

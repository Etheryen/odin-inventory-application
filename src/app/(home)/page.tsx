import CategoryList from './components/categoryList';
import Hero from './components/hero';

export default function Home() {
  return (
    <main className="min-h-screen space-y-16 p-24">
      <Hero />
      <div>
        <div className="text-2xl text-center">
          What are we looking for today?
        </div>
        <CategoryList />
      </div>
    </main>
  );
}

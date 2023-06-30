import { CategoryList } from './category-list';

export default function Home() {
  return (
    <main className="space-y-16">
      <div className="space-y-12 p-8">
        <div className="text-6xl font-black text-center">
          Welcome to skateboard parts shop
        </div>
        <div className="text-2xl text-center">
          What are we looking for today?
        </div>
      </div>
      <div className="flex justify-center">
        <CategoryList />
      </div>
    </main>
  );
}

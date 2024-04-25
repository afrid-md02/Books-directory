import Collection from "../../components/books data/collection";
import Hero from "../../components/hero/hero";

function HomePage() {
  return (
    <main className="pt-16 pb-8 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-12 sm:space-y-16 md:space-y-20 min-h-[calc(100vh-3.25rem)]">
      <Hero />
      <Collection />
    </main>
  );
}

export default HomePage;

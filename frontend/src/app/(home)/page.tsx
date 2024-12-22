import Banner from "@/app/(home)/components/Banner";
import BookList from "@/components/BookList";

export default async function Home() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/books`);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const boosk = await response.json();
    console.log(boosk);
  } catch (error) {
    console.log(error);
  }
  return (
    <main>
      <div className="container mx-auto py-14">
        <Banner />
        <BookList />
      </div>
    </main>
  );
}

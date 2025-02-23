import React from "react";
import SearchBar from "../server_components/SearchBar";
import StartupCard from "../server_components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1 , name:"Adrian"},
      _id: 1,
      description: "This is a description",
      image: "https://via.placeholder.com/600/771796",
      category: "Robots",
      title: "We Robots",
    },
  ];
  return (
    <>
      <section className="container">
        <h1 className="heading">
          Showcase your startup, engage with fellow entrepreneurs.
        </h1>
        <p className="sub-heading !max-w-3xl">
          Propose ideas, cast your vote on pitches, and attract attention in
          competitions.
        </p>
        <SearchBar query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="card_grid mt-7">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}

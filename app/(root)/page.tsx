import React from "react";
import SearchBar from "../../components/server_components/SearchBar";
import StartupCard, {
  StartupCardType,
} from "../../components/server_components/StartupCard";
import { NewStartupsDisplay } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({
    query: NewStartupsDisplay,
    params,
  });
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

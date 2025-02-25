import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Post, TotalViews } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const md = markdownit();

export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(Post, { id });
  const { views: totalviews } = await client
    .withConfig({ useCdn: false })
    .fetch(TotalViews, { id });
  if (!post) return notFound();
  const markContent = md.render(post?.pitch || "");
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalviews + 1 })
        .commit(),
  );
  return (
    <>
      <section className="container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              className="flex gap-2 items-center mb-3"
              href={`/user/${post.author?._id}`}
            >
              <Image
                src={post.author?.image}
                alt="Profile Pic"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  {post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {markContent ? (
            <article
              className="prose max-w-4xl font-workSans break-all"
              dangerouslySetInnerHTML={{ __html: markContent }}
            />
          ) : (
            <p className="no-result">No Details Provided</p>
          )}
        </div>
        <hr className="divider" />
        {/* TODO: Recommended posts */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <div className="view-container">
            <div className="absolute -top-1 -right-1">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-purple-600"></span>
              </span>
            </div>
            <p className="view-text">
              <span className="font-black">Views: {totalviews}</span>
            </p>
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default page;

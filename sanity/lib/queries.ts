import { defineQuery } from "next-sanity";

export const NewStartupsDisplay = defineQuery(`*[_type=='startup' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  image,
  category
}`);

export const Post = defineQuery(`*[_type=='startup' && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  image,
  category,
  pitch
}`);
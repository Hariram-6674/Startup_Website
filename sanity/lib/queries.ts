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


export const TotalViews = defineQuery(`*[_type == 'startup' && _id == $id][0]{
  _id,
  views
  }`);

export const AuthorAuth = defineQuery(`*[_type=="author" && id==$id][0]{
  _id,id,name,email,username,email,bio,image
  }`);
export const AuthorAuthPage = defineQuery(`*[_type=="author" && _id==$id][0]{
  _id,id,name,email,username,email,bio,image
  }`);

export const UserStartups = defineQuery(`*[_type=='startup' && author._ref == $id] | order(_createdAt desc){
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

export const TopPicks = defineQuery(`*[_type=="playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
 }`);
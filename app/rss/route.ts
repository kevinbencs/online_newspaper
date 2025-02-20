import RSS from 'rss';
import { getPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

//export const revalidate = 3600;


export async function GET() {
  const feed = new RSS({
    title: "Word times RSS: latest articles",
    description: "Latest articles of World Times",
    site_url: `${process.env.URL}`,
    feed_url: `${process.env.URL}/rss`,
    language: "hu",
    pubDate: new Date(),
  });


  const posts = await getPosts()

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.detail,
      url: `${process.env.URL}/${post.category.toLowerCase()}/${post.date.slice(0,4)}/${post.date.slice(6,8)}/${post.date.slice(10,12)}/${post.title.replaceAll(' ','_').replace('?','nb20')}`,
      categories: [post.category],
      date: post.date,
    });
  });


  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
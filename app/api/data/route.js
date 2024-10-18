import { NextResponse } from "next/server";
const Parser = require('rss-parser');
const parser = new Parser();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channelLink = searchParams.get('channelLink') ; 

  let feed = await parser.parseURL(channelLink);

  let feedItems = feed.items.map(item => ({
    title: item.title,
    link: item.link,
    published: item.pubDate,
    summary: item.contentSnippet
  }));

  return NextResponse.json(feedItems);
}

---
author: billwiens
comments: true
date: 2009-01-29 01:31:15+00:00
layout: post
slug: stripping-facebook-links-with-yahoo-pipes
title: Stripping Facebook links with Yahoo Pipes.
wordpress_id: 53
categories:
- Technology
---

Facebook has a feature that allows you share links to websites with your Facebook friends.  It also gives you an RSS feed so you can share your posted links with the Internet.  You'll notice that mine are displayed in the sidebar using simple RSS widget for Wordpress.  Unfortunately, Facebook doesn't want to get cut out of the deal, and so all of the posted links are replaced by a URL that redirects to Facebook first.  That's legit, but I don't want to require users of my site to have Facebook accounts to see my posted items.

The first place I looked was the [source code](http://www.facebook.com/feeds/share_posts.php?id=27500180&viewer=27500180&key=1a5eda51d8&format=rss20) of my feed from Facebook.  RSS 2.0 feeds are simple XML, essentially just a list of <item> elements, each representing my posted links on Facebook.  Each <item> element has a <link> element, which is the one that redirects to Facebook and not the link I initially shared.  Fortunately, Facebook retains a copy of the original link inside the <description> element, so all I needed to do was replace the <link> element with the actual link that I posted.  However, that seems rather tedious to do by hand, so I wanted an automated solution.  I wrote an XSLT script to accomplish this, but I kept thinking that this kind of task should be much easier.  Enter Yahoo Pipes.

Yahoo describes their [Pipes tool](http://pipes.yahoo.com/pipes/) as "a powerful composition tool to aggregate, manipulate, and mashup content from around the web".  It's a remarkable tool that allows you to use graphical widgets to combine and manipulate all sorts of feed data, and it makes it really easy to solve the kind of problems I was having above.  I'll spare you the details, but essentially I used a widget to loop through each item and fix the link, and then had it spit out the modified feed.  You can [try it out here](http://pipes.yahoo.com/pipes/pipe.info?_id=2k1AmeDo3RG17lDuy86PRA).  Simply input a Facebook Posts feed, and it will strip out the links to Facebook for each item.

This example only grazes the surface of what Pipes is capable of.  Next I'm going take [my twitter feed](http://twitter.com/billwiens), find all the posts that include links, and then merge it into my Facebook feed to create a super-mutant feed.  I'll keep you posted.

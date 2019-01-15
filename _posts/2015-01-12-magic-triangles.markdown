---
author: billwiens
comments: true
date: 2015-01-12 16:20:00+00:00
layout: post
slug: magic-triangles
title: Magic Triangles
categories:
- Technology
---

I saw [this gif](http://bdub.club/i/cool/magic-triangles.gif) recently and was enthralled by its recursive nature, so I decided to recreate it with Javascript and Canvas as a simple programming exercise. Check out my attempt below.

<canvas id="magic-triangles" width="500" height="500" style="display: block; margin: auto;"></canvas>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//code.createjs.com/createjs-2013.12.12.min.js"></script>
<script src="/assets/js/magic-triangles/triangles.js"></script>

I don't do much front-end programming, so this was a bit of a challenge. At first I thought it'd be fun to do this with CSS animations, but it turns out that drawing triangles with CSS is quite complicated. I made [this spinning triangle](http://codepen.io/billputer/pen/VYvVVj) and called it quits. CSS would have required me to statically position each triangle, and as you can see, there are plenty of triangles.

I then decided to use the [HTML5 Canvas element](http://diveintohtml5.info/canvas.html) since it was a natural fit for drawing triangles. A friend recommended the [EaselJS](http://www.createjs.com/#!/EaselJS) and [TweenJS](http://www.createjs.com/#!/TweenJS) libaries, so after some research I went with those and it worked out quite well.

The actual code is fairly simple, and is available in [this GitHub repository](https://github.com/billputer/magic-triangles). Feedback and pull requests are welcome!

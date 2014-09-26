---
author: billwiens
comments: true
date: 2009-11-23 22:30:12+00:00
layout: post
slug: yet-another-git-tutorial
title: Yet another git tutorial
wordpress_id: 190
categories:
- Technology
---

### introduction


I’ve been working with a group of people known as **qworky** making some cool meeting software for all y’all. A few people on the team aren’t too familiar with distributed version control systems, so I wrote up a little tutorial on git for them, and since I’m such a kind and generous guy, I’ve decided to share it with the internets. Enjoy.


### basic commands


_Before we begin, I recommend printing out a copy of [this cheat sheet](http://zrusin.blogspot.com/2007/09/git-cheat-sheet.html) and putting it somehere handy. Also, if any of this makes your brain hurt, try spending some time looking at the [git community book](http://book.git-scm.com/index.html)._

First, let’s get our very own copy of the ‘qworky-kickstart’ repository.


`git clone git://github.com/billputer/qworky-kickstart.git`


Now, you should have a folder called `qworky-kickstart`. Let’s check it out.


`cd qworky-kickstart`
`git status`


You should see the following output.


`# On branch master
nothing to commit (working directory clean)`


That’s good, it means we’ve got a clean slate. Let’s look a bit at the previous changes.


`git log`


Interesting stuff, eh? Now, let’s set aside a our own portion of the slate to work on.


`git checkout -b bill`


This creates a local branch, our own version of history that we can trample all over without worrying about the main timeline of changes. Go ahead, make some changes. Delete some stuff, change all occurences of the word ‘config’ to the word ‘convention’, whatever. Once you’ve done that, try using `git status` and `git diff`. See all your changes? Good. However, we don’t want those changes, let’s erase them.


`git reset --hard`


Reset makes sense, right? You’ve made some changes, but you want to reset to the previous commited version (known as HEAD). But what does the `--hard` mean? Let’s [RTFM](http://www.kernel.org/pub/software/scm/git/docs/git-reset.html).


`--hard
Matches the working tree and index to that of the tree being switched to. Any changes to tracked files in the working tree since <commit> are lost.`


Working tree? Index? These are two important terms in git. Working tree refers to the actual files and directories that we’re using. If you modify a file in your git repository, you’re almost certainly making a change to the _working tree_. The index is the grey area between changes to the filesystem and changes commited to the repository. How so? Let me show you an example.

Make more changes to a file. Nothing silly, something you actually want to keep. Comment some code, do something useful. Okay, now you’ve changed the _working tree_. Good job! Now try the command `git status`. Okay, it shows that some files are `Changed but not updated`. Let’s add those to the index. Type `git add <filename>`. Try `git status` again. Ahah! Now that the file is in the index, it’s listed under `Changes to be committed`. Now that we’ve done that, let’s take the plunge and commit something.


`git commit -m "Very important changes"`


Try `git status` and `git log` again. See your commit? Good work, you’ve now made a commit to your local repository. What? You still don’t know what the index is!? Let me explain. The index is where you put changes that you’re about to commit. Why would you want this seemingly extra step? Well, the index is there in case you only want to commit one or two of your changes. The `git commit -m` only commits files in the index, so you only have to `git add` the files that you want to commit. Still doesn’t make sense? Just remember that commiting a change is a two-step process, first you `git add`, then you `git commit`. The brave can combine those two with `git commit -a`, which commits all of the `Changed but not updated` files.


### git for collaboration


So now we’ve made some changes to the _bill_ branch of our local repository. That’s great, but we’re using git because we want to _collaborate_. We want our changes to magically appear back on the `master` branch of the original repsitory we cloned (the origin, in git parlance). This generally involves two steps, merging our changes into the `master` branch of our local repository, and then pushing our changes up to the origin at github.

There are several ways of moving our changes from the `bill` branch to the `master` branch. We could simply make the same changes on the master branch and then commit them, but that’d be silly, since we already have made those commits on the `bill` branch. Let’s `checkout` the `master` branch, and then `merge` it with the `bill` branch.


`git checkout master
git merge bill`


Now we have a local `master` branch with our changes, and now we want to give those to our colleagues on github. First, let’s make sure we’ve got the most recent copy of the repository so we can resolve any conflicts ourselves.


`git pull`


This will pull down any changes in our `origin` repository that have happened since we cloned it, and attempt to merge them with our local changes. This can get messy, and I’ll walk you through the process in a later tutorial. For now we’ll assume that everything went fine and dandy. Let’s finish this.


`git push`


Assuming you have the proper permissions, this will `push` your commits back to `origin` at github, and all your friends will be free to `git fetch` or `git pull` them. Good work!

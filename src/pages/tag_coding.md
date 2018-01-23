---
title: How I Got the Tag Functionality to Work on This Blog
date: "2017-10-07"
tag: "coding, Javascript, GatsbyJS, tags, meta, GraphQL"
---

Do you know what I love?? <a href="https://www.gatsbyjs.org/tutorial/" style="color: blue">The Gatsby Tutorial</a>.  It pretty much tells you how to do anything, if anything is making a blog using the great static site generator that is GatsbyJS. Or so I assumed, until I got to the end of it, and they didn't tell you (me, I mean me, I only care about me) how to make tags and make the tags searchable and rank the tags and do all the things with the tags. Okay, so I will be a humble humble hero and tell you a way I figured out how to do it. Maybe you can use it for your GastbyJS-based blog! I will be very pleased and proud (of me, also maybe a little bit of you) if you do!!!

So maybe you remember these parts from the great Gatsby tutorial:

<img src="/gatsby_tutorial_create_slugs.png" alt="https://www.gatsbyjs.org/tutorial/part-four/#programmatically-creating-pages-from-data" class="code-img"/>


So basically to that part you have to add this part:


<img src="/tag_tutorial.png" alt="adding tag code to gatsby config" class="code-img"/>

First, every time GraphQL finds any tag-matter in the frontmatter, we split the tags into an array on their comma and space (or however it is you, dear reader, will distinguish each discrete tag), and we map over this array.

In our mapping, the most straightforward part of this is creating a directory page for all the tags through the path. We then make the content of this page through using our individual tage page (where we show all the blog posts that are tagged with that term) template (don't worry, I will show the relevant parts of this to you in only a moment). What we pass as the GraphQL context is the interesting part!

We must pass the tagRegEx variable that we create for each tag. The tagRegEx variable is as stringified RegEx query which will match on the tag name with a comma after it, or the tag name if it is the end of a string.

This is important because we will need to use this RegEx-y variable in order to filter our allTags results on the individual tags page.

So let's finally take a look at the GraphQL query that lives at the bottom of our individual tag page:

<img src="/dualQLquery.png" alt="adding GraphQL query to tag page" class="code-img"/>

You can see that in our 'TagPageQuery' we filter by frontmatter tag where something in the frontmatter-tag matches on our RegEx string. It was important to pass that interpolated string in as the context variable because the GraphQL query itself does not admit string interpolation. Now we have two great, optimized queries: the first, taggedPages, which returns us all the info (title, date, tags, slugs, an excerpt) we need to preview the appropriately tagged blog posts on our tag page, and another query, AllTags, which methodically combs through all our markdown posts, returning us the tags from each one. This is used for the all tags sidebar which appears on each blog page.

Hope this was helpful! Go forth and tag thy Gatsby blogs!

PS: you will notice my blog does not currently have comment functionality. That is because as far as I know the readership is *niche* enough that I can still respond to all questions, comments, complaints, etc. through my email. So yes, email me if you wish!! Maybe one day I will receive enough of these to justify me making a comments form, and then blogging about that! :)

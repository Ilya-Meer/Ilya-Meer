---
title: Zettelkasten So Far
date: '2021-05-02T20:18:26.286Z'
description: ''
---

## How it started

Some time ago I started a [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten). I came to terms with the fact that my memory isn't as [good as I want it to be](https://www.ilyameerovich.com/mnemonic-or-memorandum/), and there needed to be backups.

As is common these days, I have an enormous collection of bookmarks, open tabs, unread Pocket entries, and so on. And it never seems to get any smaller. Pocket's home page has the tagline "Fuel your mind anywhere" but it never really feels like this cascade of information is fueling anything other than my anxiety by constantly reminding me of how much more I have left to sift through.

This is probably one of the reasons we're in the middle of the Cambrian explosion of personal knowledge base tools, i.e. [Roam](https://roamresearch.com/), [Obsidian](https://obsidian.md/), [Foam](https://foambubble.github.io/foam/), [Dendron](https://www.dendron.so/), [Remnote](https://www.remnote.io/), and likely a whole host of others.

Given this intractable amount of information, I wanted to feel that any time I spent chipping away at it wouldn't be wasted, and so I needed to make sure that my efforts were being aggregated into something persistent, the benefits of which I could reap over and over again.

When I came across the concept of a Zettelkasten, it sounded like the perfect tool for the job. Although, the Zettelkasten isn't really a tool at all, it's a methodology, which leaves the implementation up to the user. And so there were more decisions to be made.

Pretty much all the tools I mentioned above can implement a Zettelkasten. But the most popular gadget isn't always the most effective, and so I figured if paper was good enough for Niklas Luhmann - the original creator of the Zettelkasten credits this system with helping him write more than 70 books and close to 400 articles over the course of 40 years - it was good enough for me.

Subconsciously, I think I was hoping to get a lot of mileage out of the [better recall associated with taking notes by hand](https://journals.sagepub.com/doi/abs/10.1177/0956797614524581) versus digitally. In practice, this may have been the case, but it's moot since the real value of the Zettelkasten becomes apparent when you follow its links to discover unexpected ideas that fuel your writing. And yet I noticed that because of the inherent difficulty in thumbing through a stack of index cards (even if they're numbered), and because my cursive writing is difficult to scan, I found myself rarely consulting my Zettelkasten, effectively rendering it useless.

## How it's going

So this second time around I did opt for a digital solution, but my Luddite-esque streak still prevents me from fully committing to a third-party solution. For the time being, I've decided to seek refuge in Vim and Markdown.

A note looks like this:

```md
---
title: Humans are not designed to be happy
date: Sun 12 Apr 2020 18:17:43 PDT
tags:
  - evolution
  - biology
  - life
  - happiness
  - meditation
---

To be happy and content with our surroundings / circumstances means that we become complacent and stop putting in the work of monitoring our environment and stockpiling / preparing.

In the ancestral environment this would have gotten us killed so this behaviour is not represented in the gene pool.

## Links

- This is just one of the ways in which [we are not built for life in today's world](./20210427224326-we-are-not-evolved-for-this.md)
- You have to remind yourself [happiness consists in being content with right now](./20200412120008-happiness-means-content-now.md)
```

Some Yaml frontmatter à la Jekyll, a body with some content, and a Links section for referring to other notes. This last one is not clearly separated from links in the body itself, but that's not an urgent issue. Pretty straightforward, any way you slice it.

I myself am a little surprised I didn't go with Obsidian, my next choice. Obsidian really has some killer features. The first time I came across [Andy Matuschak's notes](https://notes.andymatuschak.org/About_these_notes), I remember thinking how amazing it would be if this could be available for everyone. Now through the magic of Obsidian plugins, [it is](https://github.com/deathau/sliding-panes-obsidian).

I thought about it for quite a while, but eventually decided that ultimate control over my notes was more important than all of the featuers they bring to the table. With my current workflow, my only dependency is...an implementation of the Markdown spec. If there is something capable of following Markdown links, and generating HTML from Markdown files, then I have what I need.

One tradeoff that gave me pause was giving up automatic backlinks (this is where linking from note A to B also gives B a link back to A - Maggie Appleton has written a [really engaging explanation of backlinks](https://maggieappleton.com/bidirectionals)). This is a feature common to all the apps I mentioned above, and for a moment I wondered if it was worth proceeding without it. A bit more research into various digital implementations of Zettelkasten yielded [this article](https://zettelkasten.de/posts/backlinks-are-bad-links/) about the pitfalls of backlinking which really helped put things into perspective:

> Backlinking is a perfect example on how a feature of a program seems to be useful but in reality distracts from that what you actually want to do. Backlinking is just linking notes without connecting knowledge.

The author explains that for any link(s) you follow through your Zettelkasten, there is always the opportunity cost of all the links you didn't follow. If you're trying to chase a productive line of thought through a Zettelkasten populated with contextless, auto-generated backlinks, then these costs will end up robbing you of your productivity. Hence, instead of cultivating the discipline to resist temptation, the solution is to eradicate temptation altogether.

Of course, sometimes I might _want_ this kind of bidirectional connection and it may add value to my future Zettelkasten-perusing self. If that's the case, I will just add it in manually. The point is to avoid needlessly grasping for features and to think seriously about what the software is really doing for you. You might discover that you can easily do without the ornamentation.

While I was mired in decision paralysis, it was interesting to discover what was actually important to me. If you're thinking of starting a similar project, spend some time identifying what matters for your use case, and then after a certain point just pick a solution and dive in head first. Even if you discover a missing feature you need down the line, you will have done some of the work and be wiser for it. Better to have made some progress than die like the [proverbial ass](https://en.wikipedia.org/wiki/Buridan%27s_ass).

<br />

---

<div style="word-break: break-word;">

### References

Appleton, Maggie. “A Short History of Bi-Directional Links.” Maggie Appleton, https://maggieappleton.com/bidirectionals.

Fast, Sascha. “Backlinking Is Not Very Useful -- Often Even Harmful.” Zettelkasten, https://zettelkasten.de/posts/backlinks-are-bad-links/.

Matuschak, Andy. “About These Notes.” Andy's Working Notes, https://notes.andymatuschak.org/About_these_notes.

Mueller, Pam A., and Daniel M. Oppenheimer. “The Pen Is Mightier Than the Keyboard.” Psychological Science, vol. 25, no. 6, 23 Apr. 2014, pp. 1159–1168., doi:10.1177/0956797614524581.

</div>

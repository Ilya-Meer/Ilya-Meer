---
title: Zettelkasten Rerevisited
date: '2022-07-27T04:41:34.045Z'
description: ''
---

<div id="epigraph" style="width: 75%; margin: 0 0 0 auto; text-align: right; font-family: 'IBM Plex Sans', Arial, monospace;">

<span>A foolish consistency is the hobgoblin of little minds.</span>

<span>- Ralph Waldo Emerson</span>

</div>

I threw in the towel and switched to Obsidian.

Long before I had ever heard of the concept of a Zettelkasten, commonplace book, second brain, personal knowledge management, etc. I thought it would be a great idea to just have something to catalog one's thoughts. In my imagination it didn't take the shape of a journal but specifically a catalog or a list that may or may not support linking between nodes. After discovering the Zettelkasten method, I could finally start implementing my catalog.

This has certainly been (and will continue to be) a learning process. The main thing I've learned after this [latest iteration](https://www.ilyameerovich.com/zettelkasten-so-far) is that I need to reign in my purist tendencies and embrace tools that I will actually use.

After deciding to switch from paper, I wanted to go with Vim to avoid _any_ vendor lock in, to have a minimal interface for editing notes without any distracting "features", and to avoid automatic backlink creation. I thought the latter would be a crutch that I would grow dependent on and which would prevent me from being intentional about linking notes together.

In practice, I became dissatisfied with my Vim workflow for the following reasons.

### 1. No graph view

Without a graph view it was difficult to identify orphan notes and impossible to see at a glance which notes were connected to one another without opening one up and following the connections.

Yes, the creator of the Zettelkasten method didn't have a graph view. Yes, following the connections is kind of the point of a Zettelkasten - you start somewhere and then follow a train of thought.

For me though, it's more productive to zoom in on various areas of a graph, examine the existing connections, and then use that bird's eye view as inspiration for new notes. At the very least, this feature is actually making me add notes, which is the only metric that matters.

### 2. Too much friction when creating new notes

Since I didn't know any better, I looked at a bunch of different digital Zettelkasten implementations and settled on one that looked...comprehensive.

As you can see in the previous post, the note format has a bunch of YAML frontmatter. I had a Vim snippet to generate it, but still had to move around to fill in the title and date before getting to the meat of the note. It was even worse for literature notes which needed to include reference information.

Obsidian has template features that can add in the title automatically. It also uses the convenient `[[` shortcut to add a link - much more expedient than:

- selecting visual mode
- highlighting text
- surrounding with `[`
- navigating to the closing `]`
- opening up `()`
- adding name of note to link to

Of course, Vim is infinitely customizable, so I'm sure I could have figured out a solution or written a script to make all of this more manageable. But after a certain point you just need to write notes, [mastery be damned](https://boringtechnology.club/#85).

### 3. No automatic backlinks

When I made the switch, automatic backlinks were only a small point in favour of Obsidian.

As I cite in my previous post, there is this idea that in a true Zettelkasten every link should be made very intentionally otherwise you'll start filling your archive with trash, or more importantly, following backlinks instead of forward links. Being automatically generated, backlinks are cheap and don't really represent an intentional link you made between two ideas in your second brain. So the decision to follow backlinks is a decision to eschew real links which could have resulted in a more productive train of thought.

The more I thought about this, the more I realized I was so wrapped up in the theory of the perfect Zettelkasten system that I created a system I didn't really want to use.

At that point, I decided it was time to start over. I picked the lowest friction tool I knew - Obsidian. I found a great tutorial of [reasonable length](https://www.youtube.com/watch?v=ziE6UExsOrs&ab_channel=MartinAdams) that showed the basics of an Obsidian-based Zettelkasten implementation and I've stuck with it for two months. With Obsidian's awesome Vim mode, customizable key bindings, and command palette, it doesn't feel like I'm giving up anything at all.

I couldn't be happier with my decision. The system works and I actually use it.

As for backlinks, well, I guess instead of developing the discipline to create forward links I will just have to develop the discipline to moderate my usage of backlinks.

There is a time for discipline and there is also a time for recognizing your mistakes and working with your own mind rather than against it so that you can create something that works for you.

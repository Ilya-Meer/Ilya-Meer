---
title: Another perspective on legacy code
date: '2026-01-31T13:21:11.639Z'
description: ''
---

During my undergrad I was often frustrated by the constant construction on campus that forced students to take detours practically everywhere. I remember wondering whether there would be some future lucky cohort that would get to behold the finished product in all its resplendent glory.

Kevin Kelly [talks about](https://kk.org/thetechnium/construction-is-life/) having similar feelings during visits to New York when he was growing up. The construction noise and chaos was a nuisance, and he wondered if the perpetually unfinished state of the city was not perhaps due to poor planning or incompetence. It was only after visiting places where there was no construction that he realized "that constant din of work is the pulse of life for human environments". If something is not being repaired, then it's decaying. 

This concept applies equally well to physical structures, software systems, and probably anything else that humans build. In the former case, the structure's integrity degrades due to exposure to the elements. In the case of software, it's due to drift between the assumptions baked into the code when it's first created and the inevitable changes in requirements that accrue over time. More, and different, things are expected from the software until its real-world uses no longer map cleanly to its abstractions and one has to repave or do a seismic upgrade.

Legacy code that has been left alone for too long without an upgrade can be really frustrating to work on. In essence you're being forced to implement things not in the clean, state-of-the-art way that you're used to, but in the way that meshes with how the rest of the codebase is written. If you deviate from the established patterns, then the next person to come along not only has to understand the legacy patterns, but the one-off "patterns" you've introduced as well.

Once you've found yourself in this situation, keeping your composure is a matter of shifting your perspective. Sean Goedecke articulates this really well in his [post](https://www.seangoedecke.com/large-established-codebases/) about working in large codebases. Specifically, he points out that often, they "produce 90% of the value. In any big tech company, the majority of the revenue-producing activity (i.e. the work that actually pays your engineering salary) comes from a large established codebase". This has a nice atmosphere of amor fati around it that makes life easier if one can embrace it. You're being paid to improve something for yourself and your teammates, specifically the thing that generates the very same $$$ that you collect every couple of weeks. There are certainly worse, and more pointless, ways to make a living. And in this age of AI, plenty of folks can't even get hired to do that. 

Zooming out a little more, it can be kind of cool to examine [code from years ago](https://mcfunley.com/from-the-annals-of-dubious-achievement) up close and try to understand the context in which it was written. What was happening in tech at that time? What was happening with the business at that time? It's a trip back in time. And you get to steward this same code and witness in detail how the old ideas that birthed the code collide with the world of today. Perhaps there is something to be gleaned from that collision that will help inform how you write code in the future. Or maybe you will come to think that, as a colleague of mine used to say, we are all just building sandcastles. You can try to write future-proof code, but in the end it's all temporary and will all become legacy. Now, I don't know how long this palliative idea will sustain anyone through a stagnating career, but it may help us get through the day.

If you're systematically refactoring a certain tech debt item, the legacy-ness can feel particularly grating because [things get worse before they get better](https://jeremymikkola.com/posts/2022_01_29_tech_debt_gets_worse_before_it_gets_beffer.html). A messier codebase therefore could be a form of progress, though it's very easy to delude yourself on this point. Depending on your level of discipline and commitment to the cleanup project, maybe things are getting worse before they get even worse. In this case, automate as much of the drudgery as you can with git hooks, code mods, linters, automated tests, and a carefully dosed AI suppository.

It's never been technically easier than it is today to root out tech debt, as long as you're able to sell the idea correctly and get buy-in (that part is just as hard). Add another tower to the sandcastle and marvel at the beauty of the ocean.

<br />

----

<div style="word-break: break-word;">

### References

Goedecke, Sean. "Mistakes Engineers Make in Large Established Codebases." seangoedecke.com, 2 Jan. 2025, https://www.seangoedecke.com/large-established-codebases/.

Kelly, Kevin. "Construction Is Life." The Technium, 13 June 2022, https://kk.org/thetechnium/construction-is-life/.

Mikkola, Jeremy. "Tech Debt Gets Worse Before It Gets Better." Jeremy's Blog, 29 Jan. 2022, https://jeremymikkola.com/posts/2022_01_29_tech_debt_gets_worse_before_it_gets_beffer.html.


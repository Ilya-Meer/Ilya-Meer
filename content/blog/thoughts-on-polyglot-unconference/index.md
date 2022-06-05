---
title: Thoughts on Polyglot Unconference
date: "2022-06-04T01:39:11.197Z"
description: ""
---

Last weekend I attended the [Polyglot Unconference](https://www.polyglotsoftware.com/), an annual conference held in Vancouver dedicated to bringing together those who build software and enjoy doing so. 

This is the first software conference of any sort that I've ever attended and for me it set one hell of a precedent. 

The idea behind an unconference or flipped conference is that there are no sessions organized ahead of time - the attendees themselves suggest topics for discussion and a time and space are provided for them. 

Unconferences deploy a technique for holding unstructured meetings called [Open Space Technology](https://openspaceworld.org/wp2/hho/papers/brief-users-guide-open-space-technology/) (OST). Indeed, the fundamental tenets of OST made a cameo in the introductory slide deck:

> There are Four Principles and One Law which serve as guides to the leader and all participants. The principles are: Whoever comes is the right people. Whatever happens is the only thing that could have. Whenever it starts is the right time. When it is over, it is over.
> 
> ...
> 
> Finally we come to the One Law of Open Space. It is a law only in the sense that all participants must observe it or the process will not work. We call it the Law of Two Feet. Briefly stated, this law says that every individual has two feet, and must be prepared to use them. Responsibility for a successful outcome in any Open Space Event resides with exactly one person — each participant. Individuals can make a difference and must make a difference. If that is not true in a given situation, they, and they alone, must take responsibility to use their two feet, and move to a new place where they can make a difference.

The circumstances were fortunate enough to allow pretty much all suggested topics to be scheduled, yielding a total of 40 sessions spread across 5 time slots throughout the day. These ranged from topics around organization (hiring, onboarding, agile methodologies) to event-driven architecture to developer tools to deep dives into technology like WASM, JAM stack, and many others. The full list is available [here](http://polyglot-voting.herokuapp.com/) as of this writing, but I'm not sure for how long.

I don't know if this is the typical experience at all conferences, but I unequivocally wanted to attend every session on the list. The interesting thing is that since the conference format doesn't really afford opportunities to prepare a talk or slides in advance, almost every session becomes an informal roundtable discussion on the proposed topic. This makes it more accessible to newcomers or those who aren't intimately acquainted with the subject matter. And while that does mean that the discussions sacrifice some depth and specificity since we aren't looking at concrete diagrams or picking apart code, the net result is that everyone walks away energized, enlightened, and motivated to dig more deeply on their own.

As we emerge from the pandemic, I'm reminded how easy it is to forget the excitement of talking to people about software in real life, face to face, especially in an open-ended format that is not focused on solving specific problems as is often the case in our workplaces. You never know who you're going to meet and you never know where the conversation will take you. 

I was inspired by all of the great ideas and the prodigious curiosity, support, and camaraderie displayed by everyone who attended. I can't wait for next year.

## Bits and Bobs

### Ideas

- If you want to persist CLI commands you run at some point, consider writing them in vim as plain text and then *dispatching* them to a terminal using [vim-slime](https://github.com/jpalardy/vim-slime)
- Have a development machine that you can access from other devices via `ssh` and a long-running `tmux` session
- I missed the discussion about this the first time around, but [Spectre](https://en.wikipedia.org/wiki/Spectre_%28security_vulnerability%29) is an incredibly creative exploit
- I should play around with [p5.js](https://p5js.org/)
- Most people don't implement their own programming languages, but parsers come up quite often. Getting comfortable with making parsers might come in handy for tasks that regex can't handle. Maybe start by implementing one for a LISP?

### Interesting tech

- [wapm](https://wapm.io/) - a WebAssembly package manager
- [WebVM](webvm.io) - a WebAssembly powered Linux environment running *in the browser*
- Lin Clarke on WebAssembly - [YouTube search link](https://www.youtube.com/results?search_query=lin+clarke+web+assembly)
- [Grain Language](https://grain-lang.org/docs/)

### Tools
- [lsd](https://github.com/Peltoche/lsd) - like `ls` but deluxe
- [fd](https://github.com/sharkdp/fd) - like `find` but easier to use
- [imgcat](https://github.com/eddieantonio/imgcat) - like `cat` but for images
- [direnv](https://direnv.net/) - set environment variables based on the current directory
- [gron](https://github.com/tomnomnom/gron) - find the path to a field in a JSON document, and much more
- [jless](https://github.com/PaulJuliusMartinez/jless) - a CLI JSON viewer
- [blink](https://blink.sh/) - write code on your iOS device

### Books

- Modern Operating Systems - Andrew S. Tanenbaum
- Distributed Systems: Principles and Paradigms - Andrew S. Tanenbaum

### Other

- [100 Rabbits](https://100r.co/site/about_us.html) - an artist collective making very interesting projects

<br />

----

<div style="word-break: break-word;">

### References

Owen, Harrison. “A Brief User’s Guide to Open Space Technology.” *OpenSpaceWorld.ORG*, https://openspaceworld.org/wp2/hho/papers/brief-users-guide-open-space-technology/. 

</div>


---
title: Migrating from Vim to Neovim
date: "2022-12-18T23:13:10.196Z"
description: "Maybe it's time to switch?"
---

I spent the last couple of weeks moving my development environment from Vim to Neovim. Overall I'm very happy about the decision and I think the effort was worthwhile. I followed a wonderful [video guide](https://youtu.be/ctH-a-1eUME) on configuring Neovim that introduced me to the ecosystem and also provided a basic introduction to Lua. Along with the video, there is a comprehensive [repository](https://github.com/LunarVim/Neovim-from-scratch) with the author's Neovim config, from which I pilfered liberally.

The tldr of why switching may be worth your while, too:
  - asynchronous plugins for better performance (don't block the main thread)
  - configuration is a easier to reason about, because of:
  - Lua support
  - peace of mind knowing that LSP client is built-in instead of another plugin
  - Telescope is pretty awesome
  - using a community-driven product, instead of having [a bus factor of 1](https://geoff.greer.fm/2015/01/15/why-neovim-is-better-than-vim/)

In my case, moving to Neovim was a good decision for two reasons - first of all because certain functionality is better and/or easier to configure than in Vim but secondarily because the move forced me to go through my existing `vimrc`, scrutinize what's in it and why, and consider whether there might be a better way to do things - a good exercise to perform occasionally, and long overdue.

In the first category, the most salient improvement for me is the built-in LSP support. Previously, I was using `ctags` for navigating the codebase which would take me to variable and function declarations fairly reliably but was sporadic in some PHP codebases - it would put my cursor on the import statement of a given class rather than take me to the file where it was defined, which is the kind of friction that makes it easy to lose your train of thought. Of course, there are Vim plugins that have LSP client implementations that can navigate to symbols without the interruptions I mentioned ([YouCompleteMe](https://github.com/ycm-core/YouCompleteMe) and [CoC](https://github.com/neoclide/coc.nvim), for example) so it wasn't actually necessary to move away from Vim to resolve this issue. However, as one of my colleagues pointed out, building LSP support into the editor guarantees that it will be maintained at least as long as people are working on Neovim, so we are not at the mercy of plugin developers, no matter how popular they may be. In any case, the guide I mentioned above demonstrates how to configure LSP, so in about 30 minutes I was up and running with seamless code navigation and intuitive keybindings for viewing symbol references, definitions, refactoring commands, etc.

Another major draw of Neovim is [Telescope](https://github.com/nvim-telescope/telescope.nvim), a "highly extendable fuzzy finder over lists" that comes preconfigured to search for various types of entities - files, git files, buffers, registers, and much more. It also has some documentation that explains how to create your own list to fuzzy find over, although I haven't tried that yet. It comes with very sensible defaults and sample remaps for basic Telescope commands, so you can avoid the work of writing configuration to get fzf to do those things instead. The only draw back I've found is that fuzzy finding files can be kind of slow in large codebases. For this one case I just fallback to using fzf.

One other small advantage of using Neovim and friends, at least with the configuration I'm using, is that floating windows are very common (Telescope and [Packer](https://github.com/wbthomason/packer.nvim), a popular package manager, both use them) which I find to be less disruptive than opening splits as it preserves my window layout. 

Regarding the second category, the main thing I had to get working in Neovim was some plugin for `go` development. I did check out [go.nvim](https://github.com/ray-x/go.nvim), which has a ton of great features, but after working with [vim-go](https://github.com/fatih/vim-go) for so long, I couldn't bear to go back. The feature I missed the most from `vim-go` is being able to see the type of an identifier in the status line just by [hovering](https://github.com/fatih/vim-go/wiki/Tutorial#identifier-resolution) on it. As far as I can tell, this doesn't exist in `go.nvim`, so I kept `vim-go`. But as a result of investigating just where this feature comes from, I ended up reading the `vim-go` [tutorial](https://github.com/fatih/vim-go/wiki/Tutorial) and learning more about what the plugin offers, something I haven't done since giving it a cursory glance when first installing it a couple of years back.

Some things that caught my interest this time around:
  - `:GoRename` which allows for easy renaming of identifiers everywhere they're referenced
  - `:GoImpl` which can [autogenerate](https://github.com/josharian/impl) methods to make a given type satisfy a given interface
  - `:GoLint` which lints your source code and gives feedback to make code more idiomatic
  - `:GoCoverage` and associated commands which allows you to easily see what parts of your code are (un)covered by your tests, without leaving your editor
  - `:GoFreevars` which can tell you which variables a given range of code depends on

Finally, [this article](https://blog.langworth.com/vim3), which I decided to read after I had committed to migrating to Neovim, gave me the idea of incorporating vim buffers into my workflow. Up until this point, I had mostly just been `Ctrl+p`-ing to jump to files, and then using `Ctrl-o`, `Ctrl-i` to jump back and forth. Following the author's example, I mapped `;` to bring up a Telescope fuzzy find list of buffers and now finding any file I've worked with over the course of a vim session is as easy as typing `;` and a couple of characters to disambiguate it from other files in the buffer list. Much quicker than jumping back and forth or remembering which mark was dropped in which file, although these things are not mutually exclusive.

The only issue I have with Neovim is that now there seem to be two ways of writing configuration - either in Vimscript or Lua. Most things probably make sense to be written in Lua but for porting Vimscript config, I find myself occasionally having to use Lua's `vim.cmd` interface for calling Vimscript commands, i.e. `vim.cmd("let g:go_auto_type_info = 1")` for cases like configuring `vim-go` which doesn't expose Lua commands. This isn't a huge setback and can even be seen as an advantage, but it just means that to achieve a given effect it's not immediately clear to a Neovim newcomer like me what the right approach is.

That being said, Lua is much easier on the eyes and I can actually understand my config at a glance which is not always the case with an assortment of ossified Vimscript snippets.

In the end, there isn't actually anything I use Neovim for that can't be done in Vim, and Neovim doesn't make any such claims anyway. Most of the plugins I use have Vim equivalents. Neovim's LSP client has many analogues in Vim, as mentioned above. One of my favourite Neovim plugins, [SymbolsOutline](https://github.com/simrat39/symbols-outline.nvim) which uses the LSP client, has a tag-based Vim [equivalent](https://github.com/preservim/tagbar). And `vim-go` was written in Vimscript originally anyway.

Here's that list from earlier again outlining why it might be a good idea to switch:
  - asynchronous plugins for better performance (don't block the main thread)
  - configuration is a easier to reason about, because of:
  - Lua support
  - peace of mind knowing that LSP client is built-in instead of another plugin
  - Telescope is pretty awesome
  - using a community-driven product, instead of having [a bus factor of 1](https://geoff.greer.fm/2015/01/15/why-neovim-is-better-than-vim/)

Happy editing!

<br />

----

<div style="word-break: break-word;">

### References

Greer, Geoff. “Why Neovim Is Better than Vim.” Geoff.Greer.fm, 15 Jan. 2015, https://geoff.greer.fm/2015/01/15/why-neovim-is-better-than-vim/

Langworth, Ian. “Vim after 15 Years.” Ian Langworth's Things of Variable Interest, Ian Langworth, 17 Oct. 2017, https://blog.langworth.com/vim3

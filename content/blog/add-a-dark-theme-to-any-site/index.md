---
title: Add a dark theme to any site
date: '2020-02-16T07:16:59.352Z'
description: ''
---

A little while ago I abruptly noticed that dark themes have become really popular. It looks like this development extended past mobile and desktop OS's to everything under the web. The Slack desktop app [got a dark theme](https://slackhq.com/dark-mode-for-slack-desktop) last year. Gatsby.js (used to build this site, incidentally) has a dark theme (see the little sun/moon toggle in the top right), and then, of course, I noticed that Reddit has a dark theme (added [almost two years ago](https://redditblog.com/2018/05/24/night-mode-is-finally-here/) - all I do these days is turn over the rocks that make up my home). And the list goes on.

The verdict regarding the benefits of dark themes is not conclusive. Or, more to the point, it's conclusive that rather than yielding a universally better reading/browsing/working experience, they may be better for users with [certain visual impairments](https://www.nngroup.com/articles/dark-mode/), or in [low-light conditions](https://www.maketecheasier.com/are-dark-themes-better-for-eyes-battery/), depending what [type of content](https://www.fastcompany.com/90421232/dark-mode-is-everywhere-but-is-it-really-better) they're consuming. Of course, in addition to the aforementioned reasons, the humble creators of the web continue to be moved by their ardent veneration of the User, so in their striving to make the browsing experience as personalizable as possible, this trend is most likely here to stay.

So, I decided to implement a dark theme on this site, just for kicks - that's what that little water/fire toggle in the nav is meant to be. There're more articles on this topic, though, than you can shake a stick at, so this post won't be treating that particular subject. The thing is, it was a blast to do, and I quite like the colours that I selected in the end, so I shifted towards a slightly different challenge - how to enable dark mode on _any_ site.

Before going any further, however, [Dark Reader](https://darkreader.org/) is a fantastic open-source browser extension that you can use to enable a dark theme on pretty much any site you visit. This article doesn't yield anything as robust as Dark Reader, but is rather just one person's tinkering around with browser APIs, so y'know...caveat emptor, tread softly because you tread on my dreams, and all the rest of it.

## Remember the Bookmarklet?

I was trying to think of what APIs I would use in order to 'darkify' a site _ad hoc_, and remembered one of my favourite tools, a clever little gadget called [Fount](https://fount.artequalswork.com/). It looks like a bookmark but clicking it arms the user with a crosshair cursor that identifies the font of any text that is subsequently clicked. Very handy, and saves a trip to the devtools. With that, it was clear that the bookmarklet API would be perfect for this.

For anyone encountering this delightful creature for the first time, a bookmarklet behaves very similarly to a regular bookmark, and lives in all of the same places, but instead of fetching a resource using the `http` or `https` protocols, it executes code.

I opted for this over, say, a browser extension, as the kind of functionality we're building doesn't need us to constantly be running code in the background while we browse, and dragging down our browser performance as a result. That's the great thing about bookmarklets - until you click them, they're just a speck on your bookmark bar.

So, getting back to the details, if adding a bookmark requires us to provide a name and a URL, in the case of a bookmarklet, the code that we want to run is entered directly into the URL field, but on the condition that we use the correct URI scheme, outlined below.

If we look at the structure of a URI diagrammed below, the very first portion is the scheme. The scheme tells the client, in this case the browser, what to do with the resource identified in the parts of the URI that follow. For instance, if the scheme is `https`, dumping a well-formed URI into the browser search bar will invoke the default behaviour of attempting to fetch the specified resource using an HTTP GET request. Then there's the good ol' `mailto` scheme which opens the default email client (as we frantically mash the close button - [this guy](https://mailtoui.com/) gets it). There are schemes used for database connection strings such as `mongodb` and `redis`, and so on.

<figure style="text-align:center;">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/URI_syntax_diagram.svg/1920px-URI_syntax_diagram.svg.png"
    width="100%" 
    alt="URI Syntax Diagram"
    title="URI Syntax Diagram"
  />
  <figcaption>URI Syntax Diagram</figcaption>
</figure>

In this case, we're interested in the `javascript` scheme. By prepending `javascript:` to our code, we are telling the browser that the contents of this bookmark's URL is not content to be fetched, but JavaScript to be run. With that out of the way, let's write our bookmarklet.

## First steps

Let's begin with a proof of concept to make sure that it works, thus we make the value of our URL field:

```javascript
javascript: alert('hello');
```

Since we're going to be declaring variables in our bookmarklet and we don't want to collide with any JS already loaded in the page that we'll be changing, let's make one more optimization and wrap our bookmarklet in an IFFE:

```javascript
javascript: (function() {
  alert('hello');
})();
```

Success! With any luck we should see a friendly browser message, and should be confirmed in our belief that it's possible to execute JS through a bookmark.

So then let's consider how we can use this to create a dark theme that we can deploy anywhere. Taking as our target any kind of long-form reading, we'll content ourselves with converting the background colour of a page to a dark colour, and most text to a light colour of our choosing.

This [contrast checker](https://webaim.org/resources/contrastchecker/) is an excellent resource that will allow us to pick colours with good contrast ratios. For this example, I'll go with `#121212` for our background colour, and `#e0e0e0` for our text colour, which gives us a contrast ratio of 14.19:1, satisfying [WCAG AAA standards](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast7) with room to spare.

## Grabbing the content

The next thing we can do to get our dark theme to do something meaningful is to change the background colour of the body to the colour we selected.

```javascript
javascript: (function() {
  const darkColour = '#121212';
  document.querySelector('body').style.background = darkColour;
})();
```

The trouble is that this will only work on sites that have a relatively simple DOM structure where text is displayed directly over top of the body, without any intermediate containers with a set background colour spanning the width of the viewport. We'll come back to this in a sec.

Now, we turn to the text and heading elements. We want to select all elements of a certain type, and for every element in that category, transform it in some way. So we'll iterate over all the text elements we're interested in and select all DOM nodes of that type with `document.querySelectorAll`. Then we'll iterate over each nested array and transform the `style` attribute of that node.

\*\* Note: It might be a bit cumbersome to edit the bookmark each time we want to test our code, so we can actually just paste `javascript:...our code` directly into the browser search bar. This is the same as clicking the link!

```javascript
javascript: (function() {
  const darkColour = '#121212';
  const lightColour = '#e0e0e0';

  document.querySelector('body').style.background = darkColour;

  function changeTextColour() {
    const elTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'span'];
    const textEls = elTypes.map(type => document.querySelectorAll(type));

    function applyStyle(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].style) {
          arr[i].style.color = lightColour;
        }
      }
    }

    for (let i = 0; i < textEls.length; i++) {
      if (textEls[i] && textEls[i].length) {
        applyStyle(textEls[i]);
      }
    }
  }

  function init() {
    changeTextColour();
  }

  init();
})();
```

## Optimizing

Things are looking pretty good. Most simple blog sites will succumb to the awesome power of our bookmarklet. Yet, strangely enough, Medium, of all platforms, doesn't afford a dark mode for those browsing the desktop version of the site. This seems like one case we would want to handle, but if we venture over to Medium, we'll see that our current code only affects the text colour, not the background colour.

As I alluded earlier, in the case of Medium, the white background is not part of the `body` tag, but another div,
`<div class="n p">`. There are many elements of with these class names on the page, it turns out. So a single call to `document.querySelector` won't hack it.

To solve this, we could add another loop...

```javascript
document
  .querySelectorAll('.n.p')
  .forEach(el => (el.style.background = darkColour));
```

but then it turns out we would have to do the same thing for Wikipedia, too. This'll probably get out of hand if we try to do this for all of the sites we frequent, not to mention we're taking a really passive approach since the markup on these sites could change at any moment, and we would have to reinvestigate.

If we feel like being really explicit, we could continue in this vein, and shove all the extra code in our bookmarklet to address every individual site. But really, the success of what we're doing hinges on our ability to just apply one kind of style to text, and another kind to everything that might be considered 'background'.

So, to take a fast and loose approach, we'll find all elements whose width is close to the width of the viewport, and apply our background style to each.

```javascript
function changeBackgroundColour() {
  const backgroundEls = [document.body, ...document.querySelectorAll('body *')];

  for (let i = 0; i < backgroundEls.length; i++) {
    const node = backgroundEls[i];
    if (
      node.style &&
      node.clientWidth &&
      node.clientWidth >= window.innerWidth * 0.95
    ) {
      node.style.background = darkColour;
    }
  }
}
```

This gets us Medium, but not Wikipedia as the width of the container of the article is less than 95% of the viewport width. Turning to Wikipedia now, the element inspector tells me that the width of the article's container div relative to the window is 0.84, so if we adjust the value to 85%, we get Wikipedia, too. Combining everything we've got so far gives us:

```javascript
javascript: (function() {
  const darkColour = '#121212';
  const lightColour = '#e0e0e0';

  function changeTextColour() {
    const elTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'span'];
    const textEls = elTypes.map(type => document.querySelectorAll(type));

    function applyStyle(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].style) {
          arr[i].style.color = lightColour;
        }
      }
    }

    for (let i = 0; i < textEls.length; i++) {
      if (textEls[i] && textEls[i].length) {
        applyStyle(textEls[i]);
      }
    }
  }

  function changeBackgroundColour() {
    const backgroundEls = [
      document.body,
      ...document.querySelectorAll('body *'),
    ];

    for (let i = 0; i < backgroundEls.length; i++) {
      const node = backgroundEls[i];
      if (
        node.style &&
        node.clientWidth &&
        node.clientWidth >= window.innerWidth * 0.85
      ) {
        node.style.background = darkColour;
      }
    }
  }

  function init() {
    changeTextColour();
    changeBackgroundColour();
  }

  init();
})();
```

## Wrapping Up

There's nothing really wrong with keeping all of the code we've written directly in the bookmark. But it's less than ideal for iteration if we have to go copy/paste the code into the bookmark every time. A better approach would be to host the source of the bookmark somewhere else. In that case, all we keep in the bookmarklet is some driver code to create a script element on the page, set the `src` attribute of our script to wherever our dark theme is hosted, then append the script element to the document to be run.

This does require us to be able to host our javascript files somewhere, so there is an extra step, but ultimately it is a cleaner solution.

The final version of our bookmarklet looks like this - of course, replace the domain with your own - where the URL below will just serve up the IFFE we wrote above.

```javascript
javascript: (function() {
  const darkTheme = document.createElement('script');
  darkTheme.src = 'https://ilyameerovich.com/darkthemelet.js';
  document.body.appendChild(darkTheme);
})();
```

You can drag it to your bookmark bar and test it out here 👉 <a style="margin-left: 5px;padding:2px 10px;color: #121212;background:#ccc; border-radius:5px; box-shadow: 0px 1px 3px rgba(0,0,0,0.5);text-decoration: none; cursor: grab;white-space: nowrap" href="javascript: (function() {
  const darkTheme = document.createElement('script');
  darkTheme.src = 'https://ilyameerovich.com/darkthemelet.js';
  document.body.appendChild(darkTheme);
})();">Dark Theme</a>

Besides talking a little bit about dark themes, we looked at what a bookmarklet is and some ideas for how to create one. As mentioned previously, the 'universal dark theme' idea has been realized in a much richer and more elegant way by the good people at Dark Reader. However, hopefully this little snippet can be used as a scaffold for anything else you'd like to customize in your browsing experience. If you think of something that can be fixed with a little bit of JavaScript (and most things can!), you might reach for the humble bookmarklet.

<br />

---

<div style="word-break: break-word;">

### References

Braun, Andrew. “Are Dark Themes Really Better for Your Eyes and Battery?” Make Tech Easier, 9 Apr. 2019, https://www.maketecheasier.com/are-dark-themes-better-for-eyes-battery/.

Budiu, Raluca. “Dark Mode vs. Light Mode: Which Is Better?” Nielsen Norman Group, Nielsen Norman Group, 2 Feb. 2020, https://www.nngroup.com/articles/dark-mode/.

Slack. “Dark Mode Comes to Desktop: Here's How You Can Access It.” Several People Are Typing, Slack, 27 Nov. 2019, https://slackhq.com/dark-mode-for-slack-desktop.

Smith, Lilly. “Dark Mode Is Everywhere. Is It Really Better for You?” Fast Company, Fast Company, 29 Oct. 2019, https://www.fastcompany.com/90421232/dark-mode-is-everywhere-but-is-it-really-better.

Thunderemoji. “Night Mode Is Finally Here!” Upvoted, 24 May 2018, https://redditblog.com/2018/05/24/night-mode-is-finally-here/.

</div>

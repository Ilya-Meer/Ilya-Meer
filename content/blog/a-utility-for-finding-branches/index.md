---
title: "A Utility For Finding Branches"
date: "2020-08-03T17:11:17.891Z"
description: ""
---

At work we have a convention for naming git branches that goes: `dev/<your name>/<JIRA ticket id>`. I often end up with a pile of branches of the form `dev/ilyam/XY-1234`, and having to switch between them gets to be a chore after a while. 

[Oh My Zsh](https://ohmyz.sh/) definitely makes life easier by providing git autocomplete and some helpful aliases, but I thought I could save a couple more keystrokes still.

The script below is a bash function that takes a single argument. The output of `git branch` is grepped for that argument, and if no matching branch is found, the function echoes an error and exits. If a match is found then that branch will automatically get checked out, and if more than one match is found the user is shown all the options that they can then choose from, using the handy `select` command. 

An interesting note is that `git branch` has a format argument to just list the branch names. The default behaviour of `git branch` without the argument is to prepend a `*` in front of the user's currently checked-out branch. This means that if the function returns a single match that also happens to be the current branch, you might end up trying to `git checkout * somebranch` which leads to unexpected results due to [filename expansion](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html#Filename-Expansion).

For maximum results, name it whatever you like and stick it in your favourite shell config.

```bash
function co() {
    OPTIONS=()

    # Push all local branch names into array
    for branch in $(git branch --format='%(refname:short)' | grep $1); do
        OPTIONS+=($branch)
    done

    # If no branch names in array, exit
    if  [ ${#OPTIONS[@]} -eq 0 ]; then
        echo "No branch found matching pattern!"
        return
    fi

    # If a single branch is found matching specified pattern,
    # Run `git checkout on it`
    if  [ ${#OPTIONS[@]} -eq 1 ]; then
        echo "Found single branch matching pattern --> ${OPTIONS[@]}"
        git checkout ${OPTIONS[@]}
        return
    fi

    # If multiple matches found, display options to user
    PS3='Multiple branches found, select branch: '
    select branch in ${OPTIONS[@]}
    do
        git checkout $branch
        break
    done
}
```
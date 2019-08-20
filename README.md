# Stackoverflow Instant Search - Visual Studio Code Extension

This extension adds a quick command to search Stackoverflow without leaving your favorite VS Code. You can find the command by name `stackoverflow search` or by using the hotkeys `cmd+h` on Mac or `ctrl+h` on Windows, `h` stands for `help`. As an alternative you can execute search instantly from a context menu (select text -> right click -> Stackoverflow Search) or by using the hotkeys `cmd+shift+h` on Mac or `ctrl+shift+h` on Windows.

![Stackoverflow Instant Search Demo](https://raw.githubusercontent.com/alexeystrakh/vscode-stackoverflow-extension/master/images/stackoverflow-search-video.gif "Stackoverflow Instant Search Demo")

You can also narrow your search with tags by specifying them in square brackets (semicolon-separated), e.g. `BindingContext [mvvm;xamarin.forms]`

![Stackoverflow Tags Search Demo](https://raw.githubusercontent.com/alexeystrakh/vscode-stackoverflow-extension/master/images/stackoverflow-search-tags.png "Stackoverflow Tags Search Demo")

## Features

- Stackoverflow instant search without leaving VS-Code
- Execute search with a search term preview (ctrl/cmd+h) or instantly (ctrl/cmd+shift+h)
- Browse search result by title and stats stats (Stackoverflow votes, answers, etc)
- Open selected post in a default browser
- Execute Google search as an option if no relevant results found
- Execute Stackoverflow search as an option if no relevant results found

## Release Notes

This is an initial version of the Stackoverflow Instant Search extension.

## Contributions

Star and follow this [public repository](https://github.com/alexeystrakh/vscode-stackoverflow-extension) and please provide feedback, submit issues and PRs!

## Stackoverflow API

We use [Stackexchange Search API](https://api.stackexchange.com/docs/search). Please make sure you get your own key to contribute.

## Tags

`stackoverflow`, `stack-overflow`, `stack overflow`, `stackexchange`, `stack exchange`, `stack-exchange`,  `question`, `answer`, `debug`, `search`, `google`, `instant search`, `stuck overflow`

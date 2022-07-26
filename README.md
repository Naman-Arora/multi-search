# Multi-Search

Multi-Search is a React app made with Mantine and Typescript. The goal of this app is to replace your new tab page with a shortcut based search box. With supported websites, granted the setting is turned on, a preview of the response can be seen.

## Previews

Previews are powered by the `<iframe>` html element. However, since some websites send an `X-Frame-Options: SAMEORIGIN` response, not all websites allow previews.

## Shortcuts

|**Search Engine**|**Shortcut**              |
|-----------------|--------------------------|
| Web             | Default; No Expression   |
| Google          | "g " OR "google "        |
| Wikipedia       | "w " OR "wikipedia "     |
| Dictionary      | "d " OR "dictionary "    |
| Thesaurus       | "t " OR "thesaurus "     |
| Stack Overflow  | "s " OR "stackoverflow " |
| Twitter         | "tw " OR "twitter "      |
| LinkedIn        | "li " OR "linkedin "     |
| Instagram       | "in " OR "instagram "    |

An important note: the space character (" ") after the shortened name is necessary to evalute the user input.

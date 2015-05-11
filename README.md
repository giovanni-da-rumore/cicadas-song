# Allit

[Heroku link][heroku]

[heroku]: https://aleatory-lit.herokuapp.com/

## Minimum Viable Product
Allit is a clone of Genius built on Rails and Backbone. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Upload texts
- [ ] Create annotations on texts
- [ ] View texts and annotations
- [ ] Upvote or Downvote annotations
- [ ] Follow users or texts
- [ ] View a feed of texts/users which they follow
- [ ] View a homepage that displays currently "hot" texts
- [ ] Create their own library's of favorite texts that will be displayed in their profile
- [ ] Have another section on their profile that displays all texts that they authored.
- [ ] Have a section of their profile's that will display their recent activity
- [ ] Search for texts by title or author



## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Blog Creation (~1 day)
I will implement user authentication in Rails based on the App Academy practices. After this phase, users should be able to create genius texts using a simple text form in a Rails view. Users will also be separated into two categories, general users who can upload and edit texts and privileged users, who can edit texts/annotations and later 'postlet' or advertize texts. Users will also be able to create text descriptions, which will be visible in a sidebar. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Viewing Texts and Annotations (~3 days)
I will add API routes to serve text data as JSON, then add Backbone
models and collections to fetch data from those routes. After that, I will use Backbone to enable user to make annotations on specific sections of texts. This might be somewhat tricky. By the end of this
phase, users will be able to create texts and make basic annotations on specifc lines within said texts, all
within a single Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Texts (~2 days)
I plan to use third-party libraries to add functionality to the `TextForm`, "AnnotationForm",
`TextShow`, and 'AnnotationShow' views in this phase. First I'll need to add a Markdown editor to the
`TextForm`, and make sure that the Markdown is properly escaped and formatted in
their respective views. Genius allows certain html marks to be entered while creating texts, but escapes all of them for individual annotations and uses it's own system to make words italicized, bold, in quotes, a link or an image. I will try to find some gem to render pictures, or write a simple method that uses regex that detects when text ends in .png/.jpg and puts said text in img tags.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll add a `feed` route that uses the `current_user`'s
`followed_users` association to serve a list of those users' activity ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose that somehow fetches each user's activity-both annotations and text uploads, from the new route. This should be displayed as a dropdown on the navbar.


[Details][phase-four]


### Phase 5: Searching for Blogs and Posts (~2 days)
I'll need to add `search` routes to both the Texts controllers. On the
Backbone side, there will be a `SearchResults` composite view has `TextIndex`
and `AuthorIndex` subviews. These views will use plain old `text` and 'author'
collections, but they will fetch from the new `search` routes.

[Details][phase-five]


### Phase 6: HomePage (~2 days)

I'll add another "hotTexts" route that collects texts based on a ranking system. All users, regardless of who they follow, should see the same hot texts on their homepage. A text's ranking will be altered based on a mixture of recent views and "postlets", or, when a privileged user promotes a text. Before implementing the ranking ordering, I'll have to give users the ability to advertise a text via postlets. Measuring how many hits a certain text is getting might be difficult, so I'll have to do a little research there.


[Details][phase-six]

### Bonus Features (TBD)
- [ ] "Upvodte-Downvote" button for annotations
- [ ] Custom blog urls
- [ ] Pagination/infinite scroll
- [ ] Activity history (e.g. likes, reblogs, taggings)
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar
- [ ] Ability to add music/youtube or soundcloud links to annotations and text descriptions.
- [ ] Ability to message other users




[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md

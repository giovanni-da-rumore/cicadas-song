# Cicadas Song

[Heroku link][heroku]

[heroku]: https://cicadas-song.com/



## About

Named after a myth from Plato's *Phaedrus*, *Cicadas Song* is a Genius-inspired
digital library that allows users to read, upload and annotate texts. The site runs primarily on a Backbone.js front end, straddling a RESTful Rails API.
It also uses jQuery, stores images on AWS S3, and supports multi-table lookup through PgSearch.




## Authentication

Authentication is done in Rails and allows users to be signed in from more than one
location at a time. If you're demoing, feel free to sign in under the guest account.
Also, some features such as Text-promotions, Text-Edit and Annotation-Deletion require being signed in under
a moderator account. If you'd like to try out these features, just email me at jsl2184@gmail.com and I can upgrade
your account.



## Annotations


Annotations are done using JavaScript and a [Rangy](https://github.com/timdown/rangy), a ruby gem for JavaScript range and selection. Most of the work involved in getting the ranges of highlighted text appears in the [TextShow View](app/assets/javascripts/views/texts/text_show.js). However, JavaScript-acquired ranges match the text's range requires a bit of parsing on the rails side. If one simply types the text when creating a new one, such parsing is not necessary. Yet, if the user pastes a copied text when creating, often carriage returns and tabs get introduced, which the Rangy library does not register. Without the parsing, annotations are usually one character off for every blank space, but this can vary depending on the text itself. To fix this problem, I wrote a parse method in the [Texts Controller](app/controllers/api/texts_controller.rb) that removes any non line-break space characters of length greater than 1, and makes adjustments for extra spaces introduced upon their removal. To be safe, there's a [model level](app/models/text.rb) validation that removes carriage returns as well.


Once the correct range is established, annotations are not actually inserted into the text directly. Rather, each annotation keeps track of its own start and end index and, before texts are displayed, annotations are inserted (as anchor tags) onto the displayed text in the [Text Backbone.js Model](app/assets/javascripts/models/text.js).


## Annotation Aesthetics

Like Genius, annotations appear relative to the viewer's position on the page. The site uses jQuery to measure the viewer's position from the top, then measures this against the where the annotation's text appears on the page, and adds a little padding, to make the annotation itself appear more centered. You can view this process in the [annotation show view](app/assets/javascripts/views/annotations/annotations_show.js).
In addition, for the annotation content itself, I wrote a simple parser to preserve line breaks as well as put image tags around url image links. Both parsers use regular expressions, and are used throughout the site. The [Parser Util](app/assets/javascripts/views/annotations/annotations_show.js) also includes two functions to adjust a textarea's size when the content inside exceeds its height.



## Promoted Texts

Like Genius, Cicadas Song uses "postlets", a table linked to texts themselves, to order works on the homepage. When a user creates a postlet, they also add an image and a promotional description, the image automatically becomes the text's own image and thus, shows up above the text itself on its page. You need to be a moderator to make postlets, but if you'd like to see this feature in action, just shoot me an email (see authentication above).

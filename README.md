# MAASU Leadership Summit 2016 Ionic Application
This application was used for MAASU Leadership Summit @ Northwestern University

![image](https://lh3.googleusercontent.com/-RHlZptd9iHIXD1CgbbhvpsSsR7b5h3X07s4tSWziS_0UER1YCW5oWusJWog4fuhLIU=h900-rw)

Open-sourcing this repository as a reference for Angular.js / Ionic users. Unfortunately, I didn't completely unit test the code because of time constraints, but fortunately everything went pretty smooth when it went live. This project was also genereated by [Generator-M-Ionic v1.8.0](https://github.com/mwaylabs/generator-m-ionic).

Feel free to download and use the app to test for yourself:
- [Apple Store](https://itunes.apple.com/us/app/maasu-leadership-summit/id1174485929?mt=8)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.maasu.lsproject&hl=en)

Enjoy! 

## Technical Aspects
### Dynamic Content
This is using [Contentful](https://www.contentful.com/
), a API-based CMS, free teir plan to dynamically render content for each view. This allows for the data to be managed and editable from the conference team, and propose updates to the app without having to re-upload through the Google or Apple store. This is easily accomplishable using angular-contentful to immediately invoke API calls within the views.

### Firebase
There is a interactive area of the app called "Dialogues", this app utilizes Firebase to allow users to generate postings to be seen within the application.


## License
MIT - 2017 Brandon Him 

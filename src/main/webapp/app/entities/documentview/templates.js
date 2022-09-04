const templates = {
  letter: `<p style="text-align: right;"><span style="font-size: 30pt; font-family: calibri;">ZIP CODE WILMINGTON</span></p>
  <p style="line-height: 1; text-align: right;"><span style="font-family: calibri;">123 ORANGE STREET</span></p>
  <p style="line-height: 1; text-align: right;"><span style="font-family: calibri;">YOUR CITY, ST 12345</span></p>
  <p style="line-height: 1; text-align: right;"><span style="font-family: calibri;">(123) 456-7890</span></p>
  <p style="line-height: 1; text-align: right;"><span style="font-family: calibri;">NO_REPLY@EXAMPLE.COM</span></p>
  <p style="line-height: 1; text-align: right;"><span style="font-family: calibri;">September 04, 2022</span></p>
  <p><span style="font-family: calibri; font-size: 14pt;">Dear Amazing Company, </span></p>
  <p><span style="font-family: calibri; font-size: 14pt;">I am writing in regards to the entry level software development role that you have posted. I am very excited about the opportunity to join your team and contribute to your company&rsquo;s success. </span></p>
  <p><span style="font-family: calibri; font-size: 14pt;">I recently graduated from a 12 week bootcamp where I learned a variety of programming languages and software development techniques. I am confident that I have the skills and knowledge necessary to be a successful software developer. In addition, I am a quick learner and have a great deal of experience working in a team environment. </span></p>
  <p><span style="font-family: calibri; font-size: 14pt;">I believe that I would be a great addition to your team and would love the opportunity to put my skills to work in a real-world setting. I am eager to learn and grow as a software developer, and I am confident that I have the potential to be a valuable asset to your company. </span></p>
  <p><span style="font-family: calibri; font-size: 14pt;">Thank you for your time and consideration. I look forward to hearing from you soon.</span></p>
  <p><span style="font-family: calibri; font-size: 14pt;">Sincerely,<strong><br></strong></span></p>
  <p><span style="font-family: calibri;"><span style="font-size: 18.6667px;">[Your Name]</span></span></p>
  <p>&nbsp;</p>`,
  resume: `<p style="line-height: 1;"><span style="font-size: 36pt; font-family: helvetica;">Your Name</span></p>
    <p><span style="font-size: 18pt; color: rgb(185, 106, 217);">Industrial Designer</span></p>
    <p>Your City, ST 12345</p>
    <p>(123) 456-7890</p>
    <p>no_reply@example.com</p>
    <h1><span style="color: rgb(155, 9, 185);">SUMMARY OF QUALIFICATIONS</span></h1>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.&nbsp;</p>
    <h1><span style="color: rgb(155, 9, 185);">SKILLS</span></h1>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.&nbsp;</p>
    <h1 ><span style="color: rgb(155, 9, 185);">EXPERIENCE</span></h1>
    <p><span style="font-size: 14pt;"><strong>Company Name,&nbsp; Location</strong> <span style="color: rgb(126, 140, 141);"><em>- Job Title</em></span></span></p>
    <p><span style="color: rgb(126, 140, 141);">MONTH 20XX - PRESENT</span></p>
    <ul>
    <li>
    <p  role="presentation"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</span></p>
    </li>
    <li>
    <p role="presentation"><span style="font-size: 12pt;">Aenean ac interdum nisi. Sed in consequat mi.</span></p>
    </li>
    </ul>
    <h2 ><span style="font-size: 14pt;"><strong>Company Name,&nbsp; Location</strong> <span style="color: rgb(126, 140, 141);"><em>- Job Title</em></span></span></h2>
    <p ><span style="color: rgb(126, 140, 141);">MONTH 20XX - MONTH 20XX</span></p>
    <ul>
    <li  >
    <p  role="presentation"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</span></p>
    </li>
    <li  >
    <p  role="presentation"><span style="font-size: 12pt;">Aenean ac interdum nisi. Sed in consequat mi.&nbsp;</span></p>
    </li>
    </ul>
    <h2 ><span style="font-size: 14pt;"><strong>Company Name,&nbsp; Location</strong> <span style="color: rgb(126, 140, 141);"><em>- Job Title</em></span></span></h2>
    <p ><span style="color: rgb(126, 140, 141);">MONTH 20XX - MONTH 20XX</span></p>
    <ul>
    <li  >
    <p  role="presentation"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</span></p>
    </li>
    <li  >
    <p  role="presentation"><span style="font-size: 12pt;">Aenean ac interdum nisi. Sed in consequat mi.&nbsp;</span></p>
    </li>
    </ul>
    <h1 ><span style="color: rgb(155, 9, 185);">EDUCATION</span></h1>
    <h2 ><span style="font-size: 14pt;"><strong>School Name,&nbsp; Location</strong> <span style="color: rgb(126, 140, 141);"><em>- Degree</em></span></span></h2>
    <p ><span style="color: rgb(126, 140, 141);">MONTH 20XX - MONTH 20XX</span></p>
    <p ><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</span></p>
    <h1 ><span style="color: rgb(155, 9, 185);">AWARDS</span></h1>
    <p ><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></p>
    <p ><span style="font-size: 12pt;">Aenean ac interdum nisi.</span></p>
    <p>&nbsp;</p>`,
  meeting: `<p dir="ltr"><span style="font-family: georgia, palatino, serif; color: rgb(126, 140, 141); font-size: 12pt;">YOUR COMPANY</span></p>
  <p dir="ltr"><span style="color: rgb(0, 0, 0); font-size: 24pt; font-family: georgia, palatino, serif;"><strong>MEETING NAME <span style="color: rgb(52, 73, 94);">09/24</span></strong></span></p>
  <p dir="ltr"><span style="font-family: georgia, palatino, serif;"><img title="horizontal line" src="https://lh6.googleusercontent.com/Yju9Z0BHLMsbIfalQes7tPYg_t_jaIgqky1gd2sADXn9C13A3Gk7W-224uWF18nTNIBduLnptv1MzbQWDqtV-rZIKRumWpddqhbZcSw_-9wb1BfGgU_ARbRWFmMgPeaVTAzlOseCQ0f2mS9HxjuJY_gBQOn4yYy0Sb-In9lygYNq9FbPS0fsTg0ajw" width="624" height="5"></span></p>
  <p dir="ltr"><span style="font-family: georgia, palatino, serif; color: rgb(229, 27, 135);">24 SEPTEMBER 20XX / 1:30 PM / ROOM 924&nbsp;</span></p>
  <h1 dir="ltr"><span style="font-family: georgia, palatino, serif;">ATTENDEES</span></h1>
  <p dir="ltr"><span style="font-family: georgia, palatino, serif;">Morty Manager, Lou Librarian, Greta Groundskeeper</span></p>
  <h1 dir="ltr"><span style="font-family: georgia, palatino, serif;">AGENDA</span></h1>
  <h2 dir="ltr"><span style="font-family: georgia, palatino, serif;">Last Meeting Follow-up</span></h2>
  <ol>
  <li dir="ltr" aria-level="1">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;">At the last meeting, the committee met to discuss technology, economic analysis, and figures of technical interest.</span></p>
  </li>
  </ol>
  <h2 dir="ltr"><span style="font-family: georgia, palatino, serif;">New Business</span></h2>
  <ul>
  <li dir="ltr" aria-level="1">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;">The tooling and technologies that facilitate the creation of software interfaces and services</span></p>
  </li>
  <li dir="ltr" aria-level="1">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;">Examine concepts such as clients, messaging, plugins, standards, SDKs</span></p>
  </li>
  </ul>
  <h1 dir="ltr"><span style="font-family: georgia, palatino, serif;">NOTES</span></h1>
  <ul>
  <li dir="ltr" aria-level="1">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;">Software solutions that can be used for both standalone as well as home automation applications</span></p>
  </li>
  <li dir="ltr" aria-level="1">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;">Smart TVs, audio systems, smart plugs, cameras, thermostats, doors, locks, garage door openers, lighting, ACs and speakers</span></p>
  </li>
  <ul>
  <li dir="ltr" aria-level="2">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;"><a href="https://www.google.com/search?q=what+is+java&amp;oq=what+is+java&amp;aqs=chrome..69i57j0i433i512j0i512l8.1566j0j7&amp;sourceid=chrome&amp;ie=UTF-8" target="_blank" rel="noopener">Become a software developer</a></span></p>
  </li>
  </ul>
  </ul>
  <h1 dir="ltr"><span style="font-family: georgia, palatino, serif;">ACTION ITEMS</span></h1>
  <ol>
  <li dir="ltr" aria-level="1">
  <p dir="ltr" role="presentation"><span style="font-family: georgia, palatino, serif;">Create two styles for displaying data in a web browser based on the technologies mentioned above</span></p>
  </li>
  </ol>
  <h1 dir="ltr"><span style="font-family: georgia, palatino, serif;">NEXT WEEK&rsquo;S AGENDA</span></h1>
  <p dir="ltr"><span style="font-family: georgia, palatino, serif;">Create a website that will allow for the users to connect a geolocation tag to a profile in order to see photos taken by people in their city</span></p>`,
};

export default templates;

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Testing that each feed in allFeeds contains a non-empty URL
         */
        it('contain urls', function() {
            for (var idx = 0; idx < allFeeds.length; idx++) {
                expect(allFeeds[idx].url).toBeDefined();
                expect(allFeeds[idx].url.length).toBeGreaterThan(0);
            }
        });

        /* Testing that each feed in allFeeds contains a non-empty name
         */
        it('contain names', function() {
            for (var idx = 0; idx < allFeeds.length; idx++) {
                expect(allFeeds[idx].name).toBeDefined();
                expect(allFeeds[idx].name.length).toBeGreaterThan(0);
                expect(typeof allFeeds[idx].name).toBe('string');
            }
        });
    });

    describe('The menu', function() {

        var body = $("body"); // menu-hidden appears on the body tag

        /* Testing that the menu is hidden by default
         */
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

         /* Testing that the menu becomes visible after clicking the menu icon
          */
        it('should become visible after menu icon is clicked', function() {
            // start as hidden
            expect(body.hasClass('menu-hidden')).toBeTruthy();

            // click the menu icon
            $(".menu-icon-link").click();

            // the menu should now be showing (i.e. 'menu-hidden' should no longer be active)
            expect(body.hasClass('menu-hidden')).toBeFalsy();

            // click the menu icon again
            $(".menu-icon-link").click();

            // the menu should once again be hidden
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            // load a new feed
            loadFeed(1, done);
        });

        /* Testing that there is at least one entry after a feed has been loaded */
        it('have been loaded into the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

        /* Go back to initial feed */
        afterEach(function(done) {
            loadFeed(0, done);
        });
    });

    describe('New Feed Selection', function() {

        beforeEach(function(done) {
            $('.feed').empty(); // start fresh

            // load a new feed
            loadFeed(1, done);
        });

        /* Testing that the content changes when a new feed is loaded */
        it('content changes after loading new feed', function() {
            var feed = $('.feed').html(); // store current feed text

            // load a new feed
            loadFeed(0, function() {

                // feed should have changed
                expect($('.feed').html()).not.toBe(feed);
            });
        });
    });

}());

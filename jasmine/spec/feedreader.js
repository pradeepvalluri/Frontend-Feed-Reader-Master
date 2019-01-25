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
            /* RSS feeds */
    describe('RSS feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* URL should not be empty.*/
        it('URL should not be empty', function() {
            allFeeds.forEach(feed=>{
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');

            })
            
        });

         /*Name should not be empty*/
        it('Name should not be empty', function() {
            for (let i =0; i<allFeeds.length;i++) {  
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });
    });

      /*The menu*/
    describe('The menu', function() {
        let body =$('body');
        it('Menu is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
         /*The menu changes visibility when its clicked*/
        it('The menu changes visibility when its clicked', function() {
            let menuclick = $('.menu-icon-link');
            menuclick.click();
            expect(body.hasClass('menu-hidden')).toEqual(false);
            menuclick.click();
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });
    });

    /*Initial entries*/
    describe('Initial entries', function() {
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /*It should have atleast one entry*/
        it('It should have atleast one entry', function(done) {
             let feedentry = $('.feed .entry');
             let value;
             value = feedentry.length;
            expect(value).toBeGreaterThan(0);
            done();
        });
    });

       /*new feed selection*/
        describe('new feed selection', function() {
            var feedinputtext;
            var feeds= $('.feed')
            beforeEach(function(done) {
                loadFeed(0, function() {
                    feedinputtext = feeds.text();
                    loadFeed(1, function() {
                        done();
                    });
                });
            });
             /*it changing its loading content*/
            it('it changing its loading content', function() {
                expect(feeds.text()).not.toBe(feedinputtext);
            });
        });
}());
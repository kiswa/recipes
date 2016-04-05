require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    Notifications = require('../dist/app/notifications/notifications.component.js').Notifications,
    NotificationsServiceMock = {
        noteAdded: {
            subscribe: function(fn) { fn(true); }
        }
    };

describe('Notifications Component', function() {
    var notifications;

    beforeEach(function() {
        notifications = new Notifications(NotificationsServiceMock);
    });

    it('should have an array of notifications', function() {
        expect(notifications._notes).to.be.an('array');
    });

    it('should hide notifications by removing them from the array', function() {
        var note = { type: 'info', message: 'test' };
        notifications._notes = [note];

        notifications.hide(note);

        expect(notifications._notes.length).to.equal(0);
    });
});

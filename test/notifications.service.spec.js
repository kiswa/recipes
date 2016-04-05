require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    NotificationsService = require('../dist/app/notifications/notifications.service.js').NotificationsService;

describe('Notifications Service', function() {
    var notificationsService;

    beforeEach(function() {
        notificationsService = new NotificationsService();
    });

    it('should have an observable for new notes', function() {
        expect(notificationsService).to.have.property('noteAdded').
            that.is.an('object');
    });

    it('should update subscribers when a note is added', function() {
        var tested = false;

        notificationsService.noteAdded.subscribe(function() {
            tested = true;
        });

        notificationsService.add({ type: 'error', message: 'Testing' });

        expect(tested).to.equal(true);
    });
});
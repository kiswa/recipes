require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    Notification = require('../dist/app/notifications/notifications.model.js').Notification;

describe('Notification Model', function() {
    var notification,
        type = 'info',
        message = 'The message.';

    beforeEach(function() {
        notification = new Notification(type, message);
    });

    it('should have a "type" property', function() {
        expect(notification).to.have.property('type').
            that.equals(type);
    });

    it('should have a "message" property', function() {
        expect(notification).to.have.property('message').
            that.equals(message);
    });
});
const commentsConfig = {
    collectionsAllowingComments: ['posts', 'events'],
    sendAlert: true,
    alertRecipients: ['rodgerdick123@gmail.com'],
    alertFrom: 'Bloom',
    alertSubject: 'Your site received a new comment',
    alertIntro: '<p>Your site received the following comment.</p>',
    alertClosing: '<p>Please log in to review, approve, or delete this comment.</p>',
    admin: {
        group: 'Admin'
    }
}
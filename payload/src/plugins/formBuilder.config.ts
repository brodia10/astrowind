
// formBuilderConfig.js

const formBuilderConfig = {
    fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        // payment: true
    },
    redirectRelationships: ['pages', 'posts', 'events',], // Redirect options 
    handlePayment: async ({ form, submissionData }) => {
        // Payment handling logic here
        // Example: calculate the total cost, integrate third-party payment processing API
    },
    beforeEmail: (emailsToSend) => {
        // Email customization logic here
        // Example: modify the emails in any way before they are sent
    },
    formOverrides: {
        slug: "forms", // Custom slug for forms
        access: {
            read: () => true,
            update: () => true,
        },
        admin: {
            group: 'Content',
            description: "Step into the driver's seat of audience engagement with your Forms editor! This powerful tool lets you craft custom forms with ease, allowing you to specify field widths, set required fields, and personalize your submit button. After submission, choose to delight users with a custom message or direct them to another page. Plus, you can automate emails to keep the conversation going. It's the perfect blend of simplicity and functionality to grow your community.",
        },
    },
    formSubmissionOverrides: {
        slug: "form-submissions", // Custom slug for form submissions
        // Other custom settings for form submissions
        admin: {
            group: 'Audience',
            listSearchableFields: ['form', 'submissionData'],
            description: 'Welcome to your Form Submissions center! This is where you can effortlessly keep track of all your audience\'s form responses, ensuring every message is accounted for and no engagement is missed. It\'s the perfect spot to maintain the pulse of your community\'s interactions, helping you stay engaged and responsive',
        },
    },
};

export default formBuilderConfig;


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
        payment: true
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
            group: 'Content'
        }
    },
    formSubmissionOverrides: {
        slug: "form-submissions", // Custom slug for form submissions
        // Other custom settings for form submissions
        admin: {
            group: 'Audience',
        }
    }

};

export default formBuilderConfig;

// formBuilderConfig.js
// DATABASE_URI=postgresql://postgres:postgres@postgres:5432/postgres
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
    handlePayment: async ({ form, submissionData }) => {
        // Payment handling logic here
        // Example: calculate the total cost, integrate third-party payment processing API
    },
    beforeEmail: (emailsToSend) => {
        // Email customization logic here
        // Example: modify the emails in any way before they are sent
    },
    formOverrides: {
        slug: "customForms", // Custom slug for forms
        access: {
            read: () => true,
            update: () => true,
        },
        fields: [
            {
                name: "customField",
                type: "text"
            }
            // ... other custom fields if necessary
        ]
    },
    formSubmissionOverrides: {
        slug: "custom-submissions", // Custom slug for form submissions
        // Other custom settings for form submissions
    }
};

export default formBuilderConfig;

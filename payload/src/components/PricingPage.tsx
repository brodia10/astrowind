import React from 'react';
import { useHistory } from 'react-router-dom';

const planStyles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'row', // Standard for desktop
        flexWrap: 'wrap', // Ensures responsiveness
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '20px'
    },
    planCard: {
        width: '100%', // Full width on mobile
        maxWidth: '300px', // Maximum width
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer', // Indicates clickable
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '10px 0'
    },
    featureList: {
        listStyle: 'none',
        padding: 0,
        margin: '20px 0'
    },
    featureItem: {
        marginBottom: '10px'
    }
};

const PricingPage: React.FC = () => {
    const history = useHistory();

    const plans = [
        {
            id: 'basic',
            name: 'Rally Basic',
            price: '$50/month',
            features: [
                'Templates',
                'Drag and Drop Editor',
                'Integration with CRM’s',
                'Custom Widgets',
                'Redirects',
                '25 Page Limit',
                'Unlimited News Posts',
                'SEO',
                'API Assistant'
            ],
            priceId: 'price_1P1rjoGcfEQQlDX8zmtx9UBc'
        },
        {
            id: 'pro',
            name: 'Rally PRO',
            price: '$100/month',
            features: [
                'Templates',
                'Drag and Drop Editor',
                'Integration with CRM’s',
                'Custom Widgets',
                'Redirects',
                'Unlimited News Posts',
                'SEO',
                'API Assistant',
                'Pop ups',
                'Multilingual',
                'Create/Save your own templates',
                'Custom Analytics Dashboard',
                'Unlimited Pages',
                'Remove “Rally” in footer',
                'Priority Support',
                'Petition Pages'
            ],
            priceId: 'price_1P6fd7GcfEQQlDX8ADZiKuKv'
        }
    ];

    const navigateToCheckout = (priceId: string) => {
        history.push(`/admin/checkout/${priceId}`);
    };

    return (
        <div style={{ margin: '40px' }}>
            <h1 style={{ textAlign: 'center' }}>Choose Your Plan</h1>
            <div style={planStyles.container}>
                {plans.map((plan) => (
                    <div key={plan.id} style={planStyles.planCard} onClick={() => navigateToCheckout(plan.priceId)}>
                        <h2>{plan.name}</h2>
                        <div style={planStyles.price}>{plan.price}</div>
                        <ul style={planStyles.featureList}>
                            {plan.features.map((feature, index) => (
                                <li key={index} style={planStyles.featureItem}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Domain {
    domain: string;
    autoGenerated?: boolean;
    id?: string;
}

interface Tenant {
    id: number;
    siteName: string;
    domains?: Domain[];
    dashboardUrl?: string;
    updatedAt: string;
    createdAt: string;
}

const TenantSwitcher: React.FC = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [selectedUrl, setSelectedUrl] = useState<string>('');

    useEffect(() => {
        fetchTenants();
    }, []);

    const fetchTenants = async () => {
        try {
            const { data } = await axios.get<{ docs: Tenant[] }>('/api/tenants/');
            const tenantData = data.docs.map((tenant) => {
                const dashboardDomain = tenant.domains?.find(domain => domain.domain.includes('-dashboard.bloomcms.io'));
                return {
                    ...tenant,
                    dashboardUrl: `${dashboardDomain}` ? `https://${dashboardDomain.domain}` : undefined
                };
            }).filter(tenant => tenant.dashboardUrl);
            setTenants(tenantData);
            if (tenantData.length > 0) {
                setSelectedUrl(tenantData[0].dashboardUrl as string);
            }
        } catch (error) {
            console.error('Error fetching tenants:', error);
            alert('Failed to load tenant data.');
        }
    };

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const url = event.target.value;
        setSelectedUrl(url);
        window.location.href = url;
    };

    return (
        <>
            <style>
                {`
          .select-dropdown {
            width: 100%;
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s;
            outline: none;
            color: black;
          }
          .select-dropdown:hover {
            border-color: #888;
          }
          .select-dropdown:focus {
            border-color: #0056b3;
            box-shadow: 0 0 0 0.2rem rgba(0,86,179,0.25);
          }
        `}
            </style>
            <select
                value={selectedUrl}
                onChange={handleSelectionChange}
                className="select-dropdown"
                disabled={tenants.length === 0}
            >
                <option value="">Select a Site...</option>
                {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.dashboardUrl}>
                        {tenant.siteName}
                    </option>
                ))}
            </select>
        </>
    );
};

export default TenantSwitcher;
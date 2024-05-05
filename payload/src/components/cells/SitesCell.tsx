import axios from 'axios';
import type { Props as PayloadProps } from 'payload/components/views/Cell';
import { Tenant } from 'payload/generated-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './sites-cell.scss';

const SitesCell: React.FC<PayloadProps> = ({ rowData }) => {
    const tenantData = rowData as unknown as Tenant;
    const history = useHistory();

    const siteDomain = tenantData.domains?.find(domain => domain.autoGenerated && domain.domain.includes('-site')) || { domain: 'default-domain.com' };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/tenants/${tenantData.id}`);
            history.push('/admin/collections/tenants?limit=10');
        } catch (error) {
            console.error('Error deleting site', error);
        }
    };

    return (
        <div className="custom-sites-cell">
            <img
                src={'https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg'}
                alt={tenantData.siteName || 'Site'}
                className="custom-sites-cell__thumbnail"
            />
            <div className="custom-sites-cell__details">
                <div className="custom-sites-cell__text">
                    <span className="custom-sites-cell__title">{tenantData.siteName || 'Default Site Name'}</span>
                    <a href={`http://${siteDomain.domain}`}
                        className="custom-sites-cell__subtitle"
                        target="_blank"
                        rel="noopener noreferrer">
                        {siteDomain.domain}
                    </a>
                </div>
                <div className="custom-sites-cell__icons">
                    <a href={`/admin/collections/tenants/${tenantData.id}?depth=1&limit=1`}>
                        <i className="material-icons">edit</i>
                    </a>
                    <a href={`http://${siteDomain.domain}`} target="_blank" rel="noopener noreferrer">
                        <i className="material-icons">visibility</i>
                    </a>
                    <i className="material-icons" onClick={handleDelete}>delete_outline</i>
                </div>
            </div>
        </div>
    );
};

export default SitesCell;

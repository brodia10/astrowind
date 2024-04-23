// SitesCell.tsx
import type { Props } from 'payload/components/views/Cell';
import React from 'react';
import rallyLogo from '../../assets/rally.png';
import './sites-cell.scss';


const SitesCell: React.FC<Props> = (props) => {
    const { rowData } = props;
    const adminUrl = `/admin/collections/tenants/${rowData.id}?depth=1&limit=1`;

    // Find a domain with '-site' in the autogenerated subdomain
    const siteDomain = rowData.domains?.find(domain => domain.autoGenerated && domain.domain.includes('-site'));

    return (
        <div className="custom-sites-cell">
            <img
                src={rallyLogo}
                alt={rowData.siteName}
                className="custom-sites-cell__thumbnail"
            />
            <div className="custom-sites-cell__details">
                <div className="custom-sites-cell__text">
                    <span className="custom-sites-cell__title">{rowData.siteName}</span>
                    <a href={`http://${siteDomain?.domain}`}
                        className="custom-sites-cell__subtitle"
                        target="_blank"
                        rel="noopener noreferrer">
                        {siteDomain?.domain}
                    </a>
                </div>
                <div className="custom-sites-cell__icons">
                    <a href={adminUrl}>
                        <i className="material-icons">edit</i>
                    </a>
                    <a href={`http://${siteDomain?.domain}`} target="_blank" rel="noopener noreferrer">
                        <i className="material-icons">visibility</i>
                    </a>
                    <i className="material-icons">delete_outline</i>
                </div>
            </div>
        </div>
    );
};

export default SitesCell;

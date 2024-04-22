// SitesCell.tsx
import type { Props } from 'payload/components/views/Cell';
import React from 'react';
import rallyLogo from '../../assets/rally.png';
import './sites-cell.scss';


const SitesCell: React.FC<Props> = () => {
    return (
        <div className="custom-sites-cell">
            <img
                src={rallyLogo}
                alt="Maria Warner"
                className="custom-sites-cell__thumbnail"
            />
            <div className="custom-sites-cell__details">
                <div className="custom-sites-cell__text">
                    <span className="custom-sites-cell__title">Maria Warner</span>
                    <a href="http://MariaWarner.com"
                        className="custom-sites-cell__subtitle"
                        target="_blank"
                        rel="noopener noreferrer">
                        MariaWarner.com
                    </a>
                </div>
                <div className="custom-sites-cell__icons">
                    <i className="material-icons">edit</i>
                    <i className="material-icons">visibility</i>
                    <i className="material-icons">delete_outline</i>
                </div>
            </div>
        </div>
    );
};

export default SitesCell;

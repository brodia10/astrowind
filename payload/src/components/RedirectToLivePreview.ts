import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

interface RouteParams {
    id?: string; // Make "id" optional
}

const RedirectToPreview: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // Check if the current path already includes 'preview'
        if (id && !location.pathname.includes('preview')) {
            history.push(`/admin/collections/pages/${id}/preview`);
        }
    }, [id, location, history]);

    return null; // This component does not render anything
};

export default RedirectToPreview;

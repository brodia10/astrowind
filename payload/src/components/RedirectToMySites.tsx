import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const RedirectToTenants: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        history.push('/admin/collections/tenants?limit=10');
    }, [history]);

    // Render nothing or a loader while redirecting
    return null;
};

export default RedirectToTenants;

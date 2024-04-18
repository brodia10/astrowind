import { Field } from 'payload/types'
import React from 'react'

import { Link } from 'react-router-dom'

const UpgradeLink: React.FC = () => {
    return <Link to={'/admin/plans'}>Upgrade to add a custom domain</Link>
}

const upgradeField: Field = {
    name: 'title',
    type: 'text',
    admin: {
        components: {
            afterInput: [UpgradeLink]
        }
    }
}

export default upgradeField;
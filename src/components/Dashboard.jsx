import React from 'react';
import Dashboardstats from './shared/Dashboardstats';
import TablesDashboard from './shared/Dashboard-Table';
import Dashboardstatsalternative from './shared/Dashboardstatsalternative';

export default function Dashboard() {
    return (
        <div className='flex flex-col gap-14 max-h-screen overflow-y-auto pb-40'>
            <Dashboardstatsalternative />
            <TablesDashboard />
        </div>
    );
}

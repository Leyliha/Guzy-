import React from 'react'
import './home.css'
import FeaturedInfo from "../../comps/ftinfo/FtInfo";
import Chart from '../../comps/chart/Chart';
import WidgetLg from '../../comps/widgetlg/WidgetLg';
import WidgetSm from '../../comps/widgetsm/WidgetSm';
export default function Home({userData}) {
    return (
        <div className='home'>
            <FeaturedInfo/>
            <Chart title="User Orders" grid dataKey="Active User" data={userData} />
            <div className='homeWidgets'> 
                <WidgetLg/>
                <WidgetSm/>
             </div>
        </div>
    )
}

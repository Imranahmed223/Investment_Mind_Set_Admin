import FeaturedInfo from "../featuredInfo/FeaturedInfo";

import "./Home.scss";

import WidgetSm from "../widgetSm/WidgetSm";
import WidgetLg from "../widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className='dash'>
      <div className="home">
        <FeaturedInfo />
        <div className="home-widget">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </div>
  );
}

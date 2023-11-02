import React from 'react';
import NewsSection from './newsSection';
import Test from './test';
import BannerSection from './bannerSection';

function Home() {
  return (
    <div>
      {/* <Test /> */}
      <BannerSection />
      <NewsSection />
    </div>
  );
}

export default Home;

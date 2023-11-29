import React from 'react';
import NewsSection from './newsSection';
import BannerSection from './bannerSection';
import { ContainerStyled } from '../../../globalStyles';

function Home() {
  return (
    <ContainerStyled>
      <BannerSection />
      <NewsSection />
    </ContainerStyled>
  );
}

export default Home;

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Slider from '../components/Slider';
import { IContent } from '../interface';
import { getTvList } from '../utils/api';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import { useRecoilValue } from 'recoil';
import { myLangAtom } from '../atom';

function Tv() {
  const { t } = useTranslation();
  const lang = useRecoilValue(myLangAtom);
  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery<
    IContent[]
  >({
    queryKey: ['"airingTodayTvList', lang],
    queryFn: () => getTvList('airing_today', lang),
  });
  const { data: popularTvList, isLoading: loadingPopular } = useQuery<
    IContent[]
  >({
    queryKey: ['"popularTvList', lang],
    queryFn: () => getTvList('popular', lang),
  });
  const { data: topRatedTvList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >({
    queryKey: ['"topRatedTvList', lang],
    queryFn: () => getTvList('top_rated', lang),
  });
  const isLoading = loadingAiringToday || loadingPopular || loadingTopRated;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Banner section='tv' content={airingTodayTvList?.[0]} />
      <div>
        <Slider
          section='tv'
          title={t('category.tv.airingtoday')}
          list={airingTodayTvList}
          zindex={3}
        />
        <Slider
          section='tv'
          title={t('category.tv.popular')}
          list={popularTvList}
          zindex={2}
        />
        <Slider
          section='tv'
          title={t('category.tv.topRated')}
          list={topRatedTvList}
          zindex={1}
        />
      </div>
    </>
  );
}
export default Tv;

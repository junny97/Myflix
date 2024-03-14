import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CastCard from './CastCard';
import Details from './Details';
import MainVideo from './MainVideo';
import ContentCards from './ContentCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ICast, IContent, IVideo } from '../interface';
import { modalState, myLangAtom } from '../atom';
import {
  getCast,
  getDetails,
  getRecommendations,
  getSimilar,
  getVideos,
} from '../utils/api';
import { DefaultButton } from '../styles/common';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getImgPath } from '../utils/utilsFn';
import noBackdrop from '../../src/assets/noBackdrop.png';
import useBodyScroll from '../hook/useBodyScroll';
import Loader from './Loader';
import Videos from './Videos';

export default function Modal() {
  const { section } = useParams();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  // Close Modal
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen && e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const [stopBodyScroll, restoreBodyScroll] = useBodyScroll();
  useEffect(() => {
    isModalOpen ? stopBodyScroll() : restoreBodyScroll();
  }, [isModalOpen]);

  // Fetch data
  const lang = useRecoilValue(myLangAtom);
  const {
    data: details,
    isLoading: detailsLoading,
    isError,
  } = useQuery<IContent>({
    queryKey: ['detailsContent', id, lang],
    queryFn: () => getDetails(section!, id!, lang),
    enabled: !!id,
  });
  // Handling data fetching errors
  useEffect(() => {
    if (isError) {
      setIsModalOpen(false);
      navigate(-1);
    }
  }, [isError]);

  const { data: cast, isLoading: castLoading } = useQuery<ICast[]>({
    queryKey: ['castContent', id, lang],
    queryFn: () => getCast(section!, id!, lang),
    enabled: !!id,
  });

  const { data: videos, isLoading: videosLoading } = useQuery<IVideo[]>({
    queryKey: ['videoContent', id, lang],
    queryFn: () => getVideos(section!, id!, lang),
    enabled: !!id,
  });
  const { data: reco, isLoading: recoLoading } = useQuery<IContent[]>({
    queryKey: ['recoContent', id, lang],
    queryFn: () => getRecommendations(section!, id!, lang),
    enabled: !!id,
  });
  const { data: similar, isLoading: similarLoading } = useQuery<IContent[]>({
    queryKey: ['similarContent', id, lang],
    queryFn: () => getSimilar(section!, id!, lang),
    enabled: !!id,
  });
  const isLoading =
    detailsLoading ||
    castLoading ||
    videosLoading ||
    recoLoading ||
    similarLoading;

  const mainVideoKey = videos?.[0]?.key;
  const { t } = useTranslation();
  return (
    <>
      {isModalOpen && (
        <Overlay
          onClick={closeModal}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Wrapper
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {mainVideoKey ? (
                <MainVideo videoKey={mainVideoKey} />
              ) : (
                <Backdrop
                  bg={
                    details?.backdrop_path
                      ? getImgPath(details?.backdrop_path)
                      : noBackdrop
                  }
                />
              )}
              <ContentContainer>
                <Details
                  section={section!}
                  details={details!}
                  isError={isError}
                />
                <CastCard
                  title={t('modal.cast')}
                  cast={cast!}
                  altText={t('modal.altText.info')}
                />
                <Videos
                  title={t('modal.video')}
                  videos={videos!}
                  altText={t('modal.altText.info')}
                />
                <ContentCards
                  title={t('modal.recommend')}
                  contents={reco!}
                  section={section!}
                  altText={t('modal.altText.prep')}
                />
                <ContentCards
                  title={t('modal.similar')}
                  contents={similar!}
                  section={section!}
                  altText={t('modal.altText.prep')}
                />
              </ContentContainer>
              <CloseButton icon={faClose} onClick={closeModal} />
            </Wrapper>
          )}
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  z-index: 9998; // Wrapper 밑에 위치
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Wrapper = styled(motion.div)`
  width: min(90%, 900px);
  margin: 30px auto;
  padding-bottom: 50px;
  background-color: black;
  z-index: 9999;
  position: relative; // CloseBtn 배치
  border-radius: 8px;
  overflow: hidden;
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bg});
  background-size: cover;
`;

const ContentContainer = styled.div`
  margin: 0 30px;
`;

const CloseButton = styled(FontAwesomeIcon)`
  ${DefaultButton}
  position: absolute;
  top: 20px;
  right: 20px;
`;

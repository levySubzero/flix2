import React, { useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Footer from '@/components/Footer';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import InfoModal from '@/components/InfoModal';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';
import { CategoryInterface } from '@/types';
import useCatsHome from '@/hooks/useCatsHome';
import MovieListHome from '@/components/MovieListHome';

type MyData = {
  isAuthed: boolean; // Replace 'string' with the actual type of your data
};

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);
//   let isAuthed = true;
//   if (!session) {
//     return isAuthed = false;
//   }
//   return {
//     props: { isAuthed }
//   }
// }

const Home = () => {
  // const { data: favorites = [] } = useFavorites();
  const { data: categorys = [] } = useCatsHome();
  const { isOpen: modalOpen, closeModal: modalClose } = useInfoModalSeriesStore();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModalSeries visible={modalOpen} onClose={modalClose} />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar home={true} />
      <Billboard />
      <div className="flex flex-col gap-4 mx-4 my-[-55px] md:my-[-85px] lg:my-[-130px] xl:my-[-235px] 2xl:my-[-265px] z-30">
        <div className="absolute inset-x-0 top-0 h-5 bg-gray-800 filter blur-lg"></div>
          {/*isAuthed ? (
            favorites.length > 0 ? (
              <MovieList  title="My List" movies={favorites} shows={[]}/>
            ) : ('')
          ) : ('')
            */}

          {categorys.map((cat: CategoryInterface, i: any) => {
            return (
              <MovieListHome key={i} data={cat}/>
            )
            })}
          <Footer />
      </div>
    </>
  )
}
export default Home;
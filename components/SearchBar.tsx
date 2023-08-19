import React, { useState } from 'react';
import ReactSearchBox from "react-search-box";
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import useShowList from '@/hooks/useShowList';
import useMovieList from '@/hooks/useMovieList';

interface ItemInterface {
    key: string; 
    value: string;
}

interface BarProps {
    showB: boolean; 
}

const SearchBar: React.FC<BarProps>  = ({ showB }) => {
    const { data: shows = [] } = useShowList();
    const { data: movies = [] } = useMovieList();
    const { openModal } = useInfoModalSeriesStore();
    const { openModal: movieModal } = useInfoModalStore();
    const items: ItemInterface[] = [];
    const movie: string[] = [];
    const show: string[] = [];
    
    shows.forEach((item: { title: string; id: string; }) => {
        items.push({key: item.id, value: item.title});
        show.push(item.id);
    });

    movies.forEach((item: { title: string; id: string; }) => {
        items.push({key: item.id, value: item.title});
        movie.push(item.id);
    });
    const searchSelect = (record: { item: { key: string; value: string; }; }) => {
        if ( movie.includes(record.item.key) ) {
            movieModal(record.item.key);
        } else {
            openModal(record.item.key);
        }
        showB = !showB
        
    } 

  return (
    <ReactSearchBox
        placeholder="Search Movie or Series"
        data={items}
        onChange={function (value: string): void {}} 
        onSelect={searchSelect}   
        inputBackgroundColor={'black'}
        inputFontColor={'white'}
    />
  );
}

export default SearchBar;
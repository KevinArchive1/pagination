import React, { useState, useEffect } from 'react';
import "./manga.css";

function MangaTable() {
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const mangasPerPage = 10;


    useEffect(() => {
        fetch(`https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=${(page - 1) * 20}`)
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    setMangas(data.data);
                } else {
                    setMangas([]); // fallback to empty if error
                }
            })
            .catch(error => {
                console.error("Error fetching mangas:", error);
                setMangas([]); // fallback to empty if network error
            });
    }, [page]);
    

    // Filter and sort the mangas based on search and order
    const filteredMangas = mangas.filter(manga => {
        const title = manga.attributes.titles.en_jp || manga.attributes.titles.en || '';
        return title.toLowerCase().includes(search.toLowerCase());
    }).sort((a, b) => {
        const aTitle = (a.attributes.titles.en_jp || a.attributes.titles.en || '').toLowerCase();
        const bTitle = (b.attributes.titles.en_jp || b.attributes.titles.en || '').toLowerCase();

        if (order === 'asc') return aTitle.localeCompare(bTitle);
        return bTitle.localeCompare(aTitle);
    });

    const startIndex = (page - 1) * mangasPerPage;
    const paginatedMangas = filteredMangas.slice(startIndex, startIndex + mangasPerPage);
    const totalPages = Math.ceil(filteredMangas.length / mangasPerPage);

    return (
        <div className='Main_holder'>
            <div className='search'>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="searchInput"
                />
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                    Toggle Order ({order})
                </button>
            </div>
            <div className='holder'>
                {paginatedMangas.map(manga => {
                    const coverUrl = manga.attributes.posterImage?.small || '';

                    return (
                        <div className='bookHolder' key={manga.id}>
                            <div className='bookImg'>
                                <img src={coverUrl} alt={manga.attributes.titles.en_jp || manga.attributes.titles.en || 'No Title'} />
                            </div>      
                            <div className='bookTitle'>{manga.attributes.titles.en_jp || manga.attributes.titles.en || 'No Title'}</div>
                        </div> 
                    );
                })}
            </div>
            <div>
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default MangaTable;

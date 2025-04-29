import React, { useState, useEffect } from 'react';
import "./manga.css";
import { FiUploadCloud } from 'react-icons/fi';

function MangaTable() {
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('bleach');
    const [order, setOrder] = useState('asc');
    const [file, setFile] = useState(null);
    const mangasPerPage = 30;

    useEffect(() => {
        fetch(`https://openlibrary.org/search.json?q=${search}&page=${page}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.docs) {
                    setMangas(data.docs);
                } else {
                    setMangas([]);
                }
            })
            .catch(error => {
                console.error("Error fetching mangas:", error);
                setMangas([]);
            });
    }, [search, page]);

    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            alert(`Uploaded file: ${uploadedFile.name}`);
        }
    };

    const sortedMangas = mangas.sort((a, b) => {
        const aTitle = (a.title || '').toLowerCase();
        const bTitle = (b.title || '').toLowerCase();

        if (order === 'asc') return aTitle.localeCompare(bTitle);
        return bTitle.localeCompare(aTitle);
    });

    const startIndex = (page - 1) * mangasPerPage;
    const paginatedMangas = sortedMangas.slice(startIndex, startIndex + mangasPerPage);
    const totalPages = Math.ceil(mangas.length / mangasPerPage);

    return (
        <div className='Main_holder'>
            {/* Search and Upload Section */}
            <div className='search'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="searchInput"
                />
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                    Toggle Order ({order})
                </button>

                <div className="upload_holder">
                    <label className="upload_label">
                        <FiUploadCloud size={30}  />
                        Upload Image
                        <input type="file" onChange={handleUpload} hidden />
                    </label>
                    {file && <p className="uploaded-file">Uploaded: {file.name}</p>}
                </div>
            </div>

            {/* Manga Cards Section */}
            <div className='holder'>
                {paginatedMangas.map(manga => {
                    const coverUrl = manga.cover_i
                        ? `https://covers.openlibrary.org/b/id/${manga.cover_i}-M.jpg`
                        : 'https://dummyimage.com/150x200/ccc/000.jpg&text=No+Image';

                    return (
                        <div className='bookHolder' key={manga.key}>
                            <div className='bookImg'>
                                <img src={coverUrl} alt={manga.title || 'No Title'} />
                            </div>
                            <div className='bookTitle'>
                                <h1>{manga.title || 'No Title'}</h1>
                                <h2> {manga.author_name || "No Author"}</h2>
                                <h2>{manga.first_publish_year || "N\A"}</h2>
                                
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Section */}
            
            <div className='pagination'>
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
        </div>
    );
}

export default MangaTable;

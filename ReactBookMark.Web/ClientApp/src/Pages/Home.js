import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Home = () => {
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('api/bookmark/populerbookmarks');
            setBookmarks(data);
        }
        
        getBookmarks();
    }, [])
    return (
        <>
            <h1>Welcome to the React Bookmark Application</h1>
            <h3>Top 5 Bookmarked links</h3>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map((b, i) => {
                        return (
                            <tr key={i}>
                                <td><a href={b.url} target="_blank">{b.url}</a></td>
                                <td>{b.count}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default Home;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('api/bookmark/populerbookmarks');
            setBookmarks(data);
        }
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
                                <td><Link to={{ pathname: `${b.url}` }} target="_blank">{b.url}</Link></td>
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
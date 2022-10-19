import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import BookmarkRow from '../Components/BookmarkRow';

const MyBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useAuthContext();
    useEffect(() => {
        getBookmarks()
    }, [])
    const getBookmarks = async () => {
        const { data } = await axios.get('api/bookmark/mybookmarks');
        setBookmarks(data);
    }
    const onDeleteClick = async (bookmark) => {
        await axios.post('api/bookmark/deletebookmark', { ...bookmark })
        getBookmarks();
    }
    const onUpdateClick = async (bookmark) => {
        await axios.post('api/bookmark/editbookmark', { id, title })
        getBookmarks();
    }
    const genarateTable = () => {
        return (
            <table className='mt-3 table table-hover table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map((b, i) => {
                        return <BookmarkRow
                            bookmark={b}
                            key={i}
                            onDeleteClick={onDeleteClick}
                            onUpdateClick={onUpdateClick} />

                    })}
                </tbody>
            </table>
        )
    }
    return (
        <>
            <div className='container'>
                <h1>Welcome back {user.firstName} {user.lastName}</h1>
                <Link to='/addbookmark'>
                    <button className='btn btn-block btn-lg btn-primary'>Add Bookmark</button>
                </Link>
                {genarateTable()}
            </div>
        </>
    )
}
export default MyBookmarks;
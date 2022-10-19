import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const BookmarkRow = ({ b, i, onDeleteClick, onUpdateClick }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: '', title: '' })
    const onEditClick = (props) => {
        const t = props;
        setFormData(t);
        setIsEditing(true);
    }
    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }
    const updateClick = async () => {
        setIsEditing(false);
        onUpdateClick(formData.id, formData.title)
        setFormData({ id: '', title: '' })
    }
    const onCancelClick = () => {
        setIsEditing(false);
        
        setFormData({ id: '', title: '' })
    }
    return (
        <tr key={i}>
            {!isEditing && <>
                <td>b.title</td>
                <td><Link to={{ pathname: `${b.url}` }} target="_blank">b.url</Link></td>
                <td>
                    <button onClick={() => onEditClick(b)} className='btn btn-success'>Edit Title</button>
                    <button onClick={() => onDeleteClick(b)} className='btn btn-danger'>Delete</button>
                </td></>
            }
            {isEditing && <>
                <td><input className='form-control' type="text" value={formData.title} name="title" onChange={onTextChange} placeholder={formData.title} /></td>
                <td><Link to={{ pathname: `${b.url}` }} target="_blank">b.url</Link></td>
                <td>
                    <button onClick={() => updateClick(b)} className='btn btn-success'>Update Title</button>
                    <button onClick={() => onCancelClick(b)} className='btn btn-info'>Cancel</button>
                    <button onClick={() => onDeleteClick(b)} className='btn btn-danger'>Delete</button>
                </td>
            </>}
        </tr>
    )
}
export default BookmarkRow;
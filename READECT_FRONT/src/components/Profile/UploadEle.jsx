import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AiFillDelete } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useProfileContext } from '../../context/ProfileContext'

const deleteAPI = "/api/v1/reader"
const MyProfileAPI = "/api/v1/reader/"

function UploadEle({ title, type, id }) {
    const { getMyProfile } = useProfileContext();

    //To delete function
    const DoDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`${deleteAPI}/${type}/update/${id}`);
            getMyProfile(MyProfileAPI);
            toast.success(`${type} deleted`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <NavLink to={`/single/${type}/${id}`} className="upload-element">
            <div className="upload-name">{title}</div>
            <div className="upload-delete" onClick={(e) => DoDelete(e)}><AiFillDelete /></div>
        </NavLink>
    )
}

export default UploadEle
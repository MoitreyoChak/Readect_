import { useEffect, useState } from 'react'
import { useSingleContext } from '../context/SingleContext'
import { useProfileContext } from '../context/ProfileContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const FollowAPI = "/api/v1/reader"

function Follow() {
    const { content } = useSingleContext();
    const { profile } = useProfileContext();
    // console.log(JSON.stringify(content.userId));
    // console.log(profile.followings);
    const [follow, SetFollow] = useState(false);
    const DoFollow = (e) => {
        profile?.followings?.map((ele, i) => {
            SetFollow(false);
            if (ele === content?.userId) {
                SetFollow(true);
                return;
            }
        });
    }

    const changeFollow = async (e) => {
        e.preventDefault();
        if (follow === true) {
            try {
                const resp = await axios.post(`${FollowAPI}/unfollow/${content.userId}`);
                console.log(resp);
                DoFollow();
                SetFollow(false);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const resp = await axios.post(`${FollowAPI}/follow/${content.userId}`);
                console.log(resp);
                DoFollow();
                SetFollow(true);
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        DoFollow();
    }, [])


    return (
        <div className='single-content-follow' >
            <NavLink className='author-name'>
                Author: <span>{content.name}</span>
            </NavLink>
            <button className={`follow-btn ${follow ? "following" : "follow"}`} onClick={(e) => { changeFollow(e) }}>{
                follow ? <div>Following</div> : <div >Follow</div>
            }
            </button>
        </div>
    )
}

export default Follow
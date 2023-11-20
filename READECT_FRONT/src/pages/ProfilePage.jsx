import { useEffect } from 'react'
import Profile from '../components/Profile/Profile';
import Loading from '../components/Loading';
import "../style/Profile.css"
import { useProfileContext } from '../context/ProfileContext';
const MyProfileApi = "/api/v1/reader/"

function ProfilePage() {
    const { isProfileLoading, getMyProfile } = useProfileContext();
    useEffect(() => {
        getMyProfile(MyProfileApi);
    }, []);
    return (
        isProfileLoading ? <Loading /> :
            <>
                <Profile />
            </>
    )
}

export default ProfilePage
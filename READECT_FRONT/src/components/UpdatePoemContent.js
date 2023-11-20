import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
const url = "/api/v1/reader/poem";

const UpdatePoemContent = () => {
    const params = useParams();
    const [content, setContent] = useState("");
    const updatePoem = async () => {
        try {
            const resp = await fetch(`${url}/${params.poemId}`, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content
                }),
                credentials: "include",
            });
            const data = resp.json();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container-fluid updateArea'>
            <div className='row'>
                <form method="patch" className='col-md-4 col-10 mx-auto contentUpdateArea text-center'>
                    <h1>CONTENT</h1>
                    <textarea name="content" id="poemContent" cols="50" rows="15" placeholder='Enter the Poem' onChange={(e) => setContent(e.target.value)}></textarea>
                    <button onClick={() => { updatePoem() }}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePoemContent
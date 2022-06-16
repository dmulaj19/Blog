import { useState } from 'react'
import "./about.css";
import { useAppContext } from '../../../context/context'
import avatar from "./cat_avatar.png"

export default function About() {
    const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

    return (
        <div className="about-container">
            <section class="about">
                <div className='about-main'>
                    <img
                        // className='about-image'
                        src={user?.image ? `data:image/jpeg;base64,${user?.image}` : avatar}
                        alt=""
                    />
                    <div className='about-text'>
                    <h1>About Us</h1>
                    <h5>{selectedBlog?.name}</h5>
                    <p>{user?.description}</p>
                </div>
                </div>
                
            </section>
        </div>
    );
}

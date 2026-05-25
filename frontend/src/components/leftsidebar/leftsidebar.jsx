
// export default Leftsidebar


import "./leftsidebar.css";
import React, { useEffect, useState, useContext } from 'react';
import Menubar from "./menubar";
import assets from '../../assets/assets';
import { ChatContext } from "../../../usecontext/chatcontext";
import { AuthContext } from "../../../usecontext/authcontext";

const Leftsidebar = () => {

    const {
        getuser,
        users,
        selecteduser,
        setselecteduser,
        unseenmessage,
        setunseenmessage
    } = useContext(ChatContext);
    const { onlineusers } = useContext(AuthContext);
    console.log("i am in leftsidebardf and going to print",onlineusers);
    const [input, setinput] = useState("");
    const [menu, setmenu] = useState(false);
    console.log("i am in leftsidebardf",users);
    const filtereduser = input
        ? users.filter((individualuser) =>
            individualuser.profile.name
                .toLowerCase()
                .includes(input.toLowerCase())
        )
        : users;
    useEffect(() => {
        getuser();
    }, [onlineusers]);

    return (
        <div className="ls">

            <div className="ls-top">

                <div className="ls-nav">
                    <img src={assets.logo} alt="" className="logo" />

                    <div className="menu" onClick={() => setmenu(!menu)}>
                        <img src={assets.menu_icon} alt="" />
                        {menu && <Menubar />}
                    </div>
                </div>

                <div className="ls-search">
                    <img src={assets.search_icon} alt="" />

                    <input
                        type="text"
                        onChange={(e) => setinput(e.target.value)}
                        placeholder="Search here"
                    />
                </div>
            </div>

            <div className="ls-list">

                {filtereduser.map((item, index) => {

                    // check online status
                    const isonline = onlineusers.includes(item._id);

                    // unseen messages count
                    const unseen = unseenmessage[item._id] || 0;

                    return (
                        <div
                            className="friends"
                            key={index}
                            onClick={() => {
                                setselecteduser(item);

                                // remove unseen count after opening chat
                                setunseenmessage((prev) => ({
                                    ...prev,
                                    [item._id]: 0
                                }));
                            }}
                        >

                            <div className="friend-image">

                                <img src={item.profile.img} alt="" />

                                <span
                                    className={
                                        isonline
                                            ? "online-dot"
                                            : "offline-dot"
                                    }
                                ></span>

                            </div>

                            <div className="friend-info">

                                <p>{item.profile?.name}</p>

                                <span>{isonline?"online":"offline"}</span>

                            </div>

                            {unseen > 0 && (
                                <div className="unseen-count">
                                    {unseen}
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Leftsidebar;
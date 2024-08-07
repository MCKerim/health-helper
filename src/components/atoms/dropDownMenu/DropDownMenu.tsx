import React, { useContext, useState } from 'react';
import { updateUserLanguageCodeInFirestore } from '../../../firebase';
import { Languages } from '../../../translation/languages/Languages';
import './DropDownMenu.css';
import {auth} from "../../../firebase";
import {i18n} from "../../../translation/i18n";
import { useNavigate } from 'react-router'
const LanguageDropdown: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
    const navigate = useNavigate();
    const handleLanguageChange = async (newLanguage: string) => {
        setSelectedLanguage(newLanguage);
        if (auth.currentUser) {
            try {
                console.log(auth.currentUser?.uid)
                await updateUserLanguageCodeInFirestore(auth.currentUser?.uid, newLanguage);
                await i18n.changeLanguage(newLanguage)
                //navigate(0)
                console.log('Language code updated successfully.');
            } catch (error) {
                console.error('Error updating language code:', error);
            }
        } else {
            console.log('User is not logged in.');
        }
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle">
                {selectedLanguage == Languages.English ? (
                    <>
                        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             xmlSpace="preserve" style={{marginRight: "5px"}}>
                            <path style={{fill: "#41479b"}}
                                  d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z"/>
                            <path style={{fill: "#f5f5f5"}}
                                  d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z"/>
                            <path style={{fill: "#ff4b55"}}
                                  d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z"/>
                            <path style={{fill: "#ff4b55"}}
                                  d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z"/>
                        </svg>
                        <p style={{ margin: "0"}}>
                            English
                        </p></>) : (<>
                        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                             className="iconify iconify--twemoji"
                             width={25} height={25} style={{marginRight: "5px"}}
                        >
                            <path fill="#FFCD05" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"/>
                            <path fill="#ED1F24" d="M0 14h36v9H0z"/>
                            <path fill="#141414" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"/>
                        </svg>
                        <p style={{margin: "0"}}>
                            Deutsch
                        </p></>
            )}
        </button>
    <div className="dropdown-menu fade-in-top">
        <button
            className={`dropdown-item ${selectedLanguage === Languages.English ? 'active' : ''}`}
            onClick={() => handleLanguageChange(Languages.English)}
        >
            <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                 xmlSpace="preserve">
                <path style={{fill: "#41479b"}}
                      d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z"/>
                        <path style={{fill: "#f5f5f5"}}
                              d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z"/>
                        <path style={{fill: "#ff4b55"}}
                              d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z"/>
                        <path style={{fill: "#ff4b55"}}
                              d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z"/></svg>
                    <p style={{margin: "10px"}}>
                        English
                    </p>
                </button>
                <button
                    className={`dropdown-item ${selectedLanguage === Languages.German ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(Languages.German)}
                >
                    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                         className="iconify iconify--twemoji"
                        width={25} height={25}
                    >
                        <path fill="#FFCD05" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"/>
                        <path fill="#ED1F24" d="M0 14h36v9H0z"/>
                        <path fill="#141414" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"/>
                    </svg>
                    <p style={{margin: "10px"}}>
                        Deutsch
                    </p>
                </button>
            </div>
        </div>
    );
};

export default LanguageDropdown;
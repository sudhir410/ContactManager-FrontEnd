import React, { useEffect } from "react";
import "./ContactList.css";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css'
import filter from "./images/list.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ImportFile from "../ContactList/importfile/import";
import DeleteFile from "./deletefile/Delete";
import ImportedFile from "./AfterImport/imported";
import DeletedFile from "./AfterDelete/delete2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./loader/Loader";


const ContactList = ({ show }) => {
    const [showMyModal, setShowMyModel] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [checked, setChecked] = useState(false);
    const handleOnClose = () => setShowMyModel(false);
    const navigate = useNavigate();
    const [datas, setdata] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [pageNo, setpageNo] = useState(1);
    const [ren, setren] = useState(false);
    const [deleteArray, setdeleteArray] = useState([]);
    const [allData, setallData] = useState([])
    const [importDone, setimportDone] = useState(false);
    const [loader, setloader] = useState(true)
    const [appState, changeState] = useState({
        activeObject: 1,
        objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    });
    const [afterDelete, setafterDelete] = useState(false);
    useEffect(() => {
        fetch('https://contactmanager-10x.herokuapp.com/contact/alldata', {
            method: "get",
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message !== "jwt malformed") {
                    setallData(data);

                } else {
                    navigate("/");
                }
            });
    }, [rerender, pageNo, ren]);

    useEffect(() => {
        fetch(`https://contactmanager-10x.herokuapp.com/contact/all/?page=${pageNo}`, {
            method: "get",
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message !== "jwt malformed") {
                    setdata(data);
                    setloader(false)
                } else {
                    navigate("/");
                }
            });
    }, [rerender, pageNo, ren]);




    const handleChange = (e) => {
        if (e.target.checked) {
            const id = e.target.value;
            setdeleteArray([...deleteArray, { id: id }]);
        }

    };

    const deleteData = () => {
        if (deleteArray) {
            fetch("https://contactmanager-10x.herokuapp.com/contact/delete", {
                method: "post",
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteArray),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === "success") {
                        setRerender(!rerender);
                        setShowModel(!showModel);
                        setdeleteArray([]);
                        setChecked(true);
                        setafterDelete(true);
                    }
                });
        }
    };
    const deleteSingleData = (e) => {
        console.log(e.target.id)
        const id = e.target.id
        let data = [{ id: id }]
        fetch("https://contactmanager-10x.herokuapp.com/contact/sdelete", {
            method: "post",
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json()).then((data) => {
                setRerender(!rerender);
                toast.success('data deleted')
            })
    }
    function toggleActive(index) {
        changeState({ ...appState, activeObject: appState.objects[index] });
    }
    function toggleActiveStyles(index) {
        if (appState.objects[index] === appState.activeObject) {
            return "anchor active";
        } else {
            return "anchor inactive";
        }
    }
    const pagination = (e) => {
        setpageNo(e.target.innerText);
    };
    const pages = (e) => {
        toggleActive(e.target.innerText - 1);
    };
    const handlepageIncrement = () => {
        console.log(pageNo);
        if (datas.length !== 0 && datas.length === 10)
            setpageNo(Number(pageNo) + 1);
    };
    const handlepageDecrement = () => {
        if (Number(pageNo) >= 2) {
            setpageNo(Number(pageNo) - 1);
        }
    };

    return (
        <div className="conatct_container">
            <div className="cont-main-container">
                <div className="contContainer">
                    <div className="cont-header">
                        <div className="selectDate">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-calendar-event"
                                width="15"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                                <line x1="16" y1="3" x2="16" y2="7"></line>
                                <line x1="8" y1="3" x2="8" y2="7"></line>
                                <line x1="4" y1="11" x2="20" y2="11"></line>
                                <rect x="8" y="15" width="2" height="2"></rect>
                            </svg>
                            <span>Select Date</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-chevron-down downArrow"
                                width="15"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>

                        <div className="filter">
                            <img
                                src={filter}
                                style={{
                                    width: 18,
                                    height: 15,
                                    marginBottom: -3,
                                    marginTop: 0,
                                    marginLeft: 0,
                                }}
                                alt=""
                                className="filter"
                            />
                            <span>Filter | </span>

                            {/* <img src={arrow} style={{ width: 22, height: 18, marginBottom: -6, zIndex: -1, marginLeft:-10}} alt="" className="filter" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-chevron-down downArrow"
                                width="15"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                =<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>

                        <div className="export">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-arrow-bar-up"
                                width="15"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="12" y1="4" x2="12" y2="14"></line>
                                <line x1="12" y1="4" x2="16" y2="8"></line>
                                <line x1="12" y1="4" x2="8" y2="8"></line>
                                <line x1="4" y1="20" x2="20" y2="20"></line>
                            </svg>
                            <span>Export</span>
                        </div>

                        <div
                            onClick={() => setShowMyModel(true)}
                            style={{ cursor: "pointer" }}
                            className="import"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-arrows-down-up"
                                width="15"
                                height="18"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="17" y1="3" x2="17" y2="21"></line>
                                <path d="M10 18l-3 3l-3 -3"></path>
                                <line x1="7" y1="21" x2="7" y2="3"></line>
                                <path d="M20 6l-3 -3l-3 3"></path>
                            </svg>
                            <span>Import</span>
                        </div>
                        <ImportFile
                            onClose={handleOnClose}
                            setShowMyModel={setShowMyModel}
                            visible={showMyModal}
                            setren={setren}
                            ren={ren}
                            setimportDone={setimportDone}
                        />
                        <ImportedFile
                            visible={importDone}
                            setimportDone={setimportDone}
                        ></ImportedFile>
                        <div
                            onClick={() =>
                                deleteArray.length !== 0 ? setShowModel(!showModel) : null
                            }
                            style={{ cursor: "pointer" }}
                            className="delete"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-trash"
                                width="15"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="4" y1="7" x2="20" y2="7"></line>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            </svg>
                            <span>Delete</span>
                        </div>
                        <DeleteFile
                            deleteData={deleteData}
                            setShowModel={setShowModel}
                            showModel={showModel}
                            visible={showModel}
                        />
                        <DeletedFile
                            visible={afterDelete}
                            setafterDelete={setafterDelete}
                        />
                    </div>

                    {/* ----------------    Table    -------------------------- */}

                    <div className="tableHeading">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"

                                        />
                                        Name
                                    </th>
                                    <th>
                                        | Designation
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-arrows-move-vertical"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            strokeWidth="3"
                                            stroke="#605750"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M9 18l3 3l3 -3"></path>
                                            <path d="M12 15v6"></path>
                                            <path d="M15 6l-3 -3l-3 3"></path>
                                            <path d="M12 3v6"></path>
                                        </svg>
                                    </th>
                                    <th>
                                        | Company
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-arrows-move-vertical"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            strokeWidth="3"
                                            stroke="#605750"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M9 18l3 3l3 -3"></path>
                                            <path d="M12 15v6"></path>
                                            <path d="M15 6l-3 -3l-3 3"></path>
                                            <path d="M12 3v6"></path>
                                        </svg>
                                    </th>
                                    <th>
                                        | Industry
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-arrows-move-vertical"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            strokeWidth="3"
                                            stroke="#605750"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M9 18l3 3l3 -3"></path>
                                            <path d="M12 15v6"></path>
                                            <path d="M15 6l-3 -3l-3 3"></path>
                                            <path d="M12 3v6"></path>
                                        </svg>
                                    </th>
                                    <th>| Email</th>
                                    <th>| Phone Number</th>
                                    <th>| Country</th>
                                    <th>| Action</th>
                                </tr>
                            </thead>

                            {/* table data */}

                            <tbody>
                                {
                                    loader && <Loader />
                                }
                                {show == "" && datas.map((user, i) => {

                                    return (
                                        <tr key={i}>
                                            <td className="inputname">
                                                <input
                                                    type="checkbox"
                                                    style={{ cursor: "pointer" }}
                                                    className="checkbox"
                                                    name={user._id}
                                                    onChange={handleChange}
                                                    value={user._id}
                                                    checked={!checked ? user.id : false}
                                                    onClick={() =>
                                                        checked ? setChecked(!checked) : null
                                                    }
                                                />
                                                <span>
                                                    {user.name.charAt(0).toUpperCase() +
                                                        user.name.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                {user.designation.charAt(0).toUpperCase() +
                                                    user.designation.slice(1)}
                                            </td>
                                            <td>
                                                {user.company.charAt(0).toUpperCase() +
                                                    user.company.slice(1)}
                                            </td>
                                            <td>
                                                {user.industry.charAt(0).toUpperCase() +
                                                    user.industry.slice(1)}
                                            </td>

                                            <Tippy animation='scale' offset={[-40, 7]} placement="bottom" content={<span style={{ color: "#2DA5FC", fontWeight: 600 }}>{user.email}</span>} theme='light'>
                                                <td className="hovering email">{user.email}</td>
                                            </Tippy>
                                            <td className="hovering" >{user.mobile}</td>

                                            <td>{user.country}</td>
                                            <td>

                                                <span style={{ display: "inline", padding: "2px", cursor: "pointer" }} onClick={(e) => deleteSingleData(e)} >

                                                    <svg id={user._id}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-trash icon1"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="#F81D1D"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path
                                                            stroke="none"
                                                            d="M0 0h24v24H0z"
                                                            fill="none"
                                                        ></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </span>
                                                <span>

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-pencil icon2"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="#0884FF"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path
                                                            stroke="none"
                                                            d="M0 0h24v24H0z"
                                                            fill="none"
                                                        ></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line
                                                            x1="13.5"
                                                            y1="6.5"
                                                            x2="17.5"
                                                            y2="10.5"
                                                        ></line>
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {show.length > 0 && allData.filter((val) => {
                                    if (val.email.includes(show) && show.length > 0) {
                                        return val;
                                    }
                                }).map((user, i) => {

                                    return (
                                        <tr key={i}>
                                            <td className="inputname">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name={user._id}
                                                    onChange={handleChange}
                                                    value={user._id}
                                                    checked={!checked ? user.id : false}
                                                    onClick={() =>
                                                        checked ? setChecked(!checked) : null
                                                    }
                                                />
                                                <span>
                                                    {user.name.charAt(0).toUpperCase() +
                                                        user.name.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                {user.designation.charAt(0).toUpperCase() +
                                                    user.designation.slice(1)}
                                            </td>
                                            <td>
                                                {user.company.charAt(0).toUpperCase() +
                                                    user.company.slice(1)}
                                            </td>
                                            <td>
                                                {user.industry.charAt(0).toUpperCase() +
                                                    user.industry.slice(1)}
                                            </td>

                                            <Tippy animation='scale' offset={[-40, 7]} placement="bottom" content={<span style={{ color: "#2DA5FC", fontWeight: 600 }}>{user.email}</span>} theme='light'>
                                                <td className="hovering email">{user.email}</td>
                                            </Tippy>
                                            <td className="hovering" >{user.mobile}</td>

                                            <td>{user.country}</td>
                                            <td>

                                                <span style={{ display: "inline", padding: "2px", cursor: "pointer" }} onClick={(e) => deleteSingleData(e)} >

                                                    <svg id={user._id}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-trash icon1"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="#F81D1D"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path
                                                            stroke="none"
                                                            d="M0 0h24v24H0z"
                                                            fill="none"
                                                        ></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </span>
                                                <span>

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-pencil icon2"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="#0884FF"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path
                                                            stroke="none"
                                                            d="M0 0h24v24H0z"
                                                            fill="none"
                                                        ></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line
                                                            x1="13.5"
                                                            y1="6.5"
                                                            x2="17.5"
                                                            y2="10.5"
                                                        ></line>
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="cont-footer-container">
                <div className="pages">
                    <span style={{ cursor: "pointer" }} onClick={handlepageDecrement}>
                        {" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-left"
                            width="18"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="black"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <polyline points="15 6 9 12 15 18"></polyline>
                        </svg>
                    </span>

                    {appState.objects.map((element, index) => {
                        return (
                            <div
                                style={{ display: "inline-block" }}
                                key={index}
                                onClick={(e) => pages(e)}
                                className={toggleActiveStyles(index)}
                            >
                                <span onClick={(e) => pagination(e)}>{element.id}</span>
                            </div>
                        );
                    })}
                    <span style={{ cursor: "pointer" }} onClick={handlepageIncrement}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-right"
                            width="18"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="black"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <polyline points="9 6 15 12 9 18"></polyline>
                        </svg>
                    </span>
                </div>
            </div>
            <ToastContainer autoClose={3000} />
        </div >
    );
};
export default ContactList;

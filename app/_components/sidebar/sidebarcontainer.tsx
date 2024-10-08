'use client'

import {useState } from "react"
import Sidebar from "./sidebar"

const SidebarContainer = () => {
    const [checkboxValue, setCheckboxValue] = useState<boolean>(false);


    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost ">
                    {/* Page content here */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
            </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <Sidebar setCheckboxValue={setCheckboxValue}/>
                </div>
        </div>
    )
}

export default SidebarContainer
'use client'

import { useState } from "react"
import Sidebar from "./sidebar"

const SidebarContainer = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [checkboxValue, setCheckboxValue] = useState<boolean>(false)

    const checked = () => {
        if (showSidebar) {
            setTimeout(() => {
                setShowSidebar(false);
            }, 1000)
        }
        else {
            setShowSidebar(true);
        }
        if (!checkboxValue) {
            setTimeout(() => {
                setCheckboxValue(true)
            }, 10)
        }
        else {
            setCheckboxValue(false);
        }


    }


    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={checkboxValue} onChange={checked} />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
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
            {showSidebar &&
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <Sidebar setShowSidebar={setShowSidebar} setCheckboxValue={setCheckboxValue} />
                </div>
            }

        </div>
    )
}

export default SidebarContainer
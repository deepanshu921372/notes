import React from "react"
import { getInitials } from "../../utils/helper"
import { useTheme } from "../../context/ThemeContext"

const ProfileInfo = ({ onLogout, userInfo }) => {
  const { theme } = useTheme()
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-950'} ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-200'}`}>
        {getInitials(userInfo?.username)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.username}</p>
      </div>

      <button
        className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default ProfileInfo

import React from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import { useTheme } from "../../context/ThemeContext"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const { theme } = useTheme()

  return (
    <div className={`w-40 sm:w-60 md:w-80 flex items-center px-4 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-black border border-gray-300'}`}>
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className={`text-xl cursor-pointer mr-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className={`text-xl cursor-pointer mr-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar

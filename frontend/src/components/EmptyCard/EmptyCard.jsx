import React from "react"
import { useTheme } from '../../context/ThemeContext' // Import useTheme

const EmptyCard = ({ imgSrc, message }) => {
  const { theme } = useTheme(); // Get theme from context

  return (
    <div className={`flex flex-col items-center justify-center mt-20 ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}>
      <img src={imgSrc} alt="No notes" className="w-60" />

      <p className="w-1/2 text-sm font-medium text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  )
}

export default EmptyCard

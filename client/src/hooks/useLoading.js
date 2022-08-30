import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useLoading = () => {
  const { loading } = useSelector(state => state.user)
  const [ display, setDisplay ] = useState('none')

  useEffect(() => {
    setTimeout(() => {
      setDisplay('')
    }, 100)
    return () => {clearTimeout()}
  }, [])

  return { display, loading }
}


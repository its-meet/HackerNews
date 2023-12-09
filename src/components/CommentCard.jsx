import { motion } from 'framer-motion'
import React from 'react'

const CommentCard = ({data}) => {
  return (
    <motion.div
    className="bg-[#1D1D1D] h-[15rem] w-[20rem] p-5 shadow-gray-900 shadow-lg m-4 rounded-xl"
    layout
  >
    <h4 className="text-xl font-semibold text-[#20BD5F]  text-center py-4">
      {data?.author}
    </h4>
    <p className="text-justify">{data?.text.slice(0,150)}</p>
  </motion.div>
  )
}

export default CommentCard

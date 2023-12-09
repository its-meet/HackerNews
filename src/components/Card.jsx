import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Card = ({ data, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={data.url}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: "1", ease: "easeInOut", delay: index * 0.3 }}
      whileHover={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#20BD5F",
        opacity: 1,
        transition: { duration: "0.2", ease: "easeInOut", delay: 0.2 },
      }}
      className="bg-[#1D1D1D] mx-auto w-[21rem] cursor-pointer shadow-gray-900  shadow-lg m-4 rounded-xl"
      onClick={() => {
        navigate(`/details/${data?.objectID}`);
      }}
    >
      <div className="md:pl-8 pl-5">
        <div className="text-white pt-5 text-2xl">{data.title}</div>
        <div className="flex flex-wrap items-center py-2">
          ✉️ {data?.num_comments} 📅 {new Date(data?.created_at).toDateString()}
        </div>
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

export default Card;

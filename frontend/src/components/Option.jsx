import PropTypes from "prop-types";

const Option = ({ op, index, isSelected, handleSelect }) => {
    return (
        <button
            className={`flex p-2 pl-4 rounded-lg border text-left transition-all w-full ${isSelected
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
            onClick={() => handleSelect(index)}
        >
            {op}
        </button>
    );
};

Option.propTypes = {
    op: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
};

export default Option;

import React, { useState } from "react";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="textRes">
            {isReadMore ? text.slice(0, 80) : text}
            <span onClick={toggleReadMore} className="readTextRes-or-hideTextRes">
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};

export default ReadMore;

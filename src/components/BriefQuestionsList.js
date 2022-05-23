import React, {Fragment} from "react";
import BriefQuestion from "./BriefQuestion";

function BriefQuestionsList(props) {
    const {idsList, emptyListNote} = props;

    return (
        <Fragment>
            <h2 className="text-center my-3">
                <small>Would You Rather...</small>
            </h2>
            {idsList.length ? (
                idsList.map((id) => <BriefQuestion key={id} id={id}/>)
            ) : (
                <p className="text-center">{emptyListNote}</p>
            )}
        </Fragment>
    );
}

export default BriefQuestionsList;

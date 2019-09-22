import React from "react";
import { connect } from "react-redux";

import { fetchStream } from "../../actions";


class StreamEdits extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        return <div>edit</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream })(StreamEdits);
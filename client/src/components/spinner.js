import React, { Component } from 'react';
import {
  Modal
} from 'reactstrap';

class Spinner extends Component {

  render() {
    return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <i className="fas fa-circle-notch fa-spin"></i>
        </Modal>
    );
  }
}

// Spinner.propTypes = {
//   itemsLoading: PropTypes.boolean,
//   quotesLoading: PropTypes.boolean
// }

// const mapStateToProps = state => ({
//   itemsLoading: state.item.loading,
//   quotesLoading: state.quote.loading
// });

// export default connect(
//   mapStateToProps,
//   { addQuote, getItems }
// )(Spinner);

export default Spinner;
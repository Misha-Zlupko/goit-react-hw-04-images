import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onClose, src }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={'overlay'} onClick={onClose}>
      <div className={'modal'}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};
// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.key === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   modalClose = () => {
//     this.props.onClose();
//   };

//   render() {
//     return (
//       <div className={'overlay'} onClick={this.modalClose}>
//         <div className={'modal'}>
//           <img src={this.props.src} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

import './ChooseMovie.scss';

function ChooseMovie(props) {
  const { value, index } = props;

  return (
    <div className="choose-movie-container">
      <div className="choose-movie-wrapper">
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && (
            <div>
              Choose motherfucker!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChooseMovie;
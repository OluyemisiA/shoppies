import style from "./nomination-list.module.css";
const NominationList = ({ nominations, onRemoveNominee, onCloseNomination}) => {
  return (
    <div className={style.nomineeContainer}>
      <button className={style.close} onClick={onCloseNomination}>X</button>
      <h1 className={style.heading}>Nominations List</h1>
      <ul className={style.nominees}>
        {nominations &&
          nominations.map((nominee, i) => (
            <li key={i}>
              <span>
                {nominee.Title}
                ( {nominee.Year} )
              </span>
              <button onClick={() => onRemoveNominee(i)}>Remove</button>
            </li>
          ))}
      </ul>
      <div className={style.flex}>
        <p className={style.count}>
          You have nominated: {nominations.length} movies.
        </p>
        <button type="submit" className={style.submit}>
          SUBMIT NOMINATIONS
        </button>
      </div>
    </div>
  );
};

export default NominationList;

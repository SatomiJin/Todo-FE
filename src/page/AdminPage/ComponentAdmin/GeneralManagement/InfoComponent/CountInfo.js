import "./CountInfo.scss";
function CountInfo(props) {
  return (
    <div className="CountInfo-container">
      <div className="name">{props.data.title}</div>
      <div className="count">{props.data.count}</div>
    </div>
  );
}

export default CountInfo;
